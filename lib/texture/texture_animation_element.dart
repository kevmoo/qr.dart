class TextureAnimationElement extends PElement {
  final TextureData _textureData;
  final List<TextureAnimationRequest> _requests = new List<TextureAnimationRequest>();

  TextureAnimationElement(num width, num height, this._textureData) :
    super(width, height);

  void add(TextureAnimationRequest request) {
    assert(request != null);
    assert(request.fresh);
    _requests.add(request);
    invalidateDraw();
  }

  void update() {

    var toRemove = new List<TextureAnimationRequest>();
    for(final r in _requests) {
      r.update();
      assert(!r.fresh);
      if(r.done) {
        toRemove.add(r);
      }
    }

    for(final r in toRemove) {
      final i = _requests.indexOf(r, 0);
      assert(i >= 0);
      _requests.removeRange(i, 1);
    }

    if(_requests.length > 0) {
      invalidateDraw();
    }
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    for(final r in _requests) {
      final data = r._getFrameDetails();
      final offset = data.item1;
      final frameName = data.item2;

      ctx.save();
      ctx.translate(offset.x, offset.y);
      _textureData.drawTextureKeyAt(ctx, frameName);
      ctx.restore();
    }
  }
}
