#library('dartlib_test_async');

#import('dart:isolate');
#import('package:unittest/unittest.dart');
#import('package:bot/dartlib.dart');
#import('package:bot/async.dart');
#import('package:bot/test.dart');

#source('test_send_port_value.dart');
#source('test_future_value_result.dart');

void runAsyncTests() {
  group('dartlib_async', (){
    TestSendPortValue.run();
    TestFutureValueResult.run();
  });
}
