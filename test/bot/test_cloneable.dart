class TestCloneable implements Cloneable<TestCloneable> {
  static int _globalId = 0;
  final int _id;

  TestCloneable.internal(this._id);

  factory TestCloneable(){
    return new TestCloneable.internal(_globalId++);
  }

  TestCloneable clone(){
    return new TestCloneable.internal(_id);
  }

  int get id => _id;

  bool operator ==(TestCloneable other) {
    return other !== null && _id == other._id;
  }

  String toString() => 'TestCloneable: ${_id}';

  static void run(){
    test('Cloneable', _test);
  }

  static void _test(){
    var val = new TestCloneable();

    expect(val, equals(val));
    expect(val, same(val));

    var val2 = new TestCloneable();

    expect(val2.id == val.id, isFalse);
    expect(val2 == val, isFalse);
    expect(val2, isNot(same(val)));

    var clone = val.clone();
    expect(clone.id, equals(val.id));
    expect(clone, equals(val));
    expect(val, isNot(same(clone)));

  }
}
