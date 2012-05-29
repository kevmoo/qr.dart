class Stage implements IElementParent {
  final CanvasElement _canvas;
  final PElement _element;
  final EventHandle<EventArgs> _updatedEventHandle;
  CanvasRenderingContext2D _ctx;

  Stage(CanvasElement canvas, PElement rootElement) : 
    _canvas = canvas, 
    _element = rootElement,
    _updatedEventHandle = new EventHandle<EventArgs>()
  {
    rootElement.claim(this);
  }

  Size get size(){
    return new Size(_canvas.width, _canvas.height);
  }

  IEvent<EventArgs> get updated(){
    return _updatedEventHandle.event;
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
    _updatedEventHandle.fireEvent(this, const EventArgs());
  }

  AffineTransform getTransformToRoot(){
    return new AffineTransform();
  }
}
