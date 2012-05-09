class PElement extends PEventTarget{
  num width, height;
  Size _lastDrawSize;
  bool clip = false;

  PElement(int width, int height, [bool enableCache = false])
  {
    this.width = width;
    this.height = height;

    if(enableCache){
      // TODO: init magic here
    }
  }

  AffineTransform getTransform() {
    var tx = new AffineTransform();
    /*
    if (this._transforms) {
      goog.array.forEach(this._transforms, function(t) {
        tx.concatenate(t);
      });
    }*/
    return tx;
  }

  bool draw(CanvasRenderingContext2D ctx){
    update();
    var dirty = (_lastDrawSize == null);
    _drawInternal(ctx);
    return dirty;
  }

  void update(){
    dispatchEvent('Update');
  }

  void _drawInternal(CanvasRenderingContext2D ctx){
    // until we ar rocking caching, just draw normal
    _drawNormal(ctx);
  }

  void _drawNormal(CanvasRenderingContext2D ctx){
    var tx = this.getTransform();
    if (this._isClipped(tx, ctx)) {
      return;
    }

    ctx.save();

    // Translate to the starting position
    pl.gfx.transform(ctx, tx);

    // clip to the bounds of the object
    if (this.clip) {
      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height);
      ctx.clip();
    }

    this.drawCore(ctx);
    ctx.restore();
  }

  bool _isClipped(AffineTransform tx, CanvasRenderingContext2D ctx){
    if(clip){
      // a lot more impl to do here...
    }
    return false;
  }

}
