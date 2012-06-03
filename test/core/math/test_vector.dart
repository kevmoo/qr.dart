class TestVector {
  static void run(){
    group('Vector -- ', (){
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
        expect(new Vector(2,2)).equals(new Vector(2,2));
        Expect.isTrue(new Vector(2,1) != new Vector(2,2));
      });

      test('should obey const equality', (){
        Expect.isFalse(new Vector(2,2) === new Vector(2,2));
        expect(const Vector(2,2)).same(const Vector(2,2));
        Expect.isTrue(const Vector(2,2) === const Vector(2,2));
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
        expect(n.length).approxEquals(4 * Math.SQRT2);
        expect(n.normal.length).approxEquals(1);
      });

      test('should create a clone of itself', (){
        Vector original = new Vector(1,2);
        Vector copy = original.clone();
        Expect.equals(copy.x, original.x);
        Expect.equals(copy.y, original.y);
        expect(original).equals(copy);
      });
    });
  }
}
