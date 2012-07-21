class Panel extends ElementParentImpl {
  static final Property<core.AffineTransform> _containerTransformProperty =
      const Property<core.AffineTransform>("panelTransform");
  final List<PElement> _children;

  Panel(num w, num h, [bool enableCache = false]) :
    _children = new List<PElement>(),
    super(w, h, enableCache);

  void addElement(PElement element){
    insertAt(element, _children.length);
  }

  void insertAt(PElement element, [int index=null]){
    index = (index == null) ? 0 : index;
    element.registerParent(this);
    _children.insertRange(index, 1, element);

    assert(!_containerTransformProperty.isSet(element));
    _containerTransformProperty.set(element, element.addTransform());
    onChildrenChanged();
  }

  PElement getVisualChild(index) => _children[index];

  int get visualChildCount() => _children.length;

  core.AffineTransform getChildTransform(child) {
    assert(hasVisualChild(child));
    var tx = _containerTransformProperty.get(child);
    assert(tx != null);
    return tx;
  }
}
