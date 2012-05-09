// shamelessly copied with love
// http://try.dartlang.org/s/yQUk
// 2012-05-08

class _eventsImpl implements Events {
  Map<String, EventListenerList> _listenerMap;

  _eventsImpl() {
    _listenerMap = new Map<String, EventListenerList>();
  }

  EventListenerList operator [](String type) {
    return _listenerMap.putIfAbsent(type.toLowerCase(),
      () => new _eventListenerListImpl());
  }
}

class _eventListenerListImpl implements EventListenerList {
  List<EventListener> _listenerList;

  _eventListenerListImpl() {
    _listenerList = new List<EventListener>();
  }

  EventListenerList add(EventListener handler, [bool useCapture]) {
    // useCapture is ignored.
    _listenerList.add(handler);
  }

  EventListenerList remove(EventListener handler, [bool useCapture]) {
    // useCapture is ignored.
    while (true) {
      int i = _listenerList.indexOf(handler);
      if (i == -1) {
        break;
      }
      _listenerList.removeRange(i, 1);
    }
  }

  bool dispatch(Event event) {
    // TODO where the returned bool should come from?
    _listenerList.forEach(f(EventListener handler) => handler(event));
    return true;
  }
}
