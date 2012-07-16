class ElementParentImpl
  extends PElement
  implements ElementParent {

  ElementParentImpl(num w, num h, [bool enableCache = false]) :
    super(w, h, enableCache);

  void onChildrenChanged(){
    invalidateDraw();
  }

  abstract PElement getVisualChild(index);

  abstract int get visualChildCount();

  void childInvalidated(PElement child){
    assert(hasVisualChild(child));
    invalidateDraw();
  }

  void update(){
    _forEach((e) => e.update());
    super.update();
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    _forEach((e) => e.drawInternal(ctx));
  }

  void _forEach(core.Action1<PElement> f) {
    final length = visualChildCount;
    for(int i = 0; i < length; i++) {
      f(getVisualChild(i));
    }
  }
}
