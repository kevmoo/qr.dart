interface IPropertyObject extends core.IDisposable {
  PropertyValues get propertyValues();
}

class PropertyObject extends core.Disposable implements IPropertyObject {
  final PropertyValues propertyValues;

  PropertyObject() : propertyValues = new PropertyValues();

  void disposeInternal(){
    super.disposeInternal();
    propertyValues.dispose();
  }
}
