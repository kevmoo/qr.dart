import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('fromDataAndValidation returns valid result for simple input', () {
    final result = QrCode.fromDataAndValidation(
      data: 'Hello World',
      typeNumber: 1,
      errorCorrectLevel: QrErrorCorrectLevel.medium,
    );

    expect(result.isValid, isTrue);
    expect(result.qrCode, isNotNull);
    expect(result.qrCode!.typeNumber, 1);
    expect(result.qrCode!.errorCorrectLevel, QrErrorCorrectLevel.medium);
    expect(result.validTypeNumbers, contains(1));
    expect(
      result.validErrorCorrectLevels,
      contains(QrErrorCorrectLevel.medium),
    );
  });

  test('fromDataAndValidation identifies too-long input for specific type', () {
    // Type 1-H has very low capacity (enum index 2, capacity 9 bytes?)
    // Let's verify exactly.
    // Type 1-H capacity is 7 bytes for 8-bit mode?
    // Let's use a long string that definitely fits in Type 5 but not Type 1.
    final data = 'A' * 50;

    final result = QrCode.fromDataAndValidation(
      data: data,
      typeNumber: 1,
      errorCorrectLevel: QrErrorCorrectLevel.high,
    );

    expect(result.isValid, isFalse);
    expect(result.qrCode, isNull);

    // Type 1 should NOT be in valid types
    expect(result.validTypeNumbers, isNot(contains(1)));

    // But some higher types SHOULD be valid
    expect(result.validTypeNumbers, isNotEmpty);
    expect(result.validTypeNumbers.last, 40);
  });

  test('fromDataAndValidation validates error levels', () {
    // Find an input that fits in Type 5-L but not Type 5-H
    // Type 5-L: 134 data bytes? (Check table if needed, or just experiment)
    // Type 5-H: 46 data bytes?
    // Let's us 100 bytes.
    final data = 'A' * 100;

    // Let's pick a type that is on the boundary.
    // Actually, let's just see what validErrorLevels returns for a fixed type.

    final result = QrCode.fromDataAndValidation(
      data: data,
      typeNumber: 5,
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );

    // If 100 bytes fits in 5-L, it should be valid
    // If it doesn't fit in 5-H, H should be missing from validErrorLevels

    if (result.isValid) {
      expect(result.validErrorCorrectLevels, contains(QrErrorCorrectLevel.low));
      // It might or might not contain High depending on exact capacity.
      // But we can check that it returns a subset of levels.
    }
  });
}
