import 'dart:typed_data';

import 'math.dart' as qr_math;

class QrPolynomial {
  final Uint8List _myThings;

  factory QrPolynomial(List<int> thing, int shift) {
    var offset = 0;

    while (offset < thing.length && thing[offset] == 0) {
      offset++;
    }

    final values = qr_math.getByteList(thing.length - offset + shift);

    for (var i = 0; i < thing.length - offset; i++) {
      values[i] = thing[i + offset];
    }

    return QrPolynomial._internal(values);
  }

  QrPolynomial._internal(this._myThings);

  int operator [](int index) => _myThings[index];

  int get length => _myThings.length;

  QrPolynomial multiply(QrPolynomial e) {
    final List<int> foo = qr_math.getByteList(length + e.length - 1);

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < e.length; j++) {
        foo[i + j] ^= qr_math.gexp(qr_math.glog(this[i]) + qr_math.glog(e[j]));
      }
    }

    return QrPolynomial(foo, 0);
  }

  QrPolynomial mod(QrPolynomial e) {
    if (length - e.length < 0) {
      return this;
    }

    var ratio = qr_math.glog(this[0]) - qr_math.glog(e[0]);

    var thing = qr_math.getByteList(length);

    for (var i = 0; i < length; i++) {
      thing[i] = this[i];
    }

    for (var i = 0; i < e.length; i++) {
      thing[i] ^= qr_math.gexp(qr_math.glog(e[i]) + ratio);
    }

    // recursive call
    return QrPolynomial(thing, 0).mod(e);
  }
}
