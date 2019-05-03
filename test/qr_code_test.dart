import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('simple', () {
    for (var typeNumber = 1; typeNumber <= 10; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        QrCode(typeNumber, quality)
          ..addData('shanna!')
          ..make();
      }
    }
  });

  test('fromData', () {
    for (var quality in QrErrorCorrectLevel.levels) {
      QrCode.fromData(data: 'shanna!', errorCorrectLevel: quality).make();
    }
  });
}
