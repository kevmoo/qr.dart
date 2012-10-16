#library('console_test_harness');

#import('package:unittest/unittest.dart');
#import('package:unittest/vm_config.dart');

#import('bot/_bot_runner.dart');
#import('qr/_qr_runner.dart');
#import('async/_async_runner.dart');

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  runBotTests();
  runAsyncTests();
  runQrTests();
}
