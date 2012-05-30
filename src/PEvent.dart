interface IEvent<T> {
  GlobalId add(EventHandler<T> handler);
  bool remove(GlobalId id);
}

class PEvent<T> implements IEvent<T> {
  final HashMap<GlobalId, EventHandler<T>> _handlers;

  PEvent._internal() : _handlers = new HashMap<GlobalId, EventHandler<T>>();
  
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

class EventArgs {
  const EventArgs();
}

class EventHandle<T> {
  // TODO: ponder creating event instance on-demand
  final PEvent<T> event;
  
  EventHandle() : event = new PEvent<T>._internal();

  void fireEvent(Object sender, T args){
    event._fireEvent(sender, args);
  }

  int get handlerCount(){
    return event._handlers.length;
  }
}

typedef EventHandler<T>(Object sender, T args);
