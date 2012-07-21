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
}

class QrDemo{
  static final int typeNumber = 10;
  static final int size = typeNumber * 4 + 17;
  static final int scale = 10;

  final CanvasElement _canvas;
  final core.SendPortValue<String, List<bool>> _qrMapper;

  List<bool> _squares;
  CanvasRenderingContext2D _ctx;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;

  QrDemo(this._canvas) :
    _qrMapper = new core.SendPortValue(spawnFunction(_qrIsolate)) {
    _qrMapper.outputChanged.add((args) {
      _squares = _qrMapper.output;
      requestFrame();
    });

    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
  }

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


void _qrIsolate() {
  final typeNumber = QrDemo.typeNumber;
  final size = QrDemo.size;

  port.receive((String input,
      SendPort reply) {

    final code = new core.QrCode(typeNumber, core.QrErrorCorrectLevel.Q);
    code.addData(input);
    code.make();

    final List<bool> squares = new List<bool>();

    for(int x = 0; x < size; x++) {
      for(int y = 0; y < size; y++) {
        squares.add(code.isDark(y, x));
      }
    }

    reply.send(squares);
  });
}
