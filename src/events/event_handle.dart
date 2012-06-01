class EventHandle<T> extends Disposable {
  _PEvent<T> _event;
  
  EventRoot<T> get event(){
    assert(!isDisposed);
    if(_event == null){
      _event = new _PEvent<T>._internal();
    }
    return _event;
  }
  
  void fireEvent(Object sender, T args){
    if(_event != null){
      _event._fireEvent(sender, args);
    }
  }

  int get handlerCount(){
    if(_event == null){
      return 0;
    }
    else{
      return _event._handlers.length;
    }
  }

  void disposeInternal(){
    super.disposeInternal();
    if(_event != null){
      var e = _event;
      _event = null;
      e.dispose();
    }
  }
}

class _PEvent<T> extends Disposable implements EventRoot<T> {
  final HashMap<GlobalId, Action<T>> _handlers;

  _PEvent._internal() : _handlers = new HashMap<GlobalId, Action<T>>();
  
  GlobalId add(Action<T> handler){
    assert(!isDisposed);
    var id = new GlobalId();
    _handlers[id] = handler;
    return id;
  }

  bool remove(GlobalId id){
    return _handlers.remove(id) != null;
  }
  
  void disposeInternal(){
    super.disposeInternal();
    _handlers.clear();
  }

  void _fireEvent(Object sender, T args){
    assert(!isDisposed);
    _handlers.forEach((GlobalId id, Action<T> handler){
      handler(args);
    });
  }
}
