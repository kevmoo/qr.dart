class TestVec2 {
  static void run(){
    group('Vec2 -- ', (){
      test('should be sum with other Vec2', (){
        Vec2 v = new Vec2(1,1) + new Vec2(2,1);
        Expect.equals(3, v.x);
        Expect.equals(2, v.y);
      });

      test('should be subtract by other Vec2', (){
        Vec2 v = new Vec2(5,3) - new Vec2(2,1);
        Expect.equals(3, v.x);
        Expect.equals(2, v.y);
      });

      test('should scale by another number', (){
        var v = new Vec2(2,3) * 5;
        Expect.equals(10, v.x);
        Expect.equals(15, v.y);
      });

      test('should be compared by other Vec2', (){
        expect(new Vec2(2,2)).equals(new Vec2(2,2));
        Expect.isTrue(new Vec2(2,1) != new Vec2(2,2));
      });

      test('should obey const equality', (){
        Expect.isFalse(new Vec2(2,2) === new Vec2(2,2));
        expect(const Vec2(2,2)).same(const Vec2(2,2));
        Expect.isTrue(const Vec2(2,2) === const Vec2(2,2));
      });

      test('should get the distance to another point', (){
        Expect.equals(5, new Vec2(0, 0).getDistance(new Vec2(3, 4)));
      });

      test('should calc the dot product', (){
        Expect.equals(23, new Vec2(2, 3).dot(new Vec2(4, 5)));
      });

      test('should calc the cross product', (){
        Expect.equals(-2, new Vec2(2, 3).cross(new Vec2(4, 5)));
      });

      test('should have valid normal', (){
        var n = new Vec2(4, 4);
        expect(n.length).approxEquals(4 * Math.SQRT2);
        expect(n.normal.length).approxEquals(1);
      });
    });
  }
}
