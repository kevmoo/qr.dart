import 'package:qr/src/byte.dart';
import 'package:qr/src/eci.dart';
import 'package:test/test.dart';

void main() {
  group('QrDatum.toDatums', () {
    test('Numeric', () {
      final datums = QrDatum.toDatums('123456');
      expect(datums, hasLength(1));
      expect(datums.first, isA<QrNumeric>());
    });

    test('AlphaNumeric', () {
      final datums = QrDatum.toDatums('HELLO WORLD');
      expect(datums, hasLength(1));
      expect(datums.first, isA<QrAlphaNumeric>());
    });

    test('Byte (Latin-1)', () {
      final datums = QrDatum.toDatums('Hello World!');
      expect(datums, hasLength(1));
      expect(datums.first, isA<QrByte>());
    });

    test('Byte (UTF-8 with ECI)', () {
      final datums = QrDatum.toDatums('Hello 🌍');
      expect(datums, hasLength(2));
      expect(datums[0], isA<QrEci>());
      expect((datums[0] as QrEci).value, 26);
      expect(datums[1], isA<QrByte>());
    });

    test('Complex Emoji (UTF-8 with ECI)', () {
      // Woman + Medium Skin Tone + ZWJ + Heart + VS16 + ZWJ + Kiss Mark + ZWJ
      // + Man + Dark Brown Skin Tone
      const complexEmoji =
          '\u{1F469}\u{1F3FD}\u{200D}\u{2764}\u{FE0F}\u{200D}'
          '\u{1F48B}\u{200D}\u{1F468}\u{1F3FE}';
      final datums = QrDatum.toDatums(complexEmoji);
      expect(datums, hasLength(2));
      expect(datums[0], isA<QrEci>());
      expect((datums[0] as QrEci).value, 26);
      expect(datums[1], isA<QrByte>());
    });
  });
}
