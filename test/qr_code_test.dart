import 'dart:convert';
import 'dart:io';

import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  var data = jsonDecode(File('test/qr_code_test.json').readAsStringSync());

  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        var qr = QrCode(typeNumber, quality)
          ..addData('shanna!')
          ..make();
        for (var i = 0; i < qr.modules.length; i++) {
          expect(encodeBoolListToString(qr.modules[i]),
              data[typeNumber.toString()][quality.toString()][i]);
        }
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      var qr = QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality)
        ..make();
      for (var i = 0; i < qr.modules.length; i++) {
        expect(encodeBoolListToString(qr.modules[i]),
            data[1.toString()][quality.toString()][i]);
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
