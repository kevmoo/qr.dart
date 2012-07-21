#import('../vendor/unittest/html_enhanced_config.dart');

#import('core/_core_runner.dart');
#import('property/_property_runner.dart');

main() {
  useHtmlEnhancedConfiguration();

  runCoreTests();
  runPropertyTests();
}
