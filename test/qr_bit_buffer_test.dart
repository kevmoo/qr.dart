import 'dart:math' as math;

import 'package:checks/checks.dart';
import 'package:qr/src/bit_buffer.dart';
import 'package:test/scaffolding.dart';

void main() {
  test('simple', _testSimple);
  test('complex', _testComplex);
  test('getByte', _testGetByte);
  test('buffer expansion', _testBufferExpansion);
}

void _testGetByte() {
  var bb = QrBitBuffer()..put(12, 8);
  check(bb.getByte(0)).equals(12);

  bb = QrBitBuffer()..put(42, 8);
  check(bb.getByte(0)).equals(42);

  bb.put(19, 8);
  check(bb.getByte(1)).equals(19);
}

void _testComplex() {
  var bb = QrBitBuffer()..put(0, 8);
  check(bb.toString()).equals('00000000');

  bb = QrBitBuffer()..put(1, 8);
  check(bb.toString()).equals('00000001');

  bb = QrBitBuffer()..put(255, 8);
  check(bb.toString()).equals('11111111');

  bb = QrBitBuffer()..put(256, 8);
  check(bb.toString()).equals('00000000');

  bb = QrBitBuffer()..put(256, 9);
  check(bb.toString()).equals('100000000');
}

final _rnd = math.Random();

void _testSimple() {
  final bb = QrBitBuffer();
  final sampleBits = <bool>[];

  for (var i = 0; i < 100; i++) {
    final b = _rnd.nextBool();
    sampleBits.add(b);
    bb.put(b ? 1 : 0, 1);
  }

  check(bb.toString()).equals(sampleBits.map((b) => b ? '1' : '0').join());
}

void _testBufferExpansion() {
  final buffer = QrBitBuffer()..put(0, 10000);
  check(buffer.length).equals(10000);
}
