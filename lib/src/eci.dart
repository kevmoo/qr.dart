import 'bit_buffer.dart';
import 'byte.dart';

import 'mode.dart' as qr_mode;

/// Extended Channel Interpretation (ECI) mode data.
///
/// Use this to specify a different character encoding for the following data.
class QrEci implements QrDatum {
  final int value;

  factory QrEci(int value) {
    if (value < 0 || value > 999999) {
      throw ArgumentError('ECI value must be between 0 and 999999');
    }
    return QrEci._(value);
  }

  QrEci._(this.value);

  @override
  int get mode => qr_mode.modeEci;

  @override
  int get length => 0; // ECI segments do not have a length field

  @override
  void write(QrBitBuffer buffer) {
    if (value < 128) {
      // 0xxxxxxx
      buffer.put(value, 8);
    } else if (value < 16384) {
      // 10xxxxxx xxxxxxxx
      buffer.put(0x8000 | value, 16);
    } else {
      // 110xxxxx xxxxxxxx xxxxxxxx
      buffer.put(0xC00000 | value, 24);
    }
  }
}
