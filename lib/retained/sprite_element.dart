class SpriteElement extends ImgElement {
  final core.Coordinate startCoordinate;
  final core.Vector nextDelta;
  final int count;

  int _frame = 0;

  factory SpriteElement.horizontalFromUrl(String src, num w, num h,
      int count, num xDelta, [core.Coordinate start = const core.Coordinate()]) {
    final img = new ImageElement(src, null, null);

    return new SpriteElement(img, w, h, start, new core.Vector(xDelta, 0), count);
  }

  SpriteElement(ImageElement image, num width, num height,
                this.startCoordinate, this.nextDelta, this.count) :
    super(width, height, image);

  void nextFrame() {
    setFrame(_frame + 1);
  }

  void previousFrame() {
    setFrame(_frame - 1);
  }

  void setFrame(int frame) {
    _frame = (frame % count);
    invalidateDraw();
  }

  void _doDraw(CanvasRenderingContext2D ctx) {
    final int msPerFrame = 1000 ~/ count;

    final int currentMS = window.performance.webkitNow().toInt();

    final int theFrame = (currentMS ~/ msPerFrame) % count;

    final sourceCoord = startCoordinate + nextDelta * theFrame;

    final rect = new core.Rect.fromCoordSize(sourceCoord, size);

    CanvasUtil.drawImage(ctx, _image, rect);
  }
}
