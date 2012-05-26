#import('dart:html');
#import('../pl/pl.dart');


main(){
  CanvasElement canvas = document.query("#content");
  var demo = new Demo(canvas);
  demo.requestFrame();
}

class Demo{
  final CanvasElement _canvas;
  final Stage _stage;
  final AffineTransform _tx;
  Coordinate _mouseLocation;

  factory Demo(CanvasElement canvas){

    PCanvas pCanvas = new PCanvas(200, 200);
    var blue = new Shape(100, 100, 'blue');
    var green = new Shape(70, 70, 'green');
    var red = new Shape(40, 40, 'red', ShapeType.ellipse);

    pCanvas.addElement(blue);

    pCanvas.addElement(green);
    pCanvas.setTopLeft(green, new Coordinate(15, 15));

    pCanvas.addElement(red);
    pCanvas.setCenter(red, new Coordinate(50, 50));


    pCanvas.addTransform().translate(
      (canvas.width - pCanvas.width) / 2,
      (canvas.height - pCanvas.height) / 2);

    var tx = pCanvas.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(pCanvas);

    var stage = new Stage(canvas, rootPanel);

    return new Demo._internal(canvas, stage, tx);
  }

  Demo._internal(CanvasElement this._canvas, Stage this._stage, AffineTransform this._tx){
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  void requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }

  bool _onFrame(num highResTime){
    _tx.rotate(Math.PI * 0.01, 100, 100);
    _stage.draw();
    if(_mouseLocation != null){
      RetainedDebug.borderHitTest(_stage, _mouseLocation);
    }
    requestFrame();
  }

  void _canvas_mouseMove(MouseEvent e){
    _mouseLocation = new Coordinate(e.offsetX, e.offsetY);
  }

  void _canvas_mouseOut(MouseEvent e){
    _mouseLocation = null;
  }
}
