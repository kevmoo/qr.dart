interface EventRoot<T> {
  GlobalId add(Action1<T> handler);
  bool remove(GlobalId id);
}
