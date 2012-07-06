class HslColor {
  final num h, s, l;

  const HslColor._internal(this.h, this.s, this.l);

  factory HslColor(num h, num s, num l) {
    requireArgument(isValidNumber(h), 'h');
    h = (h % 360);

    requireArgument(isValidNumber(s), 's');
    requireArgument(s >= 0 && s <= 1, 's');
    requireArgument(isValidNumber(l), 'l');
    requireArgument(l >= 0 && l <= 1, 'l');

    return new HslColor._internal(h, s, l);
  }

  bool operator ==(HslColor other) {
    return other !== null && other.h == h && other.s == s && other.l == l;
  }

  String toString() => '{HslColor: $h, $s, $l}';
}
