#import('dart:html');
#import('dart:math', prefix:'math');
#import('package:bot/bot.dart');
#import('package:bot/html.dart');
#import('package:bot/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  var demo = new SpinDemo(canvas);
  demo.requestFrame();
}

class SpinDemo{
  final CanvasElement _canvas;
  final Stage _stage;
  final AffineTransform _tx;
  Coordinate _mouseLocation;

  factory SpinDemo(CanvasElement canvas){

    final pCanvas = new PCanvas(200, 200);
    final blue = new Shape(100, 100, 'blue');
    final green = new Shape(70, 70, 'green');
    final red = new Shape(40, 40, 'red', ShapeType.ellipse);

    pCanvas.addElement(blue);

    pCanvas.addElement(green);
    pCanvas.setTopLeft(green, new Coordinate(15, 15));

    pCanvas.addElement(red);
    pCanvas.setCenter(red, new Coordinate(50, 50));


    pCanvas.addTransform().translate(
      (canvas.width - pCanvas.width) / 2,
      (canvas.height - pCanvas.height) / 2);

    final tx = pCanvas.addTransform();

    final rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(pCanvas);

    final stage = new Stage(canvas, rootPanel);

    return new SpinDemo._internal(canvas, stage, tx);
  }

  SpinDemo._internal(this._canvas, this._stage, this._tx){
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  void requestFrame(){
    window.requestAnimationFrame(_onFrame);
  }

  void _onFrame(double highResTime){
    _tx.rotate(math.PI * 0.01, 100, 100);
    _stage.draw();
    if(_mouseLocation != null){
      RetainedDebug.borderHitTest(_stage, _mouseLocation);
    }
    requestFrame();
  }

  void _canvas_mouseMove(MouseEvent e){
    _mouseLocation = getMouseEventCoordinate(e);
  }

  void _canvas_mouseOut(MouseEvent e){
    _mouseLocation = null;
  }
}
