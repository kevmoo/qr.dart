class Property<T> extends Attachable {
  static const Object Undefined = const _UndefinedValue();

  final T defaultValue;

  Property(String name, [T this.defaultValue = null]) : super(name);

  T get(AttachableObject obj, [Func1<AttachableObject, T> ifAbsent = null]){
    var coreValue = getCore(obj, ifAbsent);
    if(!identical(coreValue, Undefined)){
      return coreValue;
    }
    else{
      return defaultValue;
    }
  }

  Object getCore(AttachableObject obj, [Func1<AttachableObject, T> ifAbsent = null]){
    return obj._getValueOrUndefined(this, obj, ifAbsent);
  }

  void set(AttachableObject obj, T value){
    assert(!identical(value, Undefined));
    obj._set(this, value);
  }

  void clear(AttachableObject obj){
    obj._remove(this);
  }

  bool isSet(AttachableObject obj){
    return obj._isSet(this);
  }

  GlobalId addHandler(AttachableObject obj, Action1<Property> handler){
    return obj._addHandler(this, handler);
  }

  bool removeHandler(AttachableObject obj, GlobalId handlerId){
    return obj._removeHandler(this, handlerId);
  }

  String toString() => "Property '$name'";
}

class _UndefinedValue{
  const _UndefinedValue();
  // TODO: toString?
}
