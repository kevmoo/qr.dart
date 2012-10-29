part of bot;

NumberEnumerable n$(Iterable<num> source) {
  return new NumberEnumerable.from(source);
}

abstract class NumberEnumerable<T extends num> extends Enumerable<T> {

  const NumberEnumerable() : super();

  factory NumberEnumerable.from(Iterable<T> source) {
    requireArgumentNotNull(source, 'source');
    return new _SimpleNumEnumerable<T>(source);
  }

  factory NumberEnumerable.fromRange(int start, int count) {
    return new _RangeEnumerable(start, count);
  }

  num sum() {
    num theSum = 0;
    for(final n in this) {
      theSum += n;
    }
    return theSum;
  }

  num average() {
    int theCount = 0;
    num theSum = 0;
    for(final n in this) {
      theSum += n;
      theCount++;
    }
    return theSum / theCount;
  }

  num max() {
    num theMax = null;
    for(final n in this) {
      theMax = theMax == null ? n : math.max(theMax, n);
    }
    return theMax;
  }

  num min() {
    num theMin = null;
    for(final n in this) {
      theMin = theMin == null ? n : math.min(theMin, n);
    }
    return theMin;
  }
}

class _SimpleNumEnumerable<T extends num> extends NumberEnumerable<T> {
  final Iterable<T> _source;

  const _SimpleNumEnumerable(this._source) : super();

  Iterator<T> iterator() => _source.iterator();
}

class _FuncNumEnumerable<TSource> extends NumberEnumerable {
  final Iterable<TSource> _source;
  final Func1<Iterator<TSource>, Iterator<num>> _func;

  const _FuncNumEnumerable(this._source, this._func) : super();

  Iterator<num> iterator() => _func(_source.iterator());
}

class _RangeEnumerable extends NumberEnumerable<int> {
  final int _start;
  final int _count;

  const _RangeEnumerable(this._start, this._count);

  Iterator<int> iterator() => new _RangeIterator(_start, _count);
}

class _RangeIterator implements Iterator<int> {
  final int _start;
  final int _count;

  int _current = 0;

  _RangeIterator(this._start, this._count);

  bool get hasNext => _current < _count;

  int next() {
    assert(hasNext);
    final val = _start + _current;
    _current++;
    return val;
  }
}
