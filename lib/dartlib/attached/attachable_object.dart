class AttachableObject extends DisposableImpl {
  final _PropertyValues _propertyValues = new _PropertyValues();

  EventRoot<Property> get propertyChanged => _propertyValues.propertyChanged;

  void disposeInternal(){
    super.disposeInternal();
    _propertyValues.dispose();
  }
}
