class QrByte {
  final int mode = QrMode.MODE_8BIT_BYTE;
  final String _data;

  // TODO: uh...does this work with non-ascii? Hmm...
  QrByte(this._data);

  int get length() => _data.length;

  void write(QrBitBuffer buffer) {
    for(int i = 0; i < length; i++) {
      buffer.put(_data.charCodeAt(i), 8);
    }
  }
}
