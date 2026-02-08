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
    final foo = Uint8List(length + e.length - 1);

    for (var i = 0; i < length; i++) {
      final v1 = _values[i];
      if (v1 == 0) continue;
      final log1 = qr_math.glog(v1);
      for (var j = 0; j < e.length; j++) {
        final v2 = e[j];
        if (v2 == 0) continue;
        foo[i + j] ^= qr_math.gexp(log1 + qr_math.glog(v2));
      }
    }

    return QrPolynomial._internal(foo);
  }

  QrPolynomial mod(QrPolynomial e) {
    if (length - e.length < 0) {
      return this;
    }

    final values = Uint8List.fromList(_values);
    var offset = 0;

    while (values.length - offset >= e.length) {
      final v = values[offset];
      if (v == 0) {
        offset++;
        continue;
      }
      final ratio = qr_math.glog(v) - qr_math.glog(e[0]);

      for (var i = 0; i < e.length; i++) {
        final eVal = e[i];
        if (eVal == 0) continue;
        values[offset + i] ^= qr_math.gexp(qr_math.glog(eVal) + ratio);
      }
    }

    return QrPolynomial(values.sublist(offset), 0);
  }
}
