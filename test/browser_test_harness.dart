#import('package:unittest/html_enhanced_config.dart');

#import('dartlib/_dartlib_runner.dart');
#import('qr/_qr_runner.dart');

main() {
  useHtmlEnhancedConfiguration();

  runDartlibTests();
  runQrTests();
}
