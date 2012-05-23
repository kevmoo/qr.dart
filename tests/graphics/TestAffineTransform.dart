class TestAffineTransform {
  static void run(){
    group('AffineTransform -- ', (){
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
      
      test('test rotate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.rotate(Math.PI / 2, 1, 1);
        
        expect(tx.scaleX).approxEquals(3, 1e-9);
        expect(tx.shearY).approxEquals(4, 1e-9);
        expect(tx.shearX).approxEquals(-1, 1e-9);
        expect(tx.scaleY).approxEquals(-2, 1e-9);
        expect(tx.translateX).approxEquals(7, 1e-9);
        expect(tx.translateY).approxEquals(10, 1e-9);
      });
      
      test('test translate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.translate(2, 3);
  
        expect(tx.scaleX).equals(1);
        expect(tx.shearY).equals(2);
        expect(tx.shearX).equals(3);
        expect(tx.scaleY).equals(4);
        expect(tx.translateX).equals(16);
        expect(tx.translateY).equals(22);
      });
    });
  }  
}
