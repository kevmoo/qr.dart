// TODO: real tests
class FutureValue<TInput, TOutput> {
  FutureValue()
  : _outputChangedHandle = new EventHandle<EventArgs>(),
  _inputChangedHandle = new EventHandle<EventArgs>(),
  _errorHandle = new EventHandle<Object>();


  TInput get input() => _input;

  void set input(TInput value) {
    _input = value;
    if(_future == null) {
      _startFuture();
    } else {
      _pending = true;
    }
    _inputChangedHandle.fireEvent(EventArgs.empty);
  }

  TOutput get output() => _output;

  EventRoot<EventArgs> get outputChanged() => _outputChangedHandle;
  EventRoot<EventArgs> get inputChanged() => _inputChangedHandle;
  EventRoot get error() => _errorHandle;

  abstract Future<TOutput> getFuture(TInput value);

  void _futureCompleted(value) {
    assert(_future != null);
    _future = null;

    if(value is FutureValueResult) {
      _sendValueResultCompleted(value);
    } else {
      _simpleFutureCompleted(value);
    }
  }

  void _sendValueResultCompleted(FutureValueResult<TOutput> value) {
    if(value.isException) {
      _errorHandle.fireEvent(value.exception);
      _cleanup();
    } else {
      _simpleFutureCompleted(value.value);
    }
  }

  void _simpleFutureCompleted(TOutput value) {
    _output = value;
    _outputChangedHandle.fireEvent(EventArgs.empty);
    _cleanup();
  }

  void _cleanup() {
    if(_pending) {
      _pending = false;
      _startFuture();
    }
  }

  void _startFuture() {
    assert(_future == null);
    assert(!_pending);
    _future = getFuture(_input);
    _future.handleException(_futureException);
    _future.then(_futureCompleted);
  }

  bool _futureException(Object exception) {
    assert(_future != null);
    _future = null;
    _errorHandle.fireEvent(exception);
    _cleanup();
  }

  TInput _input;
  Future<TOutput> _future;
  TOutput _output;
  bool _pending = false;

  final EventHandle<EventArgs> _outputChangedHandle;
  final EventHandle<EventArgs> _inputChangedHandle;
  final EventHandle<Object> _errorHandle;
}
