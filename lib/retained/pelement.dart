class PElement extends core.AttachableObjectImpl {
  final List<core.AffineTransform> _transforms;
  final bool cacheEnabled;
  final core.EventHandle<core.EventArgs> _updatedEventHandle;
  final core.EventHandle<core.EventArgs> _invalidatedEventHandle;
  CanvasElement _cacheCanvas;

  num _width, _height, _alpha;
  core.Size _lastDrawSize;
  bool clip = false;
  ElementParent _parent;

  PElement(this._width, this._height, [this.cacheEnabled = false]) :
    _transforms = new List<core.AffineTransform>(),
    _updatedEventHandle = new core.EventHandle<core.EventArgs>(),
    _invalidatedEventHandle = new core.EventHandle<core.EventArgs>();

  num get width => _width;

  void set width(num value) {
    assert(core.isValidNumber(value));
    _width = value;
    invalidateDraw();
  }

  num get height => _height;

  void set height(num value) {
    assert(core.isValidNumber(value));
    _height = value;
    invalidateDraw();
  }

  core.Size get size => new core.Size(_width, _height);

  void set size(core.Size value) {
    assert(value.isValid);
    _width = value.width;
    _height = value.height;
    invalidateDraw();
  }

  int get visualChildCount => 0;

  ElementParent get parent => _parent;

  core.EventRoot<core.EventArgs> get updated => _updatedEventHandle;

  core.EventRoot<core.EventArgs> get invalidated => _invalidatedEventHandle;

  core.AffineTransform getTransform() {
    var tx = new core.AffineTransform();
    _transforms.forEach(tx.concatenate);
    return tx;
  }

  core.AffineTransform getTransformToRoot(){
    var tx = new core.AffineTransform();
    if(_parent != null){
      tx.concatenate(_parent.getTransformToRoot());
    }
    tx.concatenate(getTransform());
    return tx;
  }

  bool draw(CanvasRenderingContext2D ctx){
    update();
    var dirty = (_lastDrawSize == null);
    drawCore(ctx);
    return dirty;
  }

  void update(){
    _updatedEventHandle.fireEvent(core.EventArgs.empty);
  }

  void drawCore(CanvasRenderingContext2D ctx){
    if(cacheEnabled) {
      _drawCached(ctx);
    } else {
      _drawNormal(ctx);
    }
  }

  core.AffineTransform addTransform(){
    var tx = new core.AffineTransform();
    _transforms.add(tx);
    return tx;
  }

  // abstract
  abstract void drawOverride(CanvasRenderingContext2D ctx);

  void invalidateDraw(){
    if(_lastDrawSize != null){
      _lastDrawSize = null;
      _invalidateParent();
    }
  }

  bool hasVisualChild(PElement element){
    var length = visualChildCount;
    for(var i=0;i<length;i++){
      if(element === getVisualChild(i)){
        return true;
      }
    }
    return false;
  }

  PElement getVisualChild(int index){
    throw "no children for this type";
  }

  void registerParent(ElementParent parent) {
    assert(_parent == null);
    _parent = parent;
  }

  void disposeInternal(){
    super.disposeInternal();
    _updatedEventHandle.dispose();
  }

  //
  // Privates
  //

  void _drawCached(CanvasRenderingContext2D ctx) {
    if (_cacheCanvas == null || CanvasUtil.getCanvasSize(this._cacheCanvas) != this._lastDrawSize) {
      if (this._cacheCanvas == null) {
        this._cacheCanvas = new CanvasElement();
      }

      this._cacheCanvas.width = this.width;
      this._cacheCanvas.height = this.height;

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

  bool _isClipped(core.AffineTransform tx, CanvasRenderingContext2D ctx){
    if(clip){
      // a lot more impl to do here...
    }
    return false;
  }

  void _invalidateParent(){
    assert(this._parent != null);
    _invalidatedEventHandle.fireEvent(core.EventArgs.empty);
    _parent.childInvalidated(this);
  }
}
