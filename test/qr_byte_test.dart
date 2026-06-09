import 'dart:typed_data';

import 'package:checks/checks.dart';
import 'package:qr/src/bit_buffer.dart';
import 'package:qr/src/byte.dart';
import 'package:test/scaffolding.dart';

void main() {
  test('fromByteData', () {
    final data = ByteData(256);
    for (var i = 0; i < 256; i++) {
      data.setUint8(i, i);
    }
    final qr = QrByte.fromByteData(data);
    check(qr.length).equals(256);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    for (var i = 0; i < 256; i++) {
      check(buffer.getByte(i)).equals(i);
    }
  });
}
