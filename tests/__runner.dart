#import('../unittest/html_config.dart');
#import('_tests.dart');

main() {
  useHtmlConfiguration();

  // just here to make sure everything is working smooth
  TestHelloWorld.run();
  TestProperties.run();
  TestEventTarget.run();
  TestAffineTransform.run();
}

