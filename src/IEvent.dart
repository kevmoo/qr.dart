interface IEvent<T> {
  GlobalId add(EventHandler<T> handler);
  bool remove(GlobalId id);
}

class EventArgs {
  const EventArgs();
}

class EventHandle<T> {
  _PEvent<T> _event;
  
  IEvent<T> get event(){
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
}

typedef EventHandler<T>(Object sender, T args);

class _PEvent<T> implements IEvent<T> {
  final HashMap<GlobalId, EventHandler<T>> _handlers;

  _PEvent._internal() : _handlers = new HashMap<GlobalId, EventHandler<T>>();
  
  GlobalId add(EventHandler<T> handler){
    var id = new GlobalId();
    _handlers[id] = handler;
    return id;
  }

  bool remove(GlobalId id){
    return _handlers.remove(id) != null;
  }
  
  void _fireEvent(Object sender, T args){
    _handlers.forEach((GlobalId id, EventHandler<T> handler){
      handler(sender, args);
    });
  }
}
