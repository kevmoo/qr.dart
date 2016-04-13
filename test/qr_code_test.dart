import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('simple', () {
    for (int typeNumber = 1; typeNumber <= 10; typeNumber++) {
      for (var quality in QrErrorCorrectLevel.levels) {
        var code = new QrCode(typeNumber, quality);
        code.addData("shanna!");
        code.make();
      }
    }
  });
}
