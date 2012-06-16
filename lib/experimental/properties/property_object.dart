interface IPropertyObject extends core.Disposable {
  PropertyValues get propertyValues();
}

class PropertyObject extends core.DisposableImpl implements IPropertyObject {
  final PropertyValues propertyValues;

  PropertyObject() : propertyValues = new PropertyValues();

  void disposeInternal(){
    super.disposeInternal();
    propertyValues.dispose();
  }
}
