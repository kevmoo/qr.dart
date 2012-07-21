function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 },
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null) throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null)) {
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null)) this._exceptionHandled = onException.$call$1(t1);
  } else $.add$1(this._exceptionHandlers, onException);
 },
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true) onSuccess.$call$1(this.get$value());
  else {
    if (this.get$isComplete() !== true) $.add$1(this._successListeners, onSuccess);
    else {
      if (this._exceptionHandled !== true) throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$stackTrace: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null)) throw $.captureStackTrace(t1);
  return this._value;
 }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
 },
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC3);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t2 = t1.length;
    if (index < 0 || index >= t2) throw $.ioore(index);
    var t3 = t1[index] === $.CTC3;
    t1 = t3;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  t1[index] = value;
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && !($.index(t1, index) == null))) {
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t2 = $.index(t1, index) === $.CTC3;
            t1 = t2;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 == null || t2 === $.CTC3) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t1 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC3) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t2 = t1.length;
    if (hash < 0 || hash >= t2) throw $.ioore(hash);
    t1 = t1[hash];
    if (t1 == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(t1, key)) return hash;
    if (insertionIndex < 0 && $.CTC3 === t1) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true) return false;
  t1.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC3));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC3));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t2[t1] === $.CTC3 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC3 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null) return;
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC6);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC6);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib1_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 },
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 },
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 },
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 },
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 },
 is$Exception: true
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 },
 is$Exception: true
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 },
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 },
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 },
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 },
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 },
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 },
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 },
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 },
 is$Exception: true
};

$$.QrDemo = {"":
 ["_frameRequested", "_mouseLocation", "_ctx", "_squares!", "_qrMapper?", "_canvas"],
 super: "Object",
 _setMouse$1: function(value) {
  this._mouseLocation = value;
 },
 _canvas_mouseOut$1: function(e) {
  this._setMouse$1(null);
 },
 get$_canvas_mouseOut: function() { return new $.BoundClosure(this, '_canvas_mouseOut$1'); },
 _canvas_mouseMove$1: function(e) {
  this._setMouse$1($.Coordinate$(e.get$offsetX(), e.get$offsetY()));
 },
 get$_canvas_mouseMove: function() { return new $.BoundClosure(this, '_canvas_mouseMove$1'); },
 _onFrame$1: function(highResTime) {
  this._frameRequested = false;
  if (this._ctx == null) this._ctx = this._canvas.get$context2d();
  this._ctx.set$fillStyle('white');
  this._ctx.fillRect$4(0, 0, 570, 570);
  this._ctx.set$fillStyle('black');
  if ($.gtB($.get$length(this._squares), 0)) {
    for (var x = 0; x < 57; ++x) {
      for (var t1 = x * 57, t2 = x * 10, y = 0; y < 57; ++y) {
        $.index(this._squares, t1 + y) === true && this._ctx.fillRect$4(t2, y * 10, 10, 10);
      }
    }
  }
 },
 get$_onFrame: function() { return new $.BoundClosure(this, '_onFrame$1'); },
 requestFrame$0: function() {
  if (this._frameRequested !== true) {
    this._frameRequested = true;
    $.window().webkitRequestAnimationFrame$1(this.get$_onFrame());
  }
 },
 updateValue$1: function(value) {
  this._qrMapper.set$input(value);
 },
 QrDemo$1: function(_canvas) {
  $.add$1(this._qrMapper.get$outputChanged(), new $.anon0(this));
  var t1 = this._canvas;
  $.add$1(t1.get$on().get$mouseMove(), this.get$_canvas_mouseMove());
  $.add$1(t1.get$on().get$mouseOut(), this.get$_canvas_mouseOut());
 }
};

$$._QrMapper = {"":
 ["_sendPort", "_inputChangedHandle", "_outputChangedHandle", "_pending", "_output", "_future", "_input"],
 super: "SlowMapper",
 getFuture$1: function(value) {
  return this._sendPort.call$1(value);
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$write: function() {
  return this.operator$index$1('write');
 },
 write$1: function(arg0) { return this.get$write().$call$1(arg0); }
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$keyUp: function() {
  return this.operator$index$1('keyup');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || (keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || (values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
 },
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i) {
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      }
      return result;
  }
 },
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || ((dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())) return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
 },
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i) {
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  }
  return dartList;
 },
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
 },
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
 },
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
 }
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId=", "currentManagerId=", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id="],
 super: "Object",
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  $.isEmpty(t1) === true && $._globalState().get$isolates().remove$1(this.id);
 },
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true) throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
 },
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
 }
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 terminate$0: function() {
 },
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 set$onmessage: function(f) {
  throw $.captureStackTrace($.ExceptionImplementation$('onmessage should not be set on MainManagerStub'));
 },
 set$id: function(i) {
  throw $.captureStackTrace($.NotImplementedException$(null));
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
 },
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_NativeJsSendPort) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_WorkerSendPort) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_BufferingSendPort)))) throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
 },
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._BufferingSendPort = {"":
 ["pending=", "_futurePort?", "_port=", "_id?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._id;
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_BufferingSendPort && $.eqB(this._id, other._id);
 },
 send$2: function(message, replyTo) {
  var t1 = this._port;
  if (!(t1 == null)) t1.send$2(message, replyTo);
  else $.add$1(this.pending, $.makeLiteralMap(['message', message, 'replyTo', replyTo]));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 _BufferingSendPort$2: function(isolateId, _futurePort) {
  $._BufferingSendPort__idCount = $.add($._BufferingSendPort__idCount, 1);
  this._futurePort.then$1(new $.anon(this));
 },
 is$_BufferingSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
 },
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
 },
 receive$1: function(onMessage) {
  this._callback = onMessage;
 },
 _callback$2: function(arg0, arg1) { return this._callback.$call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
 }
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null && $.add$1(this.ports, port.get$_futurePort());
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null)) return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null)) return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
 },
 visitPrimitive$1: function(x) {
 },
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null) return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  }
  return $._WorkerSendPort$(managerId, isolateId, receivePortId);
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.Uri = {"":
 ["fragment", "query", "path", "port", "domain", "userInfo", "scheme"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this.scheme;
  $.Uri__addIfNonEmpty(sb, t1, t1, ':');
  if (this.hasAuthority$0() === true || $.eqB(t1, 'file')) {
    sb.add$1('//');
    t1 = this.userInfo;
    $.Uri__addIfNonEmpty(sb, t1, t1, '@');
    t1 = this.domain;
    sb.add$1(t1 == null ? 'null' : t1);
    t1 = this.port;
    if (!$.eqB(t1, 0)) {
      sb.add$1(':');
      sb.add$1($.toString(t1));
    }
  }
  t1 = this.path;
  sb.add$1(t1 == null ? 'null' : t1);
  t1 = this.query;
  $.Uri__addIfNonEmpty(sb, t1, '?', t1);
  t1 = this.fragment;
  $.Uri__addIfNonEmpty(sb, t1, '#', t1);
  return sb.toString$0();
 },
 hasAuthority$0: function() {
  return !$.eqB(this.userInfo, '') || (!$.eqB(this.domain, '') || !$.eqB(this.port, 0));
 },
 isAbsolute$0: function() {
  if ('' === this.scheme) return false;
  if (!('' === this.fragment)) return false;
  return true;
 },
 query$1: function(arg0) { return this.query.$call$1(arg0); }
};

$$.DisposableImpl = {"":
 [],
 super: "Object"
};

$$.GlobalId = {"":
 ["_hashCode", "id?"],
 super: "Object",
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(other.get$id(), this.id);
 },
 hashCode$0: function() {
  return this._hashCode;
 }
};

$$.NullArgumentException = {"":
 ["_arg"],
 super: "IllegalArgumentException"
};

$$.Enumerable = {"":
 [],
 super: "Object",
 toString$0: function() {
  return '[' + $.S(this.join$0()) + ']';
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 join$1: function(separator) {
  var sb = $.StringBufferImpl$('');
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.gtB($.get$length(sb), 0) && sb.add$1(separator);
    sb.add$1(t2);
  }
  return sb.toString$0();
 },
 join$0: function() {
  return this.join$1(', ')
},
 contains$1: function(item) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    if ($.eqB(t1.next$0(), item)) return true;
  }
  return false;
 },
 iterator$0: function() {
  throw $.captureStackTrace($.CTC4);
 }
};

$$.IndexIterator = {"":
 ["_lib0_pos", "_lib0_length", "_indexer"],
 super: "Object",
 _indexer$1: function(arg0) { return this._indexer.$call$1(arg0); },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._lib0_pos;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1);
  this._lib0_pos = t1 + 1;
  return this._indexer$1(t1);
 },
 next$0$bailout: function(state, t1) {
  this._lib0_pos = $.add(t1, 1);
  return this._indexer$1(t1);
 },
 hasNext$0: function() {
  var t1 = this._lib0_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._lib0_pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib0_length;
    case 1:
      state = 0;
      var t2 = this._lib0_pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 },
 IndexIterator$2: function(length$, indexer) {
  $.requireArgumentNotNull(this._indexer, '_indexer');
 }
};

$$.ListBase = {"":
 [],
 super: "Enumerable",
 lastIndexOf$2: function(element, start) {
  if (start !== (start | 0)) return this.lastIndexOf$2$bailout(1, element, start);
  for (var i = start, lastIndex = -1; $.ltB(i, $.get$length(this)); ++i) {
    lastIndex = $.eqB(this.operator$index$1(i), element) ? i : lastIndex;
  }
  return lastIndex;
 },
 lastIndexOf$2$bailout: function(state, element, start) {
  for (var i = start, lastIndex = -1; $.ltB(i, $.get$length(this)); i = $.add(i, 1)) {
    lastIndex = $.eqB(this.operator$index$1(i), element) ? i : lastIndex;
  }
  return lastIndex;
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 indexOf$2: function(element, start) {
  if (typeof start !== 'number') return this.indexOf$2$bailout(1, element, start);
  for (var i = start; $.ltB(i, $.get$length(this)); ++i) {
    if ($.eqB(this.operator$index$1(i), element)) return i;
  }
  return -1;
 },
 indexOf$2$bailout: function(state, element, start) {
  for (var i = start; $.ltB(i, $.get$length(this)); i = $.add(i, 1)) {
    if ($.eqB(this.operator$index$1(i), element)) return i;
  }
  return -1;
 },
 operator$index$1: function(index) {
  throw $.captureStackTrace($.CTC5);
 },
 get$length: function() {
  throw $.captureStackTrace($.CTC5);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  for (var i = 0; $.ltB(i, $.get$length(this)); ++i) {
    f.$call$1(this.operator$index$1(i));
  }
 },
 iterator$0: function() {
  var t1 = $.IndexIterator$($.get$length(this), new $.ListBase_iterator_anon(this));
  $.setRuntimeTypeInfo(t1, ({T: 'E'}));
  return t1;
 },
 is$Collection: function() { return true; }
};

$$.ReadOnlyCollection = {"":
 ["_items"],
 super: "ListBase",
 operator$index$1: function(index) {
  return $.index(this._items, index);
 },
 get$length: function() {
  return $.get$length(this._items);
 }
};

$$.EventHandle = {"":
 ["_handlers", "_disposed"],
 super: "DisposableImpl",
 remove$1: function(id) {
  var t1 = this._handlers;
  if (!(t1 == null)) return !(t1.remove$1(id) == null);
  return false;
 },
 add$1: function(handler) {
  var id = $.GlobalId_GlobalId();
  if (this._handlers == null) this._handlers = $.HashMapImplementation$();
  $.indexSet(this._handlers, id, handler);
  return id;
 },
 fireEvent$1: function(args) {
  var t1 = this._handlers;
  !(t1 == null) && $.forEach(t1, new $.EventHandle_fireEvent_anon(args));
 }
};

$$.EventArgs = {"":
 [],
 super: "Object"
};

$$.Coordinate = {"":
 ["y?", "x?"],
 super: "Object",
 toString$0: function() {
  return '{x:' + $.S(this.x) + ', y:' + $.S(this.y) + '}';
 },
 operator$eq$1: function(other) {
  return !(other == null) && ($.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y()));
 },
 operator$add$1: function(other) {
  return $.Coordinate$($.add(this.x, other.get$x()), $.add(this.y, other.get$y()));
 },
 operator$sub$1: function(other) {
  return $.Coordinate_difference(this, other);
 }
};

$$.Vector = {"":
 ["y", "x"],
 super: "Coordinate",
 scale$1: function(magnitude) {
  return $.Vector$($.mul(this.x, magnitude), $.mul(this.y, magnitude));
 },
 operator$mul$1: function(magnitude) {
  return this.scale$1(magnitude);
 },
 operator$add$1: function(other) {
  return $.Vector$($.add(this.x, other.get$x()), $.add(this.y, other.get$y()));
 },
 get$length: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.Math_sqrt($.add(t1, $.mul(t2, t2)));
 }
};

$$.SlowMapper = {"":
 [],
 super: "Object",
 _startFuture$0: function() {
  this._future = this.getFuture$1(this._input);
  this._future.then$1(this.get$_futureCompleted());
 },
 _futureCompleted$1: function(value) {
  this._future = null;
  this._output = value;
  this._outputChangedHandle.fireEvent$1($.CTC8);
  if (this._pending === true) {
    this._pending = false;
    this._startFuture$0();
  }
 },
 get$_futureCompleted: function() { return new $.BoundClosure(this, '_futureCompleted$1'); },
 get$outputChanged: function() {
  return this._outputChangedHandle;
 },
 get$output: function() {
  return this._output;
 },
 set$input: function(value) {
  this._input = value;
  if (this._future == null) this._startFuture$0();
  else this._pending = true;
  this._inputChangedHandle.fireEvent$1($.CTC8);
 }
};

