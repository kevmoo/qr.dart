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
    final eLength = e.length;
    final valLength = length;
    final foo = Uint8List(valLength + eLength - 1);

    // Cache e's values to avoid operator [] calls in the inner loop
    final eValues = e._values;

    for (var i = 0; i < valLength; i++) {
      final v1 = _values[i];
      if (v1 == 0) continue;
      final log1 = qr_math.glog(v1);
      for (var j = 0; j < eLength; j++) {
        final v2 = eValues[j];
        if (v2 == 0) continue;
        foo[i + j] ^= qr_math.gexp(log1 + qr_math.glog(v2));
      }
    }

    return QrPolynomial._internal(foo);
  }

  QrPolynomial mod(QrPolynomial e) {
    final eLength = e.length;
    final valLength = length;
    if (valLength - eLength < 0) {
      return this;
    }

    final values = Uint8List.fromList(_values);
    final iterLimit = valLength - eLength + 1;

    // Cache e's values
    final eValues = e._values;
    final e0Log = qr_math.glog(eValues[0]);

    for (var i = 0; i < iterLimit; i++) {
      final v = values[i];
      if (v == 0) continue;

      final ratio = qr_math.glog(v) - e0Log;

      for (var j = 0; j < eLength; j++) {
        final eVal = eValues[j];
        if (eVal == 0) continue;
        values[i + j] ^= qr_math.gexp(qr_math.glog(eVal) + ratio);
      }
    }

    return QrPolynomial(values.sublist(valLength - eLength + 1), 0);
  }
}
