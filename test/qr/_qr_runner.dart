library test_bot_qr;

import 'package:unittest/unittest.dart';
import 'package:bot/bot.dart';
import 'package:bot/qr.dart';
import 'package:bot/test.dart';

part 'test_qr_bit_buffer.dart';
part 'test_qr_code.dart';

void runQrTests() {
  group('bot_qr', (){
    TestQrBitBuffer.run();
    TestQrCode.run();
  });
}
