part of bot_async;

// NOTE: I'd love to not have to deal with this, but...
//       it seems that unhandled exceptions (at least in Dartium) crash things
//       http://dartbug.com/3734
class SendValuePort<TInput, TOutput> {
  final Func1<TInput, TOutput> _func;
  final Func1<dynamic, TInput> inputDeserializer;
  final Func1<TOutput, dynamic> outputSerializer;

  SendValuePort(this._func, {this.inputDeserializer, this.outputSerializer}) {
    port.receive((dynamic rawValue, SendPort reply) {
      final value = _deserialize(rawValue);

      FutureValueResult<TOutput> _message;
      try {
        final TOutput output = _func(value);
        _message = new FutureValueResult<TOutput>(output, outputSerializer);
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

  TInput _deserialize(dynamic input) {
    if(inputDeserializer == null) {
      return input;
    } else {
      return inputDeserializer(input);
    }
  }
}
