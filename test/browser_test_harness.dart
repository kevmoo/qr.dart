#import('package:unittest/html_enhanced_config.dart');

#import('package:unittest/unittest.dart');

#import('dartlib/_dartlib_runner.dart');
#import('qr/_qr_runner.dart');
#import('async/_async_runner.dart');

main() {
  groupSep = ' - ';
  useHtmlEnhancedConfiguration();

  runDartlibTests();
  runAsyncTests();
  runQrTests();
}
