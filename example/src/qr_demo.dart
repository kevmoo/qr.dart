import 'dart:async';
import 'dart:html';
import 'dart:math' as math;

import 'package:qr/qr.dart';
import 'package:stream_transform/stream_transform.dart';

import 'affine_transform.dart';
import 'bot.dart';

const String _typeRadioIdKey = 'type-value';
const String _errorLevelIdKey = 'error-value';

class QrDemo {
  final _scale = BungeeNum(1);
  final CanvasElement _canvas;
  final CanvasRenderingContext2D _ctx;
  final StreamController<_Config> _inputValues;

  final Stream<List<bool>> output;

  String _value = '';
  int _typeNumber = 10;
  int _errorCorrectLevel = QrErrorCorrectLevel.M;

  late List<bool> _squares;

  bool _frameRequested = false;

  factory QrDemo() {
    final canvas = querySelector('#content') as CanvasElement;
    final typeDiv = querySelector('#type-div') as DivElement;
    final errorDiv = querySelector('#error-div') as DivElement;
    final input = querySelector('#input') as InputElement;

    final controller = StreamController<_Config>.broadcast();

    final demo = QrDemo._(canvas, typeDiv, errorDiv, controller)
      ..value = input.value!;

    input.onKeyUp.listen((KeyboardEvent args) {
      demo.value = input.value!;
    });

    demo.output.listen((data) {
      input.style.background = '';
    }, onError: (error) {
      input.style.background = 'red';
      print(error);
    });

    return demo;
  }

  QrDemo._(
    CanvasElement canvas,
    DivElement typeDiv,
    DivElement errorDiv,
    this._inputValues,
  )   : _canvas = canvas,
        _ctx = canvas.context2D,
        output = _inputValues.stream.asyncMapSample(_calc) {
    _ctx.fillStyle = 'black';

    output.listen((value) {
      _squares = value;
      requestFrame();
    });

    //
    // Type Div
    //
    for (var i = 1; i <= 10; i++) {
      final radio = InputElement(type: 'radio')
        ..id = 'type_$i'
        ..name = 'type'
        ..onChange.listen(_levelClick)
        ..dataset[_typeRadioIdKey] = i.toString();
      if (i == _typeNumber) {
        radio.attributes['checked'] = 'checked';
      }
      typeDiv.children.add(radio);

      final label = LabelElement()
        ..innerHtml = '$i'
        ..htmlFor = radio.id
        ..classes.add('btn');
      typeDiv.children.add(label);
    }

    //
    // Error Correct Levels
    //
    for (final v in QrErrorCorrectLevel.levels) {
      final radio = InputElement(type: 'radio')
        ..id = 'error_$v'
        ..name = 'error-level'
        ..onChange.listen(_errorClick)
        ..dataset[_errorLevelIdKey] = v.toString();
      if (v == _errorCorrectLevel) {
        radio.attributes['checked'] = 'checked';
      }
      errorDiv.children.add(radio);

      final label = LabelElement()
        ..innerHtml = QrErrorCorrectLevel.getName(v)
        ..htmlFor = radio.id
        ..classes.add('btn');
      errorDiv.children.add(label);
    }
  }

  String get value => _value;

  set value(String input) {
    _value = input;
    _update();
  }

  void requestFrame() {
    if (!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  void _levelClick(Event args) {
    final source = args.target as InputElement;
    _typeNumber = int.parse(source.dataset[_typeRadioIdKey]!);
    _update();
  }

  void _errorClick(Event args) {
    final source = args.target as InputElement;
    _errorCorrectLevel = int.parse(source.dataset[_errorLevelIdKey]!);
    _update();
  }

  void _update() {
    _inputValues.add(_Config(_typeNumber, _errorCorrectLevel, _value));
  }

  void _onFrame(num highResTime) {
    _frameRequested = false;

    _ctx.clearRect(0, 0, _canvas.width!, _canvas.height!);

    final size = math.sqrt(_squares.length).toInt();
    final minDimension = math.min(_canvas.width!, _canvas.height!);
    final scale = minDimension ~/ (1.1 * size);

    _scale.target = scale;

    if (_scale.update()) {
      requestFrame();
    }

    final tx = AffineTransform.identity()
      ..translate(0.5 * _canvas.width!, 0.5 * _canvas.height!)
      ..scale(_scale.current, _scale.current)
      ..translate(-0.5 * size, -0.5 * size);

    _ctx.save();
    _setTransform(_ctx, tx);

    if (_squares.isNotEmpty) {
      assert(_squares.length == size * size);
      for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
          if (_squares[x * size + y]) {
            _ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
    _ctx.restore();
  }
}

final _digit = RegExp(r'^\d+$');

class _Config {
  final int type;
  final int level;
  final String input;

  _Config(this.type, this.level, this.input);
}

Future<List<bool>> _calc(_Config config) async {
  final code = QrCode(config.type, config.level);
  final data = config.input;

  if (_digit.hasMatch(data)) {
    code.addNumeric(data);
  } else {
    code.addData(data);
  }
  final image = QrImage(code);

  final squares = <bool>[];

  for (var x = 0; x < code.moduleCount; x++) {
    for (var y = 0; y < code.moduleCount; y++) {
      squares.add(image.isDark(y, x));
    }
  }

  return squares;
}

void _setTransform(CanvasRenderingContext2D ctx, AffineTransform tx) {
  ctx.setTransform(
      tx.scaleX, tx.shearY, tx.shearX, tx.scaleY, tx.translateX, tx.translateY);
}
