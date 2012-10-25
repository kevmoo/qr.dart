part of test_bot;

class TestBox {
  static void run() {
    group('Box', () {
      test('equals', _testEquals);
      test('size and location', _testSizeLocation);
      test('isValid', _testValid);
    });
  }

  static void _testEquals() {
    var a = const Box(0,0,1,1);
    expect(a, equals(a));
    expect(a, same(a));

    var b = const Box(0,0,1,1);
    expect(b, equals(a));
    expect(b, same(a));

    var c = new Box(0,0,1,1);
    expect(c, equals(a));
    expect(c, isNot(same(a)));
  }

  static void _testSizeLocation() {
    var a = new Box(1,2,3,4);

    var b = new Box.fromCoordSize(a.topLeft, a.size);

    expect(b, equals(a));
  }

  static void _testValid() {
    Box a;

    final validLocations = [-1, 0, 1];
    final validSizes = [0, 1];

    final invalidLocations = [double.NAN, double.NEGATIVE_INFINITY, double.INFINITY, null];
    final invalidSizes = [double.NAN, double.NEGATIVE_INFINITY, double.INFINITY, null, -1];

    for(final x in validLocations) {
      for(final y in validLocations) {
        for(final w in validSizes) {
          for(final h in validSizes) {
            a = new Box(x,y,w,h);
            expect(a.isValid, isTrue);

            for(final badLocation in invalidLocations) {
              a = new Box(badLocation, y, w, h);
              expect(a.isValid, isFalse);

              a = new Box(x, badLocation, w, h);
              expect(a.isValid, isFalse);
            }

            for(final badSize in invalidSizes) {
              a = new Box(x, y, badSize, h);
              expect(a.isValid, isFalse);

              a = new Box(x, y, w, badSize);
              expect(a.isValid, isFalse);
            }
          }
        }
      }
    }
  }
}
