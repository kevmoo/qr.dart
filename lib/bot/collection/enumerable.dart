Enumerable $(Iterable source) {
  if(source is Enumerable) {
    return source;
  } else {
    return new Enumerable.fromIterable(source);
  }
}

class Enumerable<T> implements Collection<T> {
  // TODO:
  // last
  // take
  // takeWhile
  // skip
  // skipWhile
  // isEmpty

  const Enumerable();

  factory Enumerable.fromIterable(Iterable<T> source) {
    requireArgumentNotNull(source, 'source');
    return new _SimpleEnumerable<T>(source);
  }

  abstract Iterator iterator();

  /**
   * Returns true if every elements of this collection satisify the
   * predicate [f]. Returns false otherwise.
   */
  bool every(Func1<T, bool> f) {
    requireArgumentNotNull(f, 'f');
    for (final e in this) {
      if(!f(e)) {
        return false;
      }
    }
    return true;
  }

  bool contains(T item) {
    for (final e in this) {
      if(e == item) {
        return true;
      }
    }
    return false;
  }

  bool isEmpty() => !some((e) => true);

  /**
   * Returns true if one element of this collection satisfies the
   * predicate [f]. Returns false otherwise.
   */
  bool some(Func1<T, bool> f) {
    requireArgumentNotNull(f, 'f');
    for (final e in this) {
      if(f(e)) {
        return true;
      }
    }
    return false;
  }

  int count([Func1<T, bool> f = null]) {
    if(f == null) {
      f = (a) => true;
    }
    int c = 0;
    for(final e in this) {
      if(f(e)) {
        c++;
      }
    }
    return c;
  }

  String join([String separator = ', ']) {
    final StringBuffer sb = new StringBuffer();
    for(final e in this) {
      if(sb.length > 0) {
        sb.add(separator);
      }
      sb.add(e);
    }
    return sb.toString();
  }

  /**
   * Returns a new collection with the elements [: f(e) :]
   * for each element [:e:] of this collection.
   *
   * Note on typing: the return type of f() could be an arbitrary
   * type and consequently the returned collection's
   * typeis Collection.
   */
  Enumerable map(Func1<T, Object> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this, (s) => new _SelectIterator<T, Object>(s, f));
  }

  Enumerable<T> filter(Func1<T, bool> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this, (s) => new _WhereIterator<T>(s, f));
  }

  /**
   * Reduce a collection to a single value by iteratively combining each element
   * of the collection with an existing value using the provided function.
   * Use [initialValue] as the initial value, and the function [combine] to
   * create a new value from the previous one and an element.
   *
   * Example of calculating the sum of a collection:
   *
   *   collection.reduce(0, (prev, element) => prev + element);
   */
  Dynamic reduce(Dynamic initialValue,
                 Dynamic combine(Dynamic previousValue, T element)) {
    return Collections.reduce(this, initialValue, combine);
  }

  Enumerable<T> exclude(Iterable<T> items) {
    requireArgumentNotNull(items, 'items');
    final iEnum = $(items);
    Func1<T, bool> f = (e) => !iEnum.contains(e);
    return new _FuncEnumerable(this, (s) => new _WhereIterator<T>(s, f));
  }

  Enumerable selectMany(Func1<T, Iterable> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this,
      (s) => new _SelectManyIterator._internal(s, f));
  }

  T first([Func1<T, bool> f = null]) {
    if(f == null) {
      f = (e) => true;
    }
    final iter = new _WhereIterator<T>(this.iterator(), f);
    if(!iter.hasNext()) {
      throw const InvalidOperationException('The input sequence is empty.');
    }
    return iter.next();
  }

  T firstOrDefault([Func1<T, bool> f = null, T defaultValue = null]) {
    if(f == null) {
      f = (e) => true;
    }
    final iter = new _WhereIterator<T>(this.iterator(), f);
    if(!iter.hasNext()) {
      return defaultValue;
    }
    return iter.next();
  }

  T single([Func1<T, bool> f = null]) {
    if(f == null) {
      f = (e) => true;
    }
    final iter = new _WhereIterator<T>(this.iterator(), f);
    if(!iter.hasNext()) {
      throw const InvalidOperationException('The input sequence is empty.');
    }
    final value = iter.next();
    if(iter.hasNext()) {
      throw const InvalidOperationException('The input sequence contains more than one element.');
    }
    return value;
  }

  T singleOrDefault([Func1<T, bool> f = null, T defaultValue = null]) {
    if(f == null) {
      f = (e) => true;
    }
    final iter = new _WhereIterator<T>(this.iterator(), f);
    if(!iter.hasNext()) {
      return defaultValue;
    }
    final value = iter.next();
    if(iter.hasNext()) {
      throw const InvalidOperationException('The input sequence contains more than one element.');
    }
    return value;
  }

  Enumerable<T> distinct([Func2<T, T, bool> comparer = null]) {
    if(comparer == null) {
      comparer = (a,b) => a == b;
    }
    return new _FuncEnumerable(this, (s) => new _DistinctIterator(s, comparer));
  }

  Object aggregate(Object seed, Func2<Object, T, Object> f) {
    requireArgumentNotNull(f, 'f');
    return CollectionUtil.aggregate(this, seed, f);
  }

  Grouping<Dynamic, T> group([Func1<T, Object> keyFunc = null]) {
    return new Grouping(this, keyFunc);
  }

  ReadOnlyCollection<T> toReadOnlyCollection() => new ReadOnlyCollection<T>(this);

  void forEach(Action1<T> f) {
    for(final e in this) {
      f(e);
    }
  }

  void forEachWithIndex(Action2<T, int> f) {
    int i = 0;
    for(final e in this) {
      f(e, i++);
    }
  }

  List<T> toList() => new List<T>.from(this);

  HashSet toHashSet([Func1<T, Hashable> f]) {
    if(f == null) {
      return new HashSet.from(this);
    } else {
      return new HashSet.from(this.map(f));
    }
  }

  HashMap toHashMap(Func1<T, Object> valueFunc, [Func1<T, Hashable> keyFunc]) {
    if(keyFunc == null) {
      keyFunc = (a) => a;
    }

    final map = new HashMap();
    for(final e in this) {
      final k = keyFunc(e);
      if(map.containsKey(k)) {
        throw new UnsupportedOperationException("The key '$k' is duplicated");
      }
      map[k] = valueFunc(e);
    }
    return map;
  }

  NumberEnumerable selectNumbers(Func1<T, num> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncNumEnumerable<T>(this, (s) => new _SelectIterator<T, num>(s, f));
  }

  String toString() => "[${this.join()}]";
}

