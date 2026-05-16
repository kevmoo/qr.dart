// ignore_for_file: avoid_dynamic_calls

import 'dart:typed_data';

import 'package:qr/qr.dart';
import 'package:qr/src/mode.dart';
import 'package:qr/src/payload.dart';
import 'package:test/test.dart';

import 'qr_code_test_data.dart';
import 'qr_code_test_data_with_mask.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.values) {
        final qr = QrImage(
          QrCode(
            payload: QrPayload.fromString('shanna!'),
            errorCorrectLevel: quality,
            minTypeNumber: typeNumber,
          ),
        );
        final modules = qr.qrModules;
        expect(
          modules.map(_encodeBoolListToString),
          qrCodeTestData[typeNumber.toString()][quality.index.toString()],
        );
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.values) {
      final qr = QrImage(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: quality,
        ),
      );
      final modules = qr.qrModules;
      expect(
        modules.map(_encodeBoolListToString),
        qrCodeTestData['1'][quality.index.toString()],
      );
    }
  });

  test('fromTypedData', () {
    for (var quality in QrErrorCorrectLevel.values) {
      final qr = QrImage(
        QrCode(
          payload: QrPayload.fromTypedData(
            Uint8List.fromList([115, 104, 97, 110, 110, 97, 33]),
          ),
          errorCorrectLevel: quality,
        ),
      );
      final modules = qr.qrModules;
      expect(
        modules.map(_encodeBoolListToString),
        qrCodeTestData['1'][quality.index.toString()],
      );
    }
  });

  test('WHEN mask pattern is provided, SHOULD make a masked QR Code', () {
    for (var mask = 0; mask <= 7; mask++) {
      final qr = QrImage.withMaskPattern(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: QrErrorCorrectLevel.low,
        ),
        mask,
      );
      final modules = qr.qrModules;
      expect(
        modules.map(_encodeBoolListToString),
        qrCodeTestDataWithMask[mask.toString()],
      );
    }
  });

  test('WHEN provided mask pattern is smaller than 0, '
      'SHOULD throw an AssertionError', () {
    expect(() {
      QrImage.withMaskPattern(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: QrErrorCorrectLevel.low,
        ),
        -1,
      );
    }, throwsA(isA<AssertionError>()));
  });

  test('WHEN provided mask pattern is bigger than 7, '
      'SHOULD throw an AssertionError', () {
    expect(() {
      QrImage.withMaskPattern(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: QrErrorCorrectLevel.high,
        ),
        8,
      );
    }, throwsA(isA<AssertionError>()));
  });
  group('QrCode auto-sizing', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      // 9 numeric chars fit version 1 (H level).
      final qr = QrCode(
        payload: QrPayload.fromString('123456789'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 1);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      // 13 alphanumeric chars exceed version 1 (7 chars) but fit
      // version 2 (H level, 16 chars).
      final qr = QrCode(
        payload: QrPayload.fromString('HELLO WORLD A'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 2);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric chars', () {
      // Kanji characters are UTF-8 encoded.
      // '機械学習' (12 bytes) fits version 2 (H level, 16 bytes).
      final qr = QrCode(
        payload: QrPayload.fromString('機械学習'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 2);
    });
  });

  group('QrPayload.fromData Automatic Mode Detection', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      final payload = QrPayload.fromString('123456789');
      expect(payload.dataList.single.mode, QrMode.numeric);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      final payload = QrPayload.fromString('HELLO WORLD A');
      expect(payload.dataList.single.mode, QrMode.alphaNumeric);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric characters', () {
      final payload = QrPayload.fromString('機械学習');
      expect(payload.dataList.last.mode, QrMode.byte);
    });
  });

  group('Version 40 Boundary Handling', () {
    test('generate v40 for data exceeding v39 capacity', () {
      // 2952 bytes exceeds v39 (L) capacity of 2951.
      final largeData = '|' * 2952;

      final qrCode = QrCode(
        payload: QrPayload.fromString(largeData),
        errorCorrectLevel: QrErrorCorrectLevel.low,
      );

      expect(qrCode.typeNumber, 40);
    });

    test('throw InputTooLongException for data exceeding v40 capacity', () {
      // Data size (2954 bytes) exceeds v40 capacity (2953 bytes).
      final excessivelyLargeData = '|' * 2954;

      expect(
        () => QrCode(
          payload: QrPayload.fromString(excessivelyLargeData),
          errorCorrectLevel: QrErrorCorrectLevel.low,
        ),
        throwsA(
          isA<InputTooLongException>().having(
            (e) => e.toString(),
            'toString()',
            'QrInputTooLongException: Input too long. 23652 > 23648',
          ),
        ),
      );
    });
  });
}

String _encodeBoolListToString(List<bool?> source) =>
    source.cast<bool>().map((e) => e ? '1' : '0').join();
