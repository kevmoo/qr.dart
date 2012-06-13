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
}
