import 'package:characters/characters.dart';
import 'package:checks/checks.dart';
import 'package:qr/src/bit_buffer.dart';
import 'package:qr/src/byte.dart';
import 'package:qr/src/mode.dart';
import 'package:test/scaffolding.dart';

void main() {
  test('full character map', () {
    final qr = QrAlphaNumeric.fromString(
      r'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:',
    );
    check(qr.mode).equals(QrMode.alphaNumeric);
    check(qr.length).equals(45);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(buffer.length).equals(248);
    check(buffer.toString()).equals(
      '00000000001'
      '00001011101'
      '00010111001'
      '00100010101'
      '00101110001'
      '00111001101'
      '01000101001'
      '01010000101'
      '01011100001'
      '01100111101'
      '01110011001'
      '01111110101'
      '10001010001'
      '10010101101'
      '10100001001'
      '10101100101'
      '10111000001'
      '11000011101'
      '11001111001'
      '11011010101'
      '11100110001'
      '11110001101'
      '101100',
    );
  });

  test('single alphanumeric', () {
    final qr = QrAlphaNumeric.fromString(r'$');
    check(qr.mode).equals(QrMode.alphaNumeric);
    check(qr.length).equals(1);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(buffer.length).equals(6);
    check(buffer.toString()).equals('100101');
  });

  test('triple alphanumeric', () {
    final qr = QrAlphaNumeric.fromString('ABC');
    check(qr.mode).equals(QrMode.alphaNumeric);
    check(qr.length).equals(3);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(because: '(1*11) + 6 = 17', buffer.length).equals(17);
    check(buffer.toString()).equals(
      '00111001101' // 461
      '001100', // 12
    );
  });

  test('double (even) alphanumeric', () {
    final qr = QrAlphaNumeric.fromString('3Z');
    check(qr.mode).equals(QrMode.alphaNumeric);
    check(qr.length).equals(2);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    check(because: 'n*5+1 = 11', buffer.length).equals(11);
    check(buffer.toString()).equals('00010101010');
  });

  test('throws on invalid input', () {
    _checkInvalid('abcdefghijklmnopqrstuvwxyz', 'lower case');
    _checkInvalid('!@#^&()_=[]{}\'";?<>,|~`', 'special character');
  });
}

void _checkInvalid(String input, String description) {
  for (final character in input.characters) {
    check(
      because: '$description $character is invalid',
      () => QrAlphaNumeric.fromString(character),
    ).throws<ArgumentError>();
  }
}
