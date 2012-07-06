class RgbColor {
  final int r, g, b;

  const RgbColor._internal(this.r, this.g, this.b);

  factory RgbColor(int r, int g, int b) {
    _validateComponent(r, 'r');
    _validateComponent(g, 'g');
    _validateComponent(b, 'b');

    return new RgbColor._internal(r, g, b);
  }

  bool operator ==(RgbColor other) {
    return other !== null && other.r == r && other.g == g && other.b == b;
  }

  String toString() => '{RgbColor: $r, $g, $b}';

  static void _validateComponent(int c, String name) {
    requireArgument(isValidNumber(c), name);
    requireArgument(c >= 0 && c <= 255, name);
  }
}
