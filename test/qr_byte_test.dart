import 'dart:typed_data';

import 'package:qr/qr.dart';
import 'package:qr/src/byte.dart';
import 'package:test/test.dart';

void main() {
  test('fromByteData', () {
    final data = ByteData(256);
    for (var i = 0; i < 256; i++) {
      data.setUint8(i, i);
    }
    final qr = QrByte.fromByteData(data);
    expect(qr.length, 256);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    for (var i = 0; i < 256; i++) {
      expect(buffer.getByte(i), equals(i));
    }
  });
}
