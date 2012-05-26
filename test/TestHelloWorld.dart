class TestHelloWorld {
  static void run(){
    test('Trivial test to make sure test infrastructure is working correctly', () {
      int x = 2 + 3;
      expect(x).equals(5);
    });

  }
}
