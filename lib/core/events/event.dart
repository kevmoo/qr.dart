interface EventRoot<T> {
  GlobalId add(Action<T> handler);
  bool remove(GlobalId id);
}

// A convenience and convention for events w/ no data to send via args
class EventArgs {
  const EventArgs();
}
