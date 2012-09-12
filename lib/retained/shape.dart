class Shape extends PElement {
  Dynamic _fillStyle;
  final ShapeType shapeType;

  Shape(num w, num h, [Dynamic fillStyle = 'blue', this.shapeType = ShapeType.rect])
    : _fillStyle = fillStyle, super(w, h, true);

  Dynamic get fillStyle => _fillStyle;

  void set fillStyle(Dynamic value) {
    _fillStyle = value;
    invalidateDraw();
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    ctx.fillStyle = _fillStyle;
    switch(shapeType){
      case ShapeType.rect:
        ctx.fillBox(0, 0, size.width, size.height);
        break;
      case ShapeType.ellipse:
        CanvasUtil.ellipse(ctx, 0, 0, this.width, this.height);
        ctx.fill();
        break;
      default:
        throw "shape not known...";
    }
  }

  String toString() => 'Shape [$_fillStyle, ${shapeType.name}]';
}
