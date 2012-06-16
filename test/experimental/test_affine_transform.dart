class TestAffineTransform {
  static void run(){
    group('AffineTransform -- ', (){

      test('identity', () {
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        expect(tx.isIdentity, isFalse);

        tx.setTransform(1, 0, 0, 1, 0, 0);
        expect(tx.isIdentity, isTrue);

        tx = new AffineTransform();
        expect(tx.isIdentity, isTrue);
      });

      test('concatenate', () {
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.concatenate(new AffineTransform(2, 1, 6, 5, 4, 3));

        expect(tx.scaleX, equals(5));
        expect(tx.shearY, equals(8));
        expect(tx.shearX, equals(21));
        expect(tx.scaleY, equals(32));
        expect(tx.translateX, equals(18));
        expect(tx.translateY, equals(26));
      });

      test('rotate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.rotate(Math.PI / 2, 1, 1);

        Expect.approxEquals(3, tx.scaleX);
        Expect.approxEquals(4, tx.shearY);
        Expect.approxEquals(-1, tx.shearX);
        Expect.approxEquals(-2, tx.scaleY);
        Expect.approxEquals(7, tx.translateX);
        Expect.approxEquals(10, tx.translateY);
      });

      test('translate', (){
        var tx = new AffineTransform(1, 2, 3, 4, 5, 6);
        tx.translate(2, 3);

        expect(tx.scaleX, equals(1));
        expect(tx.shearY, equals(2));
        expect(tx.shearX, equals(3));
        expect(tx.scaleY, equals(4));
        expect(tx.translateX, equals(16));
        expect(tx.translateY, equals(22));
      });

      test('createInverse', (){
        var tx = AffineTransform.getScaleInstance(2, 3);
        tx.translate(5, 10);
        tx.rotate(Math.PI / 4, 5, 10);
        var inverse = tx.createInverse();

        Expect.approxEquals(0.353553, inverse.scaleX);
        Expect.approxEquals(-0.353553, inverse.shearY);
        Expect.approxEquals(0.235702, inverse.shearX);
        Expect.approxEquals(0.235702, inverse.scaleY);
        Expect.approxEquals(-16.213203, inverse.translateX);
        Expect.approxEquals(2.928932, inverse.translateY);
      });

      test('equals and clone', (){
        var val = new AffineTransform(1,2,3,4,5,6);
        expect(val, equals(val));
        expect(val, same(val));

        var val2 = new AffineTransform(7,8,9,10,11,12);
        expect(val2, isNot(equals(val)));
        expect(val2, isNot(same(val)));

        var val3 = new AffineTransform(1,2,3,4,5,6);
        // values equals
        expect(val3, equals(val));
        // but *not* the same object
        expect(val3, isNot(same(val)));

        var clone = val.clone();
        // values equals
        expect(clone, equals(val));
        // but *not* the same object
        expect(val, isNot(same(clone)));

        // val3 and clone should party, too
        // values equals
        expect(val3, equals(clone));
        // but *not* the same object
        expect(clone, isNot(same(val3)));
      });
    });
  }
}
