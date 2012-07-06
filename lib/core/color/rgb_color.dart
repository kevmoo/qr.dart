// RGB-HSL conversion logic borrowed with love from Google Closure Library
// http://code.google.com/p/closure-library/source/browse/trunk/closure/goog/color/color.js

class RgbColor {
  final int r, g, b;

  const RgbColor._internal(this.r, this.g, this.b);

  factory RgbColor(int r, int g, int b) {
    _validateComponent(r, 'r');
    _validateComponent(g, 'g');
    _validateComponent(b, 'b');

    return new RgbColor._internal(r, g, b);
  }

  HslColor toHsl() {
    // First must normalize r, g, b to be between 0 and 1.
    final normR = r / 255;
    final normG = g / 255;
    final normB = b / 255;
    final max = Math.max(normR, Math.max(normG, normB));
    final min = Math.min(normR, Math.min(normG, normB));
    // Luminosity is the average of the max and min rgb color intensities.
    final l = 0.5 * (max + min);

    var h = 0;
    var s = 0;

    // The hue and saturation are dependent on which color intensity is the max.
    // If max and min are equal, the color is gray and h and s should be 0.
    if (max != min) {
      if (max == normR) {
        h = 60 * (normG - normB) / (max - min);
      } else if (max == normG) {
        h = 60 * (normB - normR) / (max - min) + 120;
      } else if (max == normB) {
        h = 60 * (normR - normG) / (max - min) + 240;
      }

      if (0 < l && l <= 0.5) {
        s = (max - min) / (2 * l);
      } else {
        s = (max - min) / (2 - 2 * l);
      }
    }

    // Make sure the hue falls between 0 and 360.
    return new HslColor(h, s, l);
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
