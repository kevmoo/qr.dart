class QrBitBuffer extends Iterable<bool> {
  final _buffer = <int>[];
  int _length = 0;

  QrBitBuffer();

  @override
  int get length => _length;

  @override
  Iterator<bool> get iterator => _QrBitBufferIterator(this);

  bool operator [](int index) {
    final bufIndex = index ~/ 8;
    return ((_buffer[bufIndex] >> (7 - index % 8)) & 1) == 1;
  }

  int getByte(int index) => _buffer[index];

  void put(int number, int length) {
    if (length == 0) return;

    var bitIndex = _length;
    final endBitIndex = bitIndex + length;

    // Ensure capacity
    final neededBytes = (endBitIndex + 7) >> 3; // (endBitIndex + 7) ~/ 8
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

      // Extract the 'bitsToWrite' most significant bits from 'number'
      // Shift number right to move target bits to bottom
      // Mask them
      // Then allocate them to the byte buffer

      final shift = bitsLeft - bitsToWrite;
      final bits = (number >> shift) & ((1 << bitsToWrite) - 1);

      // Setup position in byte.
      // We want to write 'bits' starting at 'leftBitIndex'.
      // So we shift 'bits' left by (available - bitsToWrite)?
      // No, `leftBitIndex` is 0-7. 0 is MSB (0x80).
      // If leftBitIndex is 0, we write starting at 0x80.
      // If bitsToWrite is 8, we write 0xFF.
      // If 4 bits, we write 0xF0.
      // formula: bits << (8 - leftBitIndex - bitsToWrite)

      final posShift = 8 - leftBitIndex - bitsToWrite;
      _buffer[bufIndex] |= bits << posShift;

      bitsLeft -= bitsToWrite;
      bitIndex += bitsToWrite;
    }

    _length = endBitIndex;
  }

  void putBit(bool bit) {
    final bufIndex = _length ~/ 8;
    if (_buffer.length <= bufIndex) {
      _buffer.add(0);
    }

    if (bit) {
      _buffer[bufIndex] |= 0x80 >> (_length % 8);
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
