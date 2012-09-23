class TestTuple {
  static void run() {
    test('Tuple', (){
      var t1 = new Tuple<int, int>(5, 4);
      expect(t1, equals(t1));
      expect(t1.item1, equals(5));
      expect(t1.item2, equals(4));

      var t2 = new Tuple<int, int>(5, 4);
      expect(t2, equals(t1));
      expect(t2, isNot(same(t1)));

      t2 = new Tuple<int, int>(6,4);
      expect(t2, isNot(equals(t1)));
    });

    test('Tuple3', (){
      var t1 = new Tuple3<int, int, String>(5, 4, 'cool');
      expect(t1, equals(t1));
      expect(t1.item1, equals(5));
      expect(t1.item2, equals(4));
      expect(t1.item3, equals('cool'));

      var t2 = new Tuple3<int, int, String>(5, 4, 'cool');
      expect(t2, equals(t1));
      expect(t2, isNot(same(t1)));
      t2 = new Tuple3<int, int, String>(6,4,'beans');
      expect(t2, isNot(equals(t1)));
    });
  }
}
