enum QrMaskPattern {
  pattern000,
  pattern001,
  pattern010,
  pattern011,
  pattern100,
  pattern101,
  pattern110,
  pattern111;

  /// Checks if a module at (i, j) should be masked.
  ///
  /// Performance Optimization:
  /// This method is called in a tight loop for every module in the QR matrix.
  /// Previously, this used a function closure stored as a final variable on the enum,
  /// causing an indirect function call overhead per pixel.
  /// By inlining the math formulas into a direct `switch` statement on the enum `index`,
  /// we eliminate the dynamic dispatch and getter (`.isEven`) overhead,
  /// leading to a measurable speedup in QR code generation.
  bool check(int i, int j) {
    switch (index) {
      case 0:
        return (i + j) % 2 == 0;
      case 1:
        return i % 2 == 0;
      case 2:
        return j % 3 == 0;
      case 3:
        return (i + j) % 3 == 0;
      case 4:
        return ((i ~/ 2) + (j ~/ 3)) % 2 == 0;
      case 5:
        return ((i * j) % 2 + (i * j) % 3) == 0;
      case 6:
        return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
      case 7:
        return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
      default:
        return false;
    }
  }
}
