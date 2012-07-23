#import('dart:html');
#import('dart:isolate');
#import('../../lib/dartlib.dart', prefix:'core');
#import('../../lib/async.dart');
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
  final _DemoMapper _demoMapper;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;
  bool _overShape = false;

  factory DraggerDemo(CanvasElement canvas){

    var blue = new Shape(100, 100, 'blue');

    var tx = blue.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(blue);

    var stage = new Stage(canvas, rootPanel);
    var dragger = new Dragger(canvas);

    return new DraggerDemo._internal(canvas, stage, tx, dragger);
  }

  DraggerDemo._internal(this._canvas, this._stage, this._tx, this._dragger) :
    _demoMapper = new _DemoMapper() {
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
    _dragger.dragDelta.add(_onDrag);
    _dragger.dragStart.add(_onDragStart);

    _demoMapper.outputChanged.add((e) => requestFrame());
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.webkitRequestAnimationFrame(_onFrame);
    }
  }

  void _onDrag(core.Vector delta) {
    _tx.translate(delta.x, delta.y);
    _demoMapper.input = _tx.translateVector;
    requestFrame();
  }

  void _onDragStart(core.CancelableEventArgs e) {
    if(!_overShape) {
      e.cancel();
    }
  }

  bool _onFrame(num highResTime){
    _stage.draw();

    final ctx = _stage.ctx;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '20px Fixed, monospace';

    final inputText = " Input: ${_demoMapper.input}";
    final outputText = "Output: ${_demoMapper.output}";

    final int bottom = _canvas.height;
    final w = _canvas.width;

    ctx.fillText(inputText, 10, bottom - 40);
    ctx.fillText(outputText, 10, bottom - 20);
    ctx.restore();
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
    final hits = Mouse.markMouseOver(_stage, _mouseLocation);
    if(hits != null && hits.length > 0 && hits[0] is Shape) {
      _canvas.style.cursor = 'pointer';
      _overShape = true;
    } else {
      _canvas.style.cursor = 'auto';
      _overShape = false;
    }
    requestFrame();
  }
}

class _DemoMapper extends FutureValue<core.Coordinate, int> {
  Future<int> getFuture(value) {
    final sendPort = spawnFunction(_demoIsolate);
    return sendPort.call(value);
  }
}

void _demoIsolate() {
  port.receive((core.Coordinate input,
      SendPort reply) {

    final start = new Date.now();
    Duration delta;
    do {
      delta = (new Date.now().difference(start));
    } while(delta.inSeconds < 1);

    final int output = input.x * input.y;
    reply.send(output);
  });
}


