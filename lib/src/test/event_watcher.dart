part of bot_test;

class EventWatcher<T> {
  T _lastArgs = null;
  int _eventCount = 0;

  T get lastArgs => _lastArgs;

  int get eventCount => _eventCount;

  void handler(T args){
    _lastArgs = args;
    _eventCount++;
  }
}
