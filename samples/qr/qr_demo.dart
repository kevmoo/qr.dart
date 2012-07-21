#import('dart:html');
#import('dart:isolate');
#import('../../lib/core.dart', prefix:'core');
#import('../../lib/html.dart');
#import('../../lib/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  final demo = new QrDemo(canvas);
  demo._setValue("hello world");
  demo.requestFrame();
}

class QrDemo{
  static final int typeNumber = 10;
  static final int size = typeNumber * 4 + 17;
  static final int scale = 5;

  final List<bool> _squares;

  final CanvasElement _canvas;
  CanvasRenderingContext2D _ctx;

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

  QrDemo._internal(this._canvas)
  : _squares = new List<bool>() {
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.webkitRequestAnimationFrame(_onFrame);
    }
  }

  void _setValue(String value) {
    final code = new core.QrCode(typeNumber, core.QrErrorCorrectLevel.Q);
    code.addData(value);
    code.make();
    _updateSquares(code);
  }

  void _updateSquares(core.QrCode qr) {
    _squares.clear();
    for(int x = 0; x < size; x++) {
      for(int y = 0; y < size; y++) {
        _squares.add(qr.isDark(y, x));
      }
    }

  }


  bool _onFrame(num highResTime){
    _frameRequested = false;
    if(_ctx == null) {
      _ctx = _canvas.context2d;
    }

    _ctx.fillStyle = 'white';
    _ctx.fillRect(0, 0, size * scale, size * scale);
    _ctx.fillStyle = 'black';

    if(_squares.length > 0) {
      assert(_squares.length == size * size);
      for(int x = 0; x < size; x++) {
        for(int y = 0; y < size; y++) {
          if(_squares[x * size + y]) {
            _ctx.fillRect(x * scale, y * scale, scale, scale);
          }
        }
      }
    }
  }

  void _canvas_mouseMove(MouseEvent e){
    _setMouse(new core.Coordinate(e.offsetX, e.offsetY));
  }

  void _canvas_mouseOut(MouseEvent e){
    _setMouse(null);
  }

  void _setMouse(core.Coordinate value) {
    _mouseLocation = value;
    //requestFrame();
  }
}
