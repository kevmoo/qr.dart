import 'package:qr/qr.dart';
import 'package:test/test.dart';

import '../example/src/example_model.dart';

void main() {
  group('ExampleModel', () {
    test('initial state is question', () {
      final model = ExampleModel();
      expect(model.state, ExampleState.question);
      expect(model.squares, isEmpty);
      expect(model.moduleCount, 0);
      expect(model.validTypeNumbers, hasLength(10));
      expect(model.validErrorCorrectLevels, hasLength(4));
    });

    test('valid input generates QR squares', () {
      final model = ExampleModel();
      var notified = false;
      final sub = model.changes.listen((_) {
        notified = true;
      });
      addTearDown(sub.cancel);

      model.value = 'Hello World';
      expect(notified, isTrue);
      expect(model.state, ExampleState.qr);
      expect(model.squares, isNotEmpty);
      expect(model.moduleCount, greaterThan(0));
      expect(model.validTypeNumbers, contains(2));
    });

    test('input exceeding version limit transitions to error state', () {
      final model = ExampleModel()
        ..autoType = false
        ..typeNumber =
            1 // Force version 1
        ..value = 'A' * 100; // Exceeds version 1 capacity
      expect(model.state, ExampleState.error);
      expect(model.squares, isEmpty);
      expect(model.moduleCount, 0);
    });

    test('autoType automatically bumps typeNumber when needed', () {
      final model = ExampleModel();
      expect(model.autoType, isTrue);

      model.value = 'A' * 150; // Exceeds version 1 but fits in higher version
      expect(model.state, ExampleState.qr);
      expect(model.typeNumber, greaterThan(1));
    });

    test('getters, setters, and dispose', () {
      final model = ExampleModel()
        ..value = 'Test'
        ..errorCorrectLevel = QrErrorCorrectLevel.low;
      addTearDown(model.dispose);

      model.changes.listen((_) {}).cancel();

      expect(model.value, 'Test');
      expect(model.byteCount, 4);

      expect(model.errorCorrectLevel, QrErrorCorrectLevel.low);
      expect(model.validErrorCorrectLevels, isNotEmpty);
    });

    test(
      'autoType recalculates validErrorCorrectLevels after version bump',
      () {
        final model = ExampleModel()
          // Setting typeNumber manually disables autoType by default,
          // so we force version 1 and then re-enable autoType to hermetically
          // test auto-sizing upwards from version 1.
          ..typeNumber = 1
          ..errorCorrectLevel = QrErrorCorrectLevel.high
          ..autoType = true
          ..value = 'A' * 50;

        expect(model.state, ExampleState.qr);
        expect(model.typeNumber, greaterThan(1));
        expect(
          model.validErrorCorrectLevels,
          contains(QrErrorCorrectLevel.high),
        );
      },
    );

    test('clearing input with autoType enabled resets typeNumber to 1', () {
      final model = ExampleModel()..value = 'A' * 150;
      expect(model.typeNumber, greaterThan(1));

      model.value = '';
      expect(model.typeNumber, 1);
    });

    test(
      'autoType maintains all validErrorCorrectLevels across version tiers',
      () {
        final model = ExampleModel();
        expect(model.autoType, isTrue);

        // 60 characters exceeds Version 1 High capacity (7 chars)
        // but fits in Version 3 High.
        model.value = 'A' * 60;

        expect(
          model.validErrorCorrectLevels,
          contains(QrErrorCorrectLevel.high),
        );
      },
    );

    test('autoType supports overflow versions beyond maxTypeNumber without '
        'blocking', () {
      final model = ExampleModel();
      expect(model.autoType, isTrue);

      // 400 characters exceeds Version 10 High capacity (174 chars).
      // It fits in Version 14 High (458 chars).
      model.value = 'A' * 400;

      expect(model.state, ExampleState.qr);
      expect(model.typeNumber, 17);
      expect(model.validTypeNumbers, contains(17));
      expect(model.squares, isNotEmpty);
    });
  });
}
