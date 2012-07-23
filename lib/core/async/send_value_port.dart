// NOTE: I'd love to not have to deal with this, but...
//       it seems that unhandled exceptions (at least in Dartium) crash things
//       http://dartbug.com/3734
class SendValuePort<TInput, TOutput> {
  final Func1<TInput, TOutput> _func;

  SendValuePort(this._func) {
    port.receive((TInput value, SendPort reply) {
      try {
        final TOutput output = _func(value);
        reply.send(new FutureValueResult<TOutput>(output));
      } catch(final ex) {
        reply.send(new FutureValueResult<TOutput>.exception(ex));
      }
    });
  }
}