$$.QrBitBuffer = {"":
 ["_lib0_length", "_lib0_buffer"],
 super: "ListBase",
 putBit$1: function(bit) {
  var t1 = this._lib0_length;
  if (typeof t1 !== 'number') return this.putBit$1$bailout(1, bit, t1, 0, 0);
  var bufIndex = $.tdiv(t1, 8);
  t1 = this._lib0_buffer;
  t1.length <= bufIndex && t1.push(0);
  if (bit === true) {
    var t2 = this._lib0_length;
    if (typeof t2 !== 'number') return this.putBit$1$bailout(2, t1, t2, bufIndex, 0);
    t2 = $.mod(t2, 8);
    if (t2 !== (t2 | 0)) return this.putBit$1$bailout(3, t1, bufIndex, t2, 0);
    t2 = $.shr(128, t2);
    if (bufIndex !== (bufIndex | 0)) throw $.iae(bufIndex);
    var t3 = t1.length;
    if (bufIndex < 0 || bufIndex >= t3) throw $.ioore(bufIndex);
    var t4 = t1[bufIndex];
    if (t4 !== (t4 | 0)) return this.putBit$1$bailout(4, t1, t4, bufIndex, t2);
    t1[bufIndex] = (t4 | t2) >>> 0;
  }
  t1 = this._lib0_length;
  if (typeof t1 !== 'number') return this.putBit$1$bailout(5, t1, 0, 0, 0);
  this._lib0_length = t1 + 1;
 },
 putBit$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var bit = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      bufIndex = env2;
      break;
    case 3:
      t1 = env0;
      bufIndex = env1;
      t2 = env2;
      break;
    case 4:
      t1 = env0;
      t4 = env1;
      bufIndex = env2;
      t2 = env3;
      break;
    case 5:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib0_length;
    case 1:
      state = 0;
      var bufIndex = $.tdiv(t1, 8);
      t1 = this._lib0_buffer;
      $.leB(t1.length, bufIndex) && t1.push(0);
    case 2:
    case 3:
    case 4:
      if (state == 2 || state == 3 || state == 4 || (state == 0 && bit === true)) {
        switch (state) {
          case 0:
            var t2 = this._lib0_length;
          case 2:
            state = 0;
            t2 = $.mod(t2, 8);
            if (typeof t2 !== 'number') throw $.iae(t2);
          case 3:
            state = 0;
            t2 = $.shr(128, t2);
            if (bufIndex !== (bufIndex | 0)) throw $.iae(bufIndex);
            var t3 = t1.length;
            if (bufIndex < 0 || bufIndex >= t3) throw $.ioore(bufIndex);
            var t4 = t1[bufIndex];
          case 4:
            state = 0;
            t2 = $.or(t4, t2);
            t4 = t1.length;
            if (bufIndex < 0 || bufIndex >= t4) throw $.ioore(bufIndex);
            t1[bufIndex] = t2;
        }
      }
      t1 = this._lib0_length;
    case 5:
      state = 0;
      this._lib0_length = $.add(t1, 1);
  }
 },
 put$2: function(number, length$) {
  if (number !== (number | 0)) return this.put$2$bailout(1, number, length$);
  if (length$ !== (length$ | 0)) return this.put$2$bailout(1, number, length$);
  for (var i = 0; i < length$; ++i) {
    this.putBit$1(($.shr(number, length$ - i - 1) & 1) === 1);
  }
 },
 put$2$bailout: function(state, number, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    this.putBit$1($.eq($.and($.shr(number, $.sub($.sub(length$, i), 1)), 1), 1));
  }
 },
 getByte$1: function(index) {
  var t1 = this._lib0_buffer;
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 get$length: function() {
  return this._lib0_length;
 },
 operator$index$1: function(index) {
  if (typeof index !== 'number') return this.operator$index$1$bailout(1, index, 0);
  var bufIndex = $.tdiv(index, 8);
  var t1 = this._lib0_buffer;
  if (bufIndex !== (bufIndex | 0)) throw $.iae(bufIndex);
  var t2 = t1.length;
  if (bufIndex < 0 || bufIndex >= t2) throw $.ioore(bufIndex);
  t1 = t1[bufIndex];
  if (t1 !== (t1 | 0)) return this.operator$index$1$bailout(2, t1, index);
  var t3 = $.mod(index, 8);
  if (t3 !== (t3 | 0)) return this.operator$index$1$bailout(3, t1, t3);
  return ($.shr(t1, 7 - t3) & 1) === 1;
 },
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var index = env0;
      break;
    case 2:
      t1 = env0;
      index = env1;
      break;
    case 3:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var bufIndex = $.tdiv(index, 8);
      var t1 = this._lib0_buffer;
      if (bufIndex !== (bufIndex | 0)) throw $.iae(bufIndex);
      var t2 = t1.length;
      if (bufIndex < 0 || bufIndex >= t2) throw $.ioore(bufIndex);
      t1 = t1[bufIndex];
    case 2:
      state = 0;
      var t3 = $.mod(index, 8);
      if (typeof t3 !== 'number') throw $.iae(t3);
    case 3:
      state = 0;
      return $.eq($.and($.shr(t1, 7 - t3), 1), 1);
  }
 }
};

$$.QrByte = {"":
 ["_data", "mode?"],
 super: "Object",
 write$1: function(buffer) {
  var t1 = this._data;
  var i = 0;
  while (true) {
    var t2 = $.get$length(this);
    if (typeof t2 !== 'number') return this.write$1$bailout(1, buffer, t1, t2, i);
    if (!(i < t2)) break;
    buffer.put$2($.charCodeAt(t1, i), 8);
    ++i;
  }
 },
 write$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var buffer = env0;
      t1 = env1;
      t2 = env2;
      i = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._data;
      var i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            var t2 = $.get$length(this);
          case 1:
            state = 0;
            if (!$.ltB(i, t2)) break L0;
            buffer.put$2($.charCodeAt(t1, i), 8);
            ++i;
        }
      }
  }
 },
 get$length: function() {
  return $.get$length(this._data);
 }
};

$$.QrPolynomial = {"":
 ["_myThings"],
 super: "Object",
 mod$1: function(e) {
  if (typeof e !== 'string' && (typeof e !== 'object' || e === null || (e.constructor !== Array && !e.is$JavaScriptIndexingBehavior()))) return this.mod$1$bailout(1, e, 0, 0, 0, 0, 0);
  var t1 = $.get$length(this);
  if (typeof t1 !== 'number') return this.mod$1$bailout(2, e, t1, 0, 0, 0, 0);
  if (t1 - e.length < 0) return this;
  t1 = $.QrMath_glog(this.operator$index$1(0));
  if (typeof t1 !== 'number') return this.mod$1$bailout(3, e, t1, 0, 0, 0, 0);
  var t2 = e.length;
  if (0 >= t2) throw $.ioore(0);
  var t3 = $.QrMath_glog(e[0]);
  if (typeof t3 !== 'number') return this.mod$1$bailout(4, e, t3, t1, 0, 0, 0);
  var ratio = t1 - t3;
  var thing = $.QrMath_getZeroedList($.get$length(this));
  if (typeof thing !== 'object' || thing === null || ((thing.constructor !== Array || !!thing.immutable$list) && !thing.is$JavaScriptIndexingBehavior())) return this.mod$1$bailout(5, e, ratio, thing, 0, 0, 0);
  var i = 0;
  while (true) {
    t1 = $.get$length(this);
    if (typeof t1 !== 'number') return this.mod$1$bailout(6, e, i, t1, ratio, thing, 0);
    if (!(i < t1)) break;
    t1 = this.operator$index$1(i);
    t2 = thing.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    thing[i] = t1;
    ++i;
  }
  for (i = 0; t1 = e.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = $.QrMath_glog(e[i]);
    if (typeof t2 !== 'number') return this.mod$1$bailout(7, i, e, ratio, thing, t2, 0);
    t3 = $.QrMath_gexp(t2 + ratio);
    if (t3 !== (t3 | 0)) return this.mod$1$bailout(8, i, e, t3, ratio, thing, 0);
    var t4 = thing.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    var t5 = thing[i];
    if (t5 !== (t5 | 0)) return this.mod$1$bailout(9, i, e, t3, t5, ratio, thing);
    thing[i] = (t5 ^ t3) >>> 0;
  }
  return $.QrPolynomial$(thing, 0).mod$1(e);
 },
 mod$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      t1 = env1;
      break;
    case 3:
      e = env0;
      t1 = env1;
      break;
    case 4:
      e = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 5:
      e = env0;
      ratio = env1;
      thing = env2;
      break;
    case 6:
      e = env0;
      i = env1;
      t1 = env2;
      ratio = env3;
      thing = env4;
      break;
    case 7:
      i = env0;
      e = env1;
      ratio = env2;
      thing = env3;
      t1 = env4;
      break;
    case 8:
      i = env0;
      e = env1;
      t2 = env2;
      ratio = env3;
      thing = env4;
      break;
    case 9:
      i = env0;
      e = env1;
      t2 = env2;
      t3 = env3;
      ratio = env4;
      thing = env5;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = $.get$length(this);
    case 2:
      state = 0;
      if ($.ltB($.sub(t1, $.get$length(e)), 0)) return this;
      t1 = $.QrMath_glog(this.operator$index$1(0));
    case 3:
      state = 0;
      var t2 = $.QrMath_glog($.index(e, 0));
    case 4:
      state = 0;
      var ratio = $.sub(t1, t2);
      var thing = $.QrMath_getZeroedList($.get$length(this));
    case 5:
      state = 0;
      var i = 0;
    case 6:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this);
          case 6:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            $.indexSet(thing, i, this.operator$index$1(i));
            ++i;
        }
      }
      i = 0;
    case 7:
    case 8:
    case 9:
      L1: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(e))) break L1;
            t1 = $.QrMath_glog($.index(e, i));
          case 7:
            state = 0;
            t2 = $.QrMath_gexp($.add(t1, ratio));
          case 8:
            state = 0;
            var t3 = $.index(thing, i);
          case 9:
            state = 0;
            $.indexSet(thing, i, $.xor(t3, t2));
            ++i;
        }
      }
      return $.QrPolynomial$(thing, 0).mod$1(e);
  }
 },
 multiply$1: function(e) {
  if (typeof e !== 'string' && (typeof e !== 'object' || e === null || (e.constructor !== Array && !e.is$JavaScriptIndexingBehavior()))) return this.multiply$1$bailout(1, e, 0, 0, 0, 0, 0, 0);
  var t1 = $.get$length(this);
  if (typeof t1 !== 'number') return this.multiply$1$bailout(2, e, t1, 0, 0, 0, 0, 0);
  var foo = $.QrMath_getZeroedList(t1 + e.length - 1);
  if (typeof foo !== 'object' || foo === null || ((foo.constructor !== Array || !!foo.immutable$list) && !foo.is$JavaScriptIndexingBehavior())) return this.multiply$1$bailout(3, e, foo, 0, 0, 0, 0, 0);
  var i = 0;
  while (true) {
    t1 = $.get$length(this);
    if (typeof t1 !== 'number') return this.multiply$1$bailout(4, e, i, foo, t1, 0, 0, 0);
    if (!(i < t1)) break;
    for (var j = 0; j < e.length; ++j) {
      t1 = i + j;
      var t2 = $.QrMath_glog(this.operator$index$1(i));
      if (typeof t2 !== 'number') return this.multiply$1$bailout(5, e, j, t2, i, foo, t1, 0);
      var t3 = e.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      var t4 = $.QrMath_glog(e[j]);
      if (typeof t4 !== 'number') return this.multiply$1$bailout(6, e, j, t2, i, t4, foo, t1);
      var t5 = $.QrMath_gexp(t2 + t4);
      if (t5 !== (t5 | 0)) return this.multiply$1$bailout(7, e, j, i, t5, foo, t1, 0);
      var t6 = foo.length;
      if (t1 < 0 || t1 >= t6) throw $.ioore(t1);
      var t7 = foo[t1];
      if (t7 !== (t7 | 0)) return this.multiply$1$bailout(8, e, j, i, t5, foo, t7, t1);
      foo[t1] = (t7 ^ t5) >>> 0;
    }
    ++i;
  }
  return $.QrPolynomial$(foo, 0);
 },
 multiply$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      t1 = env1;
      break;
    case 3:
      e = env0;
      foo = env1;
      break;
    case 4:
      e = env0;
      i = env1;
      foo = env2;
      t1 = env3;
      break;
    case 5:
      e = env0;
      j = env1;
      t2 = env2;
      i = env3;
      foo = env4;
      t1 = env5;
      break;
    case 6:
      e = env0;
      j = env1;
      t2 = env2;
      i = env3;
      t3 = env4;
      foo = env5;
      t1 = env6;
      break;
    case 7:
      e = env0;
      j = env1;
      i = env2;
      t4 = env3;
      foo = env4;
      t1 = env5;
      break;
    case 8:
      e = env0;
      j = env1;
      i = env2;
      t4 = env3;
      foo = env4;
      t5 = env5;
      t1 = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = $.get$length(this);
    case 2:
      state = 0;
      var foo = $.QrMath_getZeroedList($.sub($.add(t1, $.get$length(e)), 1));
    case 3:
      state = 0;
      var i = 0;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this);
          case 4:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            var j = 0;
          case 5:
          case 6:
          case 7:
          case 8:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, $.get$length(e))) break L1;
                  t1 = i + j;
                  var t2 = $.QrMath_glog(this.operator$index$1(i));
                case 5:
                  state = 0;
                  var t3 = $.QrMath_glog($.index(e, j));
                case 6:
                  state = 0;
                  var t4 = $.QrMath_gexp($.add(t2, t3));
                case 7:
                  state = 0;
                  var t5 = $.index(foo, t1);
                case 8:
                  state = 0;
                  $.indexSet(foo, t1, $.xor(t5, t4));
                  ++j;
              }
            }
            ++i;
        }
      }
      return $.QrPolynomial$(foo, 0);
  }
 },
 get$length: function() {
  return $.get$length(this._myThings);
 },
 operator$index$1: function(index) {
  return $.index(this._myThings, index);
 },
 QrPolynomial$2: function(thing, shift) {
  if (typeof thing !== 'string' && (typeof thing !== 'object' || thing === null || (thing.constructor !== Array && !thing.is$JavaScriptIndexingBehavior()))) return this.QrPolynomial$2$bailout(1, thing, shift, 0);
  var offset = 0;
  while (true) {
    var t1 = thing.length;
    if (offset < t1) {
      if (offset < 0 || offset >= t1) throw $.ioore(offset);
      var t2 = $.eqB(thing[offset], 0);
      t1 = t2;
    } else t1 = false;
    if (!t1) break;
    ++offset;
  }
  t1 = thing.length - offset;
  if (typeof shift !== 'number') throw $.iae(shift);
  this._myThings = $.QrMath_getZeroedList(t1 + shift);
  t1 = this._myThings;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.QrPolynomial$2$bailout(2, thing, t1, offset);
  var i = 0;
  for (; t2 = thing.length, i < t2 - offset; ++i) {
    var t3 = i + offset;
    if (t3 < 0 || t3 >= t2) throw $.ioore(t3);
    t3 = thing[t3];
    var t4 = t1.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t1[i] = t3;
  }
 },
 QrPolynomial$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var thing = env0;
      var shift = env1;
      break;
    case 2:
      thing = env0;
      t1 = env1;
      offset = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var offset = 0;
      while (true) {
        if (!($.ltB(offset, $.get$length(thing)) && $.eqB($.index(thing, offset), 0))) break;
        ++offset;
      }
      this._myThings = $.QrMath_getZeroedList($.add($.sub($.get$length(thing), offset), shift));
      var t1 = this._myThings;
    case 2:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.sub($.get$length(thing), offset)); ++i) {
        $.indexSet(t1, i, $.index(thing, i + offset));
      }
  }
 }
};

