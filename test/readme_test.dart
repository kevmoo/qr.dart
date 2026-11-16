// Backs the code blocks in README.md. Keep in sync with
// `dart run example@ update`.
import 'package:checks/checks.dart';
// #region import
import 'package:qr/qr.dart';
// #endregion import
import 'package:test/scaffolding.dart';

void main() {
  test('getting started + rendering', () {
    // #region getting-started
    final qrCode = QrCode(
      payload: QrPayload.fromString('Hello, world in QR form!'),
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );
    final qrImage = QrImage(qrCode);
    // #endregion getting-started

    var darkCount = 0;
    // #region render
    for (var x = 0; x < qrImage.moduleCount; x++) {
      for (var y = 0; y < qrImage.moduleCount; y++) {
        if (qrImage.isDark(y, x)) {
          // render a dark square on the canvas
          darkCount++; // #hide
        }
      }
    }
    // #endregion render
    check(darkCount).isGreaterThan(0);
  });

  test('ECI payload', () {
    // #region eci
    final payload = QrPayload()
      ..addECI(QrEciValue.utf8)
      ..addString('Hello, world in QR form!');

    final qrCode = QrCode(
      payload: payload,
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );
    // #endregion eci
    check(qrCode.errorCorrectLevel).equals(QrErrorCorrectLevel.low);
  });
}
