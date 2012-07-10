Enumerable $(Iterable source) {
  return new Enumerable(source);
}

class Enumerable<T> implements Iterable<T> {

  const Enumerable._internal();

  factory Enumerable(Iterable<T> source) {
    requireArgumentNotNull(source, 'source');
    return new _FuncEnumerable<T, T>(source, (s) => s);
  }

  Iterator iterator() {
    throw const NotImplementedException();
  }

  Object aggregate(Object seed, Func2<Object, T, Object> f) {
    requireArgumentNotNull(f, 'f');
    return CollectionUtil.aggregate(this, seed, f);
  }

  Enumerable selectMany(Func1<T, Iterable> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this,
      (s) => new _SelectManyIterator._internal(s, f));
  }

  Grouping<Object, T> group([Func1<T, Object> keyFunc = null]) {
    return new Grouping(this, keyFunc);
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
    return new _FuncEnumerable(this, (s) => new _SelectIterator(s, f));
  }

  ReadOnlyCollection<T> toReadOnlyCollection() => new ReadOnlyCollection(this);

  void forEach(Action1<T> f) {
    for(final e in this) {
      f(e);
    }
  }

  List<T> toList() => new List<T>.from(this);

  Enumerable<T> where(Func1<T, bool> f) {
    requireArgumentNotNull(f, 'f');
    return new _FuncEnumerable(this, (s) => new _WhereIterator(s, f));
  }
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
