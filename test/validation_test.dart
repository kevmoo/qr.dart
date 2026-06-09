import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:test/scaffolding.dart';

void main() {
  test(
    'QrValidationResult.fromPayload returns valid result for simple input',
    () {
      final result = QrValidationResult.fromPayload(
        payload: QrPayload.fromString('Hello World'),
        typeNumber: 1,
        errorCorrectLevel: QrErrorCorrectLevel.medium,
      );

      check(result.isValid).isTrue();
      check(
        result.qrCode,
      ).isNotNull().has((q) => q.typeNumber, 'typeNumber').equals(1);
      check(result.qrCode)
          .isNotNull()
          .has((q) => q.errorCorrectLevel, 'errorCorrectLevel')
          .equals(QrErrorCorrectLevel.medium);
      check(result.validTypeNumbers).contains(1);
      check(
        result.validErrorCorrectLevels,
      ).contains(QrErrorCorrectLevel.medium);
    },
  );

  test('QrValidationResult.fromPayload identifies too-long input for type', () {
    // Type 1-H has very low capacity (enum index 2, capacity 9 bytes?)
    // Let's verify exactly.
    // Type 1-H capacity is 7 bytes for 8-bit mode?
    // Let's use a long string that definitely fits in Type 5 but not Type 1.
    final data = 'A' * 50;

    final result = QrValidationResult.fromPayload(
      payload: QrPayload.fromString(data),
      typeNumber: 1,
      errorCorrectLevel: QrErrorCorrectLevel.high,
    );

    check(result.isValid).isFalse();
    check(result.qrCode).isNull();

    // Type 1 should NOT be in valid types
    check(result.validTypeNumbers).not((it) => it.contains(1));

    // But some higher types SHOULD be valid
    check(result.validTypeNumbers).isNotEmpty();
    check(result.validTypeNumbers.last).equals(40);
  });

  test('QrValidationResult.fromPayload validates error levels', () {
    // 120 chars 'A' results in 675 bits (84.375 bytes) in Alphanumeric mode.
    // This fits in Type 5-L (108 bytes) and 5-M (86 bytes),
    // but not 5-Q (62 bytes) or 5-H (46 bytes).
    final data = 'A' * 120;

    final result = QrValidationResult.fromPayload(
      payload: QrPayload.fromString(data),
      typeNumber: 5,
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );

    check(result.isValid).isTrue();
    check(
      result.validErrorCorrectLevels,
    ).unorderedEquals([QrErrorCorrectLevel.low, QrErrorCorrectLevel.medium]);
  });
}
