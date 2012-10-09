class EventHandle<T> extends DisposableImpl implements EventRoot<T> {
  HashMap<GlobalId, Action1<T>> _handlers;

  void fireEvent(T args){
    assert(!isDisposed);
    if(_handlers != null){
      _handlers.forEach((GlobalId id, Action1<T> handler){
        handler(args);
      });
    }
  }

  /**
   * _I'm not a huge fan of returning a [GlobalId] but at the moment
   * functions don't have a simple model for identity. [GlobalId] allows
   * reliable removal of an added handler._
   *
   * Related dart bug [167](http://code.google.com/p/dart/issues/detail?id=167)
   */
  GlobalId add(Action1<T> handler){
    assert(!isDisposed);
    var id = new GlobalId();
    if(_handlers == null){
      _handlers = new HashMap<GlobalId, Action1<T>>();
    }
    _handlers[id] = handler;
    return id;
  }

  bool remove(GlobalId id){
    if(_handlers != null){
      return _handlers.remove(id) != null;
    }
    else{
      return false;
    }
  }

  void disposeInternal(){
    super.disposeInternal();
    if(_handlers != null){
      _handlers.clear();
      _handlers = null;
    }
  }
}
