class FutureValueResult<TOutput> {
  static final String _valueKey = 'value';
  static final String _exceptionKey = 'exception';

  final TOutput value;
  final exception;
  final Func1<Dynamic, TOutput> _outputSerializer;

  FutureValueResult(this.value, [this._outputSerializer]) :
    exception = null;

  FutureValueResult.fromException(this.exception)
  : value = null, _outputSerializer = null {
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
    // DARTBUG: http://code.google.com/p/dart/issues/detail?id=4207
    final rawValue = _serialize(value);
    return { 'value' : rawValue, 'exception' : exception };
  }

  static bool isMyMap(Map value) {
    return value != null && value.length == 2 &&
        value.containsKey(_valueKey) && value.containsKey(_exceptionKey);
  }

  bool operator ==(FutureValueResult other) {
    return other != null &&
        other.value == value && other.exception == exception;
  }

  Dynamic _serialize(TOutput output) {
    if(_outputSerializer == null) {
      return output;
    } else {
      return _outputSerializer(output);
    }
  }
}
