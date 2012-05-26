#import('../lib/unittest/html_config.dart');
#import('dart:html');

#import('../lib/unittest/unittest.dart');
#import('../src/_dartlib.dart');

#source('TestHelloWorld.dart');
#source('TestProperties.dart');
#source('events/TestEventTarget.dart');
#source('graphics/TestAffineTransform.dart');

main() {
  useHtmlConfiguration();

  // just here to make sure everything is working smooth
  TestHelloWorld.run();
  TestProperties.run();
  TestEventTarget.run();
  TestAffineTransform.run();
}

