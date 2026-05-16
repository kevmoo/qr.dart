import 'dart:async';

import 'package:qr/qr.dart';

enum ExampleState { qr, error, question }

/// A pure Dart view model encapsulating all business logic, state, and
/// validation for the QR code example, completely decoupled from HTML/JS DOM
/// elements.
final class ExampleModel {
  static const maxTypeNumber = 10;

  String _value = '';
  int _typeNumber = maxTypeNumber;
  bool _autoType = true;
  QrErrorCorrectLevel _errorCorrectLevel = QrErrorCorrectLevel.high;

  ExampleState _state = ExampleState.question;
  List<bool> _squares = [];
  int _moduleCount = 0;
  List<int> _validTypeNumbers = [];
  List<QrErrorCorrectLevel> _validErrorCorrectLevels = [];

  final _controller = StreamController<void>.broadcast(sync: true);

  ExampleModel() {
    _update();
  }

  Stream<void> get changes => _controller.stream;

  String get value => _value;
  set value(String val) {
    if (_value == val) return;
    _value = val;
    _update();
  }

  int get typeNumber => _typeNumber;
  set typeNumber(int val) {
    if (_typeNumber == val) return;
    _typeNumber = val;
    _autoType = false;
    _update();
  }

  bool get autoType => _autoType;
  set autoType(bool val) {
    if (_autoType == val) return;
    _autoType = val;
    _update();
  }

  QrErrorCorrectLevel get errorCorrectLevel => _errorCorrectLevel;
  set errorCorrectLevel(QrErrorCorrectLevel val) {
    if (_errorCorrectLevel == val) return;
    _errorCorrectLevel = val;
    _update();
  }

  ExampleState get state => _state;
  List<bool> get squares => _squares;
  int get moduleCount => _moduleCount;
  List<int> get validTypeNumbers => _validTypeNumbers;
  List<QrErrorCorrectLevel> get validErrorCorrectLevels =>
      _validErrorCorrectLevels;
  int get byteCount => _value.length;

  void dispose() {
    _controller.close();
  }

  void _update() {
    if (_value.trim().isEmpty) {
      _state = ExampleState.question;
      _squares = [];
      _moduleCount = 0;
      _validTypeNumbers = List.generate(maxTypeNumber, (i) => i + 1);
      _validErrorCorrectLevels = QrErrorCorrectLevel.values.toList();
      if (_autoType) {
        _typeNumber = 1;
      }
      _controller.add(null);
      return;
    }

    final payload = QrPayload.fromString(_value);
    var validation = QrValidationResult.fromPayload(
      payload: payload,
      typeNumber: _typeNumber,
      errorCorrectLevel: _errorCorrectLevel,
    );

    if (_autoType && validation.validTypeNumbers.isNotEmpty) {
      if (_typeNumber != validation.validTypeNumbers.first) {
        _typeNumber = validation.validTypeNumbers.first;
        validation = QrValidationResult.fromPayload(
          payload: payload,
          typeNumber: _typeNumber,
          errorCorrectLevel: _errorCorrectLevel,
        );
      }
    }

    _validTypeNumbers = validation.validTypeNumbers
        .where((t) => t <= maxTypeNumber || t == _typeNumber)
        .toList();

    if (_autoType) {
      _validErrorCorrectLevels = QrErrorCorrectLevel.values.where((level) {
        final val = QrValidationResult.fromPayload(
          payload: payload,
          typeNumber: 1,
          errorCorrectLevel: level,
        );
        return val.validTypeNumbers.any(
          (t) => t <= maxTypeNumber || t == _typeNumber,
        );
      }).toList();
    } else {
      _validErrorCorrectLevels = validation.validErrorCorrectLevels;
    }

    // Re-check validity if autoType adjusted typeNumber or if not autoType
    final isCurrentConfigValid =
        _validTypeNumbers.contains(_typeNumber) &&
        _validErrorCorrectLevels.contains(_errorCorrectLevel);

    if (!isCurrentConfigValid) {
      _state = ExampleState.error;
      _squares = [];
      _moduleCount = 0;
      _controller.add(null);
      return;
    }

    _state = ExampleState.qr;
    final code = QrCode(
      payload: payload,
      errorCorrectLevel: _errorCorrectLevel,
      minTypeNumber: _typeNumber,
    );
    final image = QrImage(code);
    _moduleCount = code.moduleCount;

    _squares = List<bool>.filled(_moduleCount * _moduleCount, false);
    for (var x = 0; x < _moduleCount; x++) {
      for (var y = 0; y < _moduleCount; y++) {
        _squares[x * _moduleCount + y] = image.isDark(y, x);
      }
    }

    _controller.add(null);
  }
}
