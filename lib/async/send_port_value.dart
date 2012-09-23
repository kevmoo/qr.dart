class SendPortValue<TInput, TOutput> extends FutureValue<TInput, TOutput> {
  final SendPort _sendPort;
  Completer<TOutput> _completer;
  Future<TOutput> _innerFuture;

  SendPortValue(this._sendPort);

  Future<TOutput> getFuture(TInput value) {
    assert(_completer == null);
    assert(_innerFuture == null);

    _completer = new Completer<TOutput>();

    _innerFuture = _sendPort.call(value);
    // I don't think this is working yet in isolates
    // _future.handleException(_futureException);
    // DARTBUG: http://dartbug.com/3734
    _innerFuture.then(__futureCompleted);

    return _completer.future;
  }

  void __futureCompleted(value) {
    assert(_completer != null);
    assert(_innerFuture != null);
    _innerFuture = null;

    if(value is Map && FutureValueResult.isMyMap(value)) {
      final fvr = new FutureValueResult.fromMap(value);
      _sendValueResultCompleted(fvr);
    } else {
      _complete(value);
    }
  }

  void _sendValueResultCompleted(FutureValueResult<TOutput> value) {
    if(value.isException) {
      _completeException(value.exception);
    } else {
      _complete(value.value);
    }
  }

  void _complete(TOutput value) {
    final c = _completer;
    _completer = null;
    c.complete(value);
  }

  void _completeException(exception) {
    final c = _completer;
    _completer = null;
    c.completeException(exception);
  }
}
