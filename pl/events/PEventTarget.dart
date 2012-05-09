class PEventTarget {

  Events _on;

  Events get on() {
    if (_on === null) {
      _on = new _eventsImpl();
    }
    return _on;
  }

  void dispatchEvent(String eventName){
    var e = new Event(eventName);
    on[eventName].dispatch(e);
  }

  void addEventListener(String eventName, EventListener listener){
    on[eventName].add(listener);
  }

  void removeEventListener(String eventName, EventListener listener){
    var huh = on[eventName].remove(listener);
  }
}
