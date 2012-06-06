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
