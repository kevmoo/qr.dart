#import('../vendor/unittest/html_enhanced_config.dart');

#import('core/_core_runner.dart');
#import('qr/_qr_runner.dart');

main() {
  useHtmlEnhancedConfiguration();

  runCoreTests();
  runQrTests();
}
