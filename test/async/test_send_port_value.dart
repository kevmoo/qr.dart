class TestSendPortValue {
  static void run() {
    // from v10991 to at least v11320, fails
    // see issue http://code.google.com/p/dart/issues/detail?id=4630
    test('simple - fails (Dart issue 4630)', _testSimple);
  }

  static void _testSimple() {
    final tv = new _TestValue();

    final callback = expectAsync1((EventArgs arg) {
      expect(tv.output, equals(25));
    });

    final onError = expectAsync1((String args) {
      expect(args, equals('wah?'));
    });

    tv.outputChanged.add(callback);
    tv.error.add(onError);
    tv.input = 5;

    tv.input = -1;
  }

}

class _TestValue extends SendPortValue<int, int> {
  _TestValue() : super(spawnFunction(_testIsolate));
}

void _testIsolate() {
  new SendValuePort<int, int>((input) {
    if(input < 0) {
      throw 'wah?';
    }

    final int output = input * input;
    return output;
  });
}
