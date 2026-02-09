// ignore_for_file: lines_longer_than_80_chars

import 'package:qr/qr.dart';
import 'package:qr/src/mode.dart' as qr_mode;
import 'package:test/test.dart';

void main() {
  group('QrEci', () {
    test('validates value range', () {
      expect(() => QrEci(-1), throwsArgumentError);
      expect(() => QrEci(1000000), throwsArgumentError);
      expect(QrEci(0).value, 0);
      expect(QrEci(999999).value, 999999);
    });

    test('constants', () {
      expect(QrEciValue.iso8859_1, 3);
      expect(QrEciValue.iso8859_2, 4);
      expect(QrEciValue.iso8859_3, 5);
      expect(QrEciValue.iso8859_4, 6);
      expect(QrEciValue.iso8859_5, 7);
      expect(QrEciValue.iso8859_6, 8);
      expect(QrEciValue.iso8859_7, 9);
      expect(QrEciValue.iso8859_8, 10);
      expect(QrEciValue.iso8859_9, 11);
      expect(QrEciValue.iso8859_10, 12);
      expect(QrEciValue.iso8859_11, 13);
      expect(QrEciValue.iso8859_13, 15);
      expect(QrEciValue.iso8859_14, 16);
      expect(QrEciValue.iso8859_15, 17);
      expect(QrEciValue.iso8859_16, 18);
      expect(QrEciValue.shiftJis, 20);
      expect(QrEciValue.windows1250, 21);
      expect(QrEciValue.windows1251, 22);
      expect(QrEciValue.windows1252, 23);
      expect(QrEciValue.windows1256, 24);
      expect(QrEciValue.utf16BE, 25);
      expect(QrEciValue.utf8, 26);
      expect(QrEciValue.ascii, 27);
      expect(QrEciValue.big5, 28);
      expect(QrEciValue.gb2312, 29);
      expect(QrEciValue.eucKr, 30);
      expect(QrEciValue.gbk, 31);
    });

    test('properties', () {
      final eci = QrEci(123);
      expect(eci.mode, qr_mode.QrMode.eci);
      expect(eci.length, 0);
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
    final code = QrCode(1, QrErrorCorrectLevel.low)..addData('🙃');

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
    expect(code.dataCache.sublist(0, 19), expectedData);

    final image = QrImage(code);
    expect(image.moduleCount, 21); // Version 1 is 21x21
    expect(_getModules(image), _expectedEmojiModules);
  });
}

void _testEci(int value, List<int> expectedBytes) {
  final buffer = QrBitBuffer();
  QrEci(value).write(buffer);

  expect(buffer, hasLength(expectedBytes.length * 8));
  for (var i = 0; i < expectedBytes.length; i++) {
    expect(buffer.getByte(i), expectedBytes[i], reason: 'Byte $i mismatch');
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
