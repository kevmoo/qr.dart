#import('package:unittest/unittest.dart');
#import('package:unittest/vm_config.dart');

#import('bot/_bot_runner.dart');
#import('qr/_qr_runner.dart');
#import('async/_async_runner.dart');

main() {
  groupSep = ' - ';
  useVmConfiguration();

  runBotTests();
  runAsyncTests();
  runQrTests();
}
