class SelectMany<TSource, TOutput>
  implements Iterable<TOutput> {

  final Iterable<TSource> _source;
  final Func1<TSource, Iterable<TOutput>> _func;

  SelectMany(this._source, this._func);

  factory SelectMany.flatten(Iterable<Iterable<TOutput>> source) {
    Func1<Iterable<TOutput>, Iterable<TOutput>> func = (a) => a;

    return new SelectMany(source, func);
  }

  Iterator<TOutput> iterator() =>
      new _SelectManyIterator._internal(_source, _func);
}

class _SelectManyIterator<TSource, TOutput>
  implements Iterator<TOutput> {

  final Iterable<TSource> _source;
  final Func1<TSource, Iterable<TOutput>> _func;

  Iterator<TSource> _sourceIterator;
  Iterator<TOutput> _outputIterator;

  _SelectManyIterator._internal(this._source, this._func);

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
    if(_sourceIterator == null) {
      _sourceIterator = _source.iterator();
    }

    assert(_sourceIterator != null);
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
