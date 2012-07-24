#library('dartlib_test_async');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/dartlib.dart');
#import('../../lib/async.dart');
#import('../../lib/test.dart');

#source('test_send_port_value.dart');

void runAsyncTests() {
  group('dartlib_async', (){
    TestSendPortValue.run();
  });
}
