class NoneHashMap<K, V> implements Map<K, V> {
  final List<Tuple<K,V>> _values;

  NoneHashMap() : _values = new List<Tuple<K,V>>();

  V putIfAbsent(K key, Func<V> ifAbsent) {
    for(final t in _values) {
      if(t.Item1 == key) {
        return t.Item2;
      }
    }
    final t = new Tuple(key, ifAbsent());
    _values.add(t);
    return t.Item2;
  }

  Collection<K> getKeys() => $(_values).select((t) => t.Item1).toList();

  Collection<V> getValues() => $(_values).select((t) => t.Item2).toList();

  int get length() => _values.length;

  void forEach(Action2<K,V> f) {
    for(final t in _values) {
      f(t.Item1, t.Item2);
    }
  }

  bool containsValue(V value) {
    throw 'not impled';
  }

  bool containsKey(K key) {
    for(final t in _values) {
      if(t.Item1 == key) {
        return true;
      }
    }
    return false;
  }

  V operator [](K key) {
    for(final t in _values) {
      if(t.Item1 == key) {
        return t.Item2;
      }
    }
    return null;
  }

  void operator []=(K key, V value) {
    final newT = new Tuple<K, V>(key, value);
    for(int i = 0; i < _values.length; i++) {
      if(_values[i].Item1 == key) {
        _values[i] = newT;
        return;
      }
    }
    _values.add(newT);
  }

  V remove(K key) {
    for(int i = 0; i < _values.length; i++) {
      if(_values[i].Item1 == key) {
        final t = _values[i];
        _values.removeRange(i, 1);
        return t.Item2;
      }
    }
    return null;
  }

  void clear() {
    throw 'not impled';
  }

  bool isEmpty() {
    throw 'not impled';
  }
}
