class TestListBase extends ListBase<int> {
  static final int _length = 5;
  static final TestListBase instance = const TestListBase();
  static final TestListBase flipped = const TestListBase(true);

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

  static void _testSomeAll() {
    expect(flipped.every(_lt0), isFalse);
    expect(flipped.some(_lt0), isFalse);

    expect(flipped.every(_gt0), isTrue);
    expect(flipped.some(_gt0), isTrue);

    expect(flipped.every(_lt3), isFalse);
    expect(flipped.some(_lt3), isTrue);
  }

  static bool _lt0(int a) => a < 0;
  static bool _gt0(int a) => a > 0;
  static bool _lt3(int a) => a < 3;
}
