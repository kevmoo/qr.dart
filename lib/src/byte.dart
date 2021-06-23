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

/// Encodes numbers (0-9) 10 bits per 3 digits.
class QrNumeric implements QrByte {
  factory QrNumeric.fromString(String numberString) {
    final newList = Uint8List(numberString.length);
    var count = 0;
    for (var char in numberString.codeUnits) {
      if (char < 0x30 || char > 0x39) {
        throw ArgumentError('string can only contain alpha numeric 0-9');
      }
      newList[count++] = char - 0x30;
    }
    return QrNumeric._(newList);
  }

  QrNumeric._(this._data);

  @override
  final Uint8List _data;

  @override
  final int mode = qr_mode.modeNumber;

  @override
  void write(QrBitBuffer buffer) {
    // Walk through the list of number; attempting to encode up to 3 at a time.
    // Write (N *3 + 1) bits.
    final leftOver = _data.length % 3;

    final efficientGrab = _data.length - leftOver;
    for (var i = 0; i < efficientGrab; i += 3) {
      final encoded = _data[i] * 100 + _data[i + 1] * 10 + _data[i + 2];
      buffer.put(encoded, 10);
    }
    if (leftOver > 1) {
      // 2 bytes
      buffer.put(_data[_data.length - 2] * 10 + _data[_data.length - 1], 7);
    } else if (leftOver > 0) {
      // 1 byte
      buffer.put(_data.last, 4);
    }
  }

  // This is still the *number of characters to encode*, not encoded length.
  @override
  int get length => _data.length;
}
