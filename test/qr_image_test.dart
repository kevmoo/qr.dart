import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  group('QrImage', () {
    late QrImage qrImage;
    const typeNumber = 1;
    final qrCode = QrCode(typeNumber, QrErrorCorrectLevel.low)..addData('test');
    qrImage = QrImage(qrCode);
    final moduleCount = qrImage.moduleCount;

    group('isDark', () {
      test('should throw RangeError when row is less than 0', () {
        expect(() => qrImage.isDark(-1, 0), throwsRangeError);
      });

      test('should throw RangeError when row is greater than or equal to moduleCount', () {
        expect(() => qrImage.isDark(moduleCount, 0), throwsRangeError);
      });

      test('should throw RangeError when col is less than 0', () {
        expect(() => qrImage.isDark(0, -1), throwsRangeError);
      });

      test('should throw RangeError when col is greater than or equal to moduleCount', () {
        expect(() => qrImage.isDark(0, moduleCount), throwsRangeError);
      });

      test('should not throw when row and col are within valid range', () {
        expect(() => qrImage.isDark(0, 0), returnsNormally);
        expect(() => qrImage.isDark(moduleCount - 1, moduleCount - 1), returnsNormally);
      });
    });
  });
}
