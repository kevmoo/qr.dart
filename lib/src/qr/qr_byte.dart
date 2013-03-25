part of bot_qr;

class QrByte {
  final int mode = QrMode.MODE_8BIT_BYTE;
  final List<int> _data;

  factory QrByte(String input) {
    requireArgumentNotNull(input, 'input');
    final charUnits = input.codeUnits;
    for(final v in charUnits) {
      requireArgument(v < 255, 'ascii-only');
    }
    return new QrByte._internal(charUnits);
  }

  QrByte._internal(this._data);

  int get length => _data.length;

  void write(QrBitBuffer buffer) {
    for(final int v in _data) {
      buffer.put(v, 8);
    }
  }
}
