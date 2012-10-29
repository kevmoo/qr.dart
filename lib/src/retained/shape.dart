part of bot_retained;

class Shape extends PElement {
  dynamic _fillStyle;
  final ShapeType shapeType;

  Shape(num w, num h, [dynamic fillStyle = 'blue', this.shapeType = ShapeType.rect])
    : _fillStyle = fillStyle, super(w, h, true);

  dynamic get fillStyle => _fillStyle;

  void set fillStyle(dynamic value) {
    _fillStyle = value;
    invalidateDraw();
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    ctx.fillStyle = _fillStyle;
    switch(shapeType){
      case ShapeType.rect:
        ctx.fillRect(0, 0, size.width, size.height);
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
