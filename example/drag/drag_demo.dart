#import('dart:html');
#import('dart:isolate');
#import('package:bot/dartlib.dart');
#import('package:bot/async.dart');
#import('package:bot/html.dart');
#import('package:bot/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  var demo = new DraggerDemo(canvas);
  demo.requestFrame();
}

class DraggerDemo{
  final CanvasElement _canvas;
  final Stage _stage;
  final AffineTransform _tx;
  final Dragger _dragger;
  final _DemoValue _demoMapper;

  Coordinate _mouseLocation;
  bool _frameRequested = false;
  bool _overShape = false;

  factory DraggerDemo(CanvasElement canvas){

    final image =
        new SpriteElement.horizontalFromUrl('disasteroids2_master.png',
            28, 28, 16, 29, new Coordinate(35,354));

    var tx = image.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(image);

    var stage = new Stage(canvas, rootPanel);
    var dragger = new Dragger(canvas);

    return new DraggerDemo._internal(canvas, stage, tx, dragger);
  }

  DraggerDemo._internal(this._canvas, this._stage, this._tx, this._dragger) :
    _demoMapper = new _DemoValue() {
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
    _dragger.dragDelta.add(_onDrag);
    _dragger.dragStart.add(_onDragStart);

    _demoMapper.outputChanged.add((e) => requestFrame());

    _stage.invalidated.add(_onStageInvalidated);
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  void _onStageInvalidated(args) {
    requestFrame();
  }

  void _onDrag(Vector delta) {
    _tx.translate(delta.x, delta.y);
    _demoMapper.input = _tx.translateVector;
    requestFrame();
  }

  void _onDragStart(CancelableEventArgs e) {
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
    requestFrame();
  }

  void _canvas_mouseMove(MouseEvent e){
    _setMouse(getMouseEventCoordinate(e));
  }

  void _canvas_mouseOut(MouseEvent e){
    _setMouse(null);
  }

  void _setMouse(Coordinate value) {
    _mouseLocation = value;
    final hits = Mouse.markMouseOver(_stage, _mouseLocation);
    if(hits != null && hits.length > 0 && hits[0] is ImgElement) {
      _canvas.style.cursor = 'pointer';
      _overShape = true;
    } else {
      _canvas.style.cursor = 'auto';
      _overShape = false;
    }
    requestFrame();
  }
}

class _DemoValue extends SendPortValue<Coordinate, int> {
  _DemoValue() : super(spawnFunction(_demoIsolate));
}

void _demoIsolate() {
  new SendValuePort<Coordinate, int>((input) {
    final start = new Date.now();
    Duration delta;
    do {
      delta = (new Date.now().difference(start));
    } while(delta.inSeconds < 1);

    final int output = input.x * input.y;
    return output;
  });
}
