/// A growable sequence of bits.
///
/// Used internally to construct the data bit stream for a QR code.
class QrBitBuffer extends Iterable<bool> {
  final _buffer = <int>[];
  int _length = 0;

  QrBitBuffer();

  @override
  int get length => _length;

  @override
  Iterator<bool> get iterator => _QrBitBufferIterator(this);

  bool operator [](int index) {
    // Optimization: index >> 3 is faster than index ~/ 8
    // index & 7 is faster than index % 8
    final bufIndex = index >> 3;
    return ((_buffer[bufIndex] >> (7 - (index & 7))) & 1) == 1;
  }

  int getByte(int index) => _buffer[index];

  void put(int number, int length) {
    if (length == 0) return;

    var bitIndex = _length;
    final endBitIndex = bitIndex + length;

    // Ensure capacity
    // Optimization: bitshift >> 3 is faster than ~/ 8
    final neededBytes = (endBitIndex + 7) >> 3;
    while (_buffer.length < neededBytes) {
      _buffer.add(0);
    }

    // Optimization for byte-aligned writes of 8 bits (common case)
    if (length == 8 && (bitIndex & 7) == 0 && number >= 0 && number <= 255) {
      _buffer[bitIndex >> 3] = number;
      _length = endBitIndex;
      return;
    }

    // Generic chunked write
    var bitsLeft = length;

    while (bitsLeft > 0) {
      final bufIndex = bitIndex >> 3;
      final leftBitIndex = bitIndex & 7;
      final available = 8 - leftBitIndex;
      final bitsToWrite = bitsLeft < available ? bitsLeft : available;

      final shift = bitsLeft - bitsToWrite;
      final bits = (number >> shift) & ((1 << bitsToWrite) - 1);

      final posShift = 8 - leftBitIndex - bitsToWrite;
      _buffer[bufIndex] |= bits << posShift;

      bitsLeft -= bitsToWrite;
      bitIndex += bitsToWrite;
    }

    _length = endBitIndex;
  }

  void putBit(bool bit) {
    // Optimization: bitshift >> 3 is faster than ~/ 8
    final bufIndex = _length >> 3;
    if (_buffer.length <= bufIndex) {
      _buffer.add(0);
    }

    if (bit) {
      // Optimization: bitwise AND is faster than modulo % 8
      _buffer[bufIndex] |= 0x80 >> (_length & 7);
    }

    _length++;
  }

  List<bool> getRange(int start, int end) {
    final list = <bool>[];
    for (var i = start; i < end; i++) {
      list.add(this[i]);
    }
    return list;
  }
}

class _QrBitBufferIterator implements Iterator<bool> {
  final QrBitBuffer _buffer;
  int _currentIndex = -1;

  _QrBitBufferIterator(this._buffer);

  @override
  bool get current => _buffer[_currentIndex];

  @override
  bool moveNext() {
    _currentIndex++;
    return _currentIndex < _buffer.length;
  }
}
