class _AttachableEventHelper {
  // TODO: once we can define static final with 'new' instead of 'const', we can nuke the property redirection
  // TODO: 2012-08-18: Not sure what I meant by this when I wrote it :-/
  static final Property<_AttachableEventHelper> _attachableEventHelperProperty =
      const Property<_AttachableEventHelper>("_attachableEventHelperProperty");

  final NoneHashMap<Attachable, EventHandle> _handlers;
  final GlobalId _propertyChangeHandleId;

  _AttachableEventHelper(this._propertyChangeHandleId) :
    _handlers = new NoneHashMap<Attachable, EventHandle>();

  static _AttachableEventHelper createInstance(AttachableObject obj){
    // We're special-casing property change events here. Convenient.
    var handlerId = obj.propertyValues.propertyChanged.add((property){
      fireEvent(obj, property, property);
    });
    return new _AttachableEventHelper(handlerId);
  }

  static GlobalId addHandler(AttachableObject obj, Attachable property, Action1 watcher){
    var helper = _attachableEventHelperProperty.get(obj, createInstance);
    var handle = helper._handlers.putIfAbsent(property, () => new EventHandle());
    return handle.add(watcher);
  }

  static bool removeHandler(AttachableObject obj, Attachable property, GlobalId handlerId){
    requireArgumentNotNull(obj, 'obj');
    requireArgumentNotNull(handlerId, 'handlerId');
    final helper = _attachableEventHelperProperty.get(obj);
    if(helper != null) {
      var handle = helper._handlers[property];
      if(handle != null){
        return handle.remove(handlerId);
      }
    }
    return false;
  }

  static void fireEvent(AttachableObject obj,
                        Attachable attachable, Dynamic args) {
    var helper = _attachableEventHelperProperty.get(obj);
    var handle = helper._handlers[attachable];
    if(handle != null){
      handle.fireEvent(args);
    }
  }
}
