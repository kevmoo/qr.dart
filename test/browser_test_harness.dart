#import('package:unittest/html_enhanced_config.dart');

#import('package:unittest/unittest.dart');

#import('bot/_bot_runner.dart');
#import('qr/_qr_runner.dart');
#import('async/_async_runner.dart');

main() {
  groupSep = ' - ';
  useHtmlEnhancedConfiguration();

  runBotTests();
  runAsyncTests();
  runQrTests();
}
