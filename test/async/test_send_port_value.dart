part of test_bot_async;

class TestSendPortValue {
  static void run() {
    test('simple', _testSimple);
    test('complex', _testComplex);
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

  static void _testComplex() {
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


class _ComplexTestValue extends SendPortValue<Tuple<int, int>, Tuple3<int, int, int>> {
  _ComplexTestValue() : super(spawnFunction(_complexTestIsolate),
      inputSerializer: _t2ToList, outputDeserializer: _listToT3);
}

Dynamic _t2ToList(Tuple<int, int> input) {
  if(input == null) {
    return null;
  } else {
    return [input.item1, input.item2 ];
  }
}

Tuple<int, int> _listToT2(List input) {
  if(input == null) {
    return null;
  } else {
    assert(input.length == 2);
    return new Tuple<int, int>(input[0], input[1]);
  }
}

Dynamic _t3ToList(Tuple3<int, int, int> input) {
  return [input.item1, input.item2, input.item3];
}

Tuple3<int, int, int> _listToT3(List input) {
  return new Tuple3<int, int, int>(input[0], input[1], input[2]);
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
  }, inputDeserializer:_listToT2, outputSerializer:_t3ToList);
}
