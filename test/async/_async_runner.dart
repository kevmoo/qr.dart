#library('bot_test_async');

#import('dart:isolate');
#import('package:unittest/unittest.dart');
#import('package:bot/bot.dart');
#import('package:bot/async.dart');
#import('package:bot/test.dart');

#source('test_send_port_value.dart');
#source('test_future_value_result.dart');

void runAsyncTests() {
  group('bot_async', (){
    TestSendPortValue.run();
    TestFutureValueResult.run();
  });
}
