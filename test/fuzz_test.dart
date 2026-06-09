import 'dart:math';
import 'dart:typed_data';

import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:qr/src/qr_code.dart';
import 'package:test/scaffolding.dart';

void main() {
  final random = Random(42); // Fixed seed for reproducibility

  test('Fuzz QrCode.fromData with random strings', () {
    for (var i = 0; i < 500; i++) {
      final length = random.nextInt(3000);
      final data = String.fromCharCodes(
        Iterable.generate(length, (_) => random.nextInt(0xD800)),
      );

      final level = QrErrorCorrectLevel
          .values[random.nextInt(QrErrorCorrectLevel.values.length)];

      try {
        final qr = QrCode(
          payload: QrPayload.fromString(data),
          errorCorrectLevel: level,
        );
        // Ensure we can at least generate the data cache without crashing
        check(getDataCache(qr)).isNotEmpty();

        // Also test random mask patterns
        final mask = random.nextInt(8);
        final image = QrImage.withMaskPattern(qr, mask);
        check(image.qrModules).isNotEmpty();
      } catch (e) {
        // We expect InputTooLongException for large data, but nothing else
        if (e is! InputTooLongException) {
          print('Failed with input string of length $length at iteration $i');
          rethrow;
        }
      }
    }
  });

  test('Fuzz QrCode.fromUint8List with random bytes', () {
    for (var i = 0; i < 500; i++) {
      final length = random.nextInt(3000);
      final data = Uint8List.fromList(
        List.generate(length, (_) => random.nextInt(256)),
      );

      final level = QrErrorCorrectLevel
          .values[random.nextInt(QrErrorCorrectLevel.values.length)];

      try {
        final qr = QrCode(
          payload: QrPayload.fromTypedData(data),
          errorCorrectLevel: level,
        );
        check(getDataCache(qr)).isNotEmpty();
      } catch (e) {
        if (e is! InputTooLongException) {
          print('Failed with input bytes of length $length at iteration $i');
          rethrow;
        }
      }
    }
  });

  test('Fuzz QrCode manual data addition', () {
    for (var i = 0; i < 200; i++) {
      final type = random.nextInt(40) + 1;
      final level = QrErrorCorrectLevel
          .values[random.nextInt(QrErrorCorrectLevel.values.length)];
      final payload = QrPayload();

      try {
        final numAdditions = random.nextInt(10);
        for (var j = 0; j < numAdditions; j++) {
          final choice = random.nextInt(5);
          switch (choice) {
            case 0:
              payload.addString(
                String.fromCharCodes(
                  List.generate(10, (_) => random.nextInt(128)),
                ),
              );
            case 1:
              payload.addNumeric(
                List.generate(10, (_) => random.nextInt(10)).join(),
              );
            case 2:
              payload.addAlphaNumeric(
                List.generate(
                  10,
                  (_) =>
                      r'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'[random
                          .nextInt(45)],
                ).join(),
              );
            case 3:
              payload.addTypedData(
                ByteData.view(
                  Uint8List.fromList(
                    List.generate(10, (_) => random.nextInt(256)),
                  ).buffer,
                ),
              );
            case 4:
              // ECI values are 0-999999
              payload.addECI(QrEciValue(random.nextInt(1000000)));
          }
        }
        final qr = QrCode(
          payload: payload,
          errorCorrectLevel: level,
          minTypeNumber: type,
        );
        check(getDataCache(qr)).isNotEmpty();
      } catch (e) {
        if (e is! InputTooLongException && e is! ArgumentError) {
          print('Failed during manual addition at iteration $i');
          rethrow;
        }
      }
    }
  });
}
