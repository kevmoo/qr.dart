#import('dart:html');
#import('../../lib/core.dart', prefix:'core');
#import('../../lib/html.dart');
#import('../../lib/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  var demo = new DraggerDemo(canvas);
  demo.requestFrame();
}

class DraggerDemo{
  final CanvasElement _canvas;
  final Stage _stage;
  final core.AffineTransform _tx;
  final Dragger _dragger;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;

  factory DraggerDemo(CanvasElement canvas){

    var blue = new Shape(100, 100, 'blue');

    var tx = blue.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(blue);

    var stage = new Stage(canvas, rootPanel);
    var dragger = new Dragger(canvas);

    return new DraggerDemo._internal(canvas, stage, tx, dragger);
  }

  DraggerDemo._internal(this._canvas, this._stage, this._tx, this._dragger){
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
    _dragger.dragDelta.add(_onDrag);
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.webkitRequestAnimationFrame(_onFrame);
    }
  }

  void _onDrag(core.Vector delta) {
    _tx.translate(delta.x, delta.y);
    requestFrame();
  }

  bool _onFrame(num highResTime){
    _stage.draw();
    if(_mouseLocation != null){
      RetainedDebug.borderHitTest(_stage, _mouseLocation);
    }
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
