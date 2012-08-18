class TestTuple {
  static void run() {
    test('Tuple', (){
      var t1 = new Tuple<int, int>(5, 4);
      expect(t1, equals(t1));
      expect(t1.Item1, equals(5));
      expect(t1.Item2, equals(4));

      var t2 = new Tuple<int, int>(5, 4);
      expect(t2, equals(t1));
      t2 = new Tuple<int, int>(6,4);
      expect(t2, isNot(equals(t1)));
    });
  }
}
