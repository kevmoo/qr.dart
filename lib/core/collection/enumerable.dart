class Enumerable<T> implements Iterable<T> {

  const Enumerable._internal();

  factory Enumerable(Iterable<T> source) {
    return new _EnumerableWrapper(source);
  }

  Iterator iterator() {
    throw const NotImplementedException();
  }

  Object aggregate(Object seed, Func2<Object, T, Object> func) {
    return CollectionUtil.aggregate(this, seed, func);
  }

  SelectMany selectMany(Func1 func) {
    requireArgumentNotNull(func, 'func');
    return new SelectMany(this, func);
  }

  Grouping<Object, T> group([Func1<T, Object> keyFunc = null]) {
    return new Grouping(this, keyFunc);
  }
}

class _EnumerableWrapper<T> extends Enumerable<T> {
  final Iterable<T> source;

  const _EnumerableWrapper(this.source) : super._internal();

  Iterator iterator() => source.iterator();
}
