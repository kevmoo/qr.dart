// ignore_for_file: avoid_dynamic_calls

import 'dart:typed_data';

import 'package:qr/src/error_correct_level.dart';
import 'package:qr/src/qr_code.dart';
import 'package:qr/src/qr_image.dart';
import 'package:test/test.dart';

import 'qr_code_test_data.dart';
import 'qr_code_test_data_with_mask.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        final qr = QrImage(QrCode(typeNumber, quality)..addData('shanna!'));
        final modules = qr.qrModules;
        for (var i = 0; i < modules.length; i++) {
          expect(
            _encodeBoolListToString(modules[i]),
            qrCodeTestData[typeNumber.toString()][quality.toString()][i],
          );
        }
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      final qr =
          QrImage(QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality));
      final modules = qr.qrModules;
      for (var i = 0; i < modules.length; i++) {
        expect(
          _encodeBoolListToString(modules[i]),
          qrCodeTestData['1'][quality.toString()][i],
        );
      }
    }
  });

  test('fromUint8List', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      final qr = QrImage(
        QrCode.fromUint8List(
          data: Uint8List.fromList([115, 104, 97, 110, 110, 97, 33]),
          errorCorrectLevel: quality,
        ),
      );
      final modules = qr.qrModules;
      for (var i = 0; i < modules.length; i++) {
        expect(
          _encodeBoolListToString(modules[i]),
          qrCodeTestData['1'][quality.toString()][i],
        );
      }
    }
  });

  test('WHEN mask pattern is provided, SHOULD make a masked QR Code', () {
    for (var mask = 0; mask <= 7; mask++) {
      final qr = QrImage.withMaskPattern(
        QrCode(1, QrErrorCorrectLevel.L)..addData('shanna!'),
        mask,
      );
      final modules = qr.qrModules;
      for (var i = 0; i < modules.length; i++) {
        expect(
          _encodeBoolListToString(modules[i]),
          qrCodeTestDataWithMask[mask.toString()][i],
        );
      }
    }
  });

  test('''
      WHEN provided mask pattern is smaller than 0,
      SHOULD throw an AssertionError
  ''', () {
    expect(
      () {
        QrImage.withMaskPattern(
          QrCode(1, QrErrorCorrectLevel.L)..addData('shanna!'),
          -1,
        );
      },
      throwsA(isA<AssertionError>()),
    );
  });

  test('''
      WHEN provided mask pattern is bigger than 7,
      SHOULD throw an AssertionError
  ''', () {
    expect(
      () {
        QrImage.withMaskPattern(
          QrCode(1, QrErrorCorrectLevel.L)..addData('shanna!'),
          8,
        );
      },
      throwsA(isA<AssertionError>()),
    );
  });
}

String _encodeBoolListToString(List<bool?> source) =>
    source.cast<bool>().map((e) => e ? '1' : '0').join();
