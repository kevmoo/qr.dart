class Panel extends PElement implements IElementParent  {
  final List<PElement> _children;

  Panel(int w, int h, [bool enableCache = false]) : _children = new List<PElement>(), super(w, h, enableCache);

  void addElement(PElement element){
    insertAt(element, _children.length);
  }
  
  void insertAt(PElement element, [int index=null]){
    index = (index == null) ? 0 : index; 
    element.claim(this);
    _children.insertRange(index, 1, element);
    
    // TODO: transform blah
    
    onChildrenChanged();
  }
  
  void onChildrenChanged(){
    invalidateDraw();
  }
  
  PElement getVisualChild(index){
    return _children[index];
  }
  
  int get visualChildCount(){
    return _children.length;
  }  

  void childInvalidated(PElement child){
    assert(hasVisualChild(child));
    invalidateDraw();
  }
  
  void update(){
    for(var e in _children){
      e.update();
    }
    super.update();
  }
  
  void drawOverride(CanvasRenderingContext2D ctx){
    var length = visualChildCount;
    for(var i=0;i<length;i++){
      var element = getVisualChild(i);
      element.drawInternal(ctx);
    }
  }
}
