import 'package:qr/src/error_correct_level.dart';
import 'package:qr/src/qr_code.dart';
import 'package:test/test.dart';

import 'qr_code_test_data.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        var qr = QrCode(typeNumber, quality)
          ..addData('shanna!')
          ..make();
        for (var i = 0; i < qrModules(qr).length; i++) {
          expect(encodeBoolListToString(qrModules(qr)[i]),
              qrCodeTestData[typeNumber.toString()][quality.toString()][i]);
        }
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      var qr = QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality)
        ..make();
      for (var i = 0; i < qrModules(qr).length; i++) {
        expect(encodeBoolListToString(qrModules(qr)[i]),
            qrCodeTestData[1.toString()][quality.toString()][i]);
      }
    }
  });
}

String encodeBoolListToString(List<bool> l) {
  var r = '';
  for (var i = 0; i < l.length; i++) {
    r += l[i] ? '1' : '0';
  }
  return r;
}
