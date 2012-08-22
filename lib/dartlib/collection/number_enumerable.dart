NumberEnumerable n$(Iterable<num> source) {
  return new NumberEnumerable(source);
}

class NumberEnumerable<T extends num> extends Enumerable<T> {

  const NumberEnumerable._internal() : super._internal();

  factory NumberEnumerable(Iterable<T> source) {
    requireArgumentNotNull(source, 'source');
    return new _SimpleNumEnumerable<T>(source);
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

  const _SimpleNumEnumerable(this._source) : super._internal();

  Iterator<T> iterator() => _source.iterator();
}

class _FuncNumEnumerable<TSource> extends NumberEnumerable {
  final Iterable<TSource> _source;
  final Func1<Iterator<TSource>, Iterator<num>> _func;

  const _FuncNumEnumerable(this._source, this._func) : super._internal();

  Iterator<num> iterator() => _func(_source.iterator());
}
