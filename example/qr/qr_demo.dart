#import('dart:html');
#import('dart:isolate');
#import('dart:math', prefix:'math');

#import('package:bot/bot.dart');
#import('package:bot/qr.dart');
#import('package:bot/async.dart');

main(){
  final CanvasElement canvas = query("#content");
  final DivElement typeDiv = query('#type-div');
  final DivElement errorDiv = query('#error-div');
  final demo = new QrDemo(canvas, typeDiv, errorDiv);

  final InputElement input = query('#input');

  input.value = "Type your message in here...";
  demo.value = input.value;

  input.on.keyUp.add((KeyboardEvent args) {
    demo.value = input.value;
  });

  demo.updated.add((args) {
    input.style.background = '';
  });

  demo.error.add((args) {
    input.style.background = 'red';
  });
}

class QrDemo{
  static final String _typeRadioIdKey = 'type-value';
  static final String _errorLevelIdKey = 'error-value';
  final BungeeNum _scale;
  final CanvasElement _canvas;
  final _QrCalc _qrMapper;
  final CanvasRenderingContext2D _ctx;

  String _value = '';
  int _typeNumber = 10;
  int _errorCorrectLevel = QrErrorCorrectLevel.M;

  List<bool> _squares;

  bool _frameRequested = false;

  QrDemo(CanvasElement canvas, DivElement typeDiv, DivElement errorDiv) :
    _canvas = canvas,
    _ctx = canvas.context2d,
    _qrMapper = new _QrCalc(),
    _scale = new BungeeNum(1) {
    _ctx.fillStyle = 'black';

    _qrMapper.outputChanged.add((args) {
      _squares = _qrMapper.output;
      requestFrame();
    });

    //
    // Type Div
    //
    for(int i = 1; i <= 10; i++) {
      final InputElement radio = new InputElement(type: 'radio');
      radio.innerHTML = '$i';
      radio.id = 'type_$i';
      radio.name = 'type';
      radio.on.change.add(_levelClick);
      radio.dataAttributes[_typeRadioIdKey] = i.toString();
      if(i == _typeNumber) {
        radio.attributes['checked'] = 'checked';
      }
      typeDiv.elements.add(radio);

      final label = new LabelElement();
      label.innerHTML = "$i";
      label.htmlFor = radio.id;
      typeDiv.elements.add(label);
    }

    //
    // Error Correct Levels
    //
    for(final v in QrErrorCorrectLevel.levels) {
      final InputElement radio = new InputElement(type: 'radio');
      radio.id = 'error_$v';
      radio.name = 'error-level';
      radio.on.change.add(_errorClick);
      radio.dataAttributes[_errorLevelIdKey] = v.toString();
      if(v == _errorCorrectLevel) {
        radio.attributes['checked'] = 'checked';
      }
      errorDiv.elements.add(radio);

      final label = new LabelElement();
      label.innerHTML = QrErrorCorrectLevel.getName(v);
      label.htmlFor = radio.id;
      errorDiv.elements.add(label);
    }
  }

  EventRoot get updated => _qrMapper.outputChanged;

  EventRoot get error => _qrMapper.error;

  String get value => _value;

  void set value(String input) {
    _value = input;
    _update();
  }

  void requestFrame(){
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  void _levelClick(Event args) {
    final InputElement source = args.srcElement;
    _typeNumber = int.parse(source.dataAttributes[_typeRadioIdKey]);
    _update();
  }

  void _errorClick(Event args) {
    final InputElement source = args.srcElement;
    _errorCorrectLevel = int.parse(source.dataAttributes[_errorLevelIdKey]);
    _update();
  }

  void _update() {
    final t = [_typeNumber, _errorCorrectLevel, _value];

    _qrMapper.input = t;
  }

  void _onFrame(double highResTime){
    _frameRequested = false;

    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    final size = math.sqrt(_squares.length).toInt();
    final minDimension = math.min(_canvas.width, _canvas.height);
    final scale = minDimension ~/ size;
    final offset = (minDimension - (scale * size)) ~/ 2;

    _scale.target = scale;

    if(_scale.update()) {
      requestFrame();
    }

    _ctx.setTransform(_scale.current, 0, 0, _scale.current, offset, offset);

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
}

class _QrCalc
  extends SendPortValue<List, List<bool>> {
  _QrCalc() : super(spawnFunction(_qrIsolate));
}

void _qrIsolate() {

  new SendValuePort<List, List<bool>>((input) {
    final code = new QrCode(input[0], input[1]);
    code.addData(input[2]);
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
