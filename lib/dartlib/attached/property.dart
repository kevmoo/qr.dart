class Property<T> extends Attachable {
  static final Object Undefined = const _UndefinedValue();

  final T defaultValue;

  const Property(String name, [T this.defaultValue = null]) : super(name);

  T get(AttachableObject obj, [Func1<AttachableObject, T> ifAbsent = null]){
    var coreValue = getCore(obj, ifAbsent);
    if(coreValue !== Undefined){
      return coreValue;
    }
    else{
      return defaultValue;
    }
  }

  Object getCore(AttachableObject obj, [Func1<AttachableObject, T> ifAbsent = null]){
    return obj.propertyValues._getValueOrUndefined(this, obj, ifAbsent);
  }

  void set(AttachableObject obj, T value){
    assert(value !== Undefined);
    obj.propertyValues._set(this, value);
  }

  void clear(AttachableObject obj){
    obj.propertyValues._remove(this);
  }

  bool isSet(AttachableObject obj){
    return obj.propertyValues._isSet(this);
  }

  GlobalId addHandler(AttachableObject obj, Action1<Property> handler){
    return _AttachableEventHelper.addHandler(obj, this, handler);
  }

  bool removeHandler(AttachableObject obj, GlobalId handlerId){
    return _AttachableEventHelper.removeHandler(obj, this, handlerId);
  }

  String toString() => "Property '$name'";
}

class _UndefinedValue{
  const _UndefinedValue();
  // TODO: toString?
}
