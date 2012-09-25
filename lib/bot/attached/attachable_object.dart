class AttachableObject extends DisposableImpl {
  final HashMap<Property, Object> _propertyValues =
      new HashMap<Property, Object>();

  final HashMap<Attachable, EventHandle> _eventHandlers =
      new HashMap<Attachable, EventHandle>();

  void disposeInternal(){
    super.disposeInternal();
    //TODO: dispose of _eventHandlers
  }

  GlobalId _addHandler(Attachable property, Action1 watcher) {
    var handle = _eventHandlers.putIfAbsent(property, () => new EventHandle());
    return handle.add(watcher);
  }

  bool _removeHandler(Attachable property, GlobalId handlerId){
    requireArgumentNotNull(handlerId, 'handlerId');
    var handle = _eventHandlers[property];
    if(handle != null){
      return handle.remove(handlerId);
    }
    return false;
  }

  void _fireEvent(Attachable attachable, Dynamic args) {
    var handle = _eventHandlers[attachable];
    if(handle != null){
      handle.fireEvent(args);
    }
  }

  void _set(Property key, Object value){
    assert(value !== Property.Undefined);
    _propertyValues[key] = value;
    _fireChange(key);
  }

  bool _isSet(Property key){
    return _propertyValues.containsKey(key);
  }

  void _remove(Property key){
    var exists = _isSet(key);
    if(exists){
      // NOTE: remove returns the removed item, which could be null. Bleh.
      // TODO: ponder null-ish value to avoid these double access scenarios? Maybe?
      _propertyValues.remove(key);
      _fireChange(key);
    }
  }

  Object _getValueOrUndefined(
                              Property key,
                              AttachableObject obj,
                              Func1<AttachableObject, Object> ifAbsent){
    if(_isSet(key)){
      return _propertyValues[key];
    }
    else if(ifAbsent != null){
      var value = ifAbsent(obj);
      _set(key, value);
      return value;
    }
    else{
      return Property.Undefined;
    }
  }

  void _fireChange(Property key) {
    var handle = _eventHandlers[key];
    if(handle != null){
      handle.fireEvent(key);
    }
  }
}