$$.QrRsBlock = {"":
 ["dataCount?", "totalCount?"],
 super: "Object"
};

$$.QrCode = {"":
 ["_dataList", "_dataCache", "_modules", "_moduleCount", "errorCorrectLevel", "typeNumber"],
 super: "Object",
 makeImpl$2: function(test, maskPattern) {
  this.setupPositionProbePattern$2(0, 0);
  var t1 = this._moduleCount;
  if (typeof t1 !== 'number') return this.makeImpl$2$bailout(1, test, maskPattern, t1);
  t1 -= 7;
  this.setupPositionProbePattern$2(t1, 0);
  this.setupPositionProbePattern$2(0, t1);
  this.setupPositionAdjustPattern$0();
  this.setupTimingPattern$0();
  this.setupTypeInfo$2(test, maskPattern);
  t1 = this.typeNumber;
  if (typeof t1 !== 'number') return this.makeImpl$2$bailout(2, test, maskPattern, t1);
  t1 >= 7 && this.setupTypeNumber$1(test);
  if (this._dataCache == null) this._dataCache = $.QrCode_createData(t1, this.errorCorrectLevel, this._dataList);
  this.mapData$2(this._dataCache, maskPattern);
 },
 makeImpl$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var test = env0;
      var maskPattern = env1;
      t1 = env2;
      break;
    case 2:
      test = env0;
      maskPattern = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      this.setupPositionProbePattern$2(0, 0);
      var t1 = this._moduleCount;
    case 1:
      state = 0;
      this.setupPositionProbePattern$2($.sub(t1, 7), 0);
      this.setupPositionProbePattern$2(0, $.sub(t1, 7));
      this.setupPositionAdjustPattern$0();
      this.setupTimingPattern$0();
      this.setupTypeInfo$2(test, maskPattern);
      t1 = this.typeNumber;
    case 2:
      state = 0;
      $.geB(t1, 7) && this.setupTypeNumber$1(test);
      if (this._dataCache == null) this._dataCache = $.QrCode_createData(t1, this.errorCorrectLevel, this._dataList);
      this.mapData$2(this._dataCache, maskPattern);
  }
 },
 addData$1: function(data) {
  var newData = $.QrByte$(data);
  $.add$1(this._dataList, newData);
  this._dataCache = null;
 },
 mapData$2: function(data, maskPattern) {
  if (typeof data !== 'string' && (typeof data !== 'object' || data === null || (data.constructor !== Array && !data.is$JavaScriptIndexingBehavior()))) return this.mapData$2$bailout(1, data, maskPattern, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t1 = this._moduleCount;
  if (typeof t1 !== 'number') return this.mapData$2$bailout(2, data, maskPattern, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var row = t1 - 1;
  for (var t2 = this._modules, col = row, bitIndex = 7, inc = -1, byteIndex = 0; col > 0; col -= 2) {
    if (col === 6) --col;
    for (var inc0 = -inc; true; ) {
      for (var c = 0; c < 2; ++c) {
        if (row !== (row | 0)) throw $.iae(row);
        var t3 = t2.length;
        if (row < 0 || row >= t3) throw $.ioore(row);
        var t4 = t2[row];
        var t5 = col - c;
        if ($.index(t4, t5) == null) {
          t3 = data.length;
          if (byteIndex < t3) {
            if (byteIndex < 0 || byteIndex >= t3) throw $.ioore(byteIndex);
            t4 = data[byteIndex];
            if (t4 !== (t4 | 0)) return this.mapData$2$bailout(3, byteIndex, c, maskPattern, t4, data, col, inc0, row, inc, bitIndex, t1, t2);
            var dark = ($.shr(t4, bitIndex) & 1) === 1;
          } else dark = false;
          if ($.QrUtil_getMask(maskPattern, row, t5) === true) dark = !dark;
          t3 = t2.length;
          if (row < 0 || row >= t3) throw $.ioore(row);
          $.indexSet(t2[row], t5, dark);
          --bitIndex;
          if (bitIndex === -1) {
            ++byteIndex;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || t1 <= row) {
        row -= inc;
        inc = inc0;
        break;
      }
    }
  }
 },
 mapData$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var data = env0;
      var maskPattern = env1;
      break;
    case 2:
      data = env0;
      maskPattern = env1;
      t1 = env2;
      break;
    case 3:
      byteIndex = env0;
      c = env1;
      maskPattern = env2;
      t3 = env3;
      data = env4;
      col = env5;
      inc0 = env6;
      row = env7;
      inc = env8;
      bitIndex = env9;
      t1 = env10;
      t2 = env11;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this._moduleCount;
    case 2:
      state = 0;
      var row = $.sub(t1, 1);
      var col = $.sub(t1, 1);
      var t2 = this._modules;
      var bitIndex = 7;
      var inc = -1;
      var byteIndex = 0;
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.gtB(col, 0)) break L0;
            if ($.eqB(col, 6)) col = $.sub(col, 1);
            var inc0 = -inc;
          case 3:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!true) break L1;
                  var c = 0;
                case 3:
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!(c < 2)) break L2;
                        if (row !== (row | 0)) throw $.iae(row);
                        var t3 = t2.length;
                        if (row < 0 || row >= t3) throw $.ioore(row);
                      case 3:
                        if (state == 3 || (state == 0 && $.index(t2[row], $.sub(col, c)) == null)) {
                          switch (state) {
                            case 0:
                            case 3:
                              if (state == 3 || (state == 0 && $.ltB(byteIndex, $.get$length(data)))) {
                                switch (state) {
                                  case 0:
                                    t3 = $.index(data, byteIndex);
                                  case 3:
                                    state = 0;
                                    var dark = $.eq($.and($.shr(t3, bitIndex), 1), 1);
                                }
                              } else {
                                dark = false;
                              }
                              if ($.QrUtil_getMask(maskPattern, row, $.sub(col, c)) === true) dark = dark !== true;
                              t3 = t2.length;
                              if (row < 0 || row >= t3) throw $.ioore(row);
                              $.indexSet(t2[row], $.sub(col, c), dark);
                              --bitIndex;
                              if (bitIndex === -1) {
                                ++byteIndex;
                                bitIndex = 7;
                              }
                          }
                        }
                        ++c;
                    }
                  }
                  row = $.add(row, inc);
                  if ($.ltB(row, 0) || $.leB(t1, row)) {
                    row = $.sub(row, inc);
                    inc = inc0;
                    break L1;
                  }
              }
            }
            col = $.sub(col, 2);
        }
      }
  }
 },
 setupTypeInfo$2: function(test, maskPattern) {
  var bits = $.QrUtil_getBCHTypeInfo($.or($.shl(this.errorCorrectLevel, 3), maskPattern));
  if (bits !== (bits | 0)) return this.setupTypeInfo$2$bailout(1, test, bits, 0, 0);
  var t1 = test !== true;
  var t2 = this._modules;
  var t3 = this._moduleCount;
  if (typeof t3 !== 'number') return this.setupTypeInfo$2$bailout(2, t1, t3, bits, t2);
  var t4 = t3 - 15;
  var i = 0;
  var mod = null;
  for (; i < 15; ++i) {
    mod = t1 && ($.shr(bits, i) & 1) === 1;
    if (i < 6) {
      var t5 = t2.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      $.indexSet(t2[i], 8, mod);
    } else {
      t5 = i < 8;
      var t6 = t2.length;
      if (t5) {
        t5 = i + 1;
        if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
        $.indexSet(t2[t5], 8, mod);
      } else {
        t5 = t4 + i;
        if (t5 !== (t5 | 0)) throw $.iae(t5);
        if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
        $.indexSet(t2[t5], 8, mod);
      }
    }
  }
  for (i = 0; i < 15; ++i) {
    mod = t1 && ($.shr(bits, i) & 1) === 1;
    if (i < 8) {
      t4 = t2.length;
      if (8 >= t4) throw $.ioore(8);
      $.indexSet(t2[8], t3 - i - 1, mod);
    } else {
      t4 = i < 9;
      t5 = 15 - i;
      t6 = t2.length;
      --t5;
      if (t4) {
        if (8 >= t6) throw $.ioore(8);
        $.indexSet(t2[8], t5 + 1, mod);
      } else {
        if (8 >= t6) throw $.ioore(8);
        $.indexSet(t2[8], t5, mod);
      }
    }
  }
  t3 -= 8;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  t4 = t2.length;
  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
  $.indexSet(t2[t3], 8, t1);
 },
 setupTypeInfo$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var test = env0;
      bits = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      bits = env2;
      t2 = env3;
      break;
  }
  switch (state) {
    case 0:
      var bits = $.QrUtil_getBCHTypeInfo($.or($.shl(this.errorCorrectLevel, 3), maskPattern));
    case 1:
      state = 0;
      var t1 = test !== true;
      var t2 = this._modules;
      var t3 = this._moduleCount;
    case 2:
      state = 0;
      var i = 0;
      var mod = null;
      for (; i < 15; ++i) {
        mod = t1 && $.eqB($.and($.shr(bits, i), 1), 1);
        if (i < 6) {
          var t4 = t2.length;
          if (i < 0 || i >= t4) throw $.ioore(i);
          $.indexSet(t2[i], 8, mod);
        } else {
          if (i < 8) {
            t4 = i + 1;
            var t5 = t2.length;
            if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
            $.indexSet(t2[t4], 8, mod);
          } else {
            t4 = $.add($.sub(t3, 15), i);
            if (t4 !== (t4 | 0)) throw $.iae(t4);
            t5 = t2.length;
            if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
            $.indexSet(t2[t4], 8, mod);
          }
        }
      }
      for (i = 0; i < 15; ++i) {
        mod = t1 && $.eqB($.and($.shr(bits, i), 1), 1);
        if (i < 8) {
          t4 = t2.length;
          if (8 < 0 || 8 >= t4) throw $.ioore(8);
          $.indexSet(t2[8], $.sub($.sub(t3, i), 1), mod);
        } else {
          t4 = i < 9;
          t5 = 15 - i;
          if (t4) {
            t4 = t2.length;
            if (8 < 0 || 8 >= t4) throw $.ioore(8);
            $.indexSet(t2[8], t5 - 1 + 1, mod);
          } else {
            t4 = t2.length;
            if (8 < 0 || 8 >= t4) throw $.ioore(8);
            $.indexSet(t2[8], t5 - 1, mod);
          }
        }
      }
      t3 = $.sub(t3, 8);
      if (t3 !== (t3 | 0)) throw $.iae(t3);
      t4 = t2.length;
      if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
      $.indexSet(t2[t3], 8, t1);
  }
 },
 setupTypeNumber$1: function(test) {
  var bits = $.QrUtil_getBCHTypeNumber(this.typeNumber);
  if (bits !== (bits | 0)) return this.setupTypeNumber$1$bailout(1, test, bits);
  for (var t1 = test !== true, t2 = this._modules, t3 = this._moduleCount, i = 0, mod = null; i < 18; ++i) {
    mod = t1 && ($.shr(bits, i) & 1) === 1;
    var t4 = $.tdiv(i, 3);
    var t5 = t2.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    t4 = t2[t4];
    var t6 = $.mod(i, 3);
    if (typeof t3 !== 'number') throw $.iae(t3);
    $.indexSet(t4, t6 + t3 - 8 - 3, mod);
  }
  for (i = 0; i < 18; ++i) {
    mod = t1 && ($.shr(bits, i) & 1) === 1;
    t4 = $.mod(i, 3);
    if (typeof t3 !== 'number') throw $.iae(t3);
    t5 = t4 + t3 - 8 - 3;
    if (t5 !== (t5 | 0)) throw $.iae(t5);
    t6 = t2.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    $.indexSet(t2[t5], $.tdiv(i, 3), mod);
  }
 },
 setupTypeNumber$1$bailout: function(state, test, bits) {
  for (var t1 = test !== true, t2 = this._modules, t3 = this._moduleCount, i = 0, mod = null; i < 18; ++i) {
    mod = t1 && $.eqB($.and($.shr(bits, i), 1), 1);
    var t4 = $.tdiv(i, 3);
    var t5 = t2.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    t4 = t2[t4];
    var t6 = $.mod(i, 3);
    if (typeof t3 !== 'number') throw $.iae(t3);
    $.indexSet(t4, t6 + t3 - 8 - 3, mod);
  }
  for (i = 0; i < 18; ++i) {
    mod = t1 && $.eqB($.and($.shr(bits, i), 1), 1);
    t4 = $.mod(i, 3);
    if (typeof t3 !== 'number') throw $.iae(t3);
    t5 = t4 + t3 - 8 - 3;
    if (t5 !== (t5 | 0)) throw $.iae(t5);
    t6 = t2.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    $.indexSet(t2[t5], $.tdiv(i, 3), mod);
  }
 },
 setupPositionAdjustPattern$0: function() {
  var pos = $.QrUtil_getPatternPosition(this.typeNumber);
  if (typeof pos !== 'string' && (typeof pos !== 'object' || pos === null || (pos.constructor !== Array && !pos.is$JavaScriptIndexingBehavior()))) return this.setupPositionAdjustPattern$0$bailout(1, pos, 0, 0, 0, 0, 0);
  for (var t1 = this._modules, i = 0; i < pos.length; ++i) {
    for (var j = 0; t2 = pos.length, j < t2; ++j) {
      if (i < 0 || i >= t2) throw $.ioore(i);
      var t3 = pos[i];
      if (typeof t3 !== 'number') return this.setupPositionAdjustPattern$0$bailout(2, t3, t1, pos, j, i, 0);
      if (j < 0 || j >= t2) throw $.ioore(j);
      var t4 = pos[j];
      if (typeof t4 !== 'number') return this.setupPositionAdjustPattern$0$bailout(3, t3, t1, t4, j, pos, i);
      if (t3 !== (t3 | 0)) throw $.iae(t3);
      t2 = t1.length;
      if (t3 < 0 || t3 >= t2) throw $.ioore(t3);
      if (!($.index(t1[t3], t4) == null)) continue;
      for (var r = -2; r <= 2; ++r) {
        for (t2 = !(r === -2), t5 = !(r === 2), t6 = r === 0, t7 = t3 + r, c = -2; c <= 2; ++c) {
          if (t2) {
            if (t5) {
              if (!(c === -2)) {
                if (!(c === 2)) {
                  var t8 = t6 && c === 0;
                } else t8 = true;
              } else t8 = true;
            } else t8 = true;
          } else t8 = true;
          var t9 = t4 + c;
          var t10 = t1.length;
          if (t8) {
            if (t7 < 0 || t7 >= t10) throw $.ioore(t7);
            $.indexSet(t1[t7], t9, true);
          } else {
            if (t7 < 0 || t7 >= t10) throw $.ioore(t7);
            $.indexSet(t1[t7], t9, false);
          }
        }
      }
    }
  }
  var t7, t2, t6, c, t5;
 },
 setupPositionAdjustPattern$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      pos = env0;
      break;
    case 2:
      row = env0;
      t1 = env1;
      pos = env2;
      j = env3;
      i = env4;
      break;
    case 3:
      row = env0;
      t1 = env1;
      col = env2;
      j = env3;
      pos = env4;
      i = env5;
      break;
  }
  switch (state) {
    case 0:
      var pos = $.QrUtil_getPatternPosition(this.typeNumber);
    case 1:
      state = 0;
      var t1 = this._modules;
      var i = 0;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(pos))) break L0;
            var j = 0;
          case 2:
          case 3:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, $.get$length(pos))) break L1;
                case 2:
                case 3:
                  c$1:{
                    switch (state) {
                      case 0:
                        var row = $.index(pos, i);
                      case 2:
                        state = 0;
                        var col = $.index(pos, j);
                      case 3:
                        state = 0;
                        if (row !== (row | 0)) throw $.iae(row);
                        var t2 = t1.length;
                        if (row < 0 || row >= t2) throw $.ioore(row);
                        if (!($.index(t1[row], col) == null)) break c$1;
                        for (var r = -2; r <= 2; ++r) {
                          for (t2 = !(r === -2), t3 = !(r === 2), t4 = r === 0, c = -2; c <= 2; ++c) {
                            if (t2) {
                              if (t3) {
                                if (!(c === -2)) {
                                  if (!(c === 2)) {
                                    var t5 = t4 && c === 0;
                                  } else t5 = true;
                                } else t5 = true;
                              } else t5 = true;
                            } else t5 = true;
                            if (t5) {
                              t5 = row + r;
                              if (t5 !== (t5 | 0)) throw $.iae(t5);
                              var t6 = t1.length;
                              if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
                              $.indexSet(t1[t5], $.add(col, c), true);
                            } else {
                              t5 = row + r;
                              if (t5 !== (t5 | 0)) throw $.iae(t5);
                              t6 = t1.length;
                              if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
                              $.indexSet(t1[t5], $.add(col, c), false);
                            }
                          }
                        }
                    }
                  }
                  ++j;
              }
            }
            ++i;
        }
      }
      var t3, c, t4;
  }
 },
 setupTimingPattern$0: function() {
  var t1 = this._moduleCount;
  if (typeof t1 !== 'number') return this.setupTimingPattern$0$bailout(1, t1);
  var t2 = this._modules;
  t1 -= 8;
  var r = 8;
  for (; r < t1; ++r) {
    var t3 = t2.length;
    if (r < 0 || r >= t3) throw $.ioore(r);
    if (!($.index(t2[r], 6) == null)) continue;
    t3 = t2.length;
    if (r < 0 || r >= t3) throw $.ioore(r);
    $.indexSet(t2[r], 6, $.mod(r, 2) === 0);
  }
  for (var c = 8; c < t1; ++c) {
    t3 = t2.length;
    if (6 >= t3) throw $.ioore(6);
    if (!($.index(t2[6], c) == null)) continue;
    t3 = t2.length;
    if (6 >= t3) throw $.ioore(6);
    $.indexSet(t2[6], c, $.mod(c, 2) === 0);
  }
 },
 setupTimingPattern$0$bailout: function(state, t1) {
  var t2 = this._modules;
  var r = 8;
  for (; $.ltB(r, $.sub(t1, 8)); ++r) {
    var t3 = t2.length;
    if (r < 0 || r >= t3) throw $.ioore(r);
    if (!($.index(t2[r], 6) == null)) continue;
    t3 = t2.length;
    if (r < 0 || r >= t3) throw $.ioore(r);
    $.indexSet(t2[r], 6, $.mod(r, 2) === 0);
  }
  for (var c = 8; $.ltB(c, $.sub(t1, 8)); ++c) {
    t3 = t2.length;
    if (6 < 0 || 6 >= t3) throw $.ioore(6);
    if (!($.index(t2[6], c) == null)) continue;
    t3 = t2.length;
    if (6 < 0 || 6 >= t3) throw $.ioore(6);
    $.indexSet(t2[6], c, $.mod(c, 2) === 0);
  }
 },
 getBestMaskPattern$0: function() {
  for (var pattern = 0, minLostPoint = 0, i = 0; i < 8; ++i) {
    this.makeImpl$2(true, i);
    var lostPoint = $.QrUtil_getLostPoint(this);
    if (i === 0 || $.gtB(minLostPoint, lostPoint)) {
      minLostPoint = lostPoint;
      pattern = i;
    }
  }
  return pattern;
 },
 setupPositionProbePattern$2: function(row, col) {
  if (typeof row !== 'number') return this.setupPositionProbePattern$2$bailout(1, row, col, 0);
  if (typeof col !== 'number') return this.setupPositionProbePattern$2$bailout(1, row, col, 0);
  var t1 = this._moduleCount;
  if (typeof t1 !== 'number') return this.setupPositionProbePattern$2$bailout(2, row, col, t1);
  var t2 = this._modules;
  var r = -1;
  for (; r <= 7; ++r) {
    var t3 = row + r;
    if (t3 <= -1 || t1 <= t3) continue;
    for (var t4 = 0 <= r, t5 = r <= 6, t6 = !(r === 0), t7 = r === 6, t8 = 2 <= r, t9 = r <= 4, c = -1; c <= 7; ++c) {
      var t10 = col + c;
      if (t10 <= -1 || t1 <= t10) continue;
      if (t4) {
        if (t5) {
          var t11 = c === 0 || c === 6;
        } else t11 = false;
      } else t11 = false;
      if (!t11) {
        if (0 <= c) {
          if (c <= 6) {
            t11 = r === 0 || t7;
          } else t11 = false;
        } else t11 = false;
        if (!t11) {
          t11 = t8 && (t9 && (2 <= c && c <= 4));
        } else t11 = true;
      } else t11 = true;
      var t12 = t2.length;
      if (t11) {
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        if (t3 < 0 || t3 >= t12) throw $.ioore(t3);
        $.indexSet(t2[t3], t10, true);
      } else {
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        if (t3 < 0 || t3 >= t12) throw $.ioore(t3);
        $.indexSet(t2[t3], t10, false);
      }
    }
  }
 },
 setupPositionProbePattern$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var row = env0;
      var col = env1;
      break;
    case 1:
      row = env0;
      col = env1;
      break;
    case 2:
      row = env0;
      col = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      var t1 = this._moduleCount;
    case 2:
      state = 0;
      var t2 = this._modules;
      var r = -1;
      for (; r <= 7; ++r) {
        if ($.leB($.add(row, r), -1) || $.leB(t1, $.add(row, r))) continue;
        for (var t3 = 0 <= r, t4 = r <= 6, t5 = !(r === 0), t6 = r === 6, t7 = 2 <= r, t8 = r <= 4, c = -1; c <= 7; ++c) {
          if ($.leB($.add(col, c), -1) || $.leB(t1, $.add(col, c))) continue;
          if (t3) {
            if (t4) {
              var t9 = c === 0 || c === 6;
            } else t9 = false;
          } else t9 = false;
          if (!t9) {
            if (0 <= c) {
              if (c <= 6) {
                t9 = r === 0 || t6;
              } else t9 = false;
            } else t9 = false;
            if (!t9) {
              t9 = t7 && (t8 && (2 <= c && c <= 4));
            } else t9 = true;
          } else t9 = true;
          if (t9) {
            t9 = $.add(row, r);
            if (t9 !== (t9 | 0)) throw $.iae(t9);
            var t10 = t2.length;
            if (t9 < 0 || t9 >= t10) throw $.ioore(t9);
            $.indexSet(t2[t9], $.add(col, c), true);
          } else {
            t9 = $.add(row, r);
            if (t9 !== (t9 | 0)) throw $.iae(t9);
            t10 = t2.length;
            if (t9 < 0 || t9 >= t10) throw $.ioore(t9);
            $.indexSet(t2[t9], $.add(col, c), false);
          }
        }
      }
  }
 },
 make$0: function() {
  this.makeImpl$2(false, this.getBestMaskPattern$0());
 },
 get$moduleCount: function() {
  return this._moduleCount;
 },
 isDark$2: function(row, col) {
  if (typeof row !== 'number') return this.isDark$2$bailout(1, row, col, 0);
  if (typeof col !== 'number') return this.isDark$2$bailout(1, row, col, 0);
  if (!(row < 0)) {
    var t1 = this._moduleCount;
    if (typeof t1 !== 'number') return this.isDark$2$bailout(2, row, col, t1);
    t1 = t1 <= row || (col < 0 || t1 <= col);
  } else t1 = true;
  if (t1) throw $.captureStackTrace($.S(row) + ' , ' + $.S(col));
  t1 = this._modules;
  if (row !== (row | 0)) throw $.iae(row);
  var t2 = t1.length;
  if (row < 0 || row >= t2) throw $.ioore(row);
  t1 = t1[row];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.isDark$2$bailout(3, t1, col, 0);
  if (col !== (col | 0)) throw $.iae(col);
  var t3 = t1.length;
  if (col < 0 || col >= t3) throw $.ioore(col);
  return t1[col];
 },
 isDark$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var row = env0;
      var col = env1;
      break;
    case 1:
      row = env0;
      col = env1;
      break;
    case 2:
      row = env0;
      col = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      col = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && !$.ltB(row, 0))) {
        switch (state) {
          case 0:
            var t1 = this._moduleCount;
          case 2:
            state = 0;
            t1 = $.leB(t1, row) || ($.ltB(col, 0) || $.leB(t1, col));
        }
      } else {
        t1 = true;
      }
      if (t1) throw $.captureStackTrace($.S(row) + ' , ' + $.S(col));
      t1 = this._modules;
      if (row !== (row | 0)) throw $.iae(row);
      var t2 = t1.length;
      if (row < 0 || row >= t2) throw $.ioore(row);
      t1 = t1[row];
    case 3:
      state = 0;
      return $.index(t1, col);
  }
 },
 QrCode$2: function(typeNumber, errorCorrectLevel) {
  this._moduleCount = $.add($.mul(this.typeNumber, 4), 17);
  var t1 = this._moduleCount;
  if (typeof t1 !== 'number') return this.QrCode$2$bailout(1, t1);
  this._modules = $.ListFactory_List(t1);
  for (var t2 = this._modules, row = 0; row < t1; ++row) {
    var t3 = $.ListFactory_List(t1);
    $.setRuntimeTypeInfo(t3, ({E: 'bool'}));
    var t4 = t2.length;
    if (row < 0 || row >= t4) throw $.ioore(row);
    t2[row] = t3;
  }
  this._dataCache = null;
  this._dataList = [];
 },
 QrCode$2$bailout: function(state, t1) {
  this._modules = $.ListFactory_List(t1);
  for (var t2 = this._modules, row = 0; $.ltB(row, t1); ++row) {
    var t3 = $.ListFactory_List(t1);
    $.setRuntimeTypeInfo(t3, ({E: 'bool'}));
    var t4 = t2.length;
    if (row < 0 || row >= t4) throw $.ioore(row);
    t2[row] = t3;
  }
  this._dataCache = null;
  this._dataList = [];
 }
};

