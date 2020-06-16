import 'dart:convert';
import 'dart:typed_data';

import 'bit_buffer.dart';
import 'mode.dart' as qr_mode;

class QrByte {
  final int mode = qr_mode.mode8bitByte;
  final Uint8List _data;

  factory QrByte(String input) =>
      QrByte.fromUint8List(utf8.encoder.convert(input));

  QrByte.fromUint8List(Uint8List input) : _data = input;

  factory QrByte.fromByteData(ByteData input) =>
      QrByte.fromUint8List(input.buffer.asUint8List());

  int get length => _data.length;

  void write(QrBitBuffer buffer) {
    for (final v in _data) {
      buffer.put(v, 8);
    }
  }
}
