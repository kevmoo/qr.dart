class TestAffineTransform {
  static void run(){
    test('test concatenate', () {
      var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
      tx.concatenate(new AffineTransform(2, 1, 6, 5, 4, 3));
      
      expect(tx.scaleX).equals(5);
      expect(tx.shearY).equals(8);
      expect(tx.shearX).equals(21);
      expect(tx.scaleY).equals(32);
      expect(tx.translateX).equals(18);
      expect(tx.translateY).equals(26);
    });
  }  
}
