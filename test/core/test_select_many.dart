class TestSelectMany {
  static void run() {
    group('SelectMany --', () {
      test('simple', _testSimple);
    });

  }

  static void _testSimple() {
    var source = ['Okoboji', 'Iowa'];

    var select = new SelectMany(source, getChars);

    var charList = new List<String>.from(select);
    expect(charList.length).equals(11);
    expect(charList[6]).equals('i');
    expect(charList[7]).equals('I');
  }

  static List<String> getChars(String input) {
    var list = new List<String>();
    for(int i = 0; i < input.length; i++) {
      list.add(input[i]);
    }

    return list;
  }
}
