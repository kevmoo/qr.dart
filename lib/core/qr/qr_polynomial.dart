class QrPolynomial {
  List _myThings;

	QrPolynomial(List<int> thing, shift) {

    var offset = 0;

    while (offset < thing.length && thing[offset] == 0) {
      offset++;
    }

    _myThings = QrMath.getZeroedList(thing.length - offset + shift);

    for (var i = 0; i < thing.length - offset; i++) {
      _myThings[i] = thing[i + offset];
    }
  }

  operator [](int index) => _myThings[index];

  int get length() => _myThings.length;

  QrPolynomial multiply(QrPolynomial e) {

    List foo = QrMath.getZeroedList(length + e.length - 1);

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < e.length; j++) {
        foo[i + j] ^= QrMath.gexp(QrMath.glog(this[i]) + QrMath.glog(e[j]));
      }
    }

    return new QrPolynomial(foo, 0);
  }

  QrPolynomial mod(e) {

    if (length - e.length < 0) {
      return this;
    }

    var ratio = QrMath.glog(this[0]) - QrMath.glog(e[0]);

    var thing = QrMath.getZeroedList(length);

    for (int i = 0; i < length; i++) {
      thing[i] = this[i];
    }

    for (int i = 0; i < e.getLength(); i++) {
      thing[i] ^= QrMath.gexp(QrMath.glog(e[i]) + ratio);
    }

    // recursive call
    return (new QrPolynomial(thing, 0)).mod(e);
  }
}
