import 'dart:async';
import 'dart:js_interop';
import 'dart:js_interop_unsafe';
import 'dart:math' as math;

import 'package:qr/qr.dart';
import 'package:stream_transform/stream_transform.dart';
import 'package:web/web.dart';

import 'affine_transform.dart';
import 'bot.dart';

const String _typeRadioIdKey = 'type_value';
const String _errorLevelIdKey = 'error_value';

class QrDemo {
  final _scale = BungeeNum(1);
  final HTMLCanvasElement _canvas;
  final CanvasRenderingContext2D _ctx;
  final StreamController<_Config> _inputValues;

  final Stream<List<bool>> output;

  String _value = '';
  int _typeNumber = 10;
  int _errorCorrectLevel = QrErrorCorrectLevel.M;

  late List<bool> _squares;

  bool _frameRequested = false;

  factory QrDemo() {
    final canvas = document.querySelector('#content') as HTMLCanvasElement;
    final typeDiv = document.querySelector('#type-div') as HTMLDivElement;
    final errorDiv = document.querySelector('#error-div') as HTMLDivElement;
    final input = document.querySelector('#input') as HTMLInputElement;

    final controller = StreamController<_Config>.broadcast();

    final demo = QrDemo._(canvas, typeDiv, errorDiv, controller)
      ..value = input.value;

    input.onKeyUp.listen((KeyboardEvent args) {
      demo.value = input.value;
    });

    demo.output.listen(
      (data) {
        input.style.background = '';
      },
      onError: (Object error) {
        input.style.background = 'red';
        print(error);
      },
    );

    return demo;
  }

  QrDemo._(
    HTMLCanvasElement canvas,
    HTMLDivElement typeDiv,
    HTMLDivElement errorDiv,
    this._inputValues,
  )   : _canvas = canvas,
        _ctx = canvas.context2D,
        output = _inputValues.stream.asyncMapSample(_calc) {
    _ctx.fillStyle = 'black'.toJS;

    output.listen((value) {
      _squares = value;
      requestFrame();
    });

    //
    // Type Div
    //
    for (var i = 1; i <= 10; i++) {
      final radio = (document.createElement('INPUT') as HTMLInputElement)
        ..type = 'radio'
        ..id = 'type_$i'
        ..name = 'type'
        ..onChange.listen(_levelClick)
        ..dataset[_typeRadioIdKey] = i.toString();
      if (i == _typeNumber) {
        radio.checked = true;
      }
      typeDiv.appendChild(radio);

      final label = (document.createElement('label') as HTMLLabelElement)
        ..innerHTML = '$i'.toJS
        ..htmlFor = radio.id
        ..classList.add('btn');
      typeDiv.appendChild(label);
    }

    //
    // Error Correct Levels
    //
    for (final v in QrErrorCorrectLevel.levels) {
      final radio = (document.createElement('input') as HTMLInputElement)
        ..type = 'radio'
        ..id = 'error_$v'
        ..name = 'error-level'
        ..onChange.listen(_errorClick)
        ..dataset[_errorLevelIdKey] = v.toString();
      if (v == _errorCorrectLevel) {
        radio.checked = true;
      }
      errorDiv.appendChild(radio);

      final label = (document.createElement('label') as HTMLLabelElement)
        ..innerHTML = QrErrorCorrectLevel.getName(v).toJS
        ..htmlFor = radio.id
        ..classList.add('btn');
      errorDiv.appendChild(label);
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
      window.requestAnimationFrame(_onFrame.toJS);
    }
  }

  void _levelClick(Event args) {
    final source = args.target as HTMLInputElement;
    _typeNumber = int.parse(source.dataset[_typeRadioIdKey]!);
    _update();
  }

  void _errorClick(Event args) {
    final source = args.target as HTMLInputElement;
    _errorCorrectLevel = int.parse(source.dataset[_errorLevelIdKey]!);
    _update();
  }

  void _update() {
    _inputValues.add(_Config(_typeNumber, _errorCorrectLevel, _value));
  }

  void _onFrame(num highResTime) {
    _frameRequested = false;

    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    final size = math.sqrt(_squares.length).toInt();
    final minDimension = math.min(_canvas.width, _canvas.height);
    final scale = minDimension ~/ (1.1 * size);

    _scale.target = scale;

    if (_scale.update()) {
      requestFrame();
    }

    final tx = AffineTransform.identity()
      ..translate(0.5 * _canvas.width, 0.5 * _canvas.height)
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
    tx.scaleX.toJS,
    tx.shearY,
    tx.shearX,
    tx.scaleY,
    tx.translateX,
    tx.translateY,
  );
}

extension on DOMStringMap {
  void operator []=(String key, String? value) {
    (this as JSObject)[key] = value?.toJS;
  }

  String? operator [](String key) =>
      ((this as JSObject)[key] as JSString?)?.toDart;
}
