part of test_bot;

class TestListBase extends ListBase<int> {
  static final int _length = 5;
  static final TestListBase instance = const TestListBase();
  static final TestListBase flipped = const TestListBase(true);
  static final ListBase<int> empty = const ReadOnlyCollection.empty();

  final bool flip;

  const TestListBase([this.flip = false]);

  /**
   * Returns the number of elements in this collection.
   */
  int get length => flip ? _length * 2 : _length;

  /**
   * Returns the element at the given [index] in the list or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  int operator [](int index) {
    assert(index >= 0 && index < length);

    if (index < _length) {
      return _length - index;
    }
    index -= _length;
    return index + 1;
  }

  static void run() {
    group('ListBase', (){
      test('filter', _testFilter);
      test('forEach', _testForEach);
      test('getRange', _testRange);
      test('indexOf', _testIndexOf);
      test('map', _testMap);
      test('reduce', _testReduce);
      test('simple', _testSimple);
      test('some and all', _testSomeAll);
    });
  }

  static void _testReduce() {
    Expect.equals(instance.reduce(0, (prev, element) => prev + element), 15);
    Expect.equals(instance.reduce(1, (prev, element) => prev * element), 120);
  }

  static void _testSimple() {
    expect(instance.length, equals(_length));
    expect(instance, orderedEquals([5,4,3,2,1]));
  }

  static void _testMap() {
    Func1<int, int> dub = (i) => i * 2;

    var list = instance.map(dub);
    expect(list.count(), equals(_length));
    expect(list, orderedEquals([10, 8, 6, 4, 2]));
  }

  static void _testIndexOf() {
    //
    // All positive, start at 0
    //
    for (var i = 1; i <= _length; i++) {
      expect(flipped.indexOf(i), equals(_length - i));
      expect(flipped.lastIndexOf(i), equals(_length + i - 1));
    }

    //
    // Start at index `_length`
    //
    for (var i = 1; i <= _length; i++) {
      expect(flipped.indexOf(i, _length), equals(_length + i - 1));
      expect(flipped.lastIndexOf(i, _length), equals(_length + i - 1));
    }

    //
    // look for '1' after the last '1'
    //
    expect(flipped.indexOf(1, _length + 1), equals(-1));
    expect(flipped.lastIndexOf(1, _length + 1), equals(-1));

    //
    // look for '0' which isn't there
    //
    expect(flipped.indexOf(0), equals(-1));
    expect(flipped.lastIndexOf(0), equals(-1));
  }

  static void _testRange() {
    var mt = roc([]);
    expect(mt.getRange(0, 0), orderedEquals([]));

    expect(mt.getRange(-1, 0), orderedEquals([]));

    var oneTwo = roc([1, 2]);
    expect(oneTwo.getRange(0, 2), orderedEquals([1, 2]));

    expect(oneTwo.getRange(0, 1), orderedEquals([1]));

    expect(oneTwo.getRange(1, 1), orderedEquals([2]));

    expect(oneTwo.getRange(0, 0), orderedEquals([]));

    expect(roc([1, 2, 3, 4]).getRange(1, 2), orderedEquals([2, 3]));

    expect(roc([1, 2, 3, 4]).getRange(1, 2), orderedEquals([2, 3]));

    expect(() => mt.getRange(0, -1), throwsArgumentError);

    expect(() => mt.getRange(-1, 1), throwsArgumentError);
    expect(() => mt.getRange(1, 1), throwsArgumentError);
    expect(() => roc([1]).getRange(0, 2), throwsArgumentError);
    expect(() => roc([1]).getRange(1, 1), throwsArgumentError);
  }

  static void _testForEach() {
    int sum = 0;
    instance.forEach((e) => sum += e);
    expect(sum, equals(15));

    sum = 0;
    flipped.forEach((e) => sum += e);
    expect(sum, equals(30));
  }

  static void _testSomeAll() {
    expect(instance.every(_lt0), isFalse);
    expect(instance.some(_lt0), isFalse);

    expect(instance.every(_gt0), isTrue);
    expect(instance.some(_gt0), isTrue);

    expect(instance.every(_lt3), isFalse);
    expect(instance.some(_lt3), isTrue);

    [_lt0, _gt0, _lt3].forEach((f) {
      expect(empty.some(f), isFalse);
      expect(empty.every(f), isTrue);
    });
  }

  static void _testFilter() {
    var list = new List<int>.from(instance.filter(_lt3));
    expect(list, orderedEquals([2, 1]));

    list = new List<int>.from(flipped.filter(_lt3));
    expect(list, orderedEquals([2, 1, 1, 2]));

    list = new List<int>.from(flipped.filter(_lt0));
    expect(list, orderedEquals([]));
  }

  static bool _lt0(int a) => a < 0;
  static bool _gt0(int a) => a > 0;
  static bool _lt3(int a) => a < 3;

  static ReadOnlyCollection<int> roc(List<int> source) {
    return new ReadOnlyCollection(source);
  }
}
