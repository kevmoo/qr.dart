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
  int get length() => flip ? _length * 2 : _length;

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
      test('simple', _testSimple);
      test('map', _testMap);
      test('indexOf', _testIndexOf);
      test('some and all', _testSomeAll);
      test('getRange', _testRange);
      test('filter', _testFilter);
      test('forEach', _testForEach);
    });
  }

  static void _testSimple() {

    var list = new List<int>.from(instance);
    expect(list.length, equals(_length));
    expect(list, orderedEquals([5,4,3,2,1]));
  }

  static void _testMap() {
    Func1<int, int> dub = (i) => i * 2;

    List<int> list = new List<int>.from(instance.map(dub));
    expect(list.length, equals(_length));
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
    Expect.listEquals([], mt.getRange(0, 0));

    Expect.listEquals([], mt.getRange(-1, 0));

    var oneTwo = roc([1, 2]);
    Expect.listEquals([1, 2], oneTwo.getRange(0, 2));

    Expect.listEquals([1], oneTwo.getRange(0, 1));

    Expect.listEquals([2], oneTwo.getRange(1, 1));

    Expect.listEquals([], oneTwo.getRange(0, 0));

    Expect.listEquals([2, 3], roc([1, 2, 3, 4]).getRange(1, 2));

    Expect.listEquals([2, 3], roc([1, 2, 3, 4]).getRange(1, 2));

    _expectIAE(() => mt.getRange(0, -1));

    _expectIOORE(() => mt.getRange(-1, 1));
    _expectIOORE(() => mt.getRange(1, 1));
    _expectIOORE(() => roc([1]).getRange(0, 2));
    _expectIOORE(() => roc([1]).getRange(1, 1));
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

  static void _expectIOORE(Function f) {
    Expect.throws(f, (e) => e is IndexOutOfRangeException);
  }

  static void _expectIAE(Function f) {
    Expect.throws(f, (e) => e is IllegalArgumentException);
  }
}
