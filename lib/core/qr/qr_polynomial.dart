class QrPolynomial {
  final List<int> _myThings;

  QrPolynomial._internal(this._myThings);

  factory	QrPolynomial(List<int> thing, int shift) {

    var offset = 0;

    while (offset < thing.length && thing[offset] == 0) {
      offset++;
    }

    final List<int> values = QrMath.getZeroedList(thing.length - offset + shift);

    for (var i = 0; i < thing.length - offset; i++) {
      values[i] = thing[i + offset];
    }

    return new QrPolynomial._internal(values);
  }

  operator [](int index) => _myThings[index];

  int get length() => _myThings.length;

  QrPolynomial multiply(QrPolynomial e) {

    final List<int> foo = QrMath.getZeroedList(length + e.length - 1);

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < e.length; j++) {
        foo[i + j] ^= QrMath.gexp(QrMath.glog(this[i]) + QrMath.glog(e[j]));
      }
    }

    return new QrPolynomial(foo, 0);
  }

  QrPolynomial mod(QrPolynomial e) {

    if (length - e.length < 0) {
      return this;
    }

    var ratio = QrMath.glog(this[0]) - QrMath.glog(e[0]);

    var thing = QrMath.getZeroedList(length);

    for (int i = 0; i < length; i++) {
      thing[i] = this[i];
    }

    for (int i = 0; i < e.length; i++) {
      thing[i] ^= QrMath.gexp(QrMath.glog(e[i]) + ratio);
    }

    // recursive call
    return (new QrPolynomial(thing, 0)).mod(e);
  }
}
