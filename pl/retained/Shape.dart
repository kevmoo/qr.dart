class Shape extends PElement {
  final String _fillStyle = 'blue';

  Shape(int w, int h, [String this._fillStyle = 'blue']):super(w, h)
  {

  }

  void drawOverride(CanvasRenderingContext2D ctx){
      ctx.fillStyle = _fillStyle;
      ctx.fillRect(0, 0, size.width, size.height);
  }

}