$$.main_anon = {"":
 ["demo_1", "input_0"],
 super: "Closure",
 $call$1: function(args) {
  this.demo_1.updateValue$1(this.input_0.get$value());
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.anon0 = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(args) {
  var t1 = this.this_0.get$_qrMapper().get$output();
  this.this_0.set$_squares(t1);
  this.this_0.requestFrame$0();
 }
};

$$._qrIsolate_anon = {"":
 ["size_1", "typeNumber_0"],
 super: "Closure",
 $call$2: function(input, reply) {
  var code = $.QrCode$(this.typeNumber_0, 3);
  code.addData$1(input);
  code.make$0();
  var squares = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(squares, ({E: 'bool'}));
  for (var x = 0; $.ltB(x, this.size_1); ++x) {
    for (var y = 0; $.ltB(y, this.size_1); ++y) {
      squares.push(code.isDark$2(y, x));
    }
  }
  reply.send$1(squares);
 }
};

$$.ListBase_iterator_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(i) {
  return $.index(this.this_0, i);
 }
};

$$._IsolateNatives__spawn2_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 $call$2: function(msg, replyPort) {
  this.port_1.close$0();
  this.completer_0.complete$1(replyPort);
 }
};

$$.anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(p) {
  this.this_0.set$_port(p);
  for (var t1 = $.iterator(this.this_0.get$pending()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    p.send$2($.index(t2, 'message'), $.index(t2, 'replyTo'));
  }
  this.this_0.set$pending(null);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$._IsolateNatives__startNonWorker2_function = {"":
 ["replyPort_1", "functionName_0"],
 super: "Closure",
 $call$0: function() {
  $._IsolateNatives__startIsolate2($._IsolateNatives__getJSFunctionFromName(this.functionName_0), this.replyPort_1);
 }
};

$$._IsolateNatives__spawnWorker2_anon = {"":
 ["worker_0"],
 super: "Closure",
 $call$1: function(e) {
  $._IsolateNatives__processWorkerMessage(this.worker_0, e);
 }
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 $call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1(workerMessage);
  else $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
 }
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(_) {
  return this.callback_0.$call$0();
 }
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 $call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  $.eqB(remaining, 0) && this.result_5.get$isComplete() !== true && this.completer_3.complete$1(this.values_2);
 }
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 $call$1: function(exception) {
  this.result_8.get$isComplete() !== true && this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
 }
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null) return;
  if (this.this_4.get$_receivePort().get$_callback() == null) return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
 }
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 $call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._IsolateNatives__processWorkerMessage_function = {"":
 ["serializedReplyTo_1", "runnerObject_0"],
 super: "Closure",
 $call$0: function() {
  var replyTo = $._deserializeMessage(this.serializedReplyTo_1);
  $._IsolateNatives__startIsolate(this.runnerObject_0, replyTo);
 }
};

