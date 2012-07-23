class Util {
  static int getHashCode(Iterable<Hashable> source) {
    int hash = 0;
    for (final h in source) {
      int next = h == null ? 0 : h.hashCode();
      hash = 0x1fffffff & (hash + next);
      hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
      hash ^= hash >> 6;
    }
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    hash ^= hash >> 11;
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}
