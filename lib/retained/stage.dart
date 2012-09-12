class Stage extends core.AttachableObjectImpl
  implements ElementParent {
  final CanvasElement _canvas;
  final PElement _element;
  final core.EventHandle<core.EventArgs> _invalidatedEventHandle;
  CanvasRenderingContext2D _ctx;

  Stage(this._canvas, this._element) :
    _invalidatedEventHandle = new core.EventHandle<core.EventArgs>() {
    _element.registerParent(this);
  }

  core.Size get size => new core.Size(_canvas.width, _canvas.height);

  core.EventRoot<core.EventArgs> get invalidated => _invalidatedEventHandle;

  PElement get rootElement => _element;

  CanvasRenderingContext2D get ctx {
    if(_ctx == null) {
      _ctx = _canvas.context2d;
    }
    return _ctx;
  }

  bool draw(){
    if (_ctx == null) {
      _ctx = _canvas.context2d;
    } else {
      this._ctx.clearBox(0, 0, this._canvas.width, this._canvas.height);
    }

    return this._element.draw(this._ctx);
  }

  void childInvalidated(PElement child){
    assert(child == _element);
    _invalidatedEventHandle.fireEvent(core.EventArgs.empty);
  }

  void disposeInternal(){
    super.disposeInternal();
    _invalidatedEventHandle.dispose();
  }

  core.AffineTransform getTransformToRoot() => new core.AffineTransform();
}
