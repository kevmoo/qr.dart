class TestCollectionUtil {

  static void run() {
    group('CollectionUtil --', () {
      test('allUnique', _testAllUnique);
      test('aggregate', _testAggregate);
    });
  }

  static void _testAllUnique() {
    expect(CollectionUtil.allUnique([])).isTrue();

    expect(CollectionUtil.allUnique([1])).isTrue();
    expect(CollectionUtil.allUnique([null])).isTrue();
    expect(CollectionUtil.allUnique([''])).isTrue();
    expect(CollectionUtil.allUnique(['str'])).isTrue();
    expect(CollectionUtil.allUnique([1, 2])).isTrue();
    expect(CollectionUtil.allUnique([1, 2])).isTrue();
    expect(CollectionUtil.allUnique(['', 'str'])).isTrue();

    expect(CollectionUtil.allUnique([1, 1])).isFalse();
    expect(CollectionUtil.allUnique([null, null])).isFalse();
    expect(CollectionUtil.allUnique(['', ''])).isFalse();
    expect(CollectionUtil.allUnique(['', ''])).isFalse();
    expect(CollectionUtil.allUnique(['str', 'str'])).isFalse();
  }

  static void _testAggregate() {
    Func2<int, int, int> summer = (current, next) => current + next;

    var values = [1,2,3];

    int sum = CollectionUtil.aggregate(values, 0, summer);
    expect(sum).equals(6);

    Func2<String, String, String> prepender = (current, next) {
      return next.concat(current);
    };

    var strs = ['first', 'second', 'third'];
    String str = CollectionUtil.aggregate(strs, '', prepender);
    expect(str).equals('thirdsecondfirst');
  }
}
