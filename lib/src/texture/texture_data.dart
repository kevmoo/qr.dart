part of bot_texture;

class TextureData {
  final Map<String, TextureInput> _textures;

  TextureData(this._textures);

  TextureInput getTexture(String key) {
    assert(_textures != null);
    return _textures[key];
  }

  void drawTextureKeyAt(CanvasRenderingContext2D ctx, String textureKey,
                        [Coordinate location = const Coordinate()]) {
    assert(textureKey != null);
    final texture = getTexture(textureKey);
    assert(texture != null);
    drawTextureAt(ctx, location, texture);
  }

  void drawTextureAt(CanvasRenderingContext2D ctx, Coordinate location,
                     TextureInput texture) {
    ctx.save();
    final tx = new AffineTransform();
    tx.translate(location.x, location.y);

    var theFrame = texture.frame;
    var source = texture.sourceColorRect.topLeft;
    tx.translate(source.x, source.y);

    if(texture.rotated) {
      tx.rotate(-0.5 * math.PI, 0.5 * theFrame.height, 0.5 * theFrame.height);
      theFrame = new Box(theFrame.left, theFrame.top,
          theFrame.height, theFrame.width);
    }

    CanvasUtil.transform(ctx, tx);

    CanvasUtil.drawImage(ctx, texture.image, theFrame);
    ctx.restore();
  }


}
