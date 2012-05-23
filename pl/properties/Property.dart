class Property implements Hashable{
  static final Object Undefined = const UndefinedValue();
  static int _globalId = 0;

  final int _id;
  final String name;
  final Object defaultValue;
  
  Property._internal(this.name, this._id, this.defaultValue);

  factory Property(String name, [Object defaultValue = Undefined]){
    return new Property._internal(name, _globalId++, defaultValue);
  }
  
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
  
  Object getCore(IPropertyObject obj){
    if(obj.propertyValues.containsKey(this)){
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