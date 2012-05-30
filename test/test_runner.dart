#import('../lib/unittest/html_config.dart');
#import('dart:html');

#import('../lib/unittest/unittest.dart');
#import('../src/_dartlib.dart');

#source('TestPropertyEventIntegration.dart');
#source('TestHelloWorld.dart');
#source('TestProperties.dart');
#source('TestEventTarget.dart');
#source('TestAffineTransform.dart');

main() {
  useHtmlConfiguration();

  // just here to make sure everything is working smooth
  TestHelloWorld.run();
  TestProperties.run();
  TestEventTarget.run();
  TestAffineTransform.run();
  TestPropertyEventIntegration.run();
}