$$._IsolateNatives__processWorkerMessage_function0 = {"":
 ["entryPoint_3", "replyTo_2"],
 super: "Closure",
 $call$0: function() {
  $._IsolateNatives__startIsolate2(this.entryPoint_3, this.replyTo_2);
 }
};

$$._IsolateNatives__spawnWorker_anon = {"":
 ["worker_0"],
 super: "Closure",
 $call$1: function(e) {
  $._IsolateNatives__processWorkerMessage(this.worker_0, e);
 }
};

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 super: "Closure",
 $call$2: function(id, handler) {
  handler.$call$1(this.args_0);
 }
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 $call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1) t2.completeException$1(value);
  else t2.complete$1(value);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

Isolate.$defineClass('BoundClosure', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.QrMath_EXP_TABLE = function() {
  if ($.QrMath__expTable == null) {
    var t = $.QrMath_getZeroedList(256);
    if (typeof t !== 'object' || t === null || ((t.constructor !== Array || !!t.immutable$list) && !t.is$JavaScriptIndexingBehavior())) return $.QrMath_EXP_TABLE$bailout(1, t);
    for (var i = 0; i < 8; ++i) {
      var t1 = $.shl(1, i);
      var t2 = t.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t[i] = t1;
    }
    for (i = 8; i < 256; ++i) {
      t1 = i - 4;
      t2 = t.length;
      if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
      t1 = t[t1];
      var t3 = i - 5;
      if (t3 < 0 || t3 >= t2) throw $.ioore(t3);
      t1 = $.xor(t1, t[t3]);
      var t4 = i - 6;
      var t5 = t.length;
      if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
      t1 = $.xor(t1, t[t4]);
      var t6 = i - 8;
      var t7 = t.length;
      if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
      t1 = $.xor(t1, t[t6]);
      var t8 = t.length;
      if (i < 0 || i >= t8) throw $.ioore(i);
      t[i] = t1;
    }
    $.QrMath__expTable = $.ReadOnlyCollection$wrap(t);
  }
  return $.QrMath__expTable;
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.Uri__parseIntOrZero = function(val) {
  if (!(val == null) && !$.eqB(val, '')) return $.Math_parseInt(val);
  return 0;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.QrCode$ = function(typeNumber, errorCorrectLevel) {
  var t1 = new $.QrCode(null, null, null, null, errorCorrectLevel, typeNumber);
  t1.QrCode$2(typeNumber, errorCorrectLevel);
  return t1;
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.Vector$ = function(x, y) {
  return new $.Vector(y, x);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && !(name$ === 'Object'))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.Math_max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b) return a;
      if (a < b) return b;
      if (typeof b === 'number') {
        if (typeof a === 'number') {
          if (a === 0.0) return a + b;
        }
        if ($.isNaN(b) === true) return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true) return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._IsolateNatives__startNonWorker2 = function(functionName, uri, replyPort) {
  if (!(uri == null)) throw $.captureStackTrace($.UnsupportedOperationException$('Currently spawnUri is not supported without web workers.'));
  $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$(), new $._IsolateNatives__startNonWorker2_function(replyPort, functionName), 'nonworker start');
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.QrByte$ = function(_data) {
  return new $.QrByte(_data, 4);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsDeserializer$().deserialize$1(message);
  return message;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.GlobalId$_internal = function(value) {
  return new $.GlobalId($.Util_getHashCode([value]), value);
};

$.QrUtil__getPatternPositionTable = function() {
  return [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$._IsolateNatives__spawn2 = function(functionName, uri, isLight) {
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'SendPort'}));
  var port = $._ReceivePortFactory_ReceivePort();
  port.receive$1(new $._IsolateNatives__spawn2_anon(port, completer));
  var signalReply = port.toSendPort$0();
  if ($._globalState().get$useWorkers() === true && isLight !== true) $._IsolateNatives__startWorker2(functionName, uri, signalReply);
  else $._IsolateNatives__startNonWorker2(functionName, uri, signalReply);
  return $._BufferingSendPort$($._globalState().get$currentContext().get$id(), completer.get$future());
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.Coordinate$ = function(x, y) {
  return new $.Coordinate(y, x);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.Math_parseInt = function(str) {
  return $.MathNatives_parseInt(str);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.MathNatives_parseInt = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$.QrUtil_getMask = function(maskPattern, i, j) {
  switch (maskPattern) {
    case 0:
      return $.eq($.mod($.add(i, j), 2), 0);
    case 1:
      return $.eq($.mod(i, 2), 0);
    case 2:
      return $.eq($.mod(j, 3), 0);
    case 3:
      return $.eq($.mod($.add(i, j), 3), 0);
    case 4:
      return $.eq($.mod($.add($.tdiv(i, 2), $.tdiv(j, 3)), 2), 0);
    case 5:
      return $.eq($.add($.mod($.mul(i, j), 2), $.mod($.mul(i, j), 3)), 0);
    case 6:
      return $.eq($.mod($.add($.mod($.mul(i, j), 2), $.mod($.mul(i, j), 3)), 2), 0);
    case 7:
      return $.eq($.mod($.add($.mod($.mul(i, j), 3), $.mod($.add(i, j), 2)), 2), 0);
    default:
      throw $.captureStackTrace('bad maskPattern:' + $.S(maskPattern));
  }
};

$._port = function() {
  if ($._lazyPort == null) $._lazyPort = $._ReceivePortFactory_ReceivePort();
  return $._lazyPort;
};

$._IsolateNatives__log = function(msg) {
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'log', 'msg', msg])));
  else {
    try {
      $._IsolateNatives__consoleLog(msg);
    } catch (exception) {
      $.unwrapException(exception);
      var trace = $.getTraceFromException(exception);
      throw $.captureStackTrace($.ExceptionImplementation$(trace));
    }
  }
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.Uri__addIfNonEmpty = function(sb, test, first, second) {
  if (!('' === test)) {
    $.add$1(sb, first == null ? 'null' : first);
    $.add$1(sb, second == null ? 'null' : second);
  }
};

$.QrUtil_getPatternPosition = function(typeNumber) {
  return $.index($.QrUtil__PATTERN_POSITION_TABLE(), $.sub(typeNumber, 1));
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._IsolateNatives__getEventData = function(e) {
  return e.data;
};

$._BufferingSendPort$ = function(isolateId, _futurePort) {
  var t1 = $._BufferingSendPort__idCount;
  t1 = new $._BufferingSendPort([], _futurePort, null, t1, isolateId);
  t1._BufferingSendPort$2(isolateId, _futurePort);
  return t1;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.QrMath_getZeroedList = function(count) {
  var l = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(l, ({E: 'int'}));
  $.insertRange$3(l, 0, count, 0);
  return l;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.Coordinate_difference = function(a, b) {
  return $.Vector$($.sub(a.get$x(), b.get$x()), $.sub(a.get$y(), b.get$y()));
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IsolateNatives__startIsolate = function(isolate, replyTo) {
  $._fillStatics($._globalState().get$currentContext());
  var port = $._ReceivePortFactory_ReceivePort();
  replyTo.send$2('spawned', port.toSendPort$0());
  isolate._run$1(port);
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Futures_wait = function(futures) {
  var t1 = ({});
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || (futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))) return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = futures[i];
    t3.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    t3.handleException$1(new $.Futures_wait_anon0(result, completer, t3));
  }
  return result;
  var t2;
};

$.requireArgumentNotNull = function(argument, argName) {
  if (argument == null) throw $.captureStackTrace($.NullArgumentException$(argName));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$._qrIsolate = function() {
  $.port().receive$1(new $._qrIsolate_anon(57, 10));
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$._QrMapper$ = function() {
  var t1 = $.spawnFunction($._qrIsolate);
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, ({T: 'EventArgs'}));
  var t3 = $.EventHandle$();
  $.setRuntimeTypeInfo(t3, ({T: 'EventArgs'}));
  return new $._QrMapper(t1, t3, t2, false, null, null, null);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._IsolateNatives__consoleLog = function(msg) {
  $globalThis.console.log(msg);;
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.Uri__emptyIfNull = function(val) {
  return !(val == null) ? val : '';
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.EventHandle$ = function() {
  return new $.EventHandle(null, false);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._Lists_lastIndexOf = function(a, element, startIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_lastIndexOf$bailout(1, a, element, startIndex);
  if ($.ltB(startIndex, 0)) return -1;
  if ($.geB(startIndex, a.length)) startIndex = a.length - 1;
  if (typeof startIndex !== 'number') return $._Lists_lastIndexOf$bailout(2, a, element, startIndex);
  for (var i = startIndex; i >= 0; --i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$._IsolateNatives__startWorker2 = function(functionName, uri, replyPort) {
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'spawn-worker2', 'functionName', functionName, 'uri', uri, 'replyPort', replyPort])));
  else $._IsolateNatives__spawnWorker2(functionName, uri, replyPort);
};

$.QrUtil_getErrorCorrectPolynomial = function(errorCorrectLength) {
  if (typeof errorCorrectLength !== 'number') return $.QrUtil_getErrorCorrectPolynomial$bailout(1, errorCorrectLength);
  var a = $.QrPolynomial$([1], 0);
  for (var i = 0; i < errorCorrectLength; ++i) {
    a = a.multiply$1($.QrPolynomial$([1, $.QrMath_gexp(i)], 0));
  }
  return a;
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._IsolateNatives__spawnWorker2 = function(functionName, uri, replyPort) {
  if (functionName == null) functionName = 'main';
  if (uri == null) uri = $._IsolateNatives__thisScript();
  if ($.Uri$fromString(uri).isAbsolute$0() !== true) uri = $.S($.substring$2($._IsolateNatives__thisScript(), 0, $.lastIndexOf$1($._IsolateNatives__thisScript(), '/'))) + '/' + $.S(uri);
  var worker = $._IsolateNatives__newWorker(uri);
  worker.set$onmessage(new $._IsolateNatives__spawnWorker2_anon(worker));
  var t1 = $._globalState();
  var workerId = t1.get$nextManagerId();
  t1.set$nextManagerId($.add(workerId, 1));
  worker.set$id(workerId);
  $.indexSet($._globalState().get$managers(), workerId, worker);
  worker.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'start2', 'id', workerId, 'replyTo', $._serializeMessage(replyPort), 'functionName', functionName])));
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.QrRsBlock__rsBlockTable = function() {
  if ($.QrRsBlock__blockTable == null) $.QrRsBlock__blockTable = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16]];
  return $.QrRsBlock__blockTable;
};

$.QrUtil_getLostPoint = function(qrCode) {
  var moduleCount = qrCode.get$moduleCount();
  if (typeof moduleCount !== 'number') return $.QrUtil_getLostPoint$bailout(1, qrCode, moduleCount);
  for (var lostPoint = 0, row = 0, col = null; row < moduleCount; ++row) {
    for (col = 0; col < moduleCount; ++col) {
      var dark = qrCode.isDark$2(row, col);
      for (var r = -1, sameCount = 0; r <= 1; ++r) {
        var t1 = row + r;
        if (t1 < 0 || moduleCount <= t1) continue;
        for (var t2 = r === 0, c = -1; c <= 1; ++c) {
          var t3 = col + c;
          if (t3 < 0 || moduleCount <= t3) continue;
          if (t2 && c === 0) continue;
          if ($.eqB(dark, qrCode.isDark$2(t1, t3))) ++sameCount;
        }
      }
      if (sameCount > 5) lostPoint += 3 + sameCount - 5;
    }
  }
  for (t1 = moduleCount - 1, row = 0; row < t1; ++row) {
    for (t2 = row + 1, col = 0; col < t1; ++col) {
      var count = qrCode.isDark$2(row, col) === true ? 1 : 0;
      if (qrCode.isDark$2(t2, col) === true) ++count;
      t3 = col + 1;
      if (qrCode.isDark$2(row, t3) === true) ++count;
      if (qrCode.isDark$2(t2, t3) === true) ++count;
      if (count === 0 || count === 4) lostPoint += 3;
    }
  }
  for (t1 = moduleCount - 6, row = 0; row < moduleCount; ++row) {
    for (col = 0; col < t1; ++col) {
      if (qrCode.isDark$2(row, col) === true && (qrCode.isDark$2(row, col + 1) !== true && (qrCode.isDark$2(row, col + 2) === true && (qrCode.isDark$2(row, col + 3) === true && (qrCode.isDark$2(row, col + 4) === true && (qrCode.isDark$2(row, col + 5) !== true && qrCode.isDark$2(row, col + 6) === true)))))) lostPoint += 40;
    }
  }
  for (col = 0; col < moduleCount; ++col) {
    for (row = 0; row < t1; ++row) {
      if (qrCode.isDark$2(row, col) === true && (qrCode.isDark$2(row + 1, col) !== true && (qrCode.isDark$2(row + 2, col) === true && (qrCode.isDark$2(row + 3, col) === true && (qrCode.isDark$2(row + 4, col) === true && (qrCode.isDark$2(row + 5, col) !== true && qrCode.isDark$2(row + 6, col) === true)))))) lostPoint += 40;
    }
  }
  for (col = 0, darkCount = 0; col < moduleCount; ++col) {
    for (row = 0; row < moduleCount; ++row) {
      darkCount = qrCode.isDark$2(row, col) === true ? darkCount + 1 : darkCount;
    }
  }
  t1 = $.mul($.div($.abs(100 * darkCount / moduleCount / moduleCount - 50), 5), 10);
  if (typeof t1 !== 'number') throw $.iae(t1);
  return lostPoint + t1;
  var darkCount;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.NullArgumentException$ = function(arg) {
  return new $.NullArgumentException(arg);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.Uri$fromString = function(uri) {
  var t1 = $.CTC7.firstMatch$1(uri);
  var t2 = $.Uri__emptyIfNull($.index(t1, 1));
  var t3 = $.Uri__emptyIfNull($.index(t1, 2));
  var t4 = $.Uri__emptyIfNull($.index(t1, 3));
  var t5 = $.Uri__parseIntOrZero($.index(t1, 4));
  var t6 = $.Uri__emptyIfNull($.index(t1, 5));
  var t7 = $.Uri__emptyIfNull($.index(t1, 6));
  return new $.Uri($.Uri__emptyIfNull($.index(t1, 7)), t7, t6, t5, t4, t3, t2);
};

$.QrRsBlock$ = function(totalCount, dataCount) {
  return new $.QrRsBlock(dataCount, totalCount);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.port = function() {
  return $._port();
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var demo = $.QrDemo$($.query('#content'));
  var input = $.query('#input');
  input.set$value('Type your message in here...');
  demo.updateValue$1(input.get$value());
  $.add$1(input.get$on().get$keyUp(), new $.main_anon(demo, input));
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$.QrUtil_getBCHDigit = function(data) {
  if (data !== (data | 0)) return $.QrUtil_getBCHDigit$bailout(1, data);
  for (var digit = 0; !(data === 0); ) {
    ++digit;
    data = $.shr(data, 1);
  }
  return digit;
};

$._IsolateNatives__processWorkerMessage = function(sender, e) {
  var msg = $._deserializeMessage($._IsolateNatives__getEventData(e));
  switch ($.index(msg, 'command')) {
    case 'start':
      var t1 = $.index(msg, 'id');
      $._globalState().set$currentManagerId(t1);
      var runnerObject = $._IsolateNatives__allocate($._IsolateNatives__getJSConstructorFromName($.index(msg, 'factoryName')));
      var serializedReplyTo = $.index(msg, 'replyTo');
      $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$(), new $._IsolateNatives__processWorkerMessage_function(serializedReplyTo, runnerObject), 'worker-start');
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'start2':
      t1 = $.index(msg, 'id');
      $._globalState().set$currentManagerId(t1);
      var entryPoint = $._IsolateNatives__getJSFunctionFromName($.index(msg, 'functionName'));
      var replyTo = $._deserializeMessage($.index(msg, 'replyTo'));
      $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$(), new $._IsolateNatives__processWorkerMessage_function0(entryPoint, replyTo), 'worker-start');
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'spawn-worker':
      $._IsolateNatives__spawnWorker($.index(msg, 'factoryName'), $.index(msg, 'replyPort'));
      break;
    case 'spawn-worker2':
      $._IsolateNatives__spawnWorker2($.index(msg, 'functionName'), $.index(msg, 'uri'), $.index(msg, 'replyPort'));
      break;
    case 'message':
      $.index(msg, 'port').send$2($.index(msg, 'msg'), $.index(msg, 'replyTo'));
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'close':
      $._IsolateNatives__log('Closing Worker');
      $._globalState().get$managers().remove$1(sender.get$id());
      sender.terminate$0();
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'log':
      $._IsolateNatives__log($.index(msg, 'msg'));
      break;
    case 'print':
      if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'print', 'msg', msg])));
      else $.print($.index(msg, 'msg'));
      break;
    case 'error':
      throw $.captureStackTrace($.index(msg, 'msg'));
  }
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.QrUtil_getBCHTypeInfo = function(data) {
  var d = $.shl(data, 10);
  if (d !== (d | 0)) return $.QrUtil_getBCHTypeInfo$bailout(1, data, d);
  for (; $.geB($.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G15)), 0); ) {
    var t1 = $.shl($.QrUtil_G15, $.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G15)));
    if (typeof t1 !== 'number') throw $.iae(t1);
    d = (d ^ t1) >>> 0;
  }
  return $.xor($.or($.shl(data, 10), d), $.QrUtil_G15_MASK);
};

