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
  bool check(int i, int j) => switch (this) {
    pattern000 => (i + j).isEven,
    pattern001 => i.isEven,
    pattern010 => j % 3 == 0,
    pattern011 => (i + j) % 3 == 0,
    pattern100 => ((i ~/ 2) + (j ~/ 3)).isEven,
    pattern101 => ((i * j) % 2 + (i * j) % 3) == 0,
    pattern110 => (((i * j) % 2) + ((i * j) % 3)).isEven,
    pattern111 => (((i * j) % 3) + ((i + j) % 2)).isEven,
  };
}
