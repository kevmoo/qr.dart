import 'dart:convert';
import 'dart:typed_data';

import 'bit_buffer.dart';
import 'mode.dart' as qr_mode;

class QrByte {
  final int mode = qr_mode.mode8bitByte;
  final List<int> _data;

  factory QrByte(String input) {
    final charUnits = utf8.encode(input);

    return QrByte._internal(charUnits);
  }

  factory QrByte.fromUint8List(Uint8List input) =>
    QrByte._internal(input.toList());

  factory QrByte.fromByteData(ByteData input) =>
      QrByte._internal(input.buffer.asUint8List().toList());

  QrByte._internal(this._data);

  int get length => _data.length;

  void write(QrBitBuffer buffer) {
    for (final v in _data) {
      buffer.put(v, 8);
    }
  }
}
