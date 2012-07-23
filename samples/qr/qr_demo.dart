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

  final DivElement typeDiv = query('#type-div');
  for(int i = 1; i <= 10; i++) {
    final InputElement radio = new InputElement('radio');
    radio.innerHTML = '$i';
    radio.id = 'type_$i';
    radio.name = 'type';

    final label = new LabelElement();
    label.innerHTML = "$i";
    label.htmlFor = radio.id;
    typeDiv.elements.add(label);
    typeDiv.elements.add(radio);
  }

  demo.updated.add((args) {
    input.style.background = '';
  });

  demo.error.add((args) {
    input.style.background = 'red';
  });
}

class QrDemo{
  static final int defaultErrorCorrectLevel = core.QrErrorCorrectLevel.M;
  static final int delautTypeNumber = 10;

  final CanvasElement _canvas;
  final _QrCalc _qrMapper;

  String _value = '';
  int _typeNumber = delautTypeNumber;
  int _errorCorrectLevel = defaultErrorCorrectLevel;

  List<bool> _squares;
  CanvasRenderingContext2D _ctx;

  core.Coordinate _mouseLocation;
  bool _frameRequested = false;

  QrDemo(this._canvas) :
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
    _value = value;
    _update();
  }

  void _update() {
    _qrMapper.input =
        new core.Tuple3<int,int,String>(_typeNumber, _errorCorrectLevel, _value);
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

    final size = Math.sqrt(_squares.length).toInt();

    final minDimension = Math.min(_canvas.width, _canvas.height);

    final scale = minDimension ~/ size;

    final offset = (minDimension - (scale * size)) ~/ 2;


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

class _QrCalc
  extends core.SendPortValue<core.Tuple3<int, int, String>, List<bool>> {
  _QrCalc() : super(spawnFunction(_qrIsolate));
}

void _qrIsolate() {

  new core.SendValuePort<core.Tuple3<int, int, String>, List<bool>>((input) {
    final code = new core.QrCode(input.Item1, input.Item2);
    code.addData(input.Item3);
    code.make();

    final List<bool> squares = new List<bool>();

    for(int x = 0; x < code.moduleCount; x++) {
      for(int y = 0; y < code.moduleCount; y++) {
        squares.add(code.isDark(y, x));
      }
    }

    return squares;
  });
}
