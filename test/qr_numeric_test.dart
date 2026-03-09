import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('all digits 1 through 0', () {
    final qr = QrNumeric.fromString('1234567890');
    expect(qr.mode, QrMode.numeric);
    expect(qr.length, 10);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer, hasLength(34));
    expect(
      buffer.toString(),
      '0001111011'
      '0111001000'
      '1100010101'
      '0000',
    );
  });

  test('single numeric', () {
    final qr = QrNumeric.fromString('5');
    expect(qr.mode, QrMode.numeric);
    expect(qr.length, 1);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer, hasLength(4));
    expect(buffer.toString(), '0101');
  });

  test('double numeric', () {
    final qr = QrNumeric.fromString('37');
    expect(qr.mode, QrMode.numeric);
    expect(qr.length, 2);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer, hasLength(7), reason: 'n*3+1 = 7');
    expect(buffer.toString(), '0100101');
  });

  test('triple (even) numeric', () {
    final qr = QrNumeric.fromString('371');
    expect(qr.mode, QrMode.numeric);
    expect(qr.length, 3);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer, hasLength(10), reason: 'n*3+1 = 10');
    expect(buffer.toString(), '0101110011');
  });

  test('throws on invalid input', () {
    expect(() => QrNumeric.fromString('hello'), throwsArgumentError);
  });
}
