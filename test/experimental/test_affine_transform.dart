class TestAffineTransform {
  static void run(){
    group('AffineTransform -- ', (){
      test('concatenate', () {
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.concatenate(new AffineTransform(2, 1, 6, 5, 4, 3));

        expect(tx.scaleX).equals(5);
        expect(tx.shearY).equals(8);
        expect(tx.shearX).equals(21);
        expect(tx.scaleY).equals(32);
        expect(tx.translateX).equals(18);
        expect(tx.translateY).equals(26);
      });

      test('rotate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.rotate(Math.PI / 2, 1, 1);

        expect(tx.scaleX).approxEquals(3);
        expect(tx.shearY).approxEquals(4);
        expect(tx.shearX).approxEquals(-1);
        expect(tx.scaleY).approxEquals(-2);
        expect(tx.translateX).approxEquals(7);
        expect(tx.translateY).approxEquals(10);
      });

      test('translate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.translate(2, 3);

        expect(tx.scaleX).equals(1);
        expect(tx.shearY).equals(2);
        expect(tx.shearX).equals(3);
        expect(tx.scaleY).equals(4);
        expect(tx.translateX).equals(16);
        expect(tx.translateY).equals(22);
      });

      test('createInverse', (){
        var tx = AffineTransform.getScaleInstance(2, 3);
        tx.translate(5, 10);
        tx.rotate(Math.PI / 4, 5, 10);
        var inverse = tx.createInverse();

        expect(inverse.scaleX).approxEquals(0.353553);
        expect(inverse.shearY).approxEquals(-0.353553);
        expect(inverse.shearX).approxEquals(0.235702);
        expect(inverse.scaleY).approxEquals(0.235702);
        expect(inverse.translateX).approxEquals(-16.213203);
        expect(inverse.translateY).approxEquals(2.928932);
      });

      test('equals and clone', (){
        var val = new AffineTransform(1,2,3,4,5,6);
        expect(val).equals(val);
        expect(val).same(val);

        var val2 = new AffineTransform(7,8,9,10,11,12);
        expect(val2 == val).isFalse();
        expect(val2 === val).isFalse();

        var val3 = new AffineTransform(1,2,3,4,5,6);
        // values equals
        expect(val3).equals(val);
        // but *not* the same object
        expect(val3 === val).isFalse();

        var clone = val.clone();
        // values equals
        expect(clone).equals(val);
        // but *not* the same object
        expect(val === clone).isFalse();

        // val3 and clone should party, too
        // values equals
        expect(val3).equals(clone);
        // but *not* the same object
        expect(clone === val3).isFalse();
      });
    });
  }
}
