class AttachedEvent<T> extends Attachable {

  const AttachedEvent(String name) : super(name);

  GlobalId addHandler(AttachableObject obj, Action1<T> handler) {
    return _AttachableEventHelper.addHandler(obj, this, handler);
  }

  bool removeHandler(AttachableObject obj, GlobalId handlerId) {
    return _AttachableEventHelper.removeHandler(obj, this, handlerId);
  }

  void fireEvent(AttachableObject obj, T args) {
    _AttachableEventHelper.fireEvent(obj, this, args);
  }
}
