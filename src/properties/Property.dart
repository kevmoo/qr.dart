class Property<T> implements Hashable{
  static final Object Undefined = const _UndefinedValue();
  static int _globalId = 0;

  final int _id;
  final String name;
  final T defaultValue;

  const Property(String this.name, [T this.defaultValue = null]) :
    _id = _globalId++;

  T get(IPropertyObject obj){
    var coreValue = getCore(obj);
    if(coreValue !== Undefined){
      return coreValue;
    }
    else{
      return defaultValue;
    }
  }

  Object getCore(IPropertyObject obj){
    return obj.propertyValues._getValueOrUndefined(this);
  }

  void set(IPropertyObject obj, T value){
    if(value == Undefined){
      clear(obj);
    }
    else{
      obj.propertyValues._set(this, value);
    }
  }

  void clear(IPropertyObject obj){
    obj.propertyValues._remove(this);
  }

  bool isSet(IPropertyObject obj){
    return obj.propertyValues._isSet(this);
  }

  }

  int hashCode(){
    return _id;
  }
}

class _UndefinedValue{
  const _UndefinedValue();
  // TODO: toString?
}

