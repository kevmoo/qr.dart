part of bot_async;

class SendPortValue<TInput, TOutput> extends FutureValue<TInput, TOutput> {
  final SendPort _sendPort;
  final Func1<TInput, dynamic> inputSerializer;
  final Func1<dynamic, TOutput> outputDeserializer;
  Completer<TOutput> _completer;
  Future<TOutput> _innerFuture;

  SendPortValue(this._sendPort, {this.inputSerializer, this.outputDeserializer});

  Future<TOutput> getFuture(TInput value) {
    assert(_completer == null);
    assert(_innerFuture == null);

    _completer = new Completer<TOutput>();

    if(inputSerializer == null) {
      _innerFuture = _sendPort.call(value);
    } else {
      var serializedValue = inputSerializer(value);
      _innerFuture = _sendPort.call(serializedValue);
    }
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

  void _complete(dynamic rawValue) {
    final c = _completer;
    _completer = null;

    final value = _deserializer(rawValue);
    c.complete(value);
  }

  void _completeException(exception) {
    final c = _completer;
    _completer = null;
    c.completeException(exception);
  }

  TOutput _deserializer(dynamic input) {
    if(outputDeserializer == null) {
      return input;
    } else {
      return outputDeserializer(input);
    }
  }
}
