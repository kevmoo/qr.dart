class TestNumberEnumerable {

  static void run() {
    group('NumberEnumerable', () {
      test('sum', _testSum);
      test('min', _testMin);
      test('max', _testMax);
      test('average', _testAverage);
      test('range', _testRange);
    });
  }

  static void _testRange() {
    final ne = new NumberEnumerable.fromRange(10, 5);
    expect(ne, orderedEquals([10,11,12,13,14]));
  }

  static void _testSum() {
    var value = n$([1,2,3]).sum();
    expect(value, equals(6));

    expect(() => n$([1,2,3,null]).sum(), throwsNullPointerException);
  }

  static void _testMin() {
    var value = n$([1,2,3]).min();
    expect(value, equals(1));

    expect(() => n$([1,2,3,null]).min(), throwsIllegalArgumentException);
  }

  static void _testMax() {
    var value = n$([1,2,3]).max();
    expect(value, equals(3));

    expect(() => n$([1,2,3,null]).max(), throwsIllegalArgumentException);
  }

  static void _testAverage() {
    var value = n$([1,2,3]).average();
    expect(value, equals(2));

    expect(() => n$([1,2,3,null]).average(), throwsNullPointerException);
  }
}
