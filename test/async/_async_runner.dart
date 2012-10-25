library test_bot_async;

import 'dart:isolate';
import 'package:unittest/unittest.dart';
import 'package:bot/bot.dart';
import 'package:bot/async.dart';
import 'package:bot/test.dart';

part 'test_send_port_value.dart';
part 'test_future_value_result.dart';

void runAsyncTests() {
  group('bot_async', (){
    TestSendPortValue.run();
    TestFutureValueResult.run();
  });
}
