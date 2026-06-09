// ignore_for_file: avoid_dynamic_calls

import 'dart:typed_data';

import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:qr/src/mode.dart';
import 'package:qr/src/payload.dart';
import 'package:test/scaffolding.dart';

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
        check(modules.map(_encodeBoolListToString)).deepEquals(
          qrCodeTestData[typeNumber.toString()][quality.index.toString()]
              as List,
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
      check(
        modules.map(_encodeBoolListToString),
      ).deepEquals(qrCodeTestData['1'][quality.index.toString()] as List);
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
      check(
        modules.map(_encodeBoolListToString),
      ).deepEquals(qrCodeTestData['1'][quality.index.toString()] as List);
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
      check(
        modules.map(_encodeBoolListToString),
      ).deepEquals(qrCodeTestDataWithMask[mask.toString()] as List);
    }
  });

  test('WHEN provided mask pattern is smaller than 0, '
      'SHOULD throw an AssertionError', () {
    check(() {
      QrImage.withMaskPattern(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: QrErrorCorrectLevel.low,
        ),
        -1,
      );
    }).throws<AssertionError>();
  });

  test('WHEN provided mask pattern is bigger than 7, '
      'SHOULD throw an AssertionError', () {
    check(() {
      QrImage.withMaskPattern(
        QrCode(
          payload: QrPayload.fromString('shanna!'),
          errorCorrectLevel: QrErrorCorrectLevel.high,
        ),
        8,
      );
    }).throws<AssertionError>();
  });
  group('QrCode auto-sizing', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      // 9 numeric chars fit version 1 (H level).
      final qr = QrCode(
        payload: QrPayload.fromString('123456789'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      check(qr.typeNumber).equals(1);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      // 13 alphanumeric chars exceed version 1 (7 chars) but fit
      // version 2 (H level, 16 chars).
      final qr = QrCode(
        payload: QrPayload.fromString('HELLO WORLD A'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      check(qr.typeNumber).equals(2);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric chars', () {
      // Kanji characters are UTF-8 encoded.
      // '機械学習' (12 bytes) fits version 2 (H level, 16 bytes).
      final qr = QrCode(
        payload: QrPayload.fromString('機械学習'),
        errorCorrectLevel: QrErrorCorrectLevel.high,
      );
      check(qr.typeNumber).equals(2);
    });
  });

  group('QrPayload.fromData Automatic Mode Detection', () {
    // Numeric Mode
    test('should use Numeric Mode for numbers', () {
      final payload = QrPayload.fromString('123456789');
      check(payload.dataList.single.mode).equals(QrMode.numeric);
    });

    // Alphanumeric Mode
    test('should use Alphanumeric Mode', () {
      final payload = QrPayload.fromString('HELLO WORLD A');
      check(payload.dataList.single.mode).equals(QrMode.alphaNumeric);
    });

    // Byte Mode
    test('should use Byte Mode for non-alphanumeric characters', () {
      final payload = QrPayload.fromString('機械学習');
      check(payload.dataList.last.mode).equals(QrMode.byte);
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

      check(qrCode.typeNumber).equals(40);
    });

    test('throw InputTooLongException for data exceeding v40 capacity', () {
      // Data size (2954 bytes) exceeds v40 capacity (2953 bytes).
      final excessivelyLargeData = '|' * 2954;

      check(
            () => QrCode(
              payload: QrPayload.fromString(excessivelyLargeData),
              errorCorrectLevel: QrErrorCorrectLevel.low,
            ),
          )
          .throws<InputTooLongException>()
          .has((e) => e.toString(), 'toString()')
          .equals('Input too long. 23652 > 23648');
    });
  });
}

String _encodeBoolListToString(List<bool?> source) =>
    source.cast<bool>().map((e) => e ? '1' : '0').join();
