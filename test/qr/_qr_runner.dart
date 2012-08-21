#library('dartlib_test_core');

#import('package:unittest/unittest.dart');
#import('../../lib/dartlib.dart');
#import('../../lib/qr.dart');
#import('../../lib/test.dart');

#source('test_qr_bit_buffer.dart');
#source('test_qr_code.dart');

void runQrTests() {
  group('dartlib_qr', (){
    TestQrBitBuffer.run();
    TestQrCode.run();
  });
}
