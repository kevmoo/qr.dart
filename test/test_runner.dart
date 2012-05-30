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

class EventWatcher<T> {
  Object _lastSender = null;
  T _lastArgs = null;
  int _eventCount = 0;

  Object get lastSender(){
    return _lastSender;
  }
  
  T get lastArgs(){
    return _lastArgs;
  }
  
  int get eventCount(){
    return _eventCount;
  }
  
  void handler(Object sender, T args){
    _lastSender = sender;
    _lastArgs = args;
    _eventCount++;
  }  
}
