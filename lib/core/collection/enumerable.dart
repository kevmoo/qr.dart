class Enumerable<T> implements Iterable<T> {
  final Iterable<T> source;

  const Enumerable(this.source);

  Iterator iterator() => source.iterator();

  Object aggregate(Object seed, Func2<Object, T, Object> func) {
    return CollectionUtil.aggregate(this, seed, func);
  }

  SelectMany selectMany(Func1 func) {
    requireArgumentNotNull(func, 'func');
    return new SelectMany(this, func);
  }
}
