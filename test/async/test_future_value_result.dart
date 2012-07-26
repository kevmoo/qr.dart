class TestFutureValueResult {
  static void run() {
    group('FutureValueResult', () {
      group('toMap roundtrip', (){
        test('value', _testValueRoundTrip);
        test('exception', _testExceptionRoundTrip);
      });
    });
  }

  static void _testValueRoundTrip() {
    final initialVal = new FutureValueResult(42);

    final map = initialVal.toMap();

    expect(FutureValueResult.isMyMap(map), isTrue);

    final newVal = new FutureValueResult.fromMap(map);
    expect(newVal, equals(initialVal));
    expect(newVal, isNot(same(initialVal)));

    expect(newVal.value, equals(42));
  }

  static void _testExceptionRoundTrip() {
    final initialVal = new FutureValueResult.exception('oops');

    final map = initialVal.toMap();

    expect(FutureValueResult.isMyMap(map), isTrue);

    final newVal = new FutureValueResult.fromMap(map);
    expect(newVal, equals(initialVal));
    expect(newVal, isNot(same(initialVal)));

    expect(newVal.exception, equals('oops'));
  }
}
