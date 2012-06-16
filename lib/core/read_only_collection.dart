class ReadOnlyCollection<E> extends ListBase<E> {
  final List<E> _items;

  const ReadOnlyCollection.empty() :
    _items = const [];

  ReadOnlyCollection(Iterable<E> source) :
    _items = new List<E>.from(source);

  /**
   * Returns the number of elements in this collection.
   */
  int get length() => _items.length;

  /**
   * Returns the element at the given [index] in the list or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  E operator [](int index) {
    // NOTE: we're relying on List<E> to do the range checking for us.
    return _items[index];
  }
}
