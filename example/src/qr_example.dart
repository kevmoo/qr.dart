import 'dart:js_interop';
import 'dart:math' as math;

import 'package:qr/qr.dart';
import 'package:web/web.dart';

import 'affine_transform.dart';
import 'example_model.dart';

const String _typeRadioIdKey = 'type_value';
const String _errorLevelIdKey = 'error_value';

final class QrExample {
  final _model = ExampleModel();

  final _canvas = document.querySelector('#content') as HTMLCanvasElement;
  final _errorImg =
      document.querySelector('#validation-error') as HTMLImageElement;
  final _waitingImg =
      document.querySelector('#validation-waiting') as HTMLImageElement;
  final _copyBtn = document.querySelector('#copy-btn') as HTMLButtonElement;
  final _downloadBtn =
      document.querySelector('#download-btn') as HTMLButtonElement;
  final _autoCheckElement =
      document.getElementById('type_auto') as HTMLInputElement;
  final _input = document.querySelector('#input') as HTMLInputElement;
  final _statusDiv = document.querySelector('#status') as HTMLDivElement;
  final _typeDiv = document.querySelector('#type-div') as HTMLDivElement;
  final _errorDiv = document.querySelector('#error-div') as HTMLDivElement;
  final _overflowRadio = document.createElement('input') as HTMLInputElement;
  final _overflowLabel = document.createElement('label') as HTMLLabelElement;

  late final _ctx = _canvas.context2D;

  bool _frameRequested = false;

