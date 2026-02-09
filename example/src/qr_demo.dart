import 'dart:async';
import 'dart:js_interop';
import 'dart:math' as math;

import 'package:qr/qr.dart';

import 'package:stream_transform/stream_transform.dart';
import 'package:web/web.dart';

import 'affine_transform.dart';
import 'bot.dart';

const String _typeRadioIdKey = 'type_value';
const String _errorLevelIdKey = 'error_value';

enum _FrameState { qr, error, question }

class QrDemo {
  final _scale = BungeeNum(1);
  final HTMLCanvasElement _canvas;
  final CanvasRenderingContext2D _ctx;
  final StreamController<_Config> _inputValues;

  final Stream<List<bool>?> output;

  String _value = '';
  int _typeNumber = 10;
  QrErrorCorrectLevel _errorCorrectLevel = QrErrorCorrectLevel.medium;

  List<bool> _squares = [];
  _FrameState _state = _FrameState.qr;

  bool _frameRequested = false;

  factory QrDemo() {
    final canvas = document.querySelector('#content') as HTMLCanvasElement;
    final typeDiv = document.querySelector('#type-div') as HTMLDivElement;
    final errorDiv = document.querySelector('#error-div') as HTMLDivElement;
    final input = document.querySelector('#input') as HTMLInputElement;
    final statusDiv = document.querySelector('#status') as HTMLDivElement;

    final controller = StreamController<_Config>.broadcast();

    final copyBtn = document.querySelector('#copy-btn') as HTMLButtonElement;
    final downloadBtn =
        document.querySelector('#download-btn') as HTMLButtonElement;

    final demo = QrDemo._(canvas, typeDiv, errorDiv, controller);

    copyBtn.onClick.listen((_) => demo._copyToClipboard());
    downloadBtn.onClick.listen((_) => demo._downloadImage());

    input.onKeyUp.listen((KeyboardEvent args) {
      demo.value = input.value;
    });

    demo.output.listen(
      (data) {
        input.style.background = '';
        statusDiv.style.color = '';
        if (data == null) {
          demo._state = _FrameState.question;
          statusDiv.innerText = 'Type something to encode';
        } else {
          demo
            .._state = _FrameState.qr
            .._squares = data;
          final byteCount = demo.value.length;
          statusDiv.innerText = 'Input size: $byteCount bytes';
        }
        demo.requestFrame();
      },
      onError: (Object error) {
        input.style.background = 'red';
        statusDiv.style.color = 'red';
        statusDiv.innerText = 'Input too long';
        print(error);
        demo
          .._state = _FrameState.error
          ..requestFrame();
      },
    );

    demo.value = input.value;

    return demo;
  }

  void _copyToClipboard() {
    _canvas.toBlob(
      (Blob blob) {
        final item = ClipboardItem({'image/png': blob}.jsify() as JSObject);
        window.navigator.clipboard.write([item].toJS);
      }.toJS,
    );
  }

  void _downloadImage() {
    document.createElement('a') as HTMLAnchorElement
      ..href = _canvas.toDataURL()
      ..download = 'qr_code.png'
      ..click();
  }

  QrDemo._(
    HTMLCanvasElement canvas,
    HTMLDivElement typeDiv,
    HTMLDivElement errorDiv,
    this._inputValues,
  ) : _canvas = canvas,
      _ctx = canvas.context2D,
      output = _inputValues.stream.asyncMapSample(_calc) {
    _ctx.fillStyle = 'black'.toJS;

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

    // Error Correct Levels
    //
    final sortedLevels = QrErrorCorrectLevel.values.toList()
      ..sort((a, b) => a.recoveryRate.compareTo(b.recoveryRate));
    for (final v in sortedLevels) {
      final radio = (document.createElement('input') as HTMLInputElement)
        ..type = 'radio'
        ..id = 'error_$v'
        ..name = 'error-level'
        ..onChange.listen(_errorClick)
        ..dataset[_errorLevelIdKey] = v.index.toString();
      if (v == _errorCorrectLevel) {
        radio.checked = true;
      }
      errorDiv.appendChild(radio);

      final label = (document.createElement('label') as HTMLLabelElement)
        ..innerHTML = v.name.toCapitalized.toJS
        ..htmlFor = radio.id
        ..classList.add('btn')
        ..title = 'Recover up to ${v.recoveryRate}% of data';
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
    _typeNumber = int.parse(source.dataset[_typeRadioIdKey]);
    _update();
  }

  void _errorClick(Event args) {
    final source = args.target as HTMLInputElement;
    _errorCorrectLevel = QrErrorCorrectLevel.values.firstWhere(
      (v) => v.index.toString() == source.dataset[_errorLevelIdKey],
    );
    _update();
  }

  void _update() {
    _inputValues.add(_Config(_typeNumber, _errorCorrectLevel, _value));
  }

  void _onFrame(num highResTime) {
    _frameRequested = false;

    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    if (_state == _FrameState.qr) {
      _drawQr();
    } else {
      _drawBigMark(_state == _FrameState.question ? '?' : '!');
    }
  }

  void _drawBigMark(String text) {
    _ctx
      ..save()
      ..fillStyle = '#eeeeee'.toJS
      ..fillRect(0, 0, _canvas.width, _canvas.height)
      ..font = '400px monospace'
      ..fillStyle = 'red'.toJS
      ..textAlign = 'center'
      ..textBaseline = 'middle'
      ..fillText(text, _canvas.width / 2, _canvas.height / 2 + 50)
      ..restore();
  }

  void _drawQr() {
    // 2 blocks of padding on each side
    const borderBlocks = 2;

    final size = math.sqrt(_squares.length).toInt();
    final minDimension = math.min(_canvas.width, _canvas.height);
    final scale = minDimension ~/ (1.1 * (size + borderBlocks * 2));

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

      // Draw white background
      _ctx
        ..fillStyle = 'white'.toJS
        ..fillRect(
          -borderBlocks,
          -borderBlocks,
          size + borderBlocks * 2,
          size + borderBlocks * 2,
        )
        ..fillStyle = 'black'.toJS
        ..beginPath();
      for (var x = 0; x < size; x++) {
        var y = 0;
        while (y < size) {
          if (_squares[x * size + y]) {
            final startY = y;
            y++;
            while (y < size && _squares[x * size + y]) {
              y++;
            }
            _ctx.rect(x, startY, 1, y - startY);
          } else {
            y++;
          }
        }
      }
      _ctx.fill();
    }
    _ctx.restore();
  }
}

class _Config {
  final int type;
  final QrErrorCorrectLevel level;
  final String input;

  _Config(this.type, this.level, this.input);
}

Future<List<bool>?> _calc(_Config config) async {
  if (config.input.trim().isEmpty) {
    return null;
  }
  final code = QrCode(config.type, config.level);
  final data = config.input;

  code.addData(data);
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

extension _StringHelper on String {
  String get toCapitalized => '${this[0].toUpperCase()}${substring(1)}';
}
