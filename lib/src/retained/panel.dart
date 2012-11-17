part of bot_retained;

class Panel extends ParentElement {
  static final Property<AffineTransform> _containerTransformProperty =
      new Property<AffineTransform>("panelTransform");

  final List<PElement> _children;
  String background;

  Panel(num w, num h, [bool enableCache = false]) :
    _children = new List<PElement>(),
    super(w, h, enableCache);

  void addElement(PElement element){
    insertAt(element, _children.length);
  }

  void insertAt(PElement element, [int index=null]){
    requireArgumentNotNull(element, 'element');
    requireArgument(element.parent == null, 'element',
        'element already has a parent');
    requireArgument(!_children.contains(element), 'element',
        'Cannot add the same element twice');

    index = (index == null) ? 0 : index;
    element.registerParent(this);
    _children.insertRange(index, 1, element);

    assert(!_containerTransformProperty.isSet(element));
    _containerTransformProperty.set(element, element.addTransform());
    onChildrenChanged();
  }

  bool removeElement(PElement element) {
    requireArgumentNotNull(element, 'element');

    final index = _children.indexOf(element);
    if(index < 0) {
      return false;
    } else {
      final item = _children.removeAt(index);
      item.unregisterParent(this);
      final containerTx = _containerTransformProperty.get(item);
      assert(containerTx != null);
      var txRemoved = item.removeTransform(containerTx);
      assert(txRemoved);
      _containerTransformProperty.clear(item);
      return true;
    }
  }

  PElement getVisualChild(index) => _children[index];

  int get visualChildCount => _children.length;

  AffineTransform getChildTransform(child) {
    assert(hasVisualChild(child));
    var tx = _containerTransformProperty.get(child);
    assert(tx != null);
    return tx;
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    if(background != null) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
    }
    super.drawOverride(ctx);
  }
}
