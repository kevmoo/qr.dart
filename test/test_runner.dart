#import('../lib/unittest/html_config.dart');

#import('core/_core_runner.dart');
#import('experimental/_experimental_runner.dart');

main() {
  useHtmlConfiguration();

  runCoreTests();
  runExperimentalTests();
}
