class TestEnumerable {

  static void run() {
    group('Enumerable', () {
      test('aggregate', _testAggregate);
      test('selectMany', _testSelectMany);
      group('Group', () {
        test('complex', _testComplexGrouping);
        test('simple', _testSimpleGrouping);
      });
    });
  }

  static void _testAggregate() {
    Func2<int, int, int> summer = (current, next) => current + next;

    final values = [1,2,3];

    final valEnumerable = new Enumerable<num>(values);

    int sum = valEnumerable.aggregate(0, summer);
    expect(sum, equals(6));

    Func2<String, String, String> prepender = (current, next) {
      return next.concat(current);
    };

    final strs = ['first', 'second', 'third'];
    final strsEnumerable = new Enumerable<String>(strs);

    String str = strsEnumerable.aggregate('', prepender);
    expect(str, equals('thirdsecondfirst'));
  }


  //
  // Select Many
  //

  static void _testSelectMany() {
    final source = ['Okoboji', 'Iowa'];
    final sourceEnum = new Enumerable<String>(source);

    var select = sourceEnum.selectMany(_getChars);

    var charList = new List<String>.from(select);
    expect(charList.length, equals(11));
    expect(charList[6], equals('i'));
    expect(charList[7], equals('I'));
  }

  static List<String> _getChars(String input) {
    var list = new List<String>();
    for(int i = 0; i < input.length; i++) {
      list.add(input[i]);
    }

    return list;
  }

  //
  // Grouping
  //


  static void _testComplexGrouping() {
    final Func1<String, int> keyFunc = (str) => str.length;

    //
    // Test 1
    //
    var grouping = (new Enumerable(['a']))
        .group(keyFunc);

    expect(grouping.length, equals(1));

    var list = grouping[1];
    expect(list.length, equals(1));
    expect(list[0], equals('a'));

    //
    // Test 2
    //
    var source = ['a', 'b', 'c', 'ab', 'bc', 'abc'];

    grouping = (new Enumerable(['a', 'b', 'c', 'ab', 'bc', 'abc']))
        .group(keyFunc);

    expect(grouping.length, equals(3));

    list = grouping[1];
    expect(list.length, equals(3));
    expect(list, contains('a'));
    expect(list, contains('b'));
    expect(list, contains('c'));
    expect(list, isNot(contains('d')));

    list = grouping[2];
    expect(list.length, equals(2));
    expect(list, contains('ab'));
    expect(list, contains('bc'));
    expect(list, isNot(contains('a')));

    list = grouping[3];
    expect(list.length, equals(1));
    expect(list[0], equals('abc'));
    expect(list, isNot(contains('d')));

    list = grouping[0];
    expect(list, isNull);

    // verify all values
    list = new List<String>.from(grouping.getValues());
    expect(list, unorderedEquals(source));
  }

  static void _testSimpleGrouping() {
    //
    // Test 1
    //
    var grouping = (new Enumerable([1])).group();

    expect(grouping.length, equals(1));

    var list = grouping[1];
    expect(list.length, equals(1));
    expect(list[0], equals(1));

    //
    // Test 2
    //
    grouping = (new Enumerable<int>([1, 1])).group();

    expect(grouping.length, equals(1));

    list = grouping[1];
    expect(list.length, equals(2));
    expect(list[0], equals(1));
    expect(list[1], equals(1));

    //
    // Test 3
    //
    grouping = (new Enumerable([1, 2, 3, 1, 2, 1])).group();

    expect(grouping.length, equals(3));

    list = grouping[1];
    expect(list.length, equals(3));
    expect(list, everyElement(equals(1)));

    list = grouping[2];
    expect(list.length, equals(2));
    expect(list, everyElement(equals(2)));

    list = grouping[3];
    expect(list.length, equals(1));
    expect(list, everyElement(equals(3)));

    list = grouping[4];
    expect(list, isNull);
  }
}
