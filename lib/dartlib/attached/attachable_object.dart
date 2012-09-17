class AttachableObject extends DisposableImpl {
  final HashMap<Property, Object> _propertyValues =
      new HashMap<Property, Object>();
  final EventHandle<Property> _changeHandle = new EventHandle<Property>();

  void disposeInternal(){
    super.disposeInternal();
    _changeHandle.dispose();
  }

  void _set(Property key, Object value){
    assert(value !== Property.Undefined);
    _propertyValues[key] = value;
    _changeHandle.fireEvent(key);
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
      _changeHandle.fireEvent(key);
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
}