  QrExample() {
    _ctx.fillStyle = 'black'.toJS;

    _copyBtn.onClick.listen((_) => _copyToClipboard());
    _downloadBtn.onClick.listen((_) => _downloadImage());

    _input.onKeyUp.listen((KeyboardEvent args) {
      _model.value = _input.value;
    });

    _model.changes.listen((_) => _onModelChange());

    // Auto Size Checkbox
    _autoCheckElement.checked = _model.autoType;
    _autoCheckElement.onChange.listen((Event _) {
      _model.autoType = _autoCheckElement.checked;
    });

    // Type Div
    for (var i = 1; i <= ExampleModel.maxTypeNumber; i++) {
      final radio = (document.createElement('INPUT') as HTMLInputElement)
        ..type = 'radio'
        ..id = 'type_$i'
        ..name = 'type'
        ..onChange.listen(_levelClick)
        ..dataset[_typeRadioIdKey] = i.toString();
      if (i == _model.typeNumber) {
        radio.checked = true;
      }
      _typeDiv.appendChild(radio);

      final label = (document.createElement('label') as HTMLLabelElement)
        ..innerHTML = '$i'.toJS
        ..htmlFor = radio.id;
      _typeDiv.appendChild(label);
    }

    _overflowRadio
      ..type = 'radio'
      ..id = 'type_overflow'
      ..name = 'type'
      ..onChange.listen(_levelClick);

    _overflowLabel.htmlFor = _overflowRadio.id;

    _typeDiv.appendChild(_overflowRadio);
    _typeDiv.appendChild(_overflowLabel);

    // Error Correct Levels
    final sortedLevels = QrErrorCorrectLevel.values.toList()
      ..sort((a, b) => a.recoveryRate.compareTo(b.recoveryRate));
    for (final v in sortedLevels) {
      final radio = (document.createElement('input') as HTMLInputElement)
        ..type = 'radio'
        ..id = 'error_${v.name}'
        ..name = 'error-level'
        ..onChange.listen(_errorClick)
        ..dataset[_errorLevelIdKey] = v.index.toString();
      if (v == _model.errorCorrectLevel) {
        radio.checked = true;
      }
      _errorDiv.appendChild(radio);

      final label = (document.createElement('label') as HTMLLabelElement)
        ..innerHTML = v.name.toCapitalized.toJS
        ..htmlFor = radio.id
        ..title = 'Recover up to ${v.recoveryRate}% of data';
      _errorDiv.appendChild(label);
    }

    _model.value = _input.value;
    _input.focus();
    _onModelChange();
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

  void _enableButtons(bool enable) {
    _copyBtn.disabled = !enable;
    _downloadBtn.disabled = !enable;
  }

  void _levelClick(Event args) {
    final source = args.target as HTMLInputElement;
    final type = int.tryParse(source.dataset[_typeRadioIdKey]);
    if (type != null) {
      _model.typeNumber = type;
      _autoCheckElement.checked = false;
    }
  }

  void _errorClick(Event args) {
    final source = args.target as HTMLInputElement;
    _model.errorCorrectLevel = QrErrorCorrectLevel.values.firstWhere(
      (v) => v.index.toString() == source.dataset[_errorLevelIdKey],
    );
  }

  void _onModelChange() {
    // Sync UI state
    _autoCheckElement.checked = _model.autoType;

    if (_model.autoType) {
      final radio =
          document.getElementById('type_${_model.typeNumber}')
              as HTMLInputElement?;
      if (radio != null) {
        radio.checked = true;
      }
    }

    if (_model.typeNumber > ExampleModel.maxTypeNumber) {
      _overflowRadio
        ..dataset[_typeRadioIdKey] = _model.typeNumber.toString()
        ..checked = true
        ..hidden = false.toJS;
      _overflowLabel
        ..innerHTML = '${_model.typeNumber}'.toJS
        ..hidden = false.toJS;
    } else {
      _overflowRadio.hidden = true.toJS;
      _overflowLabel.hidden = true.toJS;
    }

    void update(String id, bool isValid) {
      final radio = document.getElementById(id) as HTMLInputElement?;
      if (radio == null) return;

      final label =
          document.querySelector('label[for="${radio.id}"]')
              as HTMLLabelElement?;
      if (label == null) return;

      label.classList.toggle('invalid-option', !isValid);
    }

    for (var i = 1; i <= ExampleModel.maxTypeNumber; i++) {
      update('type_$i', _model.validTypeNumbers.contains(i));
    }

    for (final level in QrErrorCorrectLevel.values) {
      update(
        'error_${level.name}',
        _model.validErrorCorrectLevels.contains(level),
      );
    }

    _input.style.background = '';
    _statusDiv.style.color = '';

    switch (_model.state) {
      case ExampleState.question:
        _statusDiv.innerText = 'Type something to encode';
        _enableButtons(false);
      case ExampleState.error:
        _input.style.background = 'red';
        _statusDiv.style.color = 'red';
        _statusDiv.innerText = 'Input too long (${_model.byteCount} bytes)';
        _enableButtons(false);
      case ExampleState.qr:
        _enableButtons(true);
        _statusDiv.innerText = 'Input size: ${_model.byteCount} bytes';
    }

    requestFrame();
  }

  void requestFrame() {
    if (!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame.toJS);
    }
  }

  void _onFrame(num highResTime) {
    _frameRequested = false;

    _canvas.hidden = (_model.state != ExampleState.qr).toJS;
    _errorImg.hidden = (_model.state != ExampleState.error).toJS;
    _waitingImg.hidden = (_model.state != ExampleState.question).toJS;

    if (_model.state == ExampleState.qr) {
      _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
      _drawQr();
    }
  }

  void _drawQr() {
    const borderBlocks = 0.5;

    final size = _model.moduleCount;
    final minDimension = math.min(_canvas.width, _canvas.height);
    final scale = minDimension ~/ (1.1 * (size + borderBlocks * 2));

    final tx = AffineTransform.identity()
      ..translate(0.5 * _canvas.width, 0.5 * _canvas.height)
      ..scale(scale, scale)
      ..translate(-0.5 * size, -0.5 * size);

    _ctx.save();
    _setTransform(_ctx, tx);

    if (_model.squares.isNotEmpty) {
      assert(_model.squares.length == size * size);

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
          if (_model.squares[x * size + y]) {
            final startY = y;
            y++;
            while (y < size && _model.squares[x * size + y]) {
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
