class QrBitBuffer extends ListBase<bool> {
  final List<int> _buffer;
  int _length = 0;

  QrBitBuffer() : _buffer = new List<int>();

  bool operator[](int index) {
    final bufIndex = index ~/ 8;
    return ((_buffer[bufIndex] >> (7 - index % 8)) & 1) == 1;
  }

  int get length() => _length;

  int getByte(int index) => _buffer[index];

  void put(int number, int length) {
    for(var i = 0; i < length; i++) {
      final bit = ((number >> (length - i - 1)) & 1) == 1;
      putBit(bit);
    }
  }

  void putBit(bool bit) {

    final bufIndex = _length ~/ 8;
    if (_buffer.length <= bufIndex) {
      _buffer.add(0);
    }

    if (bit) {
      _buffer[bufIndex] |= (0x80 >> (_length % 8));
    }

    _length++;
  }
}