class _SimpleEnumerable<T> extends Enumerable<T> {
  final Iterable<T> _source;

  const _SimpleEnumerable(this._source) : super();

  Iterator<T> iterator() => _source.iterator();

  int get length => count();
}

class _FuncEnumerable<TSource, TOutput> extends Enumerable<TOutput> {
  final Iterable<TSource> _source;
  final Func1<Iterator<TSource>, Iterator<TOutput>> _func;

  const _FuncEnumerable(this._source, this._func) : super();

  Iterator<TOutput> iterator() => _func(_source.iterator());

  int get length => count();
}

class _SelectIterator<TSource, TOutput> implements Iterator<TOutput> {
  final Iterator<TSource> _source;
  final Func1<TSource, TOutput> _func;

  const _SelectIterator(this._source, this._func);

  bool hasNext() => _source.hasNext();

  TOutput next() => _func(_source.next());
}

class _WhereIterator<T> implements Iterator<T> {
  final Iterator<T> _source;
  final Func1<T, bool> _func;
  bool _next;
  T _current;

  _WhereIterator(this._source, this._func);

  bool hasNext() {
    if(_next == null) {
      _next = false;
      while(_source.hasNext()) {
        _current = _source.next();
        if(_func(_current)) {
          _next = true;
          break;
        }
      }
    }
    return _next;
  }

  T next() {
    if(!hasNext()) {
      throw const NoMoreElementsException();
    }
    assert(_func(_current));
    _next = null;
    return _current;
  }
}

class _DistinctIterator<T> implements Iterator<T> {
  final Iterator<T> _source;
  final Func2<T, T, bool> _comparer;

  // TODO: nice to have a universal hashability so we can use a hash here
  final List<T> _found;
  bool _next;
  T _current;

  _DistinctIterator(this._source, this._comparer) :
    _found = new List<T>();

  bool hasNext() {
    if(_next == null) {
      _next = false;
      while(_source.hasNext()) {
        _current = _source.next();
        if(_found.every((e) => !_comparer(e, _current))) {
          _next = true;
          _found.add(_current);
          break;
        }
      }
    }
    return _next;
  }

  T next() {
    if(!hasNext()) {
      throw const NoMoreElementsException();
    }
    _next = null;
    return _current;
  }
}

class _SelectManyIterator<TSource, TOutput>
  implements Iterator<TOutput> {

  final Iterator<TSource> _sourceIterator;
  final Func1<TSource, Iterable<TOutput>> _func;

  Iterator<TOutput> _outputIterator;

  _SelectManyIterator._internal(this._sourceIterator, this._func);

  bool hasNext() {
    if(_outputIterator != null) {
      if(_outputIterator.hasNext()) {
        return true;
      }
      else {
        _outputIterator = null;
      }
    }

    assert(_outputIterator == null);

    if(_sourceIterator.hasNext()) {
      var nextOutputIterable = _sourceIterator.next();
      _outputIterator = _func(nextOutputIterable).iterator();
      return _outputIterator.hasNext();
    }
    return false;
  }

  TOutput next() {
    if(!hasNext()) {
      throw const NoMoreElementsException();
    }
    return _outputIterator.next();
  }
}
