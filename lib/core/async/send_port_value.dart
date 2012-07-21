class SendPortValue<TInput, TOutput> extends FutureValue<TInput, TOutput> {
  final SendPort _sendPort;

  SendPortValue(this._sendPort);

  Future<TOutput> getFuture(TInput value) => _sendPort.call(value);
}
