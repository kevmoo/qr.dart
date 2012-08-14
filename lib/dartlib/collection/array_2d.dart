// TODO
// ponder implementing other mutation methods
// implement equals
// toString

class Array2d<T> extends ListBase<T> {
  final int width;
  final int height;
  final List<T> _source;

  factory Array2d.readonlyFrom(int width, Iterable<T> source) {
    final s = source == null ? null : new ReadOnlyCollection(source);
    return new Array2d.wrap(width, s);
  }

  factory Array2d(int width, int height, [T initialValue]) {
    requireArgumentNotNull(width, 'width');
    requireArgumentNotNull(height, 'height');
    requireArgument(width > 0, 'width');
    requireArgument(height > 0, 'height');
    final s = new List<T>();
    s.insertRange(0, width * height, initialValue);
    return new Array2d.wrap(width, s);
  }

  Array2d.wrap(int width, List<T> source):
    this.width = width,
    this._source = source,
    this.height = (width != null && width > 0 && source != null) ?
        source.length ~/ width : 0 {
    requireArgumentNotNull(width, 'width');
    requireArgumentNotNull(source, 'source');
    requireArgument(width >= 0, 'width', 'width must be non-zero');

    if(width == 0) {
      requireArgument(_source.length == 0, 'width',
        'width must be greater than zero if the source is non-empty');
    } else {
      requireArgument(_source.length > 0, 'source',
          'if width is non-zero, source must be non-empty');
      requireArgument(_source.length % width == 0, 'width',
          'width must evenly divide the source');
    }
  }

  int get length() => _source.length;

  T operator [](int index) => _source[index];

  void operator []=(int index, T value) {
    _source[index] = value;
  }

  T get(int x, int y) {
    final i = _getIndex(x, y);
    return this[i];
  }

  void set(int x, int y, T value) {
    final i = _getIndex(x, y);
    this[i] = value;
  }

  int _getIndex(int x, int y) {
    assert(x >= 0 && x < width);
    assert(y >= 0 && y < height);
    return x + y * width;
  }
}
