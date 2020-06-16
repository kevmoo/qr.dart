import 'dart:typed_data';

import 'package:qr/src/error_correct_level.dart';
import 'package:qr/src/qr_code.dart';
import 'package:test/test.dart';

import 'qr_code_test_data.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        final qr = QrCode(typeNumber, quality)
          ..addData('shanna!')
          ..make();
        for (var i = 0; i < qrModules(qr).length; i++) {
          expect(
            _encodeBoolListToString(qrModules(qr)[i]),
            qrCodeTestData[typeNumber.toString()][quality.toString()][i],
          );
        }
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      final qr = QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality)
        ..make();
      for (var i = 0; i < qrModules(qr).length; i++) {
        expect(
          _encodeBoolListToString(qrModules(qr)[i]),
          qrCodeTestData['1'][quality.toString()][i],
        );
      }
    }
  });

  test('fromUint8List', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      final qr = QrCode.fromUint8List(
          data: Uint8List.fromList([115, 104, 97, 110, 110, 97, 33]),
          errorCorrectLevel: quality)
        ..make();
      for (var i = 0; i < qrModules(qr).length; i++) {
        expect(
          _encodeBoolListToString(qrModules(qr)[i]),
          qrCodeTestData['1'][quality.toString()][i],
        );
      }
    }
  });
}

String _encodeBoolListToString(List<bool> source) =>
    source.map((e) => e ? '1' : '0').join();
