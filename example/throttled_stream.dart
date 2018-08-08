import 'dart:async';

class ThrottledStream<S, T> {
  final _AsyncMethod<S, T> _asyncMethod;
  final StreamController<T> _controller = StreamController.broadcast();

  S _source;
  S _sendingSource;
  T _outputValue;
  Future<T> _outputFuture;
  bool _forceUpdate = false;

  ThrottledStream(T asyncMethod(S source)) : this._asyncMethod = asyncMethod;

  Stream<T> get outputStream => _controller.stream;

  S get source => _source;

  set source(S value) {
    _source = value;
    _tryUpdate();
  }

  T get outputValue => _outputValue;

  Future close() => _controller.close();

  void refresh() {
    _forceUpdate = true;
    _tryUpdate();
  }

  bool get _shouldUpdate => (_source != _sendingSource) || _forceUpdate;

  void _tryUpdate() {
    if (!_controller.isClosed && _outputFuture == null && _shouldUpdate) {
      _sendingSource = _source;
      _outputFuture = Future<T>(() => _asyncMethod(_sendingSource))
          .then((T output) {
            _forceUpdate = false;
            _outputValue = output;
            _controller.add(output);
          })
          .catchError(_controller.addError)
          .whenComplete(() {
            _outputFuture = null;
            _tryUpdate();
          });
    }
  }
}

typedef FutureOr<T> _AsyncMethod<S, T>(S source);
