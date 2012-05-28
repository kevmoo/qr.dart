class Property<T> implements Hashable{
  static final Object Undefined = const UndefinedValue();
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

  void set(IPropertyObject obj, T value){
    if(value == Undefined){
      clear(obj);
    }
    else{
      obj.propertyValues[this] = value;
    }
  }

  void clear(IPropertyObject obj){
    obj.propertyValues.remove(this);
  }

  bool isSet(IPropertyObject obj){
    return obj.propertyValues.containsKey(this);
  }

  Object getCore(IPropertyObject obj){
    if(isSet(obj)){
      return obj.propertyValues[this];
    }
    else{
      return Undefined;
    }
  }

  int hashCode(){
    return _id;
  }
}

class UndefinedValue{
  const UndefinedValue();
}