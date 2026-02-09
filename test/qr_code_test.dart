// ignore_for_file: avoid_dynamic_calls

import 'dart:typed_data';

import 'package:qr/qr.dart';
import 'package:test/test.dart';

import 'qr_code_test_data.dart';
import 'qr_code_test_data_with_mask.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.values) {
        final qr = QrImage(QrCode(typeNumber, quality)..addData('shanna!'));
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
        QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality),
      );
      final modules = qr.qrModules;
      expect(
        modules.map(_encodeBoolListToString),
        qrCodeTestData['1'][quality.index.toString()],
      );
    }
  });

  test('fromUint8List', () {
    for (var quality in QrErrorCorrectLevel.values) {
      final qr = QrImage(
        QrCode.fromUint8List(
          data: Uint8List.fromList([115, 104, 97, 110, 110, 97, 33]),
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
        QrCode(1, QrErrorCorrectLevel.low)..addData('shanna!'),
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
        QrCode(1, QrErrorCorrectLevel.low)..addData('shanna!'),
        -1,
      );
    }, throwsA(isA<AssertionError>()));
  });

  test('WHEN provided mask pattern is bigger than 7, '
      'SHOULD throw an AssertionError', () {
    expect(() {
      QrImage.withMaskPattern(
        QrCode(1, QrErrorCorrectLevel.high)..addData('shanna!'),
        8,
      );
    }, throwsA(isA<AssertionError>()));
  });
  group('QrCode.fromData Automatic Mode Detection', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      // 9 numeric chars fit version 1 (H level).
      final qr = QrCode.fromData(
        data: '123456789',
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 1);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      // 13 alphanumeric chars exceed version 1 (7 chars) but fit
      // version 2 (H level, 16 chars).
      final qr = QrCode.fromData(
        data: 'HELLO WORLD A',
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 2);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric chars', () {
      // Kanji characters are UTF-8 encoded.
      // '機械学習' (12 bytes) fits version 2 (H level, 16 bytes).
      final qr = QrCode.fromData(
        data: '機械学習',
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      expect(qr.typeNumber, 2);
    });
  });

  group('QrCode.addData Automatic Mode Detection', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      // 9 numeric characters fit version 1 (H level).
      final qr = QrCode(1, QrErrorCorrectLevel.low)..addData('123456789');
      expect(qr.typeNumber, 1);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      // 13 alphanumeric characters exceed version 1 (7 chars) but fit
      // version 2 (H level, 16 chars).
      final qr = QrCode(2, QrErrorCorrectLevel.high)..addData('HELLO WORLD A');
      expect(qr.typeNumber, 2);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric characters', () {
      // Kanji characters are UTF-8 encoded.
      // '機械学習' (12 bytes) fits version 2 (H level, 16 bytes).
      final qr = QrCode(2, QrErrorCorrectLevel.high)..addData('機械学習');
      expect(qr.typeNumber, 2);
    });
  });

  group('_calculateTypeNumberFromData - Version 40 Boundary Handling', () {
    test('generate v40 for data exceeding v39 capacity', () {
      // 2952 bytes exceeds v39 (L) capacity of 2951.
      final largeData = '|' * 2952;

      final qrCode = QrCode.fromData(
        data: largeData,
        errorCorrectLevel: QrErrorCorrectLevel.low,
      );

      expect(qrCode.typeNumber, 40);
    });

    test('throw InputTooLongException for data exceeding v40 capacity', () {
      // Data size (2954 bytes) exceeds v40 capacity (2953 bytes).
      final excessivelyLargeData = '|' * 2954;

      // An exception should be thrown for data exceeding the capacity
      expect(
        () => QrCode.fromData(
          data: excessivelyLargeData,
          errorCorrectLevel: QrErrorCorrectLevel.low,
        ),
        throwsA(isA<InputTooLongException>()),
      );
    });
  });

  group('QrCode.addData size checks', () {
    test('should throw if data exceeds capacity for fixed version', () {
      final code = QrCode(1, QrErrorCorrectLevel.low)..addData('|' * 30);

      expect(() => code.dataCache, throwsA(isA<InputTooLongException>()));
    });
  });
}

String _encodeBoolListToString(List<bool?> source) =>
    source.cast<bool>().map((e) => e ? '1' : '0').join();
