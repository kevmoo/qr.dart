class TestQrCode {
  static void run() {
    group('QrCode', () {
      test('simple', _testSimple);
    });
  }

  static void _testSimple() {
    final typeNumber = 10;
    final code = new QrCode(typeNumber, QrErrorCorrectLevel.Q);
    code.addData("kevin!");
    code.make();

  }

}
