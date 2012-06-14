class TestGrouping {

  static void run() {
    group('Grouping --', () {
      test('simple', _testSimpleGrouping);
      test('complex', _testComplexGrouping);
    });
  }

  static void _testComplexGrouping() {
    Func1<String, int> keyFunc = (str) => str.length;

    //
    // Test 1
    //
    var grouping = new Grouping<int, String>(['a'], keyFunc);

    expect(grouping.length).equals(1);

    var list = grouping[1];
    expect(list.length).equals(1);
    expect(list[0]).equals('a');

    //
    // Test 2
    //
    grouping = new Grouping<int, String>(
        ['a', 'b', 'c', 'ab', 'bc', 'abc'],
        keyFunc);

    expect(grouping.length).equals(3);

    list = grouping[1];
    expect(list.length).equals(3);
    expect(list.indexOf('a') < 0).isFalse();
    expect(list.indexOf('b') < 0).isFalse();
    expect(list.indexOf('c') < 0).isFalse();
    expect(list.indexOf('d') < 0).isTrue();

    list = grouping[2];
    expect(list.length).equals(2);
    expect(list.indexOf('ab') < 0).isFalse();
    expect(list.indexOf('bc') < 0).isFalse();
    expect(list.indexOf('a') < 0).isTrue();

    list = grouping[3];
    expect(list.length).equals(1);
    expect(list.indexOf('abc')).equals(0);
    expect(list.indexOf('d') < 0).isTrue();

    list = grouping[0];
    expect(list).isNull();
  }

  static void _testSimpleGrouping() {
    //
    // Test 1
    //
    var grouping = new Grouping<int, int>.from([1]);

    expect(grouping.length).equals(1);

    var list = grouping[1];
    expect(list.length).equals(1);
    expect(list[0]).equals(1);

    //
    // Test 2
    //
    grouping = new Grouping<int, int>.from([1, 1]);

    expect(grouping.length).equals(1);

    list = grouping[1];
    expect(list.length).equals(2);
    expect(list[0]).equals(1);
    expect(list[1]).equals(1);

    //
    // Test 3
    //
    grouping = new Grouping<int, int>.from([1, 2, 3, 1, 2, 1]);

    expect(grouping.length).equals(3);

    list = grouping[1];
    expect(list.length).equals(3);
    expect(list.every((i) => i == 1));

    list = grouping[2];
    expect(list.length).equals(2);
    expect(list.every((i) => i == 2));

    list = grouping[3];
    expect(list.length).equals(1);
    expect(list.every((i) => i == 3));

    list = grouping[4];
    expect(list).isNull();
  }
}
