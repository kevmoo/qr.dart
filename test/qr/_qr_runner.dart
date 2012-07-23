#library('dartlib_test_core');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core.dart');
#import('../../lib/qr.dart');
#import('../../lib/test.dart');

#source('test_qr_bit_buffer.dart');
#source('test_qr_code.dart');

void runQrTests() {
  group('qr', (){
    TestQrBitBuffer.run();
    TestQrCode.run();
  });
}
