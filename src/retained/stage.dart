class Stage extends Disposable implements IElementParent {
  final CanvasElement _canvas;
  final PElement _element;
  final EventHandle<EventArgs> _updatedEventHandle;
  CanvasRenderingContext2D _ctx;

  Stage(this._canvas, this._element) : 
    _updatedEventHandle = new EventHandle<EventArgs>()
  {
    _element.claim(this);
  }

  Size get size(){
    return new Size(_canvas.width, _canvas.height);
  }

  EventRoot<EventArgs> get updated(){
    return _updatedEventHandle;
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

  void disposeInternal(){
    super.disposeInternal();
    _updatedEventHandle.dispose();
  }

  AffineTransform getTransformToRoot(){
    return new AffineTransform();
  }
}
