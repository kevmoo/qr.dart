class ListBase<T> extends Enumerable<T> implements Listish<T> {

  const ListBase() : super._internal();

  //
  // Iterable bits
  //
  /**
   * Returns an [Iterator] that iterates over this [Iterable] object.
   */
  Iterator<T> iterator() {
    return new IndexIterator<T>(length, (i) => this[i]);
  }

  //
  // Collection bits
  //
  /**
   * Applies the function [f] to each element of this collection.
   */
  void forEach(void f(T element)) {
    for(var i = 0; i < length; i++) {
      f(this[i]);
    }
  }

  /**
   * Returns a new collection with the elements [:f(e):]
   * for each element [e] of this collection.
   *
   * Note on typing: the return type of f() could be an arbitrary
   * type and consequently the returned collection's
   * typeis Collection.
   */
  Collection map(f(T element)) {
    var list = new List<T>(length);
    for(var i = 0; i < length; i++) {
      list[i] = f(this[i]);
    }
    return list;
  }

  /**
   * Returns a new collection with the elements of this collection
   * that satisfy the predicate [f].
   *
   * An element satisfies the predicate [f] if [:f(element):]
   * returns true.
   */
  Collection<T> filter(bool f(T element)) {
    var list = new List<T>();
    for(var i = 0; i < length; i++) {
      final e = this[i];

      if(f(e)) {
        list.add(e);
      }
    }
    return list;
  }

  /**
   * Returns true if every elements of this collection satisify the
   * predicate [f]. Returns false otherwise.
   */
  bool every(bool f(T element)) {
    for (var i = 0; i < length; i++) {
      if(!f(this[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if one element of this collection satisfies the
   * predicate [f]. Returns false otherwise.
   */
  bool some(bool f(T element)) {
    for (var i = 0; i < length; i++) {
      if(f(this[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if there is no element in this collection.
   */
  bool isEmpty() => length == 0;

  /**
   * Throws a [NotImplementedException].
   *
   * Subclasses should return the number of elements in this collection.
   */
  int get length() {
    throw const NotImplementedException('must be implemented by subclass');
  }

  /**
   * Throws a [NotImplementedException].
   *
   * Subclasses should return the element at the given [index] in the list
   * or throw an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  T operator [](int index) {
    throw const NotImplementedException('must be implemented by subclass');
  }

  /**
   * Returns the first index of [element] in the list. Searches the
   * list from index [start] to the length of the list. Returns
   * -1 if [element] is not found.
   */
  int indexOf(T element, [int start=0]) {
    for (var i = start; i < length; i++) {
      if(this[i] == element) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the last index of [element] in the list. Searches the
   * list from index [start] to 0. Returns -1 if [element] is not found.
   */
  int lastIndexOf(T element, [int start=0]) {
    var lastIndex = -1;
    for (var i = start; i < length; i++) {
      if(this[i] == element) {
        lastIndex = i;
      }
    }
    return lastIndex;
  }

  /**
   * Returns the last element of the list, or throws an out of bounds
   * exception if the list is empty.
   */
  T last() => this[this.length-1];

  /**
   * Returns a new list containing [itemCount] elements from the list,
   * starting at [start].
   * Returns an empty list if [itemCount] is 0.
   * Throws an [IllegalArgumentException] if [itemCount] is negative.
   * Throws an [IndexOutOfRangeException] if [start] or
   * [:start + itemCount - 1:] are out of range.
   */
  List<T> getRange(int start, int itemCount)  {
    requireArgument(itemCount >= 0, 'count');

    final lastIndex = start + itemCount - 1;

    if(itemCount > 0) {
      if(start < 0) {
        throw new IndexOutOfRangeException(start);
      }
      else if(lastIndex >= length) {
        throw new IndexOutOfRangeException(lastIndex);
      }
    }

    var list = new List<T>();
    for(var i = start; i <= lastIndex; i++) {
      list.add(this[i]);
    }
    return list;
  }

  Dynamic reduce(Dynamic initialValue,
                 Dynamic combine(Dynamic previousValue, T element)) {
    return Collections.reduce(this, initialValue, combine);
  }
}
