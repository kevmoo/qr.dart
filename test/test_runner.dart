#import('../lib/unittest/html_config.dart');
#import('dart:html');

#import('../lib/unittest/unittest.dart');
#import('../src/experimental/_experimental.dart');
#import('../src/core/_core.dart');

#source('test_property_event_integration.dart');
#source('test_hello_world.dart');
#source('test_properties.dart');
#source('test_events.dart');
#source('test_affine_transform.dart');
#source('math/test_coordinate.dart');
#source('math/test_vec2.dart');

main() {
  useHtmlConfiguration();

  // just here to make sure everything is working smooth
  TestHelloWorld.run();
  TestProperties.run();
  TestEvents.run();
  TestAffineTransform.run();
  TestPropertyEventIntegration.run();
  TestCoordinate.run();
  TestVec2.run();
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
