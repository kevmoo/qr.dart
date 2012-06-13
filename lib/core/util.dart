class Util {
  static int getHashCode(Iterable<Hashable> source) {
    int current = 0;
    for (final h in source) {
      int next = h == null ? 0 : h.hashCode();
      current = ((current << 5) + current) ^ next;
    }
    return current;
  }
}
