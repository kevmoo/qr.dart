interface IPropertyObject extends Disposable {
  PropertyValues get propertyValues();
}

class PropertyObject extends DisposableImpl implements IPropertyObject {
  final PropertyValues propertyValues;

  PropertyObject() : propertyValues = new PropertyValues();

  void disposeInternal(){
    super.disposeInternal();
    propertyValues.dispose();
  }
}
