part of bot_retained;

abstract class ParentElement
  extends PElement
  implements ElementParent {

  ParentElement(num w, num h, [bool enableCache = false]) :
    super(w, h, enableCache);

  bool hasVisualChild(PElement element){
    var length = visualChildCount;
    for(var i=0;i<length;i++){
      if(identical(element, getVisualChild(i))){
        return true;
      }
    }
    return false;
  }

  void onChildrenChanged(){
    invalidateDraw();
  }

  PElement getVisualChild(index);

  int get visualChildCount;

  void childInvalidated(PElement child){
    assert(hasVisualChild(child));
    invalidateDraw();
  }

  void update(){
    _forEach((e) => e.update());
    super.update();
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    _forEach((e) => e.drawCore(ctx));
  }

  void _forEach(Action1<PElement> f) {
    final length = visualChildCount;
    for(int i = 0; i < length; i++) {
      f(getVisualChild(i));
    }
  }
}
