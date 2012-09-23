#library('dartlib_test_async');

#import('dart:isolate');
#import('package:unittest/unittest.dart');
#import('../../lib/dartlib.dart');
#import('../../lib/async.dart');
#import('../../lib/test.dart');

#source('test_send_port_value.dart');
#source('test_future_value_result.dart');

void runAsyncTests() {
  group('dartlib_async', (){
    TestSendPortValue.run();
    TestFutureValueResult.run();
  });
}
