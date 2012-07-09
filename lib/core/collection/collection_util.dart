class CollectionUtil {
  static bool allUnique(Collection items) {
    requireArgumentNotNull(items, 'items');
    final getter = _getterGetter(items);

    for(int i = 0; i < items.length; i++) {
      for(int j = i + 1; j < items.length; j++) {
        if(getter(i) == getter(j)) {
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

  static Func1 _getterGetter(Collection items) {
    if(items is List) {
      // TODO: casting seems to be broken :-/
      return (index) => items[index];
    }
    else if(items is Listish) {
      // TODO: casting seems to be broken :-/
      return (index) => items[index];
    }
    else {
      throw const NotImplementedException("We only support List and Listish at the moment");
    }
  }
}