$._IsolateNatives__getJSFunctionName = function(f) {
  return f.$name || (void 0);;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$.QrMath_glog = function(n) {
  if ($.ltB(n, 1)) throw $.captureStackTrace('glog(' + $.S(n) + ')');
  return $.index($.QrMath_LOG_TABLE(), n);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._IsolateNatives__getJSFunctionFromName = function(functionName) {
      return $globalThis[functionName];
  ;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.QrDemo$ = function(_canvas) {
  var t1 = new $.QrDemo(false, null, null, null, $._QrMapper$(), _canvas);
  t1.QrDemo$1(_canvas);
  return t1;
};

$.Arrays_lastIndexOf = function(a, element, startIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_lastIndexOf$bailout(1, a, element, startIndex);
  if ($.ltB(startIndex, 0)) return -1;
  if ($.geB(startIndex, a.length)) startIndex = a.length - 1;
  if (typeof startIndex !== 'number') return $.Arrays_lastIndexOf$bailout(2, a, element, startIndex);
  for (var i = startIndex; i >= 0; --i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.lastIndexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true) return $.Arrays_lastIndexOf(receiver, element, (receiver.length));
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.lastIndexOf(element);
  }
  return receiver.lastIndexOf$1(element);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.ReadOnlyCollection$wrap = function(source) {
  return new $.ReadOnlyCollection(source);
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.spawnFunction = function(topLevelFunction) {
  return $._spawnFunction(topLevelFunction);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$.QrBitBuffer$ = function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  return new $.QrBitBuffer(0, t1);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$._ReceivePortFactory_ReceivePort = function() {
  return $._ReceivePortImpl$();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.QrCode_createData = function(typeNumber, errorCorrectLevel, dataList) {
  if (typeof dataList !== 'string' && (typeof dataList !== 'object' || dataList === null || (dataList.constructor !== Array && !dataList.is$JavaScriptIndexingBehavior()))) return $.QrCode_createData$bailout(1, typeNumber, errorCorrectLevel, dataList);
  var rsBlocks = $.QrRsBlock_getRSBlocks(typeNumber, errorCorrectLevel);
  if (typeof rsBlocks !== 'string' && (typeof rsBlocks !== 'object' || rsBlocks === null || (rsBlocks.constructor !== Array && !rsBlocks.is$JavaScriptIndexingBehavior()))) return $.QrCode_createData$bailout(2, typeNumber, dataList, rsBlocks);
  var buffer = $.QrBitBuffer$();
  for (var i = 0; t1 = dataList.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = dataList[i];
    buffer.put$2(t2.get$mode(), 4);
    buffer.put$2($.get$length(t2), $.QrUtil_getLengthInBits(t2.get$mode(), typeNumber));
    t2.write$1(buffer);
  }
  for (i = 0, totalDataCount = 0; t1 = rsBlocks.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = rsBlocks[i].get$dataCount();
    if (typeof t2 !== 'number') throw $.iae(t2);
    totalDataCount += t2;
  }
  t1 = $.get$length(buffer);
  t2 = totalDataCount * 8;
  if ($.gtB(t1, t2)) throw $.captureStackTrace('code length overflow. (' + $.S($.get$length(buffer)) + '>' + $.S(t2) + ')');
  $.leB($.add($.get$length(buffer), 4), t2) && buffer.put$2(0, 4);
  for (; !$.eqB($.mod($.get$length(buffer), 8), 0); ) {
    buffer.putBit$1(false);
  }
  for (; true; ) {
    if ($.geB($.get$length(buffer), t2)) break;
    buffer.put$2(236, 8);
    if ($.geB($.get$length(buffer), t2)) break;
    buffer.put$2(17, 8);
  }
  return $.QrCode_createBytes(buffer, rsBlocks);
  var totalDataCount, t1;
};

$.QrMath_LOG_TABLE = function() {
  if ($.QrMath__logTable == null) {
    var t = $.QrMath_getZeroedList(256);
    if (typeof t !== 'object' || t === null || ((t.constructor !== Array || !!t.immutable$list) && !t.is$JavaScriptIndexingBehavior())) return $.QrMath_LOG_TABLE$bailout(1, t);
    for (var i = 0; i < 255; ++i) {
      var t1 = $.index($.QrMath_EXP_TABLE(), i);
      if (t1 !== (t1 | 0)) throw $.iae(t1);
      var t2 = t.length;
      if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
      t[t1] = i;
    }
    $.QrMath__logTable = $.ReadOnlyCollection$wrap(t);
  }
  return $.QrMath__logTable;
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.GlobalId_GlobalId = function() {
  var t1 = $.GlobalId__globalId;
  $.GlobalId__globalId = $.add(t1, 1);
  return $.GlobalId$_internal(t1);
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1._ReceivePortImpl$0();
  return t1;
};

$.QrPolynomial$ = function(thing, shift) {
  var t1 = new $.QrPolynomial(null);
  t1.QrPolynomial$2(thing, shift);
  return t1;
};

$.QrMath_gexp = function(n) {
  if (typeof n !== 'number') return $.QrMath_gexp$bailout(1, n);
  for (; n < 0; ) {
    n += 255;
  }
  for (; n >= 256; ) {
    n -= 255;
  }
  return $.index($.QrMath_EXP_TABLE(), n);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.listInsertRange = function(receiver, start, length$, initialValue) {
  if (typeof receiver !== 'object' || receiver === null || ((receiver.constructor !== Array || !!receiver.immutable$list) && !receiver.is$JavaScriptIndexingBehavior())) return $.listInsertRange$bailout(1, receiver, start, length$, initialValue);
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = (receiver.length);
  if (start < 0 || start > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null)) {
    for (var i = start; i < t2; ++i) {
      var t3 = receiver.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      receiver[i] = initialValue;
    }
  }
  $.set$length(receiver, t1);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._IsolateNatives__allocate = function(ctor) {
  return new ctor();;
};

$._IsolateNatives__newWorker = function(url) {
  return new Worker(url);;
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.QrUtil_getLengthInBits = function(mode, type) {
  if ($.leB(1, type) && $.ltB(type, 10)) {
    switch (mode) {
      case 1:
        return 10;
      case 2:
        return 9;
      case 4:
        return 8;
      case 8:
        return 8;
      default:
        throw $.captureStackTrace('mode:' + $.S(mode));
    }
  }
  if ($.ltB(type, 27)) {
    switch (mode) {
      case 1:
        return 12;
      case 2:
        return 11;
      case 4:
        return 16;
      case 8:
        return 10;
      default:
        throw $.captureStackTrace('mode:' + $.S(mode));
    }
  }
  if ($.ltB(type, 41)) {
    switch (mode) {
      case 1:
        return 14;
      case 2:
        return 13;
      case 4:
        return 16;
      case 8:
        return 12;
      default:
        throw $.captureStackTrace('mode:' + $.S(mode));
    }
  }
  throw $.captureStackTrace('type:' + $.S(type));
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$._IsolateNatives__startIsolate2 = function(topLevel, replyTo) {
  $._fillStatics($._globalState().get$currentContext());
  $._lazyPort = $._ReceivePortFactory_ReceivePort();
  replyTo.send$2('spawned', $.port().toSendPort$0());
  topLevel.$call$0();
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.QrRsBlock_getRsBlockTable = function(typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case 1:
      return $.index($.QrRsBlock__rsBlockTable(), $.add($.mul($.sub(typeNumber, 1), 4), 0));
    case 0:
      return $.index($.QrRsBlock__rsBlockTable(), $.add($.mul($.sub(typeNumber, 1), 4), 1));
    case 3:
      return $.index($.QrRsBlock__rsBlockTable(), $.add($.mul($.sub(typeNumber, 1), 4), 2));
    case 2:
      return $.index($.QrRsBlock__rsBlockTable(), $.add($.mul($.sub(typeNumber, 1), 4), 3));
    default:
      throw $.captureStackTrace('bad rs block @ typeNumber: ' + $.S(typeNumber) + '/errorCorrectLevel:' + $.S(errorCorrectLevel));
  }
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC10)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.QrRsBlock_getRSBlocks = function(typeNumber, errorCorrectLevel) {
  var rsBlock = $.QrRsBlock_getRsBlockTable(typeNumber, errorCorrectLevel);
  if (typeof rsBlock !== 'string' && (typeof rsBlock !== 'object' || rsBlock === null || (rsBlock.constructor !== Array && !rsBlock.is$JavaScriptIndexingBehavior()))) return $.QrRsBlock_getRSBlocks$bailout(1, rsBlock, 0, 0, 0, 0, 0);
  var length$ = rsBlock.length / 3;
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'QrRsBlock'}));
  for (var i = 0; i < length$; ++i) {
    var t1 = i * 3;
    var t2 = t1 + 0;
    var t3 = rsBlock.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    t2 = rsBlock[t2];
    if (typeof t2 !== 'number') return $.QrRsBlock_getRSBlocks$bailout(2, t1, rsBlock, t2, i, length$, list);
    var t4 = t1 + 1;
    if (t4 < 0 || t4 >= t3) throw $.ioore(t4);
    t4 = rsBlock[t4];
    t1 += 2;
    if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
    t1 = rsBlock[t1];
    for (var j = 0; j < t2; ++j) {
      list.push($.QrRsBlock$(t4, t1));
    }
  }
  return list;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.QrCode_createBytes = function(buffer, rsBlocks) {
  if (typeof rsBlocks !== 'string' && (typeof rsBlocks !== 'object' || rsBlocks === null || (rsBlocks.constructor !== Array && !rsBlocks.is$JavaScriptIndexingBehavior()))) return $.QrCode_createBytes$bailout(1, buffer, rsBlocks, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var dcdata = $.ListFactory_List(rsBlocks.length);
  $.setRuntimeTypeInfo(dcdata, ({E: 'List'}));
  var ecdata = $.ListFactory_List(rsBlocks.length);
  $.setRuntimeTypeInfo(ecdata, ({E: 'List'}));
  for (var offset = 0, r = 0, maxDcCount = 0, maxEcCount = 0; t1 = rsBlocks.length, r < t1; ++r) {
    if (r < 0 || r >= t1) throw $.ioore(r);
    var dcCount = rsBlocks[r].get$dataCount();
    var t2 = rsBlocks.length;
    if (r < 0 || r >= t2) throw $.ioore(r);
    var ecCount = $.sub(rsBlocks[r].get$totalCount(), dcCount);
    maxDcCount = $.Math_max(maxDcCount, dcCount);
    maxEcCount = $.Math_max(maxEcCount, ecCount);
    var t3 = $.QrMath_getZeroedList(dcCount);
    var t4 = dcdata.length;
    if (r < 0 || r >= t4) throw $.ioore(r);
    dcdata[r] = t3;
    var i = 0;
    while (true) {
      t1 = dcdata.length;
      if (r < 0 || r >= t1) throw $.ioore(r);
      if (!$.ltB(i, $.get$length(dcdata[r]))) break;
      t1 = dcdata.length;
      if (r < 0 || r >= t1) throw $.ioore(r);
      t2 = dcdata[r];
      if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return $.QrCode_createBytes$bailout(2, buffer, rsBlocks, i, dcdata, dcCount, t2, ecCount, ecdata, maxDcCount, maxEcCount, offset, r);
      t3 = buffer.getByte$1(i + offset);
      if (typeof t3 !== 'number') throw $.iae(t3);
      t3 = 255 & t3;
      t4 = t2.length;
      if (i < 0 || i >= t4) throw $.ioore(i);
      t2[i] = t3;
      ++i;
    }
    if (typeof dcCount !== 'number') throw $.iae(dcCount);
    offset += dcCount;
    var rsPoly = $.QrUtil_getErrorCorrectPolynomial(ecCount);
    t1 = dcdata.length;
    if (r < 0 || r >= t1) throw $.ioore(r);
    var modPoly = $.QrPolynomial$(dcdata[r], $.sub($.get$length(rsPoly), 1)).mod$1(rsPoly);
    if (typeof modPoly !== 'string' && (typeof modPoly !== 'object' || modPoly === null || (modPoly.constructor !== Array && !modPoly.is$JavaScriptIndexingBehavior()))) return $.QrCode_createBytes$bailout(3, offset, maxEcCount, rsPoly, buffer, rsBlocks, r, dcdata, modPoly, ecdata, maxDcCount, 0, 0);
    t2 = $.QrMath_getZeroedList($.sub($.get$length(rsPoly), 1));
    t3 = ecdata.length;
    if (r < 0 || r >= t3) throw $.ioore(r);
    ecdata[r] = t2;
    i = 0;
    while (true) {
      t1 = ecdata.length;
      if (r < 0 || r >= t1) throw $.ioore(r);
      if (!$.ltB(i, $.get$length(ecdata[r]))) break;
      t1 = i + modPoly.length;
      t2 = ecdata.length;
      if (r < 0 || r >= t2) throw $.ioore(r);
      t3 = $.get$length(ecdata[r]);
      if (typeof t3 !== 'number') throw $.iae(t3);
      var modIndex = t1 - t3;
      t3 = ecdata.length;
      if (r < 0 || r >= t3) throw $.ioore(r);
      t1 = ecdata[r];
      if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return $.QrCode_createBytes$bailout(4, offset, buffer, rsBlocks, dcdata, modPoly, ecdata, maxDcCount, maxEcCount, r, modIndex, i, t1);
      if (modIndex >= 0) {
        if (modIndex !== (modIndex | 0)) throw $.iae(modIndex);
        t2 = modPoly.length;
        if (modIndex < 0 || modIndex >= t2) throw $.ioore(modIndex);
        t3 = modPoly[modIndex];
        t2 = t3;
      } else t2 = 0;
      t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t1[i] = t2;
      ++i;
    }
  }
  for (var totalCodeCount = 0, i = 0; t1 = rsBlocks.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    t2 = rsBlocks[i].get$totalCount();
    if (typeof t2 !== 'number') throw $.iae(t2);
    totalCodeCount += t2;
  }
  var data = [];
  for (i = 0; $.ltB(i, maxDcCount); ++i) {
    for (r = 0; r < rsBlocks.length; ++r) {
      t1 = dcdata.length;
      if (r < 0 || r >= t1) throw $.ioore(r);
      if ($.ltB(i, $.get$length(dcdata[r]))) {
        t1 = dcdata.length;
        if (r < 0 || r >= t1) throw $.ioore(r);
        t2 = dcdata[r];
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return $.QrCode_createBytes$bailout(5, rsBlocks, i, t2, r, dcdata, maxDcCount, maxEcCount, data, ecdata, 0, 0, 0);
        t3 = t2.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        $.add$1(data, t2[i]);
      }
    }
  }
  for (i = 0; $.ltB(i, maxEcCount); ++i) {
    for (r = 0; r < rsBlocks.length; ++r) {
      t1 = ecdata.length;
      if (r < 0 || r >= t1) throw $.ioore(r);
      if ($.ltB(i, $.get$length(ecdata[r]))) {
        t1 = ecdata.length;
        if (r < 0 || r >= t1) throw $.ioore(r);
        t2 = ecdata[r];
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return $.QrCode_createBytes$bailout(6, i, rsBlocks, ecdata, data, r, t2, 0, 0, 0, 0, 0, 0);
        t3 = t2.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        $.add$1(data, t2[i]);
      }
    }
  }
  return data;
  var t1;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.QrUtil_getBCHTypeNumber = function(data) {
  var d = $.shl(data, 12);
  if (d !== (d | 0)) return $.QrUtil_getBCHTypeNumber$bailout(1, data, d);
  for (; $.geB($.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G18)), 0); ) {
    var t1 = $.shl($.QrUtil_G18, $.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G18)));
    if (typeof t1 !== 'number') throw $.iae(t1);
    d = (d ^ t1) >>> 0;
  }
  return $.or($.shl(data, 12), d);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$._IsolateNatives__spawnWorker = function(factoryName, serializedReplyPort) {
  var worker = $._IsolateNatives__newWorker($._IsolateNatives__thisScript());
  worker.set$onmessage(new $._IsolateNatives__spawnWorker_anon(worker));
  var t1 = $._globalState();
  var workerId = t1.get$nextManagerId();
  t1.set$nextManagerId($.add(workerId, 1));
  worker.set$id(workerId);
  $.indexSet($._globalState().get$managers(), workerId, worker);
  worker.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'start', 'id', workerId, 'replyTo', serializedReplyPort, 'factoryName', factoryName])));
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC9) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$._spawnFunction = function(topLevelFunction) {
  var name$ = $._IsolateNatives__getJSFunctionName(topLevelFunction);
  if (name$ == null) throw $.captureStackTrace($.UnsupportedOperationException$('only top-level functions can be spawned.'));
  return $._IsolateNatives__spawn2(name$, null, false);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.insertRange$3 = function(receiver, start, length$, initialValue) {
  if ($.isJsArray(receiver) !== true) return receiver.insertRange$3(start, length$, initialValue);
  return $.listInsertRange(receiver, start, length$, initialValue);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.QrUtil__PATTERN_POSITION_TABLE = function() {
  if ($.QrUtil__patternPositionTable == null) $.QrUtil__patternPositionTable = $.QrUtil__getPatternPositionTable();
  return $.QrUtil__patternPositionTable;
};

$.Util_getHashCode = function(source) {
  for (var t1 = $.iterator(source), hash = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var next = t2 == null ? 0 : $.hashCode(t2);
    if (typeof next !== 'number') throw $.iae(next);
    var hash0 = 536870911 & hash + next;
    var hash1 = 536870911 & hash0 + ((524287 & hash0) << 10 >>> 0);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash) << 3 >>> 0);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0) << 15 >>> 0);
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.IndexIterator$ = function(length$, indexer) {
  var t1 = new $.IndexIterator(0, length$, indexer);
  t1.IndexIterator$2(length$, indexer);
  return t1;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$._IsolateNatives__getJSConstructorFromName = function(factoryName) {
      return $globalThis[factoryName];
  ;
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$._IsolateNatives__thisScript = function() {
  return $thisScriptUrl;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.QrRsBlock_getRSBlocks$bailout = function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      rsBlock = env0;
      break;
    case 2:
      t1 = env0;
      rsBlock = env1;
      count = env2;
      i = env3;
      length$ = env4;
      list = env5;
      break;
  }
  switch (state) {
    case 0:
      var rsBlock = $.QrRsBlock_getRsBlockTable(typeNumber, errorCorrectLevel);
    case 1:
      state = 0;
      var length$ = $.div($.get$length(rsBlock), 3);
      var list = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(list, ({E: 'QrRsBlock'}));
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, length$)) break L0;
            var t1 = i * 3;
            var count = $.index(rsBlock, t1 + 0);
          case 2:
            state = 0;
            var totalCount = $.index(rsBlock, t1 + 1);
            var dataCount = $.index(rsBlock, t1 + 2);
            for (var j = 0; $.ltB(j, count); ++j) {
              list.push($.QrRsBlock$(totalCount, dataCount));
            }
            ++i;
        }
      }
      return list;
  }
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.QrUtil_getBCHTypeInfo$bailout = function(state, data, d) {
  for (; $.geB($.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G15)), 0); ) {
    d = $.xor(d, $.shl($.QrUtil_G15, $.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G15))));
  }
  return $.xor($.or($.shl(data, 10), d), $.QrUtil_G15_MASK);
};

