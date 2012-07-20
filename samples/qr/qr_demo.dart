#import('dart:html');
#import('dart:isolate');
#import('../../lib/core.dart', prefix:'core');
#import('../../lib/html.dart');
#import('../../lib/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  final demo = new QrDemo(canvas);
  demo.requestFrame();
}

class QrDemo{
  final CanvasElement _canvas;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;

  factory QrDemo(CanvasElement canvas){

    var blue = new Shape(100, 100, 'blue');

    var tx = blue.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(blue);

    var stage = new Stage(canvas, rootPanel);
    var dragger = new Dragger(canvas);

    return new QrDemo._internal(canvas);
  }

  QrDemo._internal(this._canvas) {
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.webkitRequestAnimationFrame(_onFrame);
    }
  }

  bool _onFrame(num highResTime){
    _frameRequested = false;
  }

  void _canvas_mouseMove(MouseEvent e){
    _setMouse(new core.Coordinate(e.offsetX, e.offsetY));
  }

  void _canvas_mouseOut(MouseEvent e){
    _setMouse(null);
  }

  void _setMouse(core.Coordinate value) {
    _mouseLocation = value;
    requestFrame();
  }
}
