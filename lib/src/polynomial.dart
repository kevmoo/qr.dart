import 'dart:typed_data';

import 'math.dart' as qr_math;

class QrPolynomial {
  final Uint8List _values;

  factory QrPolynomial(List<int> thing, int shift) {
    var offset = 0;

    while (offset < thing.length && thing[offset] == 0) {
      offset++;
    }

    final values = Uint8List(thing.length - offset + shift);

    for (var i = 0; i < thing.length - offset; i++) {
      values[i] = thing[i + offset];
    }

    return QrPolynomial._internal(values);
  }

  QrPolynomial._internal(this._values);

  int operator [](int index) => _values[index];

  int get length => _values.length;

  QrPolynomial multiply(QrPolynomial e) {
    final List<int> foo = Uint8List(length + e.length - 1);

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

    final ratio = qr_math.glog(this[0]) - qr_math.glog(e[0]);

    final value = Uint8List(length);

    for (var i = 0; i < length; i++) {
      value[i] = this[i];
    }

    for (var i = 0; i < e.length; i++) {
      value[i] ^= qr_math.gexp(qr_math.glog(e[i]) + ratio);
    }

    // recursive call
    return QrPolynomial(value, 0).mod(e);
  }
}
