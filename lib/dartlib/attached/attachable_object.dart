interface AttachableObject extends Disposable {
  PropertyValues get propertyValues;
}

class AttachableObjectImpl extends DisposableImpl implements AttachableObject {
  final PropertyValues propertyValues;

  AttachableObjectImpl() : propertyValues = new PropertyValues();

  void disposeInternal(){
    super.disposeInternal();
    propertyValues.dispose();
  }
}
