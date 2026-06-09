import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:test/scaffolding.dart';

import '../example/src/example_model.dart';

void main() {
  group('ExampleModel', () {
    test('initial state is question', () {
      final model = ExampleModel();
      check(model.state).equals(ExampleState.question);
      check(model.squares).isEmpty();
      check(model.moduleCount).equals(0);
      check(model.validTypeNumbers).length.equals(10);
      check(model.validErrorCorrectLevels).length.equals(4);
    });

    test('valid input generates QR squares', () {
      final model = ExampleModel();
      var notified = false;
      final sub = model.changes.listen((_) {
        notified = true;
      });
      addTearDown(sub.cancel);

      model.value = 'Hello World';
      check(notified).isTrue();
      check(model.state).equals(ExampleState.qr);
      check(model.squares).isNotEmpty();
      check(model.moduleCount).isGreaterThan(0);
      check(model.validTypeNumbers).contains(2);
    });

    test('input exceeding version limit transitions to error state', () {
      final model = ExampleModel()
        ..autoType = false
        ..typeNumber =
            1 // Force version 1
        ..value = 'A' * 100; // Exceeds version 1 capacity
      check(model.state).equals(ExampleState.error);
      check(model.squares).isEmpty();
      check(model.moduleCount).equals(0);
    });

    test('autoType automatically bumps typeNumber when needed', () {
      final model = ExampleModel();
      check(model.autoType).isTrue();

      model.value = 'A' * 150; // Exceeds version 1 but fits in higher version
      check(model.state).equals(ExampleState.qr);
      check(model.typeNumber).isGreaterThan(1);
    });

    test('getters, setters, and dispose', () {
      final model = ExampleModel()
        ..value = 'Test'
        ..errorCorrectLevel = QrErrorCorrectLevel.low;
      addTearDown(model.dispose);

      model.changes.listen((_) {}).cancel();

      check(model.value).equals('Test');
      check(model.byteCount).equals(4);

      check(model.errorCorrectLevel).equals(QrErrorCorrectLevel.low);
      check(model.validErrorCorrectLevels).isNotEmpty();
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

        check(model.state).equals(ExampleState.qr);
        check(model.typeNumber).isGreaterThan(1);
        check(model.validErrorCorrectLevels).contains(QrErrorCorrectLevel.high);
      },
    );

    test('clearing input with autoType enabled resets typeNumber to 1', () {
      final model = ExampleModel()..value = 'A' * 150;
      check(model.typeNumber).isGreaterThan(1);

      model.value = '';
      check(model.typeNumber).equals(1);
    });

    test(
      'autoType maintains all validErrorCorrectLevels across version tiers',
      () {
        final model = ExampleModel();
        check(model.autoType).isTrue();

        // 60 characters exceeds Version 1 High capacity (7 chars)
        // but fits in Version 3 High.
        model.value = 'A' * 60;

        check(model.validErrorCorrectLevels).contains(QrErrorCorrectLevel.high);
      },
    );

    test('autoType supports overflow versions beyond maxTypeNumber without '
        'blocking', () {
      final model = ExampleModel();
      check(model.autoType).isTrue();

      // 400 characters exceeds Version 10 High capacity (174 chars).
      // It fits in Version 14 High (458 chars).
      model.value = 'A' * 400;

      check(model.state).equals(ExampleState.qr);
      check(model.typeNumber).equals(17);
      check(model.validTypeNumbers).contains(17);
      check(model.squares).isNotEmpty();
    });
  });
}
