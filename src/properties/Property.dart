class Property<T> implements Hashable{
  static final Object Undefined = const _UndefinedValue();

  final GlobalId _id;
  final String name;
  final T defaultValue;

  const Property(String this.name, [T this.defaultValue = null]) :
    _id = new GlobalId();

  T get(IPropertyObject obj, [Func1<IPropertyObject, T> ifAbsent = null]){
    var coreValue = getCore(obj, ifAbsent);
    if(coreValue != Undefined){
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
    assert(value != Undefined);
    obj.propertyValues._set(this, value);
  }

  void clear(IPropertyObject obj){
    obj.propertyValues._remove(this);
  }

  bool isSet(IPropertyObject obj){
    return obj.propertyValues._isSet(this);
  }

  GlobalId addHandler(IPropertyObject obj, EventHandler<Property> handler){
    return _PropertyChangeHelper.addHandler(obj, this, handler);
  }
  
  bool removeHandler(IPropertyObject obj, GlobalId handlerId){
    _PropertyChangeHelper.removeHandler(obj, this, handlerId);
  }  

  int hashCode(){
    return _id.hashCode();
  }
}

class _UndefinedValue{
  const _UndefinedValue();
  // TODO: toString?
}

class _PropertyChangeHelper{
  // TODO: once we can define static final with 'new' instead of 'const', we can nuke the property redirection
  static final Property<_PropertyChangeHelper> _changeHelperProperty = const Property<_PropertyChangeHelper>("_changeHelperProperty");

  final HashMap<Property, EventHandle<Property>> _handlers;
  final GlobalId _propertyChangeHandleId;

  _PropertyChangeHelper(GlobalId id) : 
    _handlers = new HashMap<Property, EventHandle<Property>>(),
    _propertyChangeHandleId = id;

  static _PropertyChangeHelper createInstance(IPropertyObject obj){
    var handlerId = obj.propertyValues.propertyChanged.add((sender, args){
      _fireHandlers(obj, args);
    });
    return new _PropertyChangeHelper(handlerId);
  }

  static GlobalId addHandler(IPropertyObject obj, Property property, EventHandler<Property> watcher){
    var helper = _changeHelperProperty.get(obj, createInstance);
    var handle = helper._handlers.putIfAbsent(property, () => new EventHandle<Property>());
    return handle.event.add(watcher);
  }

  static void removeHandler(IPropertyObject obj, Property property, GlobalId handlerId){
    var helper = _changeHelperProperty.get(obj);
    var handle = helper._handlers[property];
    if(handle != null){
      handle.event.remove(handlerId);
      if(handle.handlerCount == 0){
        // if there are no handlers left, might as well clean things out
        
        var didRemove = obj.propertyValues.propertyChanged.remove(helper._propertyChangeHandleId);
        // the event should be registered
        assert(didRemove);

        var removedValue = helper._handlers.remove(property);
        // a value should be removed, too
        assert(removedValue != null);
      }
    }
  }

  static void _fireHandlers(IPropertyObject obj, Property property){
    var helper = _changeHelperProperty.get(obj);
    var handle = helper._handlers[property];
    if(handle != null){
      handle.fireEvent(obj, property);
    }
  }
}
