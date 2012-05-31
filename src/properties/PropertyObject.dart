class PropertyObject extends Disposable implements IPropertyObject {
  final PropertyValues propertyValues;

  PropertyObject() : propertyValues = new PropertyValues();
  
  void disposeInternal(){
    super.disposeInternal();
    propertyValues.dispose();
  }  
}
