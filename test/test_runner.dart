#import('../lib/unittest/html_config.dart');
#import('dart:html');

#import('../lib/unittest/unittest.dart');
#import('../src/_dartlib.dart');

#source('test_property_event_integration.dart');
#source('test_hello_world.dart');
#source('test_properties.dart');
#source('test_event_target.dart');
#source('test_affine_transform.dart');

main() {
  useHtmlConfiguration();

  // just here to make sure everything is working smooth
  TestHelloWorld.run();
  TestProperties.run();
  TestEventTarget.run();
  TestAffineTransform.run();
  TestPropertyEventIntegration.run();
}

class EventWatcher<T> {
  T _lastArgs = null;
  int _eventCount = 0;

  T get lastArgs(){
    return _lastArgs;
  }
  
  int get eventCount(){
    return _eventCount;
  }
  
  void handler(T args){
    _lastArgs = args;
    _eventCount++;
  }  
}
