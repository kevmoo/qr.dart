class TestListBase extends ListBase<int> {

  /**
   * Returns the number of elements in this collection.
   */
  int get length() {
    return 10;
  }

  /**
   * Returns the element at the given [index] in the list or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  int operator [](int index) {
    assert(index >= 0 && index < 10);
    return length - index;
  }

  static void run() {
    group('ListBase -- ', (){
      test('simple', _testSimple);
    });
  }

  static void _testSimple() {
    var test = new TestListBase();

    var list = new List<int>.from(test);
    expect(list.length).equals(10);
  }
}
