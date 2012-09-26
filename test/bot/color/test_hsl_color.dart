class TestHslColor {
  static void run() {
    group('HslColor', (){
      test('Equals', _testEquals);
      test('Invalid', _testInvalid);
    });
  }

  static void _testEquals() {
    var a = new HslColor(123, 1, 0.5);

    expect(a, equals(a));
    expect(a, same(a));

    // 'h' wraps around, so adding or subtracting 360 yields the same value
    var b = new HslColor(123 + 360, 1, 0.5);
    expect(b, equals(a));
    expect(b, isNot(same(a)));

    var c = new HslColor(1,1,0);
    expect(c, isNot(equals(a)));
    expect(c, isNot(same(a)));
  }

  static void _testInvalid() {
    expect(() => new HslColor(null, 0, 0), throwsArgumentError);
    expect(() => new HslColor(0, -1, 0), throwsArgumentError);
    expect(() => new HslColor(0, 0, 256), throwsArgumentError);
  }
}
