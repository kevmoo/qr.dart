class test_hello_world {
  static void run(){
    test('this is a test', () {
      int x = 2 + 3;
      expect(x).equals(5);
    });

  }
}
