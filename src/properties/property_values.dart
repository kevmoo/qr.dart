class PropertyValues extends Disposable {
  final HashMap<Property, Object> _propertyValues;
  final EventHandle<Property> _changeHandle;

  PropertyValues() : 
    _propertyValues = new HashMap<Property, Object>(),
    _changeHandle = new EventHandle<Property>();

  void _set(Property key, Object value){
    assert(value != Property.Undefined);
    _propertyValues[key] = value;
    _changeHandle.fireEvent(this, key);
  }

  bool _isSet(Property key){
    return _propertyValues.containsKey(key);
  }

  void _remove(Property key){
    var exists = _isSet(key);
    // NOTE: remove returns the removed item, which could be null. Bleh.
    // TODO: ponder null-ish value to avoid these double access scenarios? Maybe?
    _propertyValues.remove(key);
    if(exists){
      _changeHandle.fireEvent(this, key);
    }
  }
  
  IEvent<Property> get propertyChanged(){
    return _changeHandle.event;
  }

  void disposeInternal(){
    super.disposeInternal();
    _changeHandle.dispose();
  }

  Object _getValueOrUndefined(Property key, IPropertyObject obj, Func1<IPropertyObject, Object> ifAbsent){
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
