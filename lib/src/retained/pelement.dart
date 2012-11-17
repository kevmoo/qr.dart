part of bot_retained;

abstract class PElement extends AttachableObject {
  final List<AffineTransform> _transforms = new List<AffineTransform>();
  final bool cacheEnabled;
  final EventHandle<EventArgs> _invalidatedEventHandle = new EventHandle<EventArgs>();
  CanvasElement _cacheCanvas;

  num _width, _height, _alpha;
  Size _lastDrawSize;
  bool clip = false;
  ElementParent _parent;

  PElement(this._width, this._height, [this.cacheEnabled = false]);

  num get width => _width;

  void set width(num value) {
    assert(isValidNumber(value));
    _width = value;
    invalidateDraw();
  }

  num get height => _height;

  void set height(num value) {
    assert(isValidNumber(value));
    _height = value;
    invalidateDraw();
  }

  Size get size => new Size(_width, _height);

  void set size(Size value) {
    assert(value.isValid);
    _width = value.width;
    _height = value.height;
    invalidateDraw();
  }

  ElementParent get parent => _parent;

  EventRoot<EventArgs> get invalidated => _invalidatedEventHandle;

  AffineTransform getTransform() {
    var tx = new AffineTransform();
    _transforms.forEach(tx.concatenate);
    return tx;
  }

  AffineTransform getTransformToRoot(){
    var tx = new AffineTransform();
    if(_parent != null){
      tx.concatenate(_parent.getTransformToRoot());
    }
    tx.concatenate(getTransform());
    return tx;
  }

  void update(){ }

  void drawCore(CanvasRenderingContext2D ctx){
    if(cacheEnabled) {
      _drawCached(ctx);
    } else {
      _drawNormal(ctx);
    }
  }

  AffineTransform addTransform(){
    validateNotDisposed();
    var tx = new AffineTransform();
    _transforms.add(tx);
    return tx;
  }

  void drawOverride(CanvasRenderingContext2D ctx);

  void invalidateDraw(){
    validateNotDisposed();
    if(_lastDrawSize != null){
      _lastDrawSize = null;
      _invalidateParent();
    }
  }

  void registerParent(ElementParent parent) {
    assert(_parent == null);
    assert(parent != null);
    _parent = parent;
  }

  void disposeInternal(){
    super.disposeInternal();
    _invalidatedEventHandle.dispose();
  }

  //
  // Privates
  //

  bool _stageDraw(CanvasRenderingContext2D ctx){
    update();
    var dirty = (_lastDrawSize == null);
    drawCore(ctx);
    return dirty;
  }

  void _drawCached(CanvasRenderingContext2D ctx) {
    if (this._cacheCanvas == null) {
      this._cacheCanvas = new CanvasElement();
    }

    final intLastDrawSize = (_lastDrawSize == null) ?
        null : new Size(_lastDrawSize.width.toInt(), _lastDrawSize.height.toInt());

    if (CanvasUtil.getCanvasSize(this._cacheCanvas) != intLastDrawSize) {
      this._cacheCanvas.width = this.width.toInt();
      this._cacheCanvas.height = this.height.toInt();

      var cacheCtx = _cacheCanvas.context2d;

      _drawInternal(cacheCtx);
    }

    ctx.save();
    var tx = this.getTransform();
    CanvasUtil.transform(ctx, tx);

    ctx.drawImage(this._cacheCanvas, 0, 0);
    ctx.restore();
  }

  void _drawNormal(CanvasRenderingContext2D ctx){
    var tx = this.getTransform();
    if (this._isClipped(tx, ctx)) {
      return;
    }

    ctx.save();

    // Translate to the starting position
    CanvasUtil.transform(ctx, tx);

    // clip to the bounds of the object
    if (this.clip) {
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.clip();
    }

    _drawInternal(ctx);
    ctx.restore();
  }

  void _drawInternal(CanvasRenderingContext2D ctx){
    if (_alpha != null) {
      ctx.globalAlpha = _alpha;
    }

    // call the abstract draw method
    drawOverride(ctx);
    _lastDrawSize = this.size;
  }

  bool _isClipped(AffineTransform tx, CanvasRenderingContext2D ctx){
    if(clip){
      // a lot more impl to do here...
    }
    return false;
  }

  void _invalidateParent(){
    assert(this._parent != null);
    _invalidatedEventHandle.fireEvent(EventArgs.empty);
    _parent.childInvalidated(this);
  }
}
