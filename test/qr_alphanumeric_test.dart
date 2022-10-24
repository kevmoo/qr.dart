import 'package:qr/qr.dart';
import 'package:qr/src/byte.dart';
import 'package:test/test.dart';

void main() {
  test('full character map', () {
    final qr = QrAlphaNumeric.fromString(
      r'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:',
    );
    expect(qr.mode, 2);
    expect(qr.length, 45);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 248);
    expect(
        buffer.map<String>((e) => e ? '1' : '0').join(),
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
        '101100');
  });

  test('single alphanumeric', () {
    final qr = QrAlphaNumeric.fromString(r'$');
    expect(qr.mode, 2);
    expect(qr.length, 1);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 6);
    expect(buffer.map<String>((e) => e ? '1' : '0').join(), '100101');
  });

  test('double (even) alphanumeric', () {
    final qr = QrAlphaNumeric.fromString('3Z');
    expect(qr.mode, 2);
    expect(qr.length, 2);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 11, reason: 'n*5+1 = 11');
    expect(
      buffer.getRange(0, 11).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      170,
    );
  });

  test('throws on invalid input', () {
    for (var character in 'abcdefghijklmnopqrstuvwxyz'.split('')) {
      expect(
        () => QrAlphaNumeric.fromString(character),
        throwsArgumentError,
        reason: 'lower case $character is invalid',
      );
    }

    for (var character in '!@#^&()_=[]{}\'";?<>,|~`'.split('')) {
      expect(
        () => QrAlphaNumeric.fromString(character),
        throwsArgumentError,
        reason: 'special character $character is invalid',
      );
    }
  });
}
