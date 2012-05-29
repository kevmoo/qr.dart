interface IPropertyObject {
  PropertyValues get propertyValues();
}

class PropertyValues{
  final HashMap<Property, Object> _propertyValues;

  PropertyValues() : _propertyValues = new HashMap<Property, Object>();

  void _set(Property key, Object value){
    _propertyValues[key] = value;
  }

  bool _isSet(Property key){
    return _propertyValues.containsKey(key);
  }

  void _remove(Property key){
    _propertyValues.remove(key);
  }

  Object _getValueOrUndefined(Property key, Func<Object> ifAbsent){
    if(_isSet(key)){
      return _propertyValues[key];
    }
    else if(ifAbsent != null){
      var value = ifAbsent();
      _set(key, value);
      return value;
    }
    else{
      return Property.Undefined;
    }
  }
}
