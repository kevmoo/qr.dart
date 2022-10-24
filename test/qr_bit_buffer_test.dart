import 'dart:math' as math;

import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('simple', _testSimple);
  test('complex', _testComplex);
  test('getByte', _testGetByte);
}

void _testGetByte() {
  var bb = QrBitBuffer()..put(12, 8);
  expect(bb.getByte(0), equals(12));

  bb = QrBitBuffer()..put(42, 8);
  expect(bb.getByte(0), equals(42));

  bb.put(19, 8);
  expect(bb.getByte(1), equals(19));
}

void _testComplex() {
  var bb = QrBitBuffer()..put(0, 8);
  expect(
    bb,
    orderedEquals([false, false, false, false, false, false, false, false]),
  );

  bb = QrBitBuffer()..put(1, 8);
  expect(
    bb,
    orderedEquals([false, false, false, false, false, false, false, true]),
  );

  bb = QrBitBuffer()..put(255, 8);
  expect(bb, orderedEquals([true, true, true, true, true, true, true, true]));

  bb = QrBitBuffer()..put(256, 8);
  expect(
    bb,
    orderedEquals([false, false, false, false, false, false, false, false]),
  );

  bb = QrBitBuffer()..put(256, 9);
  expect(
    bb,
    orderedEquals(
      [true, false, false, false, false, false, false, false, false],
    ),
  );
}

final _rnd = math.Random();

void _testSimple() {
  final bb = QrBitBuffer();
  final sampleBits = <bool>[];

  for (var i = 0; i < 100; i++) {
    final b = _rnd.nextBool();
    sampleBits.add(b);
    bb.putBit(b);
  }

  expect(bb, orderedEquals(sampleBits));
}
