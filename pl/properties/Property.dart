class Property implements Hashable{
  static final Object Undefined = const UndefinedValue();
  static int _globalId = 0;

  final int _id;
  final String name;
  final Object defaultValue;
  
  const Property(this.name, [this.defaultValue = Undefined]) :
    _id = _globalId++;
  
  Object get(IPropertyObject obj){
    var coreValue = getCore(obj);
    if(coreValue !== Undefined){
      return coreValue;
    }
    else{
      return defaultValue;
    }
  }
  
  void set(IPropertyObject obj, Object value){
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