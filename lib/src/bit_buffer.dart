import 'dart:typed_data';

/// A growable sequence of bits.
///
/// Used internally to construct the data bit stream for a QR code.
final class QrBitBuffer {
  Uint8List _buffer = Uint8List(32);
  int _length = 0;

  int get length => _length;

  int getByte(int index) => _buffer[index];

  /// Returns a new [Uint8List] containing [length] bytes starting at [offset].
  Uint8List getBytes(int offset, int length) =>
      _buffer.sublist(offset, offset + length);

  /// Appends [length] bits from [number] to the buffer.
  ///
  /// The [number] must be non-negative. If [number] requires more than [length]
  /// bits to represent, it will be truncated and only the lowest [length] bits
  /// will be written.
  void put(int number, int length) {
    if (length == 0) return;

    assert(length > 0, 'length must be strictly positive');
    assert(number >= 0, 'number must be non-negative');

    var bitIndex = _length;
    final endBitIndex = bitIndex + length;

    // Ensure capacity
    // Optimization: bitshift >> 3 is faster than ~/ 8
    final neededBytes = (endBitIndex + 7) >> 3;
    _ensureCapacity(neededBytes);

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

  @override
  String toString() {
    final chars = Uint8List(_length);
    var charIndex = 0;

    // Process full bytes
    final fullBytes = _length >> 3;
    for (var i = 0; i < fullBytes; i++) {
      final byte = _buffer[i];
      for (var j = 7; j >= 0; j--) {
        chars[charIndex++] = ((byte >> j) & 1) + 48; // '0' is 48
      }
    }

    // Process remaining bits
    final remainingBits = _length & 7;
    if (remainingBits > 0) {
      final byte = _buffer[fullBytes];
      for (var i = 0; i < remainingBits; i++) {
        chars[charIndex++] = ((byte >> (7 - i)) & 1) + 48;
      }
    }

    return String.fromCharCodes(chars);
  }

  void _ensureCapacity(int neededBytes) {
    if (_buffer.length < neededBytes) {
      var newLength = _buffer.isEmpty ? 4 : _buffer.length * 2;
      while (newLength < neededBytes) {
        newLength *= 2;
      }
      final newBuffer = Uint8List(newLength)
        ..setRange(0, _buffer.length, _buffer);
      _buffer = newBuffer;
    }
  }
}
