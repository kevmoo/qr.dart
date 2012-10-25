class CollectionUtil {
  static bool allUnique(Sequence items) {
    requireArgumentNotNull(items, 'items');

    for(int i = 0; i < items.length; i++) {
      for(int j = i + 1; j < items.length; j++) {
        if(items[i] == items[j]) {
          return false;
        }
      }
    }
    return true;
  }

  static Object aggregate(Iterable source, Object seed, Func2 func) {
    requireArgumentNotNull(source, 'source');
    requireArgumentNotNull(func, 'func');

    for (final Object local in source) {
      seed = func(seed, local);
    }

    return seed;
  }
}
