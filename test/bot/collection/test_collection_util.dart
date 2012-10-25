part of test_bot;

class TestCollectionUtil {

  static void run() {
    group('CollectionUtil', () {
      test('allUnique', _testAllUnique);
      test('listish', _testListish);
    });
  }

  static void _testListish() {
    var roc = new ReadOnlyCollection([1, 2]);
    expect(CollectionUtil.allUnique(roc), isTrue);
  }

  static void _testAllUnique() {
    expect(CollectionUtil.allUnique([]), isTrue);

    expect(CollectionUtil.allUnique([1]), isTrue);
    expect(CollectionUtil.allUnique([null]), isTrue);
    expect(CollectionUtil.allUnique(['']), isTrue);
    expect(CollectionUtil.allUnique(['str']), isTrue);
    expect(CollectionUtil.allUnique([1, 2]), isTrue);
    expect(CollectionUtil.allUnique([1, 2]), isTrue);
    expect(CollectionUtil.allUnique(['', 'str']), isTrue);

    expect(CollectionUtil.allUnique([1, 1]), isFalse);
    expect(CollectionUtil.allUnique([null, null]), isFalse);
    expect(CollectionUtil.allUnique(['', '']), isFalse);
    expect(CollectionUtil.allUnique(['', '']), isFalse);
    expect(CollectionUtil.allUnique(['str', 'str']), isFalse);
  }
}
