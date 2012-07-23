class Property<T> {
  static final Object Undefined = const _UndefinedValue();

  final String name;
  final T defaultValue;

  const Property(String this.name, [T this.defaultValue = null]);

  T get(IPropertyObject obj, [Func1<IPropertyObject, T> ifAbsent = null]){
    var coreValue = getCore(obj, ifAbsent);
    if(coreValue !== Undefined){
      return coreValue;
    }
    else{
      return defaultValue;
    }
  }

  Object getCore(IPropertyObject obj, [Func1<IPropertyObject, T> ifAbsent = null]){
    return obj.propertyValues._getValueOrUndefined(this, obj, ifAbsent);
  }

  void set(IPropertyObject obj, T value){
    assert(value !== Undefined);
    obj.propertyValues._set(this, value);
  }

  void clear(IPropertyObject obj){
    obj.propertyValues._remove(this);
  }

  bool isSet(IPropertyObject obj){
    return obj.propertyValues._isSet(this);
  }

  GlobalId addHandler(IPropertyObject obj, Action1<Property> handler){
    return _PropertyChangeHelper.addHandler(obj, this, handler);
  }

  bool removeHandler(IPropertyObject obj, GlobalId handlerId){
    _PropertyChangeHelper.removeHandler(obj, this, handlerId);
  }
}

class _UndefinedValue{
  const _UndefinedValue();
  // TODO: toString?
}

class _PropertyChangeHelper{
  // TODO: once we can define static final with 'new' instead of 'const', we can nuke the property redirection
  static final Property<_PropertyChangeHelper> _changeHelperProperty = const Property<_PropertyChangeHelper>("_changeHelperProperty");

  final NoneHashMap<Property, EventHandle<Property>> _handlers;
  final GlobalId _propertyChangeHandleId;

  _PropertyChangeHelper(GlobalId id) :
    _handlers = new NoneHashMap<Property, EventHandle<Property>>(),
    _propertyChangeHandleId = id;

  static _PropertyChangeHelper createInstance(IPropertyObject obj){
    var handlerId = obj.propertyValues.propertyChanged.add((args){
      _fireHandlers(obj, args);
    });
    return new _PropertyChangeHelper(handlerId);
  }

  static GlobalId addHandler(IPropertyObject obj, Property property, Action1<Property> watcher){
    var helper = _changeHelperProperty.get(obj, createInstance);
    var handle = helper._handlers.putIfAbsent(property, () => new EventHandle<Property>());
    return handle.add(watcher);
  }

  static void removeHandler(IPropertyObject obj, Property property, GlobalId handlerId){
    var helper = _changeHelperProperty.get(obj);
    var handle = helper._handlers[property];
    if(handle != null){
      handle.remove(handlerId);
    }
  }

  static void _fireHandlers(IPropertyObject obj, Property property){
    var helper = _changeHelperProperty.get(obj);
    var handle = helper._handlers[property];
    if(handle != null){
      handle.fireEvent(property);
    }
  }
}
