import 'dart:typed_data';

import 'package:checks/checks.dart';
import 'package:qr/src/byte.dart';
import 'package:qr/src/eci.dart';
import 'package:qr/src/mode.dart';
import 'package:test/scaffolding.dart';

void main() {
  group('QrDatum.toDatums', () {
    test('Numeric', () {
      final datums = QrDatum.toDatums('123456');
      check(datums).length.equals(1);
      check(datums.first).isA<QrNumeric>();
    });

    test('AlphaNumeric', () {
      final datums = QrDatum.toDatums('HELLO WORLD');
      check(datums).length.equals(1);
      check(datums.first).isA<QrAlphaNumeric>();
    });

    test('Byte (Latin-1)', () {
      final datums = QrDatum.toDatums('Hello World!');
      check(datums).length.equals(1);
      check(datums.first).isA<QrByte>();
    });

    test('Byte (UTF-8 with ECI)', () {
      final datums = QrDatum.toDatums('Hello 🌍');
      check(datums).length.equals(2);
      check(datums[0]).isA<QrEci>().has((e) => e.value, 'value').equals(26);
      check(datums[1]).isA<QrByte>();
    });

    test('Complex Emoji (UTF-8 with ECI)', () {
      // Woman + Medium Skin Tone + ZWJ + Heart + VS16 + ZWJ + Kiss Mark + ZWJ
      // + Man + Dark Brown Skin Tone
      const complexEmoji =
          '\u{1F469}\u{1F3FD}\u{200D}\u{2764}\u{FE0F}\u{200D}'
          '\u{1F48B}\u{200D}\u{1F468}\u{1F3FE}';
      final datums = QrDatum.toDatums(complexEmoji);
      check(datums).length.equals(2);
      check(datums[0]).isA<QrEci>().has((e) => e.value, 'value').equals(26);
      check(datums[1]).isA<QrByte>();
    });
  });

  group('QrMode getLengthBits', () {
    test('Kanji and ECI', () {
      check(QrMode.kanji.getLengthBits(1)).equals(8);
      check(QrMode.kanji.getLengthBits(10)).equals(10);
      check(QrMode.kanji.getLengthBits(27)).equals(12);
      check(QrMode.eci.getLengthBits(1)).equals(0);
      check(QrMode.eci.getLengthBits(10)).equals(0);
      check(QrMode.eci.getLengthBits(27)).equals(0);
    });
  });

  group('QrByte.fromByteData', () {
    test('respects TypedData sub-views', () {
      final fullList = Uint8List.fromList([1, 2, 3, 4, 5, 6, 7, 8]);
      final subView = Uint8List.sublistView(fullList, 2, 5); // [3, 4, 5]
      final qrByte = QrByte.fromByteData(subView);
      check(qrByte.length).equals(3);
    });
  });
}
