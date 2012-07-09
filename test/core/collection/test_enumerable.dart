class TestEnumerable {

  static void run() {
    group('Enumerable', () {
      test('aggregate', _testAggregate);
      test('selectMany', _testSelectMany);
      group('Group', () {
        test('complex', _testComplexGrouping);
        test('simple', _testSimpleGrouping);
      });
      test('select', _testSelect);
    });
  }

  static void _testSelect() {
    final e = $([1,2,3,4,5,6]).select((x) => x * 2);
    expect(e, orderedEquals([2,4,6,8,10,12]));
  }

  static void _testAggregate() {
    Func2<int, int, int> summer = (current, next) => current + next;

    final valEnumerable = $([1,2,3]);

    int sum = valEnumerable.aggregate(0, summer);
    expect(sum, equals(6));

    Func2<String, String, String> prepender = (current, next) {
      return next.concat(current);
    };

    final strsEnumerable = $(['first', 'second', 'third']);

    String str = strsEnumerable.aggregate('', prepender);
    expect(str, equals('thirdsecondfirst'));
  }

  //
  // Select Many
  //
  static void _testSelectMany() {
    final sourceEnum = $(['Okoboji', 'Iowa']);

    var select = sourceEnum.selectMany(_getChars);

    var charList = new List<String>.from(select);
    expect(charList.length, equals(11));
    expect(charList[6], equals('i'));
    expect(charList[7], equals('I'));

    //
    // now group 'em
    //
    var grouped = select.group();
    // 11 letters, o repeated three times
    expect(grouped.length, equals(9));

    //
    // Some and Every
    //
    expect(select.some((e) => e == 'k'), isTrue);
    expect(select.some((e) => e == 'z'), isFalse);

    expect(select.every((e) => e == 'z'), isFalse);
    expect(select.every((e) => e != 'z'), isTrue);
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
    var grouping = $(['a']).group(keyFunc);

    expect(grouping.length, equals(1));

    var list = grouping[1];
    expect(list.length, equals(1));
    expect(list[0], equals('a'));

    //
    // Test 2
    //
    final source = ['a', 'b', 'c', 'ab', 'bc', 'abc'];
    grouping = $(source).group(keyFunc);

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
    var grouping = $([1]).group();

    expect(grouping.length, equals(1));

    var list = grouping[1];
    expect(list.length, equals(1));
    expect(list[0], equals(1));

    //
    // Test 2
    //
    grouping = $([1, 1]).group();

    expect(grouping.length, equals(1));

    list = grouping[1];
    expect(list.length, equals(2));
    expect(list[0], equals(1));
    expect(list[1], equals(1));

    //
    // Test 3
    //
    grouping = $([1, 2, 3, 1, 2, 1]).group();

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
