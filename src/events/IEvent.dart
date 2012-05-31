interface IEvent<T> {
  GlobalId add(EventHandler<T> handler);
  bool remove(GlobalId id);
}

typedef EventHandler<T>(Object sender, T args);

// A convenience and convention for events w/ no data to send via args
class EventArgs {
  const EventArgs();
}
