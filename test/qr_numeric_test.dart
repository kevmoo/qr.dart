import 'package:checks/checks.dart';
import 'package:qr/src/bit_buffer.dart';
import 'package:qr/src/byte.dart';
import 'package:qr/src/mode.dart';
import 'package:test/scaffolding.dart';

void main() {
  test('all digits 1 through 0', () {
    final qr = QrNumeric.fromString('1234567890');
    check(qr.mode).equals(QrMode.numeric);
    check(qr.length).equals(10);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(buffer.length).equals(34);
    check(buffer.toString()).equals(
      '0001111011'
      '0111001000'
      '1100010101'
      '0000',
    );
  });

  test('single numeric', () {
    final qr = QrNumeric.fromString('5');
    check(qr.mode).equals(QrMode.numeric);
    check(qr.length).equals(1);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(buffer.length).equals(4);
    check(buffer.toString()).equals('0101');
  });

  test('double numeric', () {
    final qr = QrNumeric.fromString('37');
    check(qr.mode).equals(QrMode.numeric);
    check(qr.length).equals(2);
    check(qr.bitLength).equals(7);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(because: 'n*3+1 = 7', buffer.length).equals(7);
    check(buffer.toString()).equals('0100101');
  });

  test('triple (even) numeric', () {
    final qr = QrNumeric.fromString('371');
    check(qr.mode).equals(QrMode.numeric);
    check(qr.length).equals(3);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(because: 'n*3+1 = 10', buffer.length).equals(10);
    check(buffer.toString()).equals('0101110011');
  });

  test('throws on invalid input', () {
    check(() => QrNumeric.fromString('hello')).throws<ArgumentError>();
  });
}
