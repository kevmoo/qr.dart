part of test_bot;

class TestCoordinate {
  static void run(){
    group('Coordinate', (){

      test('should be subtract by other Coordinate', (){
        var coor = new Coordinate(5,3) - new Coordinate(2,1);
        Expect.equals(3, coor.x);
        Expect.equals(2, coor.y);
      });

      test('should be compared by other Coordinate', (){
        expect(new Coordinate(2,2), equals(new Coordinate(2,2)));
        expect(new Coordinate(2,1), isNot(equals(new Coordinate(2,2))));
      });

      test('should obey const equality', (){
        expect(new Coordinate(2,2), isNot(same(new Coordinate(2,2))));
        expect(const Coordinate(2,2), same(const Coordinate(2,2)));
      });

      test('should get the distance to another point', (){
        Expect.equals(5, new Coordinate(0, 0).getDistance(new Coordinate(3, 4)));
      });
    });
  }
}
