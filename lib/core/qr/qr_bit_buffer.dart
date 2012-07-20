class QrBitBuffer extends ListBase<bool> {
  final List<bool> _buffer;

  QrBitBuffer() : _buffer = new List<bool>();

  bool operator[](int index) {
    return _buffer[index];
  }

  int get length() => _buffer.length;

  void put(int number, int length) {
    for(var i = 0; i < length; i++) {
      final bit = ((number >> (length - i - 1)) & 1) == 1;
      putBit(bit);
    }
  }

  void putBit(bool bit) {
    _buffer.add(bit);
  }
}
