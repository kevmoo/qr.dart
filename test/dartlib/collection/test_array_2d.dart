class TestArray2d {
  static void run() {
    group('Array2d', () {
      test('test collection', _testCollectionEquals);
      test('readonlyFrom ctor params', _testReadonlyFromCtorParams);
      test('set/get', _testSetGet);
      // TODO
      // test default ctor
    });
  }

  static void _testSetGet() {
    final v = 0;
    final a = new Array2d<int>(3,3,v);
    expect(a, orderedEquals([v,v,v,v,v,v,v,v,v]));

    for(int x = 0; x < 3; x++) {
      for(int y = 0; y < 3; y++) {
        expect(a.get(x,y), equals(v));
      }
    }

    a[3] = 1;
    expect(a[3], equals(1));
    expect(a.get(0,1), equals(1));

    a.set(0,1,2);
    expect(a[3], equals(2));
    expect(a.get(0,1), equals(2));
  }

  static void _testReadonlyFromCtorParams() {
    expect(() => new Array2d<int>.readonlyFrom(null, [0,1,2,3]),
        throwsNullArgumentException);
    expect(() => new Array2d<int>.readonlyFrom(2, null),
        throwsNullArgumentException);
    expect(() => new Array2d<int>.readonlyFrom(0, [0,1,2,3]),
        throwsIllegalArgumentException);
    expect(() => new Array2d<int>.readonlyFrom(3, [0,1,2,3]),
        throwsIllegalArgumentException);
    expect(() => new Array2d<int>.readonlyFrom(3, []),
        throwsIllegalArgumentException);

    // 0 is fine with an empty source
    new Array2d<int>.readonlyFrom(0, []);
  }

  static void _testCollectionEquals() {
    final a = new Array2d<int>.readonlyFrom(2, [0,1,2,3]);
    expect(a, orderedEquals([0,1,2,3]));
  }
}
