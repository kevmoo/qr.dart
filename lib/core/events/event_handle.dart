class EventHandle<T> extends Disposable implements EventRoot<T> {
  HashMap<GlobalId, Action<T>> _handlers;
    
  void fireEvent(Object sender, T args){
    assert(!isDisposed);
    if(_handlers != null){
      _handlers.forEach((GlobalId id, Action<T> handler){
        handler(args);
      });
    }
  }
  
  GlobalId add(Action<T> handler){
    assert(!isDisposed);
    var id = new GlobalId();
    if(_handlers == null){
      _handlers = new HashMap<GlobalId, Action<T>>();
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
