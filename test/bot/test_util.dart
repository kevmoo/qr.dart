part of test_bot;

class TestUtil {
  static void run() {
    group('Util', () {
      // No promises that hashCodes stay the same across impls
      // test('getHashcode', _testGetHashCode);
    });
  }

  static void _testGetHashCode() {
    // Verifies hashCodes for Dart VM
    // Broken in Dartium - http://code.google.com/p/dart/issues/detail?id=4455
    expect('foo'.hashCode, equals(848623837));

    _hashCodeFun([], 0);
    _hashCodeFun([null], 0);
    _hashCodeFun([null, null], 0);
    _hashCodeFun([1], 307143837);
    _hashCodeFun([1,2], 93096440);
    _hashCodeFun([2,1], 405401106);
    _hashCodeFun(['foo'], 69162337);
    _hashCodeFun([''], 307143837);
    _hashCodeFun(['', ''], 313418812);
    _hashCodeFun(['foo', 'bar'], 27305964);
    _hashCodeFun(['bar', 'foo'], 309729073);

    _hashCodeFun([null, 1], 307143837);
    _hashCodeFun([null, null, 1], 307143837);
    _hashCodeFun([1, null], 15319219);
  }

  static void _hashCodeFun(Iterable<Hashable> items, int expectedValue) {
    int hashCode = Util.getHashCode(items);
    expect(hashCode, equals(expectedValue));
  }
}
