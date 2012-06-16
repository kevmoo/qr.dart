#import('../vendor/unittest/html_enhanced_config.dart');

#import('core/_core_runner.dart');
#import('experimental/_experimental_runner.dart');

main() {
  useHtmlEnhancedConfiguration();

  runCoreTests();
  runExperimentalTests();
}
