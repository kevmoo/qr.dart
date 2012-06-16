class ListBase<E> implements Collection<E> {

  const ListBase();

  //
  // Iterable bits
  //
  /**
   * Returns an [Iterator] that iterates over this [Iterable] object.
   */
  Iterator<E> iterator() {
    return new IndexIterator<E>(length, (i) => this[i]);
  }

  //
  // Collection bits
  //
  /**
   * Applies the function [f] to each element of this collection.
   */
  void forEach(void f(E element)) {
    throw 'not implemented...yet';
  }

  /**
   * Returns a new collection with the elements [: f(e) :]
   * for each element [e] of this collection.
   *
   * Note on typing: the return type of f() could be an arbitrary
   * type and consequently the returned collection's
   * typeis Collection.
   */
  Collection map(f(E element)) {
    var list = new List<E>(length);
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
  Collection<E> filter(bool f(E element)) {
    throw 'not implemented...yet';
  }

  /**
   * Returns true if every elements of this collection satisify the
   * predicate [f]. Returns false otherwise.
   */
  bool every(bool f(E element)) {
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
  bool some(bool f(E element)) {
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
   * Returns the number of elements in this collection.
   */
  int get length() {
    throw 'must be implemented by subclass';
  }

  /**
   * Returns the element at the given [index] in the list or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  E operator [](int index) {
    throw 'must be implemented by subclass';
  }

  /**
   * Returns the first index of [element] in the list. Searches the
   * list from index [start] to the length of the list. Returns
   * -1 if [element] is not found.
   */
  int indexOf(E element, [int start=0]) {
    for (var i = start; i < length; i++) {
      if(this[i] == element) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the last index of [element] in the list. Searches the
   * list from index [start] (inclusive) to 0. Returns -1 if
   * [element] is not found.
   */
  int lastIndexOf(E element, [int start=0]) {
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
  E last() => this[this.length-1];

  /**
   * Returns a new list containing [length] elements from the list,
   * starting at  [start].
   * Returns an empty list if [length] is 0.
   * Throws an [IllegalArgumentException] if [length] is negative.
   * Throws an [IndexOutOfRangeException] if [start] or
   * [:start + length - 1:] are out of range.
   */
  List<E> getRange(int start, int length)  {
    throw 'not implemented...yet';
  }
}
