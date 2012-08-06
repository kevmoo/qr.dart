/**
 * A [Collection] with an indexer. Great for read-only collections.
 * Consumed in `dartlib` helper methods.
 **/
interface Listish<T> extends Collection<T> {
  /**
   * Throws a [NotImplementedException].
   *
   * Subclasses should return the element at the given [index] in the list
   * or throw an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  T operator [](int index);
}
