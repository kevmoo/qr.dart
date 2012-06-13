class CollectionUtil {
  static bool allUnique(List items) {
    assert(items != null);
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
    assert(source != null);
    assert(func != null);

    for (final Object local in source) {
      seed = func(seed, local);
    }

    return seed;
  }
}
