class TestRgbColor {
  static void run() {
    group('RgbColor', (){
      test('Equals', _testEquals);
      test('Invalid', _testInvalid);
      test('HslColor round-trip', _testHslRoundTrip);
    });
  }

  static void _testEquals() {
    var a = new RgbColor(0,1,255);

    expect(a, equals(a));
    expect(a, same(a));

    var b = new RgbColor(0,1,255);
    expect(b, equals(a));
    expect(b, isNot(same(a)));

    var c = new RgbColor(1,2,3);
    expect(c, isNot(equals(a)));
    expect(c, isNot(same(a)));
  }

  static void _testInvalid() {
    expect(() => new RgbColor(null, 0, 0), throwsIllegalArgumentException);
    expect(() => new RgbColor(0, -1, 0), throwsIllegalArgumentException);
    expect(() => new RgbColor(0, 0, 256), throwsIllegalArgumentException);
  }

  static void _testHslRoundTrip() {
    final colors = [
                    new RgbColor(0,0,0),
                    new RgbColor(1,1,1),
                    new RgbColor(42,29,123),
                    new RgbColor(42,29,120),
                    new RgbColor(254,254,254),
                    new RgbColor(255,255,255)
                    ];

    for(final rgb in colors) {
      _expectRoundTrip(rgb);
    }

    for(int i = 0; i < 100; i++) {
      var rgb = new RgbColor(
        _randomIntComponent(),
        _randomIntComponent(),
        _randomIntComponent());
      _expectRoundTrip(rgb);
    }
  }

  static int _randomIntComponent() => (Math.random() * 255).round().toInt();

  static void _expectRoundTrip(RgbColor rgb) {
    final hsl = rgb.toHsl();
    final rgb2 = hsl.toRgb();
    expect(rgb, equals(rgb2));
  }
}
