class TestArray2d {
  static void run() {
    group('Array2d', () {
      test('test collection', _testCollectionEquals);
      test('readonlyFrom ctor params', _testReadonlyFromCtorParams);
      test('set/get', _testSetGet);
      test('getAdjacent', _testGetAdjacent);
      // TODO
      // test default ctor
    });
  }

  static void _testGetAdjacent() {
    final list = ['a','b','c','d','e','f','g','h','i'];

    final a = new Array2d.readonlyFrom(3, list);
    expect(a, orderedEquals(list));

    //
    // Adjacent indices
    //
    var adjacent = a.getAdjacentIndices(0,0);
    expect(adjacent, orderedEquals([1,3,4]));

    adjacent = a.getAdjacentIndices(1,1);
    expect(adjacent, orderedEquals([0, 1, 2, 3, 5, 6, 7, 8]));

    adjacent = a.getAdjacentIndices(4, 4);
    expect(adjacent, orderedEquals([]));

    //
    // Adjacent values
    //
    adjacent = a.getAdjacent(0,0);
    expect(adjacent, orderedEquals(['b','d','e']));

    adjacent = a.getAdjacent(1,1);
    expect(adjacent, orderedEquals(['a','b','c','d','f','g','h','i']));

    adjacent = a.getAdjacent(4, 4);
    expect(adjacent, orderedEquals([]));
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
        throwsArgumentError);
    expect(() => new Array2d<int>.readonlyFrom(3, [0,1,2,3]),
        throwsArgumentError);
    expect(() => new Array2d<int>.readonlyFrom(3, []),
        throwsArgumentError);

    // 0 is fine with an empty source
    new Array2d<int>.readonlyFrom(0, []);
  }

  static void _testCollectionEquals() {
    final a = new Array2d<int>.readonlyFrom(2, [0,1,2,3]);
    expect(a, orderedEquals([0,1,2,3]));
  }
}
