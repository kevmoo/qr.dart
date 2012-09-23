// NOTE: I'd love to not have to deal with this, but...
//       it seems that unhandled exceptions (at least in Dartium) crash things
//       http://dartbug.com/3734
class SendValuePort<TInput, TOutput> {
  final Func1<TInput, TOutput> _func;
  final Func1<Dynamic, TInput> _inputDeserializer;
  final Func1<TOutput, Dynamic> _outputSerializer;

  SendValuePort(this._func, [this._inputDeserializer, this._outputSerializer]) {
    port.receive((Dynamic rawValue, SendPort reply) {
      final value = _deserialize(rawValue);

      FutureValueResult<TOutput> _message;
      try {
        final TOutput output = _func(value);
        _message = new FutureValueResult<TOutput>(output, _outputSerializer);
      } catch (ex) {
        // TODO: I'd love to use real exceptions here
        // but they blow up over the wire
        // so: to string!
        final String exString = ex.toString();
        _message = new FutureValueResult<TOutput>.fromException(exString);
      }

      final map = _message.toMap();
      reply.send(map);
    });
  }

  TInput _deserialize(Dynamic input) {
    if(_inputDeserializer == null) {
      return input;
    } else {
      return _inputDeserializer(input);
    }
  }
}
