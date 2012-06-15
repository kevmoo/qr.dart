class IndexIterator<T> implements Iterator<T> {
  IndexIterator(int length, Func1<int, T> indexer) :
    _indexer = indexer,
    _length = length,
    _pos = 0 {
    assert(_indexer != null);
    assert(_length >= 0);
  }

  bool hasNext() => _length > _pos;

  T next() {
    if (!hasNext()) {
      throw const NoMoreElementsException();
    }
    return _indexer(_pos++);
  }

  final Func1<int, T> _indexer;
  final int _length;
  int _pos;
}
