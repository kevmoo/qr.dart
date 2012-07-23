#import('dart:html');
#import('dart:isolate');
#import('../../lib/core.dart', prefix:'core');

main(){
  final CanvasElement canvas = query("#content");
  final demo = new QrDemo(canvas);

  final InputElement input = query('#input');
  input.value = "Type your message in here...";
  demo.updateValue(input.value);

  input.on.keyUp.add((KeyboardEvent args) {
    demo.updateValue(input.value);
  });

  demo.updated.add((args) {
    input.style.background = '';
  });

  demo.error.add((args) {
    input.style.background = 'red';
  });
}

class QrDemo{
  static final int errorCorrectLevel = core.QrErrorCorrectLevel.M;
  static final int typeNumber = 10;
  static final int size = typeNumber * 4 + 17;

  final CanvasElement _canvas;
  final _QrCalc _qrMapper;
  final int scale;
  final int offset;

  List<bool> _squares;
  CanvasRenderingContext2D _ctx;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;

  factory QrDemo(CanvasElement canvas) {
    final minDimension = Math.min(canvas.width, canvas.height);

    final scale = minDimension ~/ size;

    final offset = (minDimension - (scale * size)) ~/ 2;

    return new QrDemo._internal(canvas, scale, offset);
  }

  QrDemo._internal(this._canvas, this.scale, this.offset) :
    _qrMapper = new _QrCalc() {
    _qrMapper.outputChanged.add((args) {
      _squares = _qrMapper.output;
      requestFrame();
    });

    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  core.EventRoot get updated() => _qrMapper.outputChanged;

  core.EventRoot get error() => _qrMapper.error;

  void updateValue(String value) {
    _qrMapper.input = value;
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.webkitRequestAnimationFrame(_onFrame);
    }
  }

  bool _onFrame(num highResTime){
    _frameRequested = false;
    if(_ctx == null) {
      _ctx = _canvas.context2d;
      _ctx.fillStyle = 'black';
    }

    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    _ctx.setTransform(scale, 0, 0, scale, offset, offset);

    if(_squares.length > 0) {
      assert(_squares.length == size * size);
      for(int x = 0; x < size; x++) {
        for(int y = 0; y < size; y++) {
          if(_squares[x * size + y]) {
            _ctx.fillRect(x, y, 1, 1);
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

class _QrCalc extends core.SendPortValue<String, List<bool>> {
  _QrCalc() : super(spawnFunction(_qrIsolate));
}

void _qrIsolate() {
  final errorCorrectLevel = QrDemo.errorCorrectLevel;
  final typeNumber = QrDemo.typeNumber;
  final size = QrDemo.size;

  new core.SendValuePort<String, List<bool>>((String input){
    final code = new core.QrCode(typeNumber, errorCorrectLevel);
    code.addData(input);
    code.make();

    final List<bool> squares = new List<bool>();

    for(int x = 0; x < size; x++) {
      for(int y = 0; y < size; y++) {
        squares.add(code.isDark(y, x));
      }
    }

    return squares;
  });
}
