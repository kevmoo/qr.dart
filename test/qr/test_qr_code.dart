part of test_bot_qr;

class TestQrCode {
  static void run() {
    group('QrCode', () {
      test('simple', _testSimple);
    });
  }

  static void _testSimple() {
    for(int typeNumber = 1; typeNumber <= 10; typeNumber++){
      for(final quality in QrErrorCorrectLevel.levels) {
        final code = new QrCode(typeNumber, quality);
        code.addData("kevin!");
        code.make();
      }
    }
  }
}
