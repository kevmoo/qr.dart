class ImgElement extends PElement {
  final ImageElement _image;

  bool _waitingOnLoad = false;

  factory ImgElement.fromUrl(String src, num w, num h) {
    final img = new ImageElement(src, null, null);

    return new ImgElement(w, h, img);
  }

  ImgElement(num width, num height, this._image) : super(width, height, true);

  void drawOverride(CanvasRenderingContext2D ctx) {
    if(_image.complete) {
      ctx.drawImage(_image, 0, 0, width, height);
    } else if(!_waitingOnLoad) {
      _waitingOnLoad = true;
      // TODO: some day we'll have a way to remove these cleanly
      _image.on.load.add(_onImageLoad);
    }
  }

  void _onImageLoad(Event event) {
    invalidateDraw();
  }
}
