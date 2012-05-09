class Stage extends PEventTarget implements IElementParent {
  PElement _element;
  CanvasElement _canvas;
  CanvasRenderingContext2D _ctx;

  Stage(CanvasElement canvas, PElement rootElement){
    _element = rootElement;
    _canvas = canvas;
  }

  Size get size(){
    return new Size(_canvas.width, _canvas.height);
  }

  bool draw(){
    if (_ctx == null) {
      _ctx = _canvas.getContext('2d');
    } else {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    return this._element.draw(this._ctx);
  }

  void childInvalidate(PElement child){
    dispatchEvent("Update");
  }

}
