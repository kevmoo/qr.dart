part of bot;

abstract class EventRoot<T> {
  GlobalId add(Action1<T> handler);
  bool remove(GlobalId id);
}
