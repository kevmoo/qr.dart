import 'dart:convert';

import 'bit_buffer.dart';
import 'mode.dart' as qr_mode;

class QrByte {
  final int mode = qr_mode.mode8bitByte;
  final List<int> _data;

  factory QrByte(String input) {
    var charUnits = utf8.encode(input);

    return QrByte._internal(charUnits);
  }

  QrByte._internal(this._data);

  int get length => _data.length;

  void write(QrBitBuffer buffer) {
    for (final v in _data) {
      buffer.put(v, 8);
    }
  }
}
