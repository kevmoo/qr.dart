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
    index = (index == null) ? 0 : index;
    element.registerParent(this);
    _children.insertRange(index, 1, element);

    assert(!_containerTransformProperty.isSet(element));
    _containerTransformProperty.set(element, element.addTransform());
    onChildrenChanged();
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
