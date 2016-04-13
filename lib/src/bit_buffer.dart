import 'dart:collection';

class QrBitBuffer extends Object with ListMixin<bool> {
  final List<int> _buffer;
  int _length = 0;

  QrBitBuffer() : _buffer = new List<int>();

  @override
  void operator []=(int index, bool value) =>
      throw new UnsupportedError('cannot change');

  @override
  bool operator [](int index) {
    final bufIndex = index ~/ 8;
    return ((_buffer[bufIndex] >> (7 - index % 8)) & 1) == 1;
  }

  @override
  int get length => _length;

  @override
  set length(int value) => throw new UnsupportedError('Cannot change');

  int getByte(int index) => _buffer[index];

  void put(int number, int length) {
    for (var i = 0; i < length; i++) {
      final bit = ((number >> (length - i - 1)) & 1) == 1;
      putBit(bit);
    }
  }

  void putBit(bool bit) {
    var bufIndex = _length ~/ 8;
    if (_buffer.length <= bufIndex) {
      _buffer.add(0);
    }

    if (bit) {
      _buffer[bufIndex] |= (0x80 >> (_length % 8));
    }

    _length++;
  }
}
