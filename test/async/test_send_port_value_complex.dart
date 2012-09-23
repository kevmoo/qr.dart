class TestSendPortValueComplex {
  static void run() {
    test('complex', _testSimple);
  }

  static void _testSimple() {
    final tv = new _ComplexTestValue();

    final callback = expectAsync1((EventArgs arg) {
      expect(tv.output, equals(new Tuple3(5,6,11)));
    });

    final onError = expectAsync1((String args) {
      expect(args, equals('wah?'));
    });

    tv.outputChanged.add(callback);
    tv.error.add(onError);
    tv.input = new Tuple<int, int>(5, 6);

    tv.input = null;
  }

}

class _ComplexTestValue extends SendPortValue<Tuple<int, int>, Tuple3<int, int, int>> {
  _ComplexTestValue() : super(spawnFunction(_complexTestIsolate));
}

void _complexTestIsolate() {
  new SendValuePort<Tuple<int, int>, Tuple3<int, int, int>>((input) {
    if(input == null) {
      throw 'wah?';
    }

    return new Tuple3<int, int, int>(
        input.item1,
        input.item2,
        input.item1 + input.item2);
  });
}