$.QrMath_EXP_TABLE$bailout = function(state, env0) {
  switch (state) {
    case 1:
      t = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      if (state == 1 || (state == 0 && $.QrMath__expTable == null)) {
        switch (state) {
          case 0:
            var t = $.QrMath_getZeroedList(256);
          case 1:
            state = 0;
            for (var i = 0; i < 8; ++i) {
              $.indexSet(t, i, $.shl(1, i));
            }
            for (i = 8; i < 256; ++i) {
              $.indexSet(t, i, $.xor($.xor($.xor($.index(t, i - 4), $.index(t, i - 5)), $.index(t, i - 6)), $.index(t, i - 8)));
            }
            $.QrMath__expTable = $.ReadOnlyCollection$wrap(t);
        }
      }
      return $.QrMath__expTable;
  }
};

$.QrUtil_getLostPoint$bailout = function(state, qrCode, moduleCount) {
  for (var lostPoint = 0, row = 0, col = null; $.ltB(row, moduleCount); ++row) {
    for (col = 0; $.ltB(col, moduleCount); ++col) {
      var dark = qrCode.isDark$2(row, col);
      for (var r = -1, sameCount = 0; r <= 1; ++r) {
        var t1 = row + r;
        if (t1 < 0 || $.leB(moduleCount, t1)) continue;
        for (var t2 = r === 0, c = -1; c <= 1; ++c) {
          var t3 = col + c;
          if (t3 < 0 || $.leB(moduleCount, t3)) continue;
          if (t2 && c === 0) continue;
          if ($.eqB(dark, qrCode.isDark$2(t1, t3))) ++sameCount;
        }
      }
      if (sameCount > 5) lostPoint += 3 + sameCount - 5;
    }
  }
  for (row = 0; $.ltB(row, $.sub(moduleCount, 1)); ++row) {
    for (t1 = row + 1, col = 0; $.ltB(col, $.sub(moduleCount, 1)); ++col) {
      var count = qrCode.isDark$2(row, col) === true ? 1 : 0;
      if (qrCode.isDark$2(t1, col) === true) ++count;
      t2 = col + 1;
      if (qrCode.isDark$2(row, t2) === true) ++count;
      if (qrCode.isDark$2(t1, t2) === true) ++count;
      if (count === 0 || count === 4) lostPoint += 3;
    }
  }
  for (row = 0; $.ltB(row, moduleCount); ++row) {
    for (col = 0; $.ltB(col, $.sub(moduleCount, 6)); ++col) {
      if (qrCode.isDark$2(row, col) === true && (qrCode.isDark$2(row, col + 1) !== true && (qrCode.isDark$2(row, col + 2) === true && (qrCode.isDark$2(row, col + 3) === true && (qrCode.isDark$2(row, col + 4) === true && (qrCode.isDark$2(row, col + 5) !== true && qrCode.isDark$2(row, col + 6) === true)))))) lostPoint += 40;
    }
  }
  for (col = 0; $.ltB(col, moduleCount); ++col) {
    for (row = 0; $.ltB(row, $.sub(moduleCount, 6)); ++row) {
      if (qrCode.isDark$2(row, col) === true && (qrCode.isDark$2(row + 1, col) !== true && (qrCode.isDark$2(row + 2, col) === true && (qrCode.isDark$2(row + 3, col) === true && (qrCode.isDark$2(row + 4, col) === true && (qrCode.isDark$2(row + 5, col) !== true && qrCode.isDark$2(row + 6, col) === true)))))) lostPoint += 40;
    }
  }
  for (col = 0, darkCount = 0; $.ltB(col, moduleCount); ++col) {
    for (row = 0; $.ltB(row, moduleCount); ++row) {
      darkCount = qrCode.isDark$2(row, col) === true ? darkCount + 1 : darkCount;
    }
  }
  t1 = 100 * darkCount;
  if (typeof moduleCount !== 'number') throw $.iae(moduleCount);
  t2 = $.mul($.div($.abs(t1 / moduleCount / moduleCount - 50), 5), 10);
  if (typeof t2 !== 'number') throw $.iae(t2);
  return lostPoint + t2;
  var darkCount;
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.QrCode_createData$bailout = function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var typeNumber = env0;
      var errorCorrectLevel = env1;
      var dataList = env2;
      break;
    case 2:
      typeNumber = env0;
      dataList = env1;
      rsBlocks = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var rsBlocks = $.QrRsBlock_getRSBlocks(typeNumber, errorCorrectLevel);
    case 2:
      state = 0;
      var buffer = $.QrBitBuffer$();
      for (var i = 0; $.ltB(i, $.get$length(dataList)); ++i) {
        var data = $.index(dataList, i);
        buffer.put$2(data.get$mode(), 4);
        buffer.put$2($.get$length(data), $.QrUtil_getLengthInBits(data.get$mode(), typeNumber));
        data.write$1(buffer);
      }
      for (i = 0, totalDataCount = 0; $.ltB(i, $.get$length(rsBlocks)); ++i) {
        var t1 = $.index(rsBlocks, i).get$dataCount();
        if (typeof t1 !== 'number') throw $.iae(t1);
        totalDataCount += t1;
      }
      t1 = $.get$length(buffer);
      var t2 = totalDataCount * 8;
      if ($.gtB(t1, t2)) throw $.captureStackTrace('code length overflow. (' + $.S($.get$length(buffer)) + '>' + $.S(t2) + ')');
      $.leB($.add($.get$length(buffer), 4), t2) && buffer.put$2(0, 4);
      for (; !$.eqB($.mod($.get$length(buffer), 8), 0); ) {
        buffer.putBit$1(false);
      }
      for (; true; ) {
        if ($.geB($.get$length(buffer), t2)) break;
        buffer.put$2(236, 8);
        if ($.geB($.get$length(buffer), t2)) break;
        buffer.put$2(17, 8);
      }
      return $.QrCode_createBytes(buffer, rsBlocks);
      var totalDataCount;
  }
};

