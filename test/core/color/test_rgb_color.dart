class TestRgbColor {
  static void run() {
    group('RgbColor', (){
      test('Equals', _testEquals);
      test('Invalid', _testInvalid);
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
}
