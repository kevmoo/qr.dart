class FutureValueResult<TOutput> {
  static final String _valueKey = 'value';
  static final String _exceptionKey = 'exception';

  final TOutput value;
  final exception;

  FutureValueResult(this.value) :
    exception = null;

  FutureValueResult.fromException(this.exception)
  : value = null {
    requireArgumentNotNull(exception, 'exception');
  }

  factory FutureValueResult.fromMap(Map value) {
    requireArgumentNotNull(value, 'value');
    requireArgument(isMyMap(value), 'value');

    final ex = value[_exceptionKey];
    if(ex != null) {
      return new FutureValueResult.fromException(ex);
    } else {
      return new FutureValueResult(value[_valueKey]);
    }
  }

  bool get isException => exception != null;

  Map toMap() {
    // would love to use consts here, but the analyzer doesn't like it
    // http://code.google.com/p/dart/issues/detail?id=4207
    return { 'value' : value, 'exception' : exception };
  }

  static bool isMyMap(Map value) {
    return value != null && value.length == 2 &&
        value.containsKey(_valueKey) && value.containsKey(_exceptionKey);
  }

  bool operator ==(FutureValueResult other) {
    return other !== null &&
        other.value == value && other.exception == exception;
  }
}