$.QrMath_LOG_TABLE$bailout = function(state, env0) {
  switch (state) {
    case 1:
      t = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      if (state == 1 || (state == 0 && $.QrMath__logTable == null)) {
        switch (state) {
          case 0:
            var t = $.QrMath_getZeroedList(256);
          case 1:
            state = 0;
            for (var i = 0; i < 255; ++i) {
              $.indexSet(t, $.index($.QrMath_EXP_TABLE(), i), i);
            }
            $.QrMath__logTable = $.ReadOnlyCollection$wrap(t);
        }
      }
      return $.QrMath__logTable;
  }
};

$.QrCode_createBytes$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var buffer = env0;
      var rsBlocks = env1;
      break;
    case 2:
      buffer = env0;
      rsBlocks = env1;
      i = env2;
      dcdata = env3;
      dcCount = env4;
      t2 = env5;
      ecCount = env6;
      ecdata = env7;
      maxDcCount = env8;
      maxEcCount = env9;
      offset = env10;
      r = env11;
      break;
    case 3:
      offset = env0;
      maxEcCount = env1;
      rsPoly = env2;
      buffer = env3;
      rsBlocks = env4;
      r = env5;
      dcdata = env6;
      modPoly = env7;
      ecdata = env8;
      maxDcCount = env9;
      break;
    case 4:
      offset = env0;
      buffer = env1;
      rsBlocks = env2;
      dcdata = env3;
      modPoly = env4;
      ecdata = env5;
      maxDcCount = env6;
      maxEcCount = env7;
      r = env8;
      modIndex = env9;
      i = env10;
      t1 = env11;
      break;
    case 5:
      rsBlocks = env0;
      i = env1;
      t2 = env2;
      r = env3;
      dcdata = env4;
      maxDcCount = env5;
      maxEcCount = env6;
      data = env7;
      ecdata = env8;
      break;
    case 6:
      i = env0;
      rsBlocks = env1;
      ecdata = env2;
      data = env3;
      r = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var dcdata = $.ListFactory_List($.get$length(rsBlocks));
      $.setRuntimeTypeInfo(dcdata, ({E: 'List'}));
      var ecdata = $.ListFactory_List($.get$length(rsBlocks));
      $.setRuntimeTypeInfo(ecdata, ({E: 'List'}));
      var offset = 0;
      var r = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(r, $.get$length(rsBlocks))) break L0;
            var dcCount = $.index(rsBlocks, r).get$dataCount();
            var ecCount = $.sub($.index(rsBlocks, r).get$totalCount(), dcCount);
            maxDcCount = $.Math_max(maxDcCount, dcCount);
            maxEcCount = $.Math_max(maxEcCount, ecCount);
            var t1 = $.QrMath_getZeroedList(dcCount);
            var t2 = dcdata.length;
            if (r < 0 || r >= t2) throw $.ioore(r);
            dcdata[r] = t1;
            var i = 0;
          case 2:
            L1: while (true) {
              switch (state) {
                case 0:
                  t1 = dcdata.length;
                  if (r < 0 || r >= t1) throw $.ioore(r);
                  if (!$.ltB(i, $.get$length(dcdata[r]))) break L1;
                  t1 = dcdata.length;
                  if (r < 0 || r >= t1) throw $.ioore(r);
                  t2 = dcdata[r];
                case 2:
                  state = 0;
                  var t3 = buffer.getByte$1(i + offset);
                  if (typeof t3 !== 'number') throw $.iae(t3);
                  $.indexSet(t2, i, 255 & t3);
                  ++i;
              }
            }
            if (typeof dcCount !== 'number') throw $.iae(dcCount);
            offset += dcCount;
            var rsPoly = $.QrUtil_getErrorCorrectPolynomial(ecCount);
            t1 = dcdata.length;
            if (r < 0 || r >= t1) throw $.ioore(r);
            var modPoly = $.QrPolynomial$(dcdata[r], $.sub($.get$length(rsPoly), 1)).mod$1(rsPoly);
          case 3:
            state = 0;
            t2 = $.QrMath_getZeroedList($.sub($.get$length(rsPoly), 1));
            t3 = ecdata.length;
            if (r < 0 || r >= t3) throw $.ioore(r);
            ecdata[r] = t2;
            i = 0;
          case 4:
            L2: while (true) {
              switch (state) {
                case 0:
                  t1 = ecdata.length;
                  if (r < 0 || r >= t1) throw $.ioore(r);
                  if (!$.ltB(i, $.get$length(ecdata[r]))) break L2;
                  t1 = $.get$length(modPoly);
                  if (typeof t1 !== 'number') throw $.iae(t1);
                  t1 += i;
                  t2 = ecdata.length;
                  if (r < 0 || r >= t2) throw $.ioore(r);
                  t3 = $.get$length(ecdata[r]);
                  if (typeof t3 !== 'number') throw $.iae(t3);
                  var modIndex = t1 - t3;
                  t3 = ecdata.length;
                  if (r < 0 || r >= t3) throw $.ioore(r);
                  t1 = ecdata[r];
                case 4:
                  state = 0;
                  $.indexSet(t1, i, modIndex >= 0 ? $.index(modPoly, modIndex) : 0);
                  ++i;
              }
            }
            ++r;
        }
      }
      for (var totalCodeCount = 0, i = 0; $.ltB(i, $.get$length(rsBlocks)); ++i) {
        t1 = $.index(rsBlocks, i).get$totalCount();
        if (typeof t1 !== 'number') throw $.iae(t1);
        totalCodeCount += t1;
      }
      var data = [];
      i = 0;
    case 5:
      L3: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, maxDcCount)) break L3;
            r = 0;
          case 5:
            L4: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(r, $.get$length(rsBlocks))) break L4;
                  t1 = dcdata.length;
                  if (r < 0 || r >= t1) throw $.ioore(r);
                case 5:
                  if (state == 5 || (state == 0 && $.ltB(i, $.get$length(dcdata[r])))) {
                    switch (state) {
                      case 0:
                        t1 = dcdata.length;
                        if (r < 0 || r >= t1) throw $.ioore(r);
                        t2 = dcdata[r];
                      case 5:
                        state = 0;
                        $.add$1(data, $.index(t2, i));
                    }
                  }
                  ++r;
              }
            }
            ++i;
        }
      }
      i = 0;
    case 6:
      L5: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, maxEcCount)) break L5;
            r = 0;
          case 6:
            L6: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(r, $.get$length(rsBlocks))) break L6;
                  t1 = ecdata.length;
                  if (r < 0 || r >= t1) throw $.ioore(r);
                case 6:
                  if (state == 6 || (state == 0 && $.ltB(i, $.get$length(ecdata[r])))) {
                    switch (state) {
                      case 0:
                        t1 = ecdata.length;
                        if (r < 0 || r >= t1) throw $.ioore(r);
                        t2 = ecdata[r];
                      case 6:
                        state = 0;
                        $.add$1(data, $.index(t2, i));
                    }
                  }
                  ++r;
              }
            }
            ++i;
        }
      }
      return data;
  }
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.QrUtil_getErrorCorrectPolynomial$bailout = function(state, errorCorrectLength) {
  var a = $.QrPolynomial$([1], 0);
  for (var i = 0; $.ltB(i, errorCorrectLength); ++i) {
    a = a.multiply$1($.QrPolynomial$([1, $.QrMath_gexp(i)], 0));
  }
  return a;
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.QrMath_gexp$bailout = function(state, n) {
  for (; $.ltB(n, 0); ) {
    n = $.add(n, 255);
  }
  for (; $.geB(n, 256); ) {
    n = $.sub(n, 255);
  }
  return $.index($.QrMath_EXP_TABLE(), n);
};

$.QrUtil_getBCHTypeNumber$bailout = function(state, data, d) {
  for (; $.geB($.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G18)), 0); ) {
    d = $.xor(d, $.shl($.QrUtil_G18, $.sub($.QrUtil_getBCHDigit(d), $.QrUtil_getBCHDigit($.QrUtil_G18))));
  }
  return $.or($.shl(data, 12), d);
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.listInsertRange$bailout = function(state, receiver, start, length$, initialValue) {
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = (receiver.length);
  if (start < 0 || start > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null)) {
    for (var i = start; i < t2; ++i) {
      $.indexSet(receiver, i, initialValue);
    }
  }
  $.set$length(receiver, t1);
};

$.QrUtil_getBCHDigit$bailout = function(state, data) {
  for (var digit = 0; !$.eqB(data, 0); ) {
    ++digit;
    data = $.shr(data, 1);
  }
  return digit;
};

$._Lists_lastIndexOf$bailout = function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(startIndex, 0)) return -1;
      if ($.geB(startIndex, $.get$length(a))) startIndex = $.sub($.get$length(a), 1);
    case 2:
      state = 0;
      for (var i = startIndex; $.geB(i, 0); i = $.sub(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.Arrays_lastIndexOf$bailout = function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(startIndex, 0)) return -1;
      if ($.geB(startIndex, $.get$length(a))) startIndex = $.sub($.get$length(a), 1);
    case 2:
      state = 0;
      for (var i = startIndex; $.geB(i, 0); i = $.sub(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$._qrIsolate.$call$0 = $._qrIsolate;
$._qrIsolate.$name = "_qrIsolate";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('must be implemented by subclass');
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$');
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC10 = new Isolate.$isolateProperties.Object();
$.CTC8 = new Isolate.$isolateProperties.EventArgs();
$.CTC2 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC6 = new Isolate.$isolateProperties.EmptyQueueException();
$.GlobalId__globalId = 0;
$.QrUtil_G15_MASK = 21522;
$.QrUtil__patternPositionTable = null;
$.QrRsBlock__blockTable = null;
$._getTypeNameOf = null;
$._lazyPort = null;
$.QrUtil_G15 = 1335;
$.QrMath__expTable = null;
$.QrMath__logTable = null;
$._BufferingSendPort__idCount = 0;
$._ReceivePortImpl__nextFreeId = 1;
$.QrUtil_G18 = 7973;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
 }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 },
 multiply$1: function(secondMatrix) {
  return this.multiply(secondMatrix);
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 get$context2d: function() {
  return this.getContext$1('2d');
 },
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!"], {
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 send$1: function(text) {
  return this.send(text);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC2.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('Element', ["id="], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', [], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 write$1: function(data) {
  return this.write(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
 write$1: function(data) {
  return this.write(data);
 }
});

$.$defineNativeClass('Float32Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 put$2: function(value, key) {
  return this.put(value,key);
 },
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', ["mode?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?"], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "pattern?"], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 remove$1: function(track) {
  return this.remove(track);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?", "offsetY?", "offsetX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('WebKitPoint', ["y?", "x?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "mode?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGMatrix', [], {
 multiply$1: function(secondMatrix) {
  return this.multiply(secondMatrix);
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPoint', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["y?", "x?"], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextTrack', ["mode?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id="], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 lastIndexOf$2: function(element, start) {
  if (start == null) start = $.sub($.get$length(this), 1);
  return $._Lists_lastIndexOf(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('WebSocket', [], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$2: function(code, reason) {
  return this.close(code,reason);
 },
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["length?"], {
 webkitRequestAnimationFrame$1: function(callback) {
  return this.webkitRequestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 }
});

$.$defineNativeClass('Worker', [], {
 terminate$0: function() {
  return this.terminate();
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 set$onmessage: function(f) {
  this.onmessage = f;;
 },
 set$id: function(i) {
  this.id = i;;
 },
 get$id: function() {
  return this.id;;
 }
});

// 195 dynamic classes.
// 319 classes
// 28 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v2/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v3/*class(_ElementImpl)*/ = [v1/*class(_SVGElementImpl)*/,v2/*class(_MediaElementImpl)*/,v1/*class(_SVGElementImpl)*/,v2/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v7/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v8/*class(_NodeImpl)*/ = [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v9/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v10/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v11/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['AbstractWorker', v11/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v7/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v1/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v2/*class(_MediaElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v8/*class(_NodeImpl)*/],
    ['MediaStream', v9/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v10/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['MouseEvent', 'MouseEvent|WheelEvent|WheelEvent'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
