class Stage extends PEventTarget implements IElementParent {
  final CanvasElement _canvas;
  final PElement _element;
  CanvasRenderingContext2D _ctx;

  Stage(CanvasElement canvas, PElement rootElement) : _canvas = canvas, _element = rootElement
  {
    rootElement.claim(this);
  }

  Size get size(){
    return new Size(_canvas.width, _canvas.height);
  }

  PElement get rootElement(){
    return _element;
  }

  CanvasRenderingContext2D get ctx(){
    if (_ctx == null) {
      _ctx = _canvas.getContext('2d');
    }
    return _ctx;
  }

  bool draw(){
    if (_ctx == null) {
      _ctx = _canvas.getContext('2d');
    } else {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    return this._element.draw(this._ctx);
  }

  void childInvalidated(PElement child){
    dispatchEvent("Update");
  }

  AffineTransform getTransformToRoot(){
    return new AffineTransform();
  }
}
