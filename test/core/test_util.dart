class TestUtil {
  static void run() {
    group('Util --', () {
      test('getHashcode', _testGetHashCode);
    });

  }

  static void _testGetHashCode() {
    _hashCodeFun([], 0);
    _hashCodeFun([null], 0);
    _hashCodeFun([null, null], 0);
    _hashCodeFun([1], 1);
    _hashCodeFun([1,2], 35);
    _hashCodeFun([2,1], 67);
    _hashCodeFun(['foo'], 425588957);
    _hashCodeFun([''], 1);
    _hashCodeFun(['', ''], 32);
    _hashCodeFun(['foo', 'bar'], 14526317940);
    _hashCodeFun(['bar', 'foo'], 19989056244);

    _hashCodeFun([null, 1], 1);
    _hashCodeFun([null, null, 1], 1);
    _hashCodeFun([1, null], 33);
  }

  static void _hashCodeFun(Iterable<Hashable> items, int expectedValue) {
    int hashCode = Util.getHashCode(items);
    expect(hashCode, equals(expectedValue));
  }
}
