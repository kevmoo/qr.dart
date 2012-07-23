class FutureValueResult<TOutput> {
  final TOutput value;
  final exception;

  FutureValueResult(this.value)
  : exception = null;

  FutureValueResult.exception(this.exception)
  : value = null;

  bool get isException() => exception != null;
}
