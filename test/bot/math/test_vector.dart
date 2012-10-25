part of test_bot;

class TestVector {
  static void run(){
    group('Vector', (){
      test('should be sum with other Vector', (){
        Vector v = new Vector(1,1) + new Vector(2,1);
        Expect.equals(3, v.x);
        Expect.equals(2, v.y);
      });

      test('should be subtract by other Vector', (){
        Vector v = new Vector(5,3) - new Vector(2,1);
        Expect.equals(3, v.x);
        Expect.equals(2, v.y);
      });

      test('should scale by another number', (){
        var v = new Vector(2,3) * 5;
        Expect.equals(10, v.x);
        Expect.equals(15, v.y);
      });

      test('should be compared by other Vector', (){
        expect(new Vector(2,2), equals(new Vector(2,2)));
        expect(new Vector(2,1), isNot(equals(new Vector(2,2))));
      });

      test('should obey const equality', (){
        expect(new Vector(2,2), new Vector(2,2));
        expect(const Vector(2,2), same(const Vector(2,2)));
      });

      test('should get length of the vector', (){
        Expect.equals(5, new Vector(3, 4).length);
      });

      test('should calc the dot product', (){
        Expect.equals(23, new Vector(2, 3).dot(new Vector(4, 5)));
      });

      test('should calc the cross product', (){
        Expect.equals(-2, new Vector(2, 3).cross(new Vector(4, 5)));
      });

      test('should have valid normal', (){
        var n = new Vector(4, 4);
        expect(n.length, closeTo(4 * math.SQRT2, 0.001));
        expect(n.normal.length, closeTo(1, 0.001));
      });

      test('rotate', (){
        var a = const Vector(1, -1);
        a = a.rotate(math.PI / 2);
        expect(a.x, closeTo(1, 0.000001));
        expect(a.y, closeTo(1, 0.000001));
        a = a.rotate(-math.PI);
        expect(a.x, closeTo(-1, 0.000001));
        expect(a.y, closeTo(-1, 0.000001));
      });

      test('rotateAroundPoint', (){
        var a = const Vector(1, -1);
        a = a.rotateAroundPoint(const Coordinate(1,0), math.PI / 2);
        expect(a.x, closeTo(2, 0.000001));
        expect(a.y, closeTo(0, 0.000001));
      });
    });
  }
}
