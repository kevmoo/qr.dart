// ignore_for_file: lines_longer_than_80_chars

import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:qr/src/bit_buffer.dart';
import 'package:qr/src/eci.dart';
import 'package:qr/src/mode.dart' as qr_mode;
import 'package:qr/src/qr_code.dart';
import 'package:test/scaffolding.dart';

void main() {
  group('QrEci', () {
    test('validates value range', () {
      check(() => QrEci(-1)).throws<RangeError>();
      check(() => QrEci(1000000)).throws<RangeError>();
      check(QrEci(0).value).equals(0);
      check(QrEci(999999).value).equals(999999);
    });

    test('constants', () {
      check<int>(QrEciValue.iso8859_1).equals(3);
      check<int>(QrEciValue.iso8859_2).equals(4);
      check<int>(QrEciValue.iso8859_3).equals(5);
      check<int>(QrEciValue.iso8859_4).equals(6);
      check<int>(QrEciValue.iso8859_5).equals(7);
      check<int>(QrEciValue.iso8859_6).equals(8);
      check<int>(QrEciValue.iso8859_7).equals(9);
      check<int>(QrEciValue.iso8859_8).equals(10);
      check<int>(QrEciValue.iso8859_9).equals(11);
      check<int>(QrEciValue.iso8859_10).equals(12);
      check<int>(QrEciValue.iso8859_11).equals(13);
      check<int>(QrEciValue.iso8859_13).equals(15);
      check<int>(QrEciValue.iso8859_14).equals(16);
      check<int>(QrEciValue.iso8859_15).equals(17);
      check<int>(QrEciValue.iso8859_16).equals(18);
      check<int>(QrEciValue.shiftJis).equals(20);
      check<int>(QrEciValue.windows1250).equals(21);
      check<int>(QrEciValue.windows1251).equals(22);
      check<int>(QrEciValue.windows1252).equals(23);
      check<int>(QrEciValue.windows1256).equals(24);
      check<int>(QrEciValue.utf16BE).equals(25);
      check<int>(QrEciValue.utf8).equals(26);
      check<int>(QrEciValue.ascii).equals(27);
      check<int>(QrEciValue.big5).equals(28);
      check<int>(QrEciValue.gb2312).equals(29);
      check<int>(QrEciValue.eucKr).equals(30);
      check<int>(QrEciValue.gbk).equals(31);
    });

    test('properties', () {
      final eci = QrEci(123);
      check(eci.mode).equals(qr_mode.QrMode.eci);
      check(eci.length).equals(0);
    });

    test('encodes 0-127 (8 bits)', () {
      _testEci(0, [0x00]); // 00000000
      _testEci(65, [0x41]); // 01000001
      _testEci(127, [0x7F]); // 01111111
    });

    test('encodes 128-16383 (16 bits)', () {
      // 128 -> 10 000000 10000000 -> 0x80 0x80
      _testEci(128, [0x80, 0x80]);
      // 16383 -> 10 111111 11111111 -> 0xBF 0xFF
      _testEci(16383, [0xBF, 0xFF]);
    });

    test('encodes 16384-999999 (24 bits)', () {
      // 16384 -> 110 00000 01000000 00000000 -> 0xC0 0x40 0x00
      _testEci(16384, [0xC0, 0x40, 0x00]);
      // 999999 -> 11110100001000111111 -> 0F 42 3F
      // 999999 = 0xF423F
      // 110 01111 01000010 00111111 -> 0xCF 0x42 0x3F
      _testEci(999999, [0xCF, 0x42, 0x3F]);
    });
  });

  test('validates emoji', () {
    final code = QrCode(
      payload: QrPayload.fromString('🙃'),
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );

    // Validate bitstream structure:
    // Header: Mode 7 (0111) + Value 26 (00011010) + Mode 4 (0100) + Length 4 (00000100)
    //         0111 0001 1010 0100 0000 0100 -> 0x71 0xA4 0x04
    // Data: F0 9F 99 83
    // Terminator: 0000
    // Padding to byte: 0000 (since 60 bits + 4 bits = 64 bits = 8 bytes)
    // Pad Bytes: 0xEC, 0x11... (to fill 19 bytes)
    final expectedData = [
      0x71, 0xA4, 0x04, // Header
      0xF0, 0x9F, 0x99, 0x83, // '🙃' in UTF-8
      0x00, // Terminator + Bit Padding to byte boundary
      // Padding Codewords (0xEC, 0x11 alternating) to fill 19 bytes capacity
      0xEC, 0x11, 0xEC, 0x11, 0xEC, 0x11, 0xEC, 0x11, 0xEC, 0x11, 0xEC,
    ];

    // Verify the full data cache (19 Data Codewords for Version 1-L)
    check(getDataCache(code).sublist(0, 19)).deepEquals(expectedData);

    final image = QrImage(code);
    check(image.moduleCount).equals(21); // Version 1 is 21x21
    check(_getModules(image)).deepEquals(_expectedEmojiModules);
  });
}

void _testEci(int value, List<int> expectedBytes) {
  final buffer = QrBitBuffer();
  QrEci(value).write(buffer);

  check(buffer.length).equals(expectedBytes.length * 8);
  for (var i = 0; i < expectedBytes.length; i++) {
    check(
      because: 'Byte $i mismatch',
      buffer.getByte(i),
    ).equals(expectedBytes[i]);
  }
}

List<bool> _getModules(QrImage image) {
  final modules = <bool>[];
  for (var i = 0; i < image.moduleCount; i++) {
    for (var j = 0; j < image.moduleCount; j++) {
      modules.add(image.isDark(i, j));
    }
  }
  return modules;
}

const _expectedEmojiModules = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true, // Row 0
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  true, // Row 1
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true, // Row 2
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true, // Row 3
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true, // Row 4
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  true, // Row 5
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true, // Row 6
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false, // Row 7
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false, // Row 8
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  false, // Row 9
  true,
  true,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false, // Row 10
  true,
  false,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false, // Row 11
  false,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  false, // Row 12
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false, // Row 13
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  false, // Row 14
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  true, // Row 15
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  true, // Row 16
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false, // Row 17
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  false, // Row 18
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  true, // Row 19
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false, // Row 20
];
