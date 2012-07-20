class TestQrBitBuffer {
  static void run() {
    group('QrBitBuffer', () {
      test('simple', _testSimple);
      test('complex', _testComplex);
    });
  }

  static void _testComplex() {
    var bb = new QrBitBuffer();
    bb.put(0, 8);
    expect(bb, orderedEquals([false, false, false, false, false, false, false, false]));

    bb = new QrBitBuffer();
    bb.put(1, 8);
    expect(bb, orderedEquals([false, false, false, false, false, false, false, true]));

    bb = new QrBitBuffer();
    bb.put(255, 8);
    expect(bb, orderedEquals([true, true, true, true, true, true, true, true]));

    bb = new QrBitBuffer();
    bb.put(256, 8);
    expect(bb, orderedEquals([false, false, false, false, false, false, false, false]));

    bb = new QrBitBuffer();
    bb.put(256, 9);
    expect(bb, orderedEquals([true, false, false, false, false, false, false, false, false]));
  }

  static void _testSimple() {
    final bb = new QrBitBuffer();
    final sampleBits = new List<bool>();

    for(int i = 0; i < 10; i++) {
      final b = Math.random() > 0.5;
      sampleBits.add(b);
      bb.putBit(b);
    }

    expect(bb, orderedEquals(sampleBits));

  }
}
