class TestAffineTransform {
  static void run(){
    group('AffineTransform', (){

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
        tx.rotate(math.PI / 2, 1, 1);

        expect(tx.scaleX, closeTo(3, 0.001));
        expect(tx.shearY, closeTo(4, 0.001));
        expect(tx.shearX, closeTo(-1, 0.001));
        expect(tx.scaleY, closeTo(-2, 0.001));
        expect(tx.translateX, closeTo(7, 0.001));
        expect(tx.translateY, closeTo(10, 0.001));
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
        var tx = new AffineTransform.fromScale(2, 3);
        tx.translate(5, 10);
        tx.rotate(math.PI / 4, 5, 10);
        var inverse = tx.createInverse();

        expect(inverse.scaleX, closeTo(0.353553, 0.001));
        expect(inverse.shearY, closeTo(-0.353553, 0.001));
        expect(inverse.shearX, closeTo(0.235702, 0.001));
        expect(inverse.scaleY, closeTo(0.235702, 0.001));
        expect(inverse.translateX, closeTo(-16.213203, 0.001));
        expect(inverse.translateY, closeTo(2.928932, 0.001));
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
