class PElement extends core.PropertyObject {
  final List<core.AffineTransform> _transforms;
  final bool cacheEnabled;
  final core.EventHandle<core.EventArgs> _updatedEventHandle;
  CanvasElement _cacheCanvas;

  num _width, _height, _alpha;
  core.Size _lastDrawSize;
  bool clip = false;
  ElementParent _parent;

  PElement(this._width, this._height, [this.cacheEnabled = false]) :
    _transforms = new List<core.AffineTransform>(),
    _updatedEventHandle = new core.EventHandle<core.EventArgs>();

  num get width() => _width;

  num get height() => _height;

  core.Size get size() => new core.Size(_width, _height);

  core.EventRoot<core.EventArgs> get updated(){
    return _updatedEventHandle;
  }

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
    drawInternal(ctx);
    return dirty;
  }

  void update(){
    _updatedEventHandle.fireEvent(core.EventArgs.empty);
  }

  core.AffineTransform addTransform(){
    var tx = new core.AffineTransform();
    _transforms.add(tx);
    return tx;
  }

  // protected
  void drawCore(CanvasRenderingContext2D ctx){
    if (_alpha != null) {
      ctx.globalAlpha = _alpha;
    }

    // call the abstract draw method
    drawOverride(ctx);
    _lastDrawSize = this.size;
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

  int get visualChildCount() => 0;

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

  void drawInternal(CanvasRenderingContext2D ctx){
    if(cacheEnabled) {
      _drawCached(ctx);
    } else {
      _drawNormal(ctx);
    }
  }

  void _drawCached(CanvasRenderingContext2D ctx) {
    if (_cacheCanvas == null || CanvasUtil.getCanvasSize(this._cacheCanvas) != this._lastDrawSize) {
      if (this._cacheCanvas == null) {
        this._cacheCanvas = new CanvasElement();
      }

      this._cacheCanvas.width = this.width;
      this._cacheCanvas.height = this.height;

      var cacheCtx = _cacheCanvas.context2d;

      this.drawCore(cacheCtx);
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

    this.drawCore(ctx);
    ctx.restore();
  }

  bool _isClipped(core.AffineTransform tx, CanvasRenderingContext2D ctx){
    if(clip){
      // a lot more impl to do here...
    }
    return false;
  }

  void _invalidateParent(){
    assert(this._parent != null);
    _parent.childInvalidated(this);
  }
}
