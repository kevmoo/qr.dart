Enumerable $(Iterable source) {
  if(source is Enumerable) {
    return source;
  } else {
    return new Enumerable(source);
  }
}

class Enumerable<T> implements Iterable<T> {

  const Enumerable._internal();

  factory Enumerable(Iterable<T> source) {
    requireArgumentNotNull(source, 'source');
    return new _SimpleEnumerable<T>(source);
  }

  Iterator iterator() {
    throw const NotImplementedException();
  }

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

  Enumerable select(Func1<T, Object> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this, (s) => new _SelectIterator<T, Object>(s, f));
  }

  Enumerable<T> where(Func1<T, bool> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this, (s) => new _WhereIterator<T>(s, f));
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
      return new HashSet.from(this.select(f));
    }
  }

  HashMap toHashMap(Func1<T, Object> valueFunc, [Func1<T, Hashable> keyFunc]) {
    Iterable source;
    if(keyFunc == null) {
      keyFunc = (a) => a;
    }

    var e;
    bool duplicate;
    Func populate = () {
      duplicate = false;
      return valueFunc(e);
    };

    final map = new HashMap();
    for(e in this) {
      final k = keyFunc(e);
      duplicate = true;
      map.putIfAbsent(k, populate);
      if(duplicate) {
        throw new UnsupportedOperationException("The key '$k' is duplicated");
      }
    }
    return map;
  }

  NumberEnumerable selectNumbers(Func1<T, num> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncNumEnumerable<T>(this, (s) => new _SelectIterator<T, num>(s, f));
  }

  // TODO:
  // first
  // firstOrDefault
  // last
  // take
  // takeWhile
  // skip
  // skipWhile
  // single
  // singleOrDefault
  // isEmpty
}

class _SimpleEnumerable<T> extends Enumerable<T> {
  final Iterable<T> _source;

  const _SimpleEnumerable(this._source) : super._internal();

  Iterator<T> iterator() => _source.iterator();
}

class _FuncEnumerable<TSource, TOutput> extends Enumerable<TOutput> {
  final Iterable<TSource> _source;
  final Func1<Iterator<TSource>, Iterator<TOutput>> _func;

  const _FuncEnumerable(this._source, this._func) : super._internal();

  Iterator<TOutput> iterator() => _func(_source.iterator());
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
