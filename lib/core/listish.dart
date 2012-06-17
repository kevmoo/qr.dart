/**
 * A [Collection] with an indexer. Great for read-only collections.
 * Consumed in `dartlib` helper methods.
 **/
interface Listish<E> extends Collection<E> {
  /**
   * Throws a [NotImplementedException].
   *
   * Subclasses should return the element at the given [index] in the list
   * or throw an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  E operator [](int index);
}
