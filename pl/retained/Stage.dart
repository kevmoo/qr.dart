class Stage extends pEventTarget implements IElementParent {
  PElement _element;
  CanvasElement _canvas;

  Stage(CanvasElement canvas, PElement rootElement){
    _element = rootElement;
    _canvas = canvas;
  }

  void childInvalidate(PElement child){
    dispatchEvent("Update");
  }

}
