part of bot_retained;

class Stage extends AttachableObject
  implements ElementParent {
  final EventHandle<EventArgs> _invalidatedEventHandle =
      new EventHandle<EventArgs>();

  final CanvasElement _canvas;
  final PElement _element;
  CanvasRenderingContext2D _ctx;

  Stage(this._canvas, this._element) {
    _element.registerParent(this);
  }

  Size get size => new Size(_canvas.width, _canvas.height);

  EventRoot<EventArgs> get invalidated => _invalidatedEventHandle;

  PElement get rootElement => _element;

  CanvasRenderingContext2D get ctx {
    validateNotDisposed();
    if(_ctx == null) {
      _ctx = _canvas.context2d;
    }
    return _ctx;
  }

  bool draw(){
    validateNotDisposed();
    if (_ctx == null) {
      _ctx = _canvas.context2d;
    } else {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    return this._element._stageDraw(this._ctx);
  }

  void childInvalidated(PElement child){
    validateNotDisposed();
    assert(child == _element);
    _invalidatedEventHandle.fireEvent(EventArgs.empty);
  }

  void disposeInternal(){
    super.disposeInternal();
    _invalidatedEventHandle.dispose();
  }

  AffineTransform getTransformToRoot() => new AffineTransform();
}
