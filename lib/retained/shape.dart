class Shape extends PElement {
  final String fillStyle;
  final ShapeType shapeType;

  Shape(num w, num h, [this.fillStyle = 'blue', this.shapeType = ShapeType.rect])
    : super(w, h);

  void drawOverride(CanvasRenderingContext2D ctx){
    ctx.fillStyle = fillStyle;
    // NOTE: warnings here will go away once dartbug.com/3342 is resolved
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

  String toString() => 'Shape [$fillStyle, ${shapeType.name}]';
}
