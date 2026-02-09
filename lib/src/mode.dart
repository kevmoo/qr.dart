/// The encoding mode of a QR code segment.
enum QrMode {
  /// Numeric mode (0-9). Most efficient.
  numeric(1),

  /// Alphanumeric mode (0-9, A-Z, space, %, *, +, -, ., /, :).
  alphaNumeric(2),

  /// Byte mode (8-bit data).
  byte(4),

  /// Kanji mode (Shift-JIS).
  kanji(8),

  /// Extended Channel Interpretation (ECI) mode.
  eci(7);

  final int value;

  const QrMode(this.value);

  int getLengthBits(int type) {
    if (this == eci) return 0;
    if (type < 1 || type > 40) throw RangeError.range(type, 1, 40, 'type');

    if (type < 10) {
      // 1 - 9
      return switch (this) {
        numeric => 10,
        alphaNumeric => 9,
        byte => 8,
        kanji => 8,
        eci => 0,
      };
    } else if (type < 27) {
      // 10 - 26
      return switch (this) {
        numeric => 12,
        alphaNumeric => 11,
        byte => 16,
        kanji => 10,
        eci => 0,
      };
    } else {
      // 27 - 40
      return switch (this) {
        numeric => 14,
        alphaNumeric => 13,
        byte => 16,
        kanji => 12,
        eci => 0,
      };
    }
  }
}
