class TestEnumerable {

  static void run() {
    group('Enumerable', () {
      test('aggregate', _testAggregate);
      test('selectMany', _testSelectMany);
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


  static void _testSelectMany() {
    final source = ['Okoboji', 'Iowa'];
    final sourceEnum = new Enumerable<String>(source);

    var select = sourceEnum.selectMany(getChars);

    var charList = new List<String>.from(select);
    expect(charList.length, equals(11));
    expect(charList[6], equals('i'));
    expect(charList[7], equals('I'));
  }

  static List<String> getChars(String input) {
    var list = new List<String>();
    for(int i = 0; i < input.length; i++) {
      list.add(input[i]);
    }

    return list;
  }
}
