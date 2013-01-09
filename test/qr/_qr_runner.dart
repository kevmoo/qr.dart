library test_bot_qr;

import 'package:bot/bot.dart';
import 'package:bot/bot_test.dart';
import 'package:qr/qr.dart';
import 'package:unittest/unittest.dart';

part 'test_qr_bit_buffer.dart';
part 'test_qr_code.dart';

void runQrTests() {
  group('bot_qr', (){
    TestQrBitBuffer.run();
    TestQrCode.run();
  });
}
