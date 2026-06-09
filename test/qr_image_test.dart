import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:test/scaffolding.dart';

void main() {
  late QrImage qrImage;
  late int moduleCount;

  setUpAll(() {
    final qrCode = QrCode(
      payload: QrPayload.fromString('test'),
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );
    qrImage = QrImage(qrCode);
    moduleCount = qrImage.moduleCount;
  });

  test('should throw RangeError when row is less than 0', () {
    check(() => qrImage.isDark(-1, 0)).throws<RangeError>();
  });

  test('should throw RangeError when row is greater than '
      'or equal to moduleCount', () {
    check(() => qrImage.isDark(moduleCount, 0)).throws<RangeError>();
  });

  test('should throw RangeError when col is less than 0', () {
    check(() => qrImage.isDark(0, -1)).throws<RangeError>();
  });

  test('should throw RangeError when col is greater than '
      'or equal to moduleCount', () {
    check(() => qrImage.isDark(0, moduleCount)).throws<RangeError>();
  });

  test('should not throw when row and col are within valid range', () {
    check(() => qrImage.isDark(0, 0)).returnsNormally();
    check(
      () => qrImage.isDark(moduleCount - 1, moduleCount - 1),
    ).returnsNormally();
  });
}
