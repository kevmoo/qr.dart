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

    // Use a copy of _values that we will mutate
    // We only need the part that will remain after modulo?
    // Actually, standard polynomial division.
    // We can work on a copy of `this._values` and zero out leading terms.

    final values = Uint8List.fromList(_values);

    for (var i = 0; i < values.length - e.length + 1; i++) {
      final v = values[i];
      if (v == 0) continue;

      final ratio = qr_math.glog(v) - qr_math.glog(e[0]);

      for (var j = 0; j < e.length; j++) {
        final eVal = e[j];
        if (eVal == 0) continue;
        values[i + j] ^= qr_math.gexp(qr_math.glog(eVal) + ratio);
      }
    }

    // The result is the remainder, which is the last e.length - 1 coefficients?
    // Wait, the degree of remainder is less than degree of divisor (e).
    // e.length is e.degree + 1.
    // So remainder length is e.length - 1.

    // Find where the remainder starts.
    // In the loop above, we zeroed out terms from 0 to
    // `values.length - e.length`.
    // So the remainder starts at values.length - e.length + 1?
    // No, we iterated i from 0 to diff.
    // The loop eliminates the term at `i`.
    // The last `i` is `values.length - e.length`.
    // After that, the terms from `0` to `values.length - e.length` should be 0.
    // The remainder is at the end.

    // Note: The original implementation used `offset` to skip leading zeros.
    // `offset` increased when `values[offset] == 0`.
    // My loop enforces `values[i]` becomes 0 (arithmetically, though likely not
    // exactly 0 due to XOR, wait XOR equal things is 0).

    // Let's manually increment offset to match original logic if needed,
    // or just slice the end.
    // The remainder should fit in e.length - 1.

    // We can just return the tail.
    // But we need to handle leading zeros in the result too?
    // `QrPolynomial` constructor handles leading zeros.

    return QrPolynomial(values.sublist(values.length - e.length + 1), 0);
  }
}
