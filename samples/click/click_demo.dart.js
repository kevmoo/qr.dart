function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 "super": "Object",
 toString$0: function(){var t1=this._msg;return t1==null?'Exception':'Exception: '+$.S(t1);},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib0_value?", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 "super": "Object",
 get$value: function(){if(this.get$isComplete()!==true)throw $.$$throw($.FutureNotCompleteException$());var t1=this._exception;if(!(t1==null))throw $.$$throw(t1);return this._lib0_value;},
 get$exception: function(){if(this.get$isComplete()!==true)throw $.$$throw($.FutureNotCompleteException$());return this._exception;},
 get$stackTrace: function(){if(this.get$isComplete()!==true)throw $.$$throw($.FutureNotCompleteException$());return this._stackTrace;},
 get$isComplete: function(){return this._isComplete;},
 get$hasValue: function(){return this.get$isComplete()===true&&this._exception==null;},
 then$1: function(onSuccess){if(this.get$hasValue()===true)onSuccess.call$1(this.get$value());else if(this.get$isComplete()!==true)this._successListeners.push(onSuccess);else if(this._exceptionHandled!==true)throw $.$$throw(this._exception);},
 handleException$1: function(onException){if(this._exceptionHandled===true)return;if(this._isComplete===true){var t1=this._exception;if(!(t1==null))this._exceptionHandled=onException.call$1(t1);}else this._exceptionHandlers.push(onException);},
 _complete$0: function(){this._isComplete=true;try{if(!(this._exception==null))for(var t1=$.iterator(this._exceptionHandlers);t1.hasNext$0()===true;){var handler=t1.next$0();if($.eqB(handler.call$1(this._exception),true)){this._exceptionHandled=true;break;}}if(this.get$hasValue()===true)for(t1=$.iterator(this._successListeners);t1.hasNext$0()===true;){var listener=t1.next$0();listener.call$1(this.get$value());}else if(this._exceptionHandled!==true&&$.gtB($.get$length(this._successListeners),0))throw $.$$throw(this._exception);}finally{for(t1=$.iterator(this._completionListeners);t1.hasNext$0()===true;){var listener0=t1.next$0();try{listener0.call$1(this);}catch(exception){$.unwrapException(exception);}}}},
 _setValue$1: function(value){if(this._isComplete===true)throw $.$$throw($.FutureAlreadyCompleteException$());this._lib0_value=value;this._complete$0();},
 _setException$2: function(exception,stackTrace){if(exception==null)throw $.$$throw($.IllegalArgumentException$(null));if(this._isComplete===true)throw $.$$throw($.FutureAlreadyCompleteException$());this._exception=exception;this._stackTrace=stackTrace;this._complete$0();}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 "super": "Object",
 get$future: function(){return this._futureImpl;},
 complete$1: function(value){this._futureImpl._setValue$1(value);},
 completeException$2: function(exception,stackTrace){this._futureImpl._setException$2(exception,stackTrace);},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 "super": "Object",
 _probeForAdding$1: function(key){var t1=$.hashCode(key);if(t1!==(t1|0))return this._probeForAdding$1$bailout(1,key,t1,0,0,0);var t3=$.get$length(this._keys);if(t3!==(t3|0))return this._probeForAdding$1$bailout(2,key,t1,t3,0,0);var hash=(t1&t3-1)>>>0;for(var numberOfProbes=1,insertionIndex=-1;true;){t1=this._keys;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this._probeForAdding$1$bailout(3,key,hash,numberOfProbes,insertionIndex,t1);if(hash<0||hash>=t1.length)throw $.ioore(hash);var existingKey=t1[hash];if(existingKey==null){if(insertionIndex<0)return hash;return insertionIndex;}else if($.eqB(existingKey,key))return hash;else if(insertionIndex<0&&$.CTC27===existingKey)insertionIndex=hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));if(hash!==(hash|0))return this._probeForAdding$1$bailout(4,numberOfProbes0,key,insertionIndex,hash,0);numberOfProbes=numberOfProbes0;}},
 _probeForAdding$1$bailout: function(state,env0,env1,env2,env3,env4){switch(state){case 1:var key=env0;t1=env1;break;case 2:key=env0;t1=env1;t3=env2;break;case 3:key=env0;hash=env1;numberOfProbes=env2;insertionIndex=env3;t1=env4;break;case 4:numberOfProbes0=env0;key=env1;insertionIndex=env2;hash=env3;break;}switch(state){case 0:var t1=$.hashCode(key);case 1:state=0;var t3=$.get$length(this._keys);case 2:state=0;var hash=$.and(t1,$.sub(t3,1));var numberOfProbes=1;var insertionIndex=-1;default:L0:while(true)switch(state){case 0:if(!true)break L0;t1=this._keys;case 3:state=0;var existingKey=$.index(t1,hash);if(existingKey==null){if($.ltB(insertionIndex,0))return hash;return insertionIndex;}else if($.eqB(existingKey,key))return hash;else if($.ltB(insertionIndex,0)&&$.CTC27===existingKey)insertionIndex=hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));case 4:state=0;numberOfProbes=numberOfProbes0;}}},
 _probeForLookup$1: function(key){var hash=$.and($.hashCode(key),$.sub($.get$length(this._keys),1));if(hash!==(hash|0))return this._probeForLookup$1$bailout(1,key,hash);for(var numberOfProbes=1;true;){var existingKey=$.index(this._keys,hash);if(existingKey==null)return -1;if($.eqB(existingKey,key))return hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));numberOfProbes=numberOfProbes0;}},
 _probeForLookup$1$bailout: function(state,key,hash){for(var numberOfProbes=1;true;){var existingKey=$.index(this._keys,hash);if(existingKey==null)return -1;if($.eqB(existingKey,key))return hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));numberOfProbes=numberOfProbes0;}},
 _ensureCapacity$0: function(){var newNumberOfEntries=$.add(this._numberOfEntries,1);if($.geB(newNumberOfEntries,this._loadLimit)){this._grow$1($.mul($.get$length(this._keys),2));return;}var numberOfFree=$.sub($.sub($.get$length(this._keys),newNumberOfEntries),this._numberOfDeleted);if($.gtB(this._numberOfDeleted,numberOfFree))this._grow$1($.get$length(this._keys));},
 _grow$1: function(newCapacity){var capacity=$.get$length(this._keys);if(typeof capacity!=='number')return this._grow$1$bailout(1,newCapacity,capacity,0,0);this._loadLimit=$.tdiv($.mul(newCapacity,3),4);var oldKeys=this._keys;if(typeof oldKeys!=='string'&&(typeof oldKeys!=='object'||oldKeys===null||oldKeys.constructor!==Array&&!oldKeys.is$JavaScriptIndexingBehavior()))return this._grow$1$bailout(2,newCapacity,oldKeys,capacity,0);var oldValues=this._values;if(typeof oldValues!=='string'&&(typeof oldValues!=='object'||oldValues===null||oldValues.constructor!==Array&&!oldValues.is$JavaScriptIndexingBehavior()))return this._grow$1$bailout(3,newCapacity,oldKeys,oldValues,capacity);this._keys=$.ListImplementation_List(newCapacity);this._values=$.ListImplementation_List(newCapacity,$.getRuntimeTypeInfo(this).V);for(var i=0;i<capacity;++i){if(i<0||i>=oldKeys.length)throw $.ioore(i);var key=oldKeys[i];if(key==null||key===$.CTC27)continue;if(i<0||i>=oldValues.length)throw $.ioore(i);var value=oldValues[i];var newIndex=this._probeForAdding$1(key);$.indexSet(this._keys,newIndex,key);$.indexSet(this._values,newIndex,value);}this._numberOfDeleted=0;},
 _grow$1$bailout: function(state,env0,env1,env2,env3){switch(state){case 1:var newCapacity=env0;capacity=env1;break;case 2:newCapacity=env0;oldKeys=env1;capacity=env2;break;case 3:newCapacity=env0;oldKeys=env1;oldValues=env2;capacity=env3;break;}switch(state){case 0:var capacity=$.get$length(this._keys);case 1:state=0;this._loadLimit=$.tdiv($.mul(newCapacity,3),4);var oldKeys=this._keys;case 2:state=0;var oldValues=this._values;case 3:state=0;this._keys=$.ListImplementation_List(newCapacity);this._values=$.ListImplementation_List(newCapacity,$.getRuntimeTypeInfo(this).V);for(var i=0;$.ltB(i,capacity);++i){var key=$.index(oldKeys,i);if(key==null||key===$.CTC27)continue;var value=$.index(oldValues,i);var newIndex=this._probeForAdding$1(key);$.indexSet(this._keys,newIndex,key);$.indexSet(this._values,newIndex,value);}this._numberOfDeleted=0;}},
 clear$0: function(){this._numberOfEntries=0;this._numberOfDeleted=0;var length$=$.get$length(this._keys);if(typeof length$!=='number')return this.clear$0$bailout(1,length$);for(var i=0;i<length$;++i){$.indexSet(this._keys,i,null);$.indexSet(this._values,i,null);}},
 clear$0$bailout: function(state,length$){for(var i=0;$.ltB(i,length$);++i){$.indexSet(this._keys,i,null);$.indexSet(this._values,i,null);}},
 operator$indexSet$2: function(key,value){this._ensureCapacity$0();var index=this._probeForAdding$1(key);var t1=this._keys;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.operator$indexSet$2$bailout(1,key,value,index,t1);if(index!==(index|0))throw $.iae(index);if(index<0||index>=t1.length)throw $.ioore(index);if(!(t1[index]==null)){if(index<0||index>=t1.length)throw $.ioore(index);var t2=t1[index]===$.CTC27;t1=t2;}else t1=true;if(t1){t1=this._numberOfEntries;if(typeof t1!=='number')return this.operator$indexSet$2$bailout(3,key,value,t1,index);this._numberOfEntries=t1+1;}t1=this._keys;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(4,key,value,t1,index);if(index<0||index>=t1.length)throw $.ioore(index);t1[index]=key;t1=this._values;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(5,value,t1,index,0);if(index<0||index>=t1.length)throw $.ioore(index);t1[index]=value;},
 operator$indexSet$2$bailout: function(state,env0,env1,env2,env3){switch(state){case 1:var key=env0;var value=env1;index=env2;t1=env3;break;case 2:key=env0;value=env1;index=env2;t1=env3;break;case 3:key=env0;value=env1;t1=env2;index=env3;break;case 4:key=env0;value=env1;t1=env2;index=env3;break;case 5:value=env0;t1=env1;index=env2;break;}switch(state){case 0:this._ensureCapacity$0();var index=this._probeForAdding$1(key);var t1=this._keys;case 1:state=0;case 2:if(state===2||state===0&&!($.index(t1,index)==null))switch(state){case 0:t1=this._keys;case 2:state=0;var t3=$.index(t1,index)===$.CTC27;t1=t3;}else t1=true;case 3:if(state===3||state===0&&t1)switch(state){case 0:t1=this._numberOfEntries;case 3:state=0;this._numberOfEntries=$.add(t1,1);}t1=this._keys;case 4:state=0;$.indexSet(t1,index,key);t1=this._values;case 5:state=0;$.indexSet(t1,index,value);}},
 operator$index$1: function(key){var index=this._probeForLookup$1(key);if($.ltB(index,0))return;return $.index(this._values,index);},
 putIfAbsent$2: function(key,ifAbsent){var index=this._probeForLookup$1(key);if($.geB(index,0))return $.index(this._values,index);var value=ifAbsent.call$0();this.operator$indexSet$2(key,value);return value;},
 remove$1: function(key){var index=this._probeForLookup$1(key);if($.geB(index,0)){this._numberOfEntries=$.sub(this._numberOfEntries,1);var value=$.index(this._values,index);$.indexSet(this._values,index,null);$.indexSet(this._keys,index,$.CTC27);this._numberOfDeleted=$.add(this._numberOfDeleted,1);return value;}return;},
 isEmpty$0: function(){return $.eq(this._numberOfEntries,0);},
 get$length: function(){return this._numberOfEntries;},
 forEach$1: function(f){var length$=$.get$length(this._keys);if(typeof length$!=='number')return this.forEach$1$bailout(1,f,length$);for(var i=0;i<length$;++i){var key=$.index(this._keys,i);if(!(key==null)&&!(key===$.CTC27))f.call$2(key,$.index(this._values,i));}},
 forEach$1$bailout: function(state,f,length$){for(var i=0;$.ltB(i,length$);++i){var key=$.index(this._keys,i);if(!(key==null)&&!(key===$.CTC27))f.call$2(key,$.index(this._values,i));}},
 getKeys$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).K);t1.i_10=0;this.forEach$1(new $.HashMapImplementation_getKeys__(list,t1));return list;},
 getValues$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).V);t1.i_1=0;this.forEach$1(new $.HashMapImplementation_getValues__(list,t1));return list;},
 containsKey$1: function(key){return !$.eqB(this._probeForLookup$1(key),-1);},
 toString$0: function(){return $.Maps_mapToString(this);},
 HashMapImplementation$0: function(){this._numberOfEntries=0;this._numberOfDeleted=0;this._loadLimit=$.HashMapImplementation__computeLoadLimit(8);this._keys=$.ListImplementation_List(8);this._values=$.ListImplementation_List(8,$.getRuntimeTypeInfo(this).V);},
 is$Map: function() { return true; }
};

$$._DeletedKeySentinel = {"":
 [],
 "super": "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 "super": "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_list", "_map"],
 "super": "Object",
 operator$indexSet$2: function(key,value){var t1=this._map;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(1,key,value,t1);if(t1.containsKey$1(key)===true){if(key!==(key|0))throw $.iae(key);if(key<0||key>=t1.length)throw $.ioore(key);t1[key].get$element().set$value(value);}else{var t2=this._list;$.addLast(t2,$.KeyValuePair$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V));t2=t2.lastEntry$0();if(key!==(key|0))throw $.iae(key);if(key<0||key>=t1.length)throw $.ioore(key);t1[key]=t2;}},
 operator$indexSet$2$bailout: function(state,key,value,t1){if(t1.containsKey$1(key)===true)$.index(t1,key).get$element().set$value(value);else{var t2=this._list;$.addLast(t2,$.KeyValuePair$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V));$.indexSet(t1,key,t2.lastEntry$0());}},
 operator$index$1: function(key){var entry=$.index(this._map,key);if(entry==null)return;return entry.get$element().get$value();},
 remove$1: function(key){var entry=this._map.remove$1(key);if(entry==null)return;entry.remove$0();return entry.get$element().get$value();},
 putIfAbsent$2: function(key,ifAbsent){var value=this.operator$index$1(key);if(this.operator$index$1(key)==null&&this.containsKey$1(key)!==true){value=ifAbsent.call$0();this.operator$indexSet$2(key,value);}return value;},
 getKeys$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).K);t1.index_10=0;$.forEach(this._list,new $.LinkedHashMapImplementation_getKeys__(list,t1));return list;},
 getValues$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).V);t1.index_1=0;$.forEach(this._list,new $.LinkedHashMapImplementation_getValues__(list,t1));return list;},
 forEach$1: function(f){$.forEach(this._list,new $.LinkedHashMapImplementation_forEach__(f));},
 containsKey$1: function(key){return this._map.containsKey$1(key);},
 get$length: function(){return $.get$length(this._map);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 clear$0: function(){$.clear(this._map);$.clear(this._list);},
 toString$0: function(){return $.Maps_mapToString(this);},
 LinkedHashMapImplementation$0: function(){this._map=$.HashMapImplementation$($.getRuntimeTypeInfo(this).K,'DoubleLinkedQueueEntry<KeyValuePair<K, V>>');this._list=$.DoubleLinkedQueue$('KeyValuePair<K, V>');},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_lib0_next=", "_lib0_element?"],
 "super": "Object",
 _link$2: function(p,n){this._lib0_next=n;this._previous=p;p.set$_lib0_next(this);n.set$_previous(this);},
 prepend$1: function(e){$.DoubleLinkedQueueEntry$(e,$.getRuntimeTypeInfo(this).E)._link$2(this._previous,this);},
 remove$0: function(){var t1=this._lib0_next;this._previous.set$_lib0_next(t1);t1=this._previous;this._lib0_next.set$_previous(t1);this._lib0_next=null;this._previous=null;return this._lib0_element;},
 _asNonSentinelEntry$0: function(){return this;},
 previousEntry$0: function(){return this._previous._asNonSentinelEntry$0();},
 get$element: function(){return this._lib0_element;},
 DoubleLinkedQueueEntry$1: function(e){this._lib0_element=e;}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_lib0_next", "_lib0_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function(){throw $.$$throw($.CTC26);},
 _asNonSentinelEntry$0: function(){return;},
 get$element: function(){throw $.$$throw($.CTC26);},
 _DoubleLinkedQueueEntrySentinel$0: function(){this._link$2(this,this);}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value){this._sentinel.prepend$1(value);},
 add$1: function(value){this.addLast$1(value);},
 removeLast$0: function(){return this._sentinel.get$_previous().remove$0();},
 removeFirst$0: function(){return this._sentinel.get$_lib0_next().remove$0();},
 lastEntry$0: function(){return this._sentinel.previousEntry$0();},
 get$length: function(){var t1={};t1.counter_1=0;this.forEach$1(new $.DoubleLinkedQueue_length__(t1));return t1.counter_1;},
 isEmpty$0: function(){var t1=this._sentinel;var t2=t1.get$_lib0_next();return t2==null?t1==null:t2===t1;},
 clear$0: function(){var t1=this._sentinel;t1.set$_lib0_next(t1);t1.set$_previous(t1);},
 forEach$1: function(f){var t1=this._sentinel;var entry=t1.get$_lib0_next();for(;!(entry==null?t1==null:entry===t1);){var nextEntry=entry.get$_lib0_next();f.call$1(entry.get$_lib0_element());entry=nextEntry;}},
 iterator$0: function(){return $._DoubleLinkedQueueIterator$(this._sentinel,$.getRuntimeTypeInfo(this).E);},
 toString$0: function(){return $.Collections_collectionToString(this);},
 DoubleLinkedQueue$0: function(){this._sentinel=$._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function(){var t1=this._currentEntry.get$_lib0_next();var t2=this._sentinel;return !(t1==null?t2==null:t1===t2);},
 next$0: function(){if(this.hasNext$0()!==true)throw $.$$throw($.CTC12);this._currentEntry=this._currentEntry.get$_lib0_next();return this._currentEntry.get$element();},
 _DoubleLinkedQueueIterator$1: function(_sentinel){this._currentEntry=this._sentinel;}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib0_pattern"],
 "super": "Object",
 hasMatch$1: function(str){return $.regExpTest(this,$.checkString(str));},
 get$pattern: function(){return this._lib0_pattern;},
 get$multiLine: function(){return this._multiLine;},
 get$ignoreCase: function(){return this._ignoreCase;},
 is$JSSyntaxRegExp: true,
 is$RegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 "super": "Object",
 get$length: function(){return this._length;},
 isEmpty$0: function(){return this._length===0;},
 add$1: function(obj){var str=$.toString(obj);if(str==null||$.isEmpty(str)===true)return this;$.add$1(this._buffer,str);var t1=this._length;if(typeof t1!=='number')return this.add$1$bailout(1,str,t1);var t3=$.get$length(str);if(typeof t3!=='number')return this.add$1$bailout(2,t1,t3);this._length=t1+t3;return this;},
 add$1$bailout: function(state,env0,env1){switch(state){case 1:str=env0;t1=env1;break;case 2:t1=env0;t3=env1;break;}switch(state){case 0:var str=$.toString(obj);if(str==null||$.isEmpty(str)===true)return this;$.add$1(this._buffer,str);var t1=this._length;case 1:state=0;var t3=$.get$length(str);case 2:state=0;this._length=$.add(t1,t3);return this;}},
 clear$0: function(){this._buffer=$.ListImplementation_List(null,'String');this._length=0;return this;},
 toString$0: function(){if($.get$length(this._buffer)===0)return '';if($.get$length(this._buffer)===1)return $.index(this._buffer,0);var result=$.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer),'');$.clear(this._buffer);$.add$1(this._buffer,result);return result;},
 StringBufferImpl$1: function(content$){this.clear$0();this.add$1(content$);}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 "super": "Object",
 toString$0: function(){return 'IndexOutOfRangeException: '+$.S(this._value);},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 "super": "Object",
 toString$0: function(){var sb=$.StringBufferImpl$('');var t1=this._arguments;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.toString$0$bailout(1,t1,sb);var i=0;for(;i<t1.length;++i){if(i>0)sb.add$1(', ');if(i<0||i>=t1.length)throw $.ioore(i);sb.add$1(t1[i]);}t1=this._existingArgumentNames;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.toString$0$bailout(2,sb,t1);var actualParameters=sb.toString$0();sb=$.StringBufferImpl$('');for(i=0;i<t1.length;++i){if(i>0)sb.add$1(', ');if(i<0||i>=t1.length)throw $.ioore(i);sb.add$1(t1[i]);}var formalParameters=sb.toString$0();t1=this._functionName;return 'NoSuchMethodException: incorrect number of arguments passed to method named \''+$.S(t1)+'\'\nReceiver: '+$.S(this._receiver)+'\n'+'Tried calling: '+$.S(t1)+'('+$.S(actualParameters)+')\n'+'Found: '+$.S(t1)+'('+$.S(formalParameters)+')';},
 toString$0$bailout: function(state,env0,env1){switch(state){case 1:t1=env0;sb=env1;break;case 2:sb=env0;t1=env1;break;}switch(state){case 0:var sb=$.StringBufferImpl$('');var t1=this._arguments;case 1:state=0;var i=0;for(;$.ltB(i,$.get$length(t1));++i){if(i>0)sb.add$1(', ');sb.add$1($.index(t1,i));}t1=this._existingArgumentNames;case 2:state=0;if(t1==null)return 'NoSuchMethodException : method not found: \''+$.S(this._functionName)+'\'\n'+'Receiver: '+$.S(this._receiver)+'\n'+'Arguments: ['+$.S(sb)+']';else{var actualParameters=sb.toString$0();sb=$.StringBufferImpl$('');for(i=0;$.ltB(i,$.get$length(t1));++i){if(i>0)sb.add$1(', ');sb.add$1($.index(t1,i));}var formalParameters=sb.toString$0();t1=this._functionName;return 'NoSuchMethodException: incorrect number of arguments passed to method named \''+$.S(t1)+'\'\nReceiver: '+$.S(this._receiver)+'\n'+'Tried calling: '+$.S(t1)+'('+$.S(actualParameters)+')\n'+'Found: '+$.S(t1)+'('+$.S(formalParameters)+')';}}},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Object is not closure';},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 "super": "Object",
 toString$0: function(){return 'Illegal argument(s): '+$.S(this._arg);},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Stack Overflow';},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 "super": "Object",
 toString$0: function(){var t1=this.functionName;if(t1==null)return this.get$exceptionName();else return $.S(this.get$exceptionName())+' : method: \''+$.S(t1)+'\'\n'+'Receiver: null\n'+'Arguments: '+$.S(this.arguments);},
 get$exceptionName: function(){return 'NullPointerException';},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'NoMoreElementsException';},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'EmptyQueueException';},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function(){return 'UnsupportedOperationException: '+$.S(this._message);},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function(){var t1=this._message;return !(t1==null)?'NotImplementedException: '+$.S(t1):'NotImplementedException';},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_pattern", "_errmsg"],
 "super": "Object",
 toString$0: function(){return 'IllegalJSRegExpException: \''+$.S(this._pattern)+'\' \''+$.S(this._errmsg)+'\'';},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Exception: future has not been completed';},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Exception: future already completed';},
 is$Exception: true
};

$$.Object = {"":
 [],
 "super": "",
 operator$eq$1: function(other){return this===other;},
 toString$0: function(){return $.Primitives_objectToString(this);}
};

$$.ListIterator = {"":
 ["i", "list"],
 "super": "Object",
 hasNext$0: function(){var t1=this.i;if(typeof t1!=='number')return this.hasNext$0$bailout(1,t1);return t1<this.list.length;},
 hasNext$0$bailout: function(state,t1){return $.lt(t1,this.list.length);},
 next$0: function(){if(this.hasNext$0()!==true)throw $.$$throw($.NoMoreElementsException$());var value=this.list[this.i];var t1=this.i;if(typeof t1!=='number')return this.next$0$bailout(1,t1,value);this.i=t1+1;return value;},
 next$0$bailout: function(state,t1,value){this.i=$.add(t1,1);return value;}
};

$$.StackTrace = {"":
 ["stack"],
 "super": "Object",
 toString$0: function(){var t1=this.stack;return !(t1==null)?t1:'';}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Closure';},
 is$Function: true
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_lib4_set?"],
 "super": "Object",
 _lib4_set$2: function(arg0, arg1) { return this._lib4_set.call$2(arg0, arg1); }
};

$$.ClickDemo = {"":
 ["_lib1_canvas?", "_lib1_stage", "_clickMan"],
 "super": "Object",
 requestFrame$0: function(){$.window().requestAnimationFrame$1(this.get$_onFrame());},
 _onFrame$1: function(highResTime){this._lib1_stage.draw$0();this.requestFrame$0();},
 get$_onFrame: function() { return new $.BoundClosure(this, '_onFrame$1'); }
};

$$._Default = {"":
 [],
 "super": "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$complete: function(){return this.operator$index$1('complete');},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$mouseDown: function(){return this.operator$index$1('mousedown');},
 get$mouseMove: function(){return this.operator$index$1('mousemove');},
 get$mouseOut: function(){return this.operator$index$1('mouseout');},
 get$mouseUp: function(){return this.operator$index$1('mouseup');},
 get$reset: function(){return this.operator$index$1('reset');},
 reset$0: function() { return this.get$reset().call$0(); },
 get$select: function(){return this.operator$index$1('select');},
 select$1: function(arg0) { return this.get$select().call$1(arg0); }
};

$$.EmptyElementRect = {"":
 ["client", "offset", "scroll", "bounding", "clientRects"],
 "super": "Object"
};

$$._SimpleClientRect = {"":
 ["left?", "top?", "width?", "height?"],
 "super": "Object",
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this.left,other.get$left())&&$.eqB(this.top,other.get$top())&&$.eqB(this.width,other.get$width())&&$.eqB(this.height,other.get$height());},
 toString$0: function(){return '('+$.S(this.left)+', '+$.S(this.top)+', '+$.S(this.width)+', '+$.S(this.height)+')';}
};

$$._ElementRectImpl = {"":
 ["client", "offset", "scroll", "_boundingClientRect", "_clientRects"],
 "super": "Object"
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$mouseDown: function(){return this.operator$index$1('mousedown');},
 get$mouseMove: function(){return this.operator$index$1('mousemove');},
 get$mouseOut: function(){return this.operator$index$1('mouseout');},
 get$mouseUp: function(){return this.operator$index$1('mouseup');},
 get$reset: function(){return this.operator$index$1('reset');},
 reset$0: function() { return this.get$reset().call$0(); },
 get$select: function(){return this.operator$index$1('select');},
 select$1: function(arg0) { return this.get$select().call$1(arg0); }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._EventsImpl = {"":
 ["_ptr"],
 "super": "Object",
 operator$index$1: function(type){return $._EventListenerListImpl$(this._ptr,type);}
};

$$._EventListenerListImpl = {"":
 ["_ptr", "_type"],
 "super": "Object",
 add$2: function(listener,useCapture){this._add$2(listener,useCapture);return this;},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener,useCapture){this._lib_remove$2(listener,useCapture);return this;},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener,useCapture){this._ptr.$dom_addEventListener$3(this._type,listener,useCapture);},
 _lib_remove$2: function(listener,useCapture){this._ptr.$dom_removeEventListener$3(this._type,listener,useCapture);}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$complete: function(){return this.operator$index$1('complete');},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$close: function(){return this.operator$index$1('close');},
 close$0: function() { return this.get$close().call$0(); }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$mouseDown: function(){return this.operator$index$1('mousedown');},
 get$mouseMove: function(){return this.operator$index$1('mousemove');},
 get$mouseOut: function(){return this.operator$index$1('mouseout');},
 get$mouseUp: function(){return this.operator$index$1('mouseup');},
 get$reset: function(){return this.operator$index$1('reset');},
 reset$0: function() { return this.get$reset().call$0(); },
 get$select: function(){return this.operator$index$1('select');},
 select$1: function(arg0) { return this.get$select().call$1(arg0); }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$close: function(){return this.operator$index$1('close');},
 close$0: function() { return this.get$close().call$0(); },
 get$message: function(){return this.operator$index$1('message');}
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function(){return this.operator$index$1('message');},
 get$mouseDown: function(){return this.operator$index$1('mousedown');},
 get$mouseMove: function(){return this.operator$index$1('mousemove');},
 get$mouseOut: function(){return this.operator$index$1('mouseout');},
 get$mouseUp: function(){return this.operator$index$1('mouseup');},
 get$reset: function(){return this.operator$index$1('reset');},
 reset$0: function() { return this.get$reset().call$0(); },
 get$select: function(){return this.operator$index$1('select');},
 select$1: function(arg0) { return this.get$select().call$1(arg0); }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_AbstractWorkerEventsImpl",
 get$message: function(){return this.operator$index$1('message');}
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MeasurementRequest = {"":
 ["computeValue", "completer?", "value=", "exception="],
 "super": "Object",
 computeValue$0: function() { return this.computeValue.call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 "super": "Object",
 get$top: function(){return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));},
 close$0: function(){return $._DOMWindowCrossFrameImpl__close(this._window);},
 postMessage$3: function(message,targetOrigin,messagePorts){var t1=messagePorts==null;var t2=this._window;if(t1)$._DOMWindowCrossFrameImpl__postMessage2(t2,message,targetOrigin);else $._DOMWindowCrossFrameImpl__postMessage3(t2,message,targetOrigin,messagePorts);},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
}
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 "super": "_VariableSizeListIterator",
 hasNext$0: function(){var t1=this._lib_length;if(typeof t1!=='number')return this.hasNext$0$bailout(1,t1,0);var t3=this._pos;if(typeof t3!=='number')return this.hasNext$0$bailout(2,t1,t3);return t1>t3;},
 hasNext$0$bailout: function(state,env0,env1){switch(state){case 1:t1=env0;break;case 2:t1=env0;t3=env1;break;}switch(state){case 0:var t1=this._lib_length;case 1:state=0;var t3=this._pos;case 2:state=0;return $.gt(t1,t3);}}
};

$$._VariableSizeListIterator = {"":
 [],
 "super": "Object",
 hasNext$0: function(){var t1=$.get$length(this._array);if(typeof t1!=='number')return this.hasNext$0$bailout(1,t1,0);var t3=this._pos;if(typeof t3!=='number')return this.hasNext$0$bailout(2,t3,t1);return t1>t3;},
 hasNext$0$bailout: function(state,env0,env1){switch(state){case 1:t1=env0;break;case 2:t3=env0;t1=env1;break;}switch(state){case 0:var t1=$.get$length(this._array);case 1:state=0;var t3=this._pos;case 2:state=0;return $.gt(t1,t3);}},
 next$0: function(){if(this.hasNext$0()!==true)throw $.$$throw($.CTC12);var t1=this._array;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.next$0$bailout(1,t1,0);var t3=this._pos;if(typeof t3!=='number')return this.next$0$bailout(2,t1,t3);this._pos=t3+1;if(t3!==(t3|0))throw $.iae(t3);if(t3<0||t3>=t1.length)throw $.ioore(t3);return t1[t3];},
 next$0$bailout: function(state,env0,env1){switch(state){case 1:t1=env0;break;case 2:t1=env0;t3=env1;break;}switch(state){case 0:if(this.hasNext$0()!==true)throw $.$$throw($.CTC12);var t1=this._array;case 1:state=0;var t3=this._pos;case 2:state=0;this._pos=$.add(t3,1);return $.index(t1,t3);}}
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId?", "nextManagerId", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
 "super": "Object",
 get$useWorkers: function(){return this.supportsWorkers;},
 get$needSerialization: function(){return this.get$useWorkers();},
 _nativeDetectEnvironment$0: function(){    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  },
 _nativeInitWorkerMessageHandler$0: function(){    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  },
 maybeCloseWorker$0: function(){if($.isEmpty(this.isolates)===true)this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command','close'])));},
 _Manager$0: function(){this._nativeDetectEnvironment$0();this.topEventLoop=$._EventLoop$();this.isolates=$.HashMapImplementation$('int','_IsolateContext');this.managers=$.HashMapImplementation$('int','_ManagerStub');if(this.isWorker===true){this.mainManager=$._MainManagerStub$();this._nativeInitWorkerMessageHandler$0();}}
};

$$._IsolateContext = {"":
 ["id?", "ports?", "isolateStatics"],
 "super": "Object",
 initGlobals$0: function(){$initGlobals(this);},
 eval$1: function(code){var old=$._globalState().get$currentContext();$._globalState().set$currentContext(this);this._setGlobals$0();var result=null;try{result=code.call$0();}finally{var t1=old;$._globalState().set$currentContext(t1);t1=old;if(!(t1==null))t1._setGlobals$0();}return result;},
 _setGlobals$0: function(){$setGlobals(this);},
 lookup$1: function(portId){return $.index(this.ports,portId);},
 register$2: function(portId,port){var t1=this.ports;if(t1.containsKey$1(portId)===true)throw $.$$throw($.ExceptionImplementation$('Registry: ports must be registered only once.'));$.indexSet(t1,portId,port);$.indexSet($._globalState().get$isolates(),this.id,this);},
 unregister$1: function(portId){var t1=this.ports;t1.remove$1(portId);if($.isEmpty(t1)===true)$._globalState().get$isolates().remove$1(this.id);},
 _IsolateContext$0: function(){var t1=$._globalState();var t2=t1.get$nextIsolateId();t1.set$nextIsolateId($.add(t2,1));this.id=t2;this.ports=$.HashMapImplementation$('int','ReceivePort');this.initGlobals$0();}
};

$$._EventLoop = {"":
 ["events"],
 "super": "Object",
 enqueue$3: function(isolate,fn,msg){$.addLast(this.events,$._IsolateEvent$(isolate,fn,msg));},
 dequeue$0: function(){var t1=this.events;if($.isEmpty(t1)===true)return;return t1.removeFirst$0();},
 runIteration$0: function(){var event$=this.dequeue$0();if(event$==null){if($._globalState().get$isWorker()===true)$._globalState().maybeCloseWorker$0();else if(!($._globalState().get$rootContext()==null)&&$._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id())===true&&$._globalState().get$fromCommandLine()===true&&$.isEmpty($._globalState().get$rootContext().get$ports())===true)throw $.$$throw($.ExceptionImplementation$('Program exited with open ReceivePorts.'));return false;}event$.process$0();return true;},
 _runHelper$0: function(){if(!($._window()==null))new $._EventLoop__runHelper_next(this).call$0();else for(;this.runIteration$0()===true;);},
 run$0: function(){if($._globalState().get$isWorker()!==true)this._runHelper$0();else try{this._runHelper$0();}catch(exception){var t1=$.unwrapException(exception);var e=t1;var trace=$.getTraceFromException(exception);$._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command','error','msg',$.S(e)+'\n'+$.S(trace)])));}}
};

$$._IsolateEvent = {"":
 ["isolate", "fn", "message?"],
 "super": "Object",
 process$0: function(){this.isolate.eval$1(this.fn);}
};

$$._MainManagerStub = {"":
 [],
 "super": "Object",
 get$id: function(){return 0;},
 postMessage$1: function(msg){$globalThis.postMessage(msg);}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 "super": "Object",
 _checkReplyTo$1: function(replyTo){if(!(replyTo==null)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_NativeJsSendPort)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_WorkerSendPort)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_BufferingSendPort))throw $.$$throw($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));},
 call$1: function(message){var completer=$.CompleterImpl$();var port=$._ReceivePortImpl$();this.send$2(message,port.toSendPort$0());port.receive$1(new $._BaseSendPort_call_anon(port,completer));return completer.get$future();},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message,replyTo){$._waitForPendingPorts([message,replyTo],new $._NativeJsSendPort_send_anon(this,message,replyTo));},
 operator$eq$1: function(other){return typeof other==='object'&&other!==null&&!!other.is$_NativeJsSendPort&&$.eqB(this._receivePort,other._receivePort);},
 hashCode$0: function(){return this._receivePort.get$_id();},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message,replyTo){$._waitForPendingPorts([message,replyTo],new $._WorkerSendPort_send_anon(this,message,replyTo));},
 operator$eq$1: function(other){if(typeof other==='object'&&other!==null&&!!other.is$_WorkerSendPort)var t1=$.eqB(this._workerId,other._workerId)&&$.eqB(this._isolateId,other._isolateId)&&$.eqB(this._receivePortId,other._receivePortId);else t1=false;return t1;},
 hashCode$0: function(){return $.xor($.xor($.shl(this._workerId,16),$.shl(this._isolateId,8)),this._receivePortId);},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_id?", "_callback?"],
 "super": "Object",
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 receive$1: function(onMessage){this._callback=onMessage;},
 close$0: function(){this._callback=null;$._globalState().get$currentContext().unregister$1(this._id);},
 toSendPort$0: function(){return $._NativeJsSendPort$(this,$._globalState().get$currentContext().get$id());},
 _ReceivePortImpl$0: function(){$._globalState().get$currentContext().register$2(this._id,this);}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x){},
 visitList$1: function(list){var t1=this._visited;if(!($.index(t1,list)==null))return;$.indexSet(t1,list,true);$.forEach(list,new $._PendingSendPortFinder_visitList_anon(this));},
 visitMap$1: function(map){var t1=this._visited;if(!($.index(t1,map)==null))return;$.indexSet(t1,map,true);$.forEach(map.getValues$0(),new $._PendingSendPortFinder_visitMap_anon(this));},
 visitSendPort$1: function(port){if(!!port.is$_BufferingSendPort&&port._port==null)this.ports.push(port.get$_futurePort());},
 _PendingSendPortFinder$0: function(){this._visited=$._JsVisitedMap$();}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 "super": "_Serializer",
 visitSendPort$1: function(x){if(typeof x==='object'&&x!==null&&!!x.is$_NativeJsSendPort)return this.visitNativeJsSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_WorkerSendPort)return this.visitWorkerSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_BufferingSendPort)return this.visitBufferingSendPort$1(x);throw $.$$throw('Illegal underlying port '+$.S(x));},
 visitNativeJsSendPort$1: function(port){return ['sendport',$._globalState().get$currentManagerId(),port._isolateId,port._receivePort.get$_id()];},
 visitWorkerSendPort$1: function(port){return ['sendport',port._workerId,port._isolateId,port._receivePortId];},
 visitBufferingSendPort$1: function(port){var t1=port._port;if(!(t1==null))return this.visitSendPort$1(t1);else throw $.$$throw('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');},
 _JsSerializer$0: function(){this._visited=$._JsVisitedMap$();}
};

$$._JsCopier = {"":
 ["_visited"],
 "super": "_Copier",
 visitSendPort$1: function(x){if(typeof x==='object'&&x!==null&&!!x.is$_NativeJsSendPort)return this.visitNativeJsSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_WorkerSendPort)return this.visitWorkerSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_BufferingSendPort)return this.visitBufferingSendPort$1(x);throw $.$$throw('Illegal underlying port '+$.S(this.get$p()));},
 visitNativeJsSendPort$1: function(port){return $._NativeJsSendPort$(port._receivePort,port._isolateId);},
 visitWorkerSendPort$1: function(port){return $._WorkerSendPort$(port._workerId,port._isolateId,port._receivePortId);},
 visitBufferingSendPort$1: function(port){var t1=port._port;if(!(t1==null))return this.visitSendPort$1(t1);else throw $.$$throw('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');},
 _JsCopier$0: function(){this._visited=$._JsVisitedMap$();}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 "super": "_Deserializer",
 deserializeSendPort$1: function(x){var managerId=$.index(x,1);var isolateId=$.index(x,2);var receivePortId=$.index(x,3);if($.eqB(managerId,$._globalState().get$currentManagerId())){var isolate=$.index($._globalState().get$isolates(),isolateId);if(isolate==null)return;return $._NativeJsSendPort$(isolate.lookup$1(receivePortId),isolateId);}else return $._WorkerSendPort$(managerId,isolateId,receivePortId);}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 "super": "Object",
 operator$index$1: function(object){return this._getAttachedInfo$1(object);},
 operator$indexSet$2: function(object,info){$.add$1(this.tagged,object);this._setAttachedInfo$2(object,info);},
 reset$0: function(){this.tagged=$.ListImplementation_List(null);},
 cleanup$0: function(){var length$=$.get$length(this.tagged);if(typeof length$!=='number')return this.cleanup$0$bailout(1,length$);var i=0;for(;i<length$;++i)this._clearAttachedInfo$1($.index(this.tagged,i));this.tagged=null;},
 cleanup$0$bailout: function(state,length$){var i=0;for(;$.ltB(i,length$);++i)this._clearAttachedInfo$1($.index(this.tagged,i));this.tagged=null;},
 _clearAttachedInfo$1: function(o){o['__MessageTraverser__attached_info__'] = (void 0);},
 _setAttachedInfo$2: function(o,info){o['__MessageTraverser__attached_info__'] = info;},
 _getAttachedInfo$1: function(o){return o['__MessageTraverser__attached_info__'];}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 "super": "Object",
 operator$index$1: function(object){return;},
 operator$indexSet$2: function(object,info){},
 reset$0: function(){},
 cleanup$0: function(){}
};

$$._MessageTraverser = {"":
 [],
 "super": "Object",
 traverse$1: function(x){if($._MessageTraverser_isPrimitive(x))return this.visitPrimitive$1(x);var t1=this._visited;t1.reset$0();var result=null;try{result=this._dispatch$1(x);}finally{t1.cleanup$0();}return result;},
 _dispatch$1: function(x){if($._MessageTraverser_isPrimitive(x))return this.visitPrimitive$1(x);if(typeof x==='object'&&x!==null&&(x.constructor===Array||x.is$List()))return this.visitList$1(x);if(typeof x==='object'&&x!==null&&x.is$Map())return this.visitMap$1(x);if(typeof x==='object'&&x!==null&&!!x.is$SendPort)return this.visitSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$SendPortSync)return this.visitSendPortSync$1(x);return this.visitObject$1(x);},
 visitObject$1: function(x){throw $.$$throw('Message serialization: Illegal value '+$.S(x)+' passed');}
};

$$._Copier = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x){return x;},
 visitList$1: function(list){if(typeof list!=='object'||list===null||list.constructor!==Array&&!list.is$JavaScriptIndexingBehavior())return this.visitList$1$bailout(1,list);var t1=this._visited;var copy=t1.operator$index$1(list);if(!(copy==null))return copy;var len=list.length;copy=$.ListImplementation_List(len);t1.operator$indexSet$2(list,copy);for(var i=0;i<len;++i){if(i<0||i>=list.length)throw $.ioore(i);t1=this._dispatch$1(list[i]);if(i<0||i>=copy.length)throw $.ioore(i);copy[i]=t1;}return copy;},
 visitList$1$bailout: function(state,list){var t1=this._visited;var copy=$.index(t1,list);if(!(copy==null))return copy;var len=$.get$length(list);copy=$.ListImplementation_List(len);$.indexSet(t1,list,copy);for(var i=0;$.ltB(i,len);++i){t1=this._dispatch$1($.index(list,i));if(i<0||i>=copy.length)throw $.ioore(i);copy[i]=t1;}return copy;},
 visitMap$1: function(map){var t1={};var t2=this._visited;t1.copy_10=$.index(t2,map);var t3=t1.copy_10;if(!(t3==null))return t3;t1.copy_10=$.HashMapImplementation$();$.indexSet(t2,map,t1.copy_10);map.forEach$1(new $._Copier_visitMap_anon(this,t1));return t1.copy_10;}
};

$$._Serializer = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x){return x;},
 visitList$1: function(list){var t1=this._visited;var copyId=$.index(t1,list);if(!(copyId==null))return ['ref',copyId];var id=this._nextFreeRefId;this._nextFreeRefId=id+1;$.indexSet(t1,list,id);return ['list',id,this._serializeList$1(list)];},
 visitMap$1: function(map){var t1=this._visited;var copyId=$.index(t1,map);if(!(copyId==null))return ['ref',copyId];var id=this._nextFreeRefId;this._nextFreeRefId=id+1;$.indexSet(t1,map,id);return ['map',id,this._serializeList$1(map.getKeys$0()),this._serializeList$1(map.getValues$0())];},
 _serializeList$1: function(list){if(typeof list!=='string'&&(typeof list!=='object'||list===null||list.constructor!==Array&&!list.is$JavaScriptIndexingBehavior()))return this._serializeList$1$bailout(1,list);var len=list.length;var result=$.ListImplementation_List(len);for(var i=0;i<len;++i){if(i<0||i>=list.length)throw $.ioore(i);var t1=this._dispatch$1(list[i]);if(i<0||i>=result.length)throw $.ioore(i);result[i]=t1;}return result;},
 _serializeList$1$bailout: function(state,list){var len=$.get$length(list);var result=$.ListImplementation_List(len);for(var i=0;$.ltB(i,len);++i){var t1=this._dispatch$1($.index(list,i));if(i<0||i>=result.length)throw $.ioore(i);result[i]=t1;}return result;}
};

$$._Deserializer = {"":
 [],
 "super": "Object",
 deserialize$1: function(x){if($._Deserializer_isPrimitive(x))return x;this._deserialized=$.HashMapImplementation$();return this._deserializeHelper$1(x);},
 _deserializeHelper$1: function(x){if($._Deserializer_isPrimitive(x))return x;switch($.index(x,0)){case 'ref':return this._deserializeRef$1(x);case 'list':return this._deserializeList$1(x);case 'map':return this._deserializeMap$1(x);case 'sendport':return this.deserializeSendPort$1(x);default:return this.deserializeObject$1(x);}},
 _deserializeRef$1: function(x){var id=$.index(x,1);return $.index(this._deserialized,id);},
 _deserializeList$1: function(x){var id=$.index(x,1);var dartList=$.index(x,2);if(typeof dartList!=='object'||dartList===null||(dartList.constructor!==Array||!!dartList.immutable$list)&&!dartList.is$JavaScriptIndexingBehavior())return this._deserializeList$1$bailout(1,dartList,id);$.indexSet(this._deserialized,id,dartList);var len=dartList.length;for(var i=0;i<len;++i){if(i<0||i>=dartList.length)throw $.ioore(i);var t1=this._deserializeHelper$1(dartList[i]);if(i<0||i>=dartList.length)throw $.ioore(i);dartList[i]=t1;}return dartList;},
 _deserializeList$1$bailout: function(state,dartList,id){$.indexSet(this._deserialized,id,dartList);var len=$.get$length(dartList);for(var i=0;$.ltB(i,len);++i)$.indexSet(dartList,i,this._deserializeHelper$1($.index(dartList,i)));return dartList;},
 _deserializeMap$1: function(x){var result=$.HashMapImplementation$();var id=$.index(x,1);$.indexSet(this._deserialized,id,result);var keys=$.index(x,2);if(typeof keys!=='string'&&(typeof keys!=='object'||keys===null||keys.constructor!==Array&&!keys.is$JavaScriptIndexingBehavior()))return this._deserializeMap$1$bailout(1,x,result,keys);var values=$.index(x,3);if(typeof values!=='string'&&(typeof values!=='object'||values===null||values.constructor!==Array&&!values.is$JavaScriptIndexingBehavior()))return this._deserializeMap$1$bailout(2,values,result,keys);var len=keys.length;for(var i=0;i<len;++i){if(i<0||i>=keys.length)throw $.ioore(i);var key=this._deserializeHelper$1(keys[i]);if(i<0||i>=values.length)throw $.ioore(i);result.operator$indexSet$2(key,this._deserializeHelper$1(values[i]));}return result;},
 _deserializeMap$1$bailout: function(state,env0,env1,env2){switch(state){case 1:var x=env0;result=env1;keys=env2;break;case 2:values=env0;result=env1;keys=env2;break;}switch(state){case 0:var result=$.HashMapImplementation$();var id=$.index(x,1);$.indexSet(this._deserialized,id,result);var keys=$.index(x,2);case 1:state=0;var values=$.index(x,3);case 2:state=0;var len=$.get$length(keys);for(var i=0;$.ltB(i,len);++i)result.operator$indexSet$2(this._deserializeHelper$1($.index(keys,i)),this._deserializeHelper$1($.index(values,i)));return result;}},
 deserializeObject$1: function(x){throw $.$$throw('Unexpected serialized object');}
};

$$._Timer = {"":
 ["_once", "_handle"],
 "super": "Object",
 _Timer$repeating$2: function(milliSeconds,callback){this._handle=$._window().setInterval$2(new $.anon0(this,callback),milliSeconds);},
 _Timer$2: function(milliSeconds,callback){this._handle=$._window().setTimeout$2(new $.anon(this,callback),milliSeconds);}
};

$$.DisposableImpl = {"":
 [],
 "super": "Object"
};

$$.GlobalId = {"":
 ["id?", "_hashCode"],
 "super": "Object",
 hashCode$0: function(){return this._hashCode;},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(other.get$id(),this.id);}
};

$$.Tuple = {"":
 ["Item1?", "Item2?"],
 "super": "Object",
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this.Item1,other.get$Item1())&&$.eqB(this.Item2,other.get$Item2());},
 toString$0: function(){return 'Tuple: Item1: '+$.S(this.Item1)+', Item2: '+$.S(this.Item2);}
};

$$.NullArgumentException = {"":
 ["theArg", "_arg"],
 "super": "IllegalArgumentException",
 toString$0: function(){return 'Null argument(s): '+$.S(this.theArg);}
};

$$.DetailedIllegalArgumentException = {"":
 ["argument", "message?", "_arg"],
 "super": "IllegalArgumentException",
 toString$0: function(){var t1=this.message;var t2=t1==null||$.eqB($.get$length(t1),0);var t3=this.argument;if(t2)return 'Illegal argument: '+$.S(t3);else return 'Illegal argument: '+$.S(t3)+' -- '+$.S(t1);}
};

$$.Enumerable = {"":
 [],
 "super": "Object",
 iterator$0: function(){throw $.$$throw($.CTC20);},
 join$1: function(separator){var sb=$.StringBufferImpl$('');for(var t1=$.iterator(this);t1.hasNext$0()===true;){var t2=t1.next$0();if($.gtB($.get$length(sb),0))sb.add$1(separator);sb.add$1(t2);}return sb.toString$0();},
 join$0: function() {
  return this.join$1(', ')
},
 select$1: function(f){$.requireArgumentNotNull(f,'f');return $._FuncEnumerable$(this,new $.Enumerable_select_anon(this,f));},
 firstOrDefault$2: function(f,defaultValue){if(f==null)f=new $.Enumerable_firstOrDefault_anon();var iter=$._WhereIterator$(this.iterator$0(),f,$.getRuntimeTypeInfo(this).T);if(iter.hasNext$0()!==true)return defaultValue;return iter.next$0();},
 firstOrDefault$1: function(f) {
  return this.firstOrDefault$2(f,null)
},
 forEach$1: function(f){for(var t1=$.iterator(this);t1.hasNext$0()===true;)f.call$1(t1.next$0());},
 toList$0: function(){return $.ListImplementation_List$from(this,$.getRuntimeTypeInfo(this).T);},
 toString$0: function(){return '['+$.S(this.join$0())+']';},
 is$Enumerable: true
};

$$._SimpleEnumerable = {"":
 ["_source"],
 "super": "Enumerable",
 iterator$0: function(){return $.iterator(this._source);}
};

$$._FuncEnumerable = {"":
 ["_source", "_func"],
 "super": "Enumerable",
 _func$1: function(arg0) { return this._func.call$1(arg0); },
 iterator$0: function(){return this._func$1($.iterator(this._source));}
};

$$._SelectIterator = {"":
 ["_source", "_func"],
 "super": "Object",
 _func$1: function(arg0) { return this._func.call$1(arg0); },
 hasNext$0: function(){return this._source.hasNext$0();},
 next$0: function(){return this._func$1(this._source.next$0());}
};

$$._WhereIterator = {"":
 ["_source", "_func", "_next=", "_current"],
 "super": "Object",
 _func$1: function(arg0) { return this._func.call$1(arg0); },
 hasNext$0: function(){if(this._next==null){this._next=false;for(var t1=this._source;t1.hasNext$0()===true;){this._current=t1.next$0();if(this._func$1(this._current)===true){this._next=true;break;}}}return this._next;},
 next$0: function(){if(this.hasNext$0()!==true)throw $.$$throw($.CTC12);this._next=null;return this._current;}
};

$$.NoneHashMap = {"":
 ["_lib3_values"],
 "super": "Object",
 putIfAbsent$2: function(key,ifAbsent){for(var t1=this._lib3_values,t2=$.iterator(t1);t2.hasNext$0()===true;){var t3=t2.next$0();if($.eqB(t3.get$Item1(),key))return t3.get$Item2();}var t=$.Tuple$(key,ifAbsent.call$0());t1.push(t);return t.Item2;},
 getKeys$0: function(){return $.$$(this._lib3_values).select$1(new $.NoneHashMap_getKeys_anon()).toList$0();},
 getValues$0: function(){return $.$$(this._lib3_values).select$1(new $.NoneHashMap_getValues_anon()).toList$0();},
 get$length: function(){return this._lib3_values.length;},
 forEach$1: function(f){for(var t1=$.iterator(this._lib3_values);t1.hasNext$0()===true;){var t2=t1.next$0();f.call$2(t2.get$Item1(),t2.get$Item2());}},
 containsKey$1: function(key){for(var t1=$.iterator(this._lib3_values);t1.hasNext$0()===true;)if($.eqB(t1.next$0().get$Item1(),key))return true;return false;},
 operator$index$1: function(key){for(var t1=$.iterator(this._lib3_values);t1.hasNext$0()===true;){var t2=t1.next$0();if($.eqB(t2.get$Item1(),key))return t2.get$Item2();}return;},
 operator$indexSet$2: function(key,value){var newT=$.Tuple$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V);for(var t1=this._lib3_values,i=0;i<t1.length;++i){if(i<0||i>=t1.length)throw $.ioore(i);if($.eqB(t1[i].get$Item1(),key)){if(i<0||i>=t1.length)throw $.ioore(i);t1[i]=newT;return;}}t1.push(newT);},
 remove$1: function(key){for(var t1=this._lib3_values,i=0;i<t1.length;++i){if(i<0||i>=t1.length)throw $.ioore(i);if($.eqB(t1[i].get$Item1(),key)){if(i<0||i>=t1.length)throw $.ioore(i);var t=t1[i];$.removeRange(t1,i,1);return t.get$Item2();}}return;},
 clear$0: function(){throw $.$$throw('not impled');},
 isEmpty$0: function(){throw $.$$throw('not impled');},
 toString$0: function(){return $.Maps_mapToString(this);},
 is$Map: function() { return true; }
};

$$.EventHandle = {"":
 ["_handlers?", "_disposed"],
 "super": "DisposableImpl",
 fireEvent$1: function(args){var t1=this._handlers;if(!(t1==null))$.forEach(t1,new $.EventHandle_fireEvent_anon(args));},
 add$1: function(handler){var id=$.GlobalId_GlobalId();if(this._handlers==null)this._handlers=$.HashMapImplementation$('GlobalId','Action1<T>');$.indexSet(this._handlers,id,handler);return id;},
 remove$1: function(id){var t1=this._handlers;if(!(t1==null))return !(t1.remove$1(id)==null);else return false;}
};

$$.EventArgs = {"":
 [],
 "super": "Object"
};

$$.Size = {"":
 ["width?", "height?"],
 "super": "Object",
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this.width,other.get$width())&&$.eqB(this.height,other.get$height());},
 get$area: function(){return $.mul(this.width,this.height);},
 isEmpty$0: function(){return $.eq(this.get$area(),0);},
 get$isValid: function(){var t1=this.width;if($.isValidNumber(t1)){var t2=this.height;t1=$.isValidNumber(t2)&&$.geB(t1,0)&&$.geB(t2,0);}else t1=false;return t1;},
 scale$1: function(magnitude){return $.Size$($.mul(this.width,magnitude),$.mul(this.height,magnitude));},
 operator$mul$1: function(magnitude){return this.scale$1(magnitude);},
 toString$0: function(){return '('+$.S(this.width)+' x '+$.S(this.height)+')';}
};

$$.Coordinate = {"":
 ["x?", "y?"],
 "super": "Object",
 get$isValid: function(){return $.isValidNumber(this.x)&&$.isValidNumber(this.y);},
 operator$sub$1: function(other){return $.Coordinate_difference(this,other);},
 operator$add$1: function(other){return $.Coordinate$($.add(this.x,other.get$x()),$.add(this.y,other.get$y()));},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this.x,other.get$x())&&$.eqB(this.y,other.get$y());},
 toString$0: function(){return '{x:'+$.S(this.x)+', y:'+$.S(this.y)+'}';}
};

$$.Vector = {"":
 ["x", "y"],
 "super": "Coordinate",
 get$length: function(){var t1=this.x;t1=$.mul(t1,t1);var t2=this.y;return $.sqrt($.add(t1,$.mul(t2,t2)));},
 operator$add$1: function(other){return $.Vector$($.add(this.x,other.get$x()),$.add(this.y,other.get$y()));},
 operator$mul$1: function(magnitude){return this.scale$1(magnitude);},
 scale$1: function(magnitude){return $.Vector$($.mul(this.x,magnitude),$.mul(this.y,magnitude));}
};

$$.Rect = {"":
 ["left?", "top?", "width?", "height?"],
 "super": "Object",
 get$topLeft: function(){return $.Coordinate$(this.left,this.top);},
 get$size: function(){return $.Size$(this.width,this.height);},
 get$isValid: function(){return this.get$topLeft().get$isValid()===true&&this.get$size().get$isValid()===true;},
 contains$1: function(point){var t1=point.get$x();var t2=this.left;if($.geB(t1,t2))if($.leB(point.get$x(),$.add(t2,this.width))){t1=point.get$y();t2=this.top;t1=$.geB(t1,t2)&&$.leB(point.get$y(),$.add(t2,this.height));}else t1=false;else t1=false;return t1;},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(other.get$left(),this.left)&&$.eqB(other.get$top(),this.top)&&$.eqB(other.get$width(),this.width)&&$.eqB(other.get$height(),this.height);},
 toString$0: function(){return 'Location: '+$.S(this.get$topLeft())+', Size: '+$.S(this.get$size());},
 hashCode$0: function(){return $.Util_getHashCode([this.left,this.top,this.width,this.height]);}
};

$$.AffineTransform = {"":
 ["_m00?", "_m10?", "_m01?", "_m11?", "_m02?", "_m12?"],
 "super": "Object",
 get$scaleX: function(){return this._m00;},
 get$scaleY: function(){return this._m11;},
 get$translateX: function(){return this._m02;},
 get$translateY: function(){return this._m12;},
 get$shearX: function(){return this._m01;},
 get$shearY: function(){return this._m10;},
 get$determinant: function(){return $.sub($.mul(this._m00,this._m11),$.mul(this._m01,this._m10));},
 concatenate$1: function(tx){var m0=this._m00;var m1=this._m01;this._m00=$.add($.mul(tx.get$_m00(),m0),$.mul(tx.get$_m10(),m1));this._m01=$.add($.mul(tx.get$_m01(),m0),$.mul(tx.get$_m11(),m1));this._m02=$.add(this._m02,$.add($.mul(tx.get$_m02(),m0),$.mul(tx.get$_m12(),m1)));var m00=this._m10;var m10=this._m11;this._m10=$.add($.mul(tx.get$_m00(),m00),$.mul(tx.get$_m10(),m10));this._m11=$.add($.mul(tx.get$_m01(),m00),$.mul(tx.get$_m11(),m10));this._m12=$.add(this._m12,$.add($.mul(tx.get$_m02(),m00),$.mul(tx.get$_m12(),m10)));return this;},
 get$concatenate: function() { return new $.BoundClosure(this, 'concatenate$1'); },
 translate$2: function(dx,dy){this._m02=$.add(this._m02,$.add($.mul(dx,this._m00),$.mul(dy,this._m01)));this._m12=$.add(this._m12,$.add($.mul(dx,this._m10),$.mul(dy,this._m11)));return this;},
 setToTranslation$2: function(dx,dy){return this.setTransform$6(1,0,0,1,dx,dy);},
 setTransform$6: function(m00,m10,m01,m11,m02,m12){this._m00=m00;this._m10=m10;this._m01=m01;this._m11=m11;this._m02=m02;this._m12=m12;return this;},
 transformCoordinate$1: function(point){return $.Coordinate$($.add($.add($.mul(point.get$x(),this._m00),$.mul(point.get$y(),this._m01)),this._m02),$.add($.add($.mul(point.get$x(),this._m10),$.mul(point.get$y(),this._m11)),this._m12));},
 createInverse$0: function(){var det=this.get$determinant();return $.AffineTransform$($.div(this._m11,det),$.div($.neg(this._m10),det),$.div($.neg(this._m01),det),$.div(this._m00,det),$.div($.sub($.mul(this._m01,this._m12),$.mul(this._m11,this._m02)),det),$.div($.sub($.mul(this._m10,this._m02),$.mul(this._m00,this._m12)),det));},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this._m00,other.get$_m00())&&$.eqB(this._m01,other.get$_m01())&&$.eqB(this._m02,other.get$_m02())&&$.eqB(this._m10,other.get$_m10())&&$.eqB(this._m11,other.get$_m11())&&$.eqB(this._m12,other.get$_m12());},
 toString$0: function(){return $.Strings_join($.$$([this.get$translateX(),this.get$translateY(),this.get$scaleX(),this.get$scaleY(),this.get$shearX(),this.get$shearY()]).select$1(new $.AffineTransform_toString_anon()).toList$0(),', ');}
};

$$.Attachable = {"":
 ["name?"],
 "super": "Object"
};

$$.AttachableObjectImpl = {"":
 ["propertyValues?"],
 "super": "DisposableImpl"
};

$$.PropertyValues = {"":
 ["_propertyValues", "_changeHandle", "_disposed"],
 "super": "DisposableImpl",
 _set$2: function(key,value){$.indexSet(this._propertyValues,key,value);this._changeHandle.fireEvent$1(key);},
 get$_set: function() { return new $.BoundClosure0(this, '_set$2'); },
 _isSet$1: function(key){return this._propertyValues.containsKey$1(key);},
 _remove$1: function(key){if(this._isSet$1(key)===true){this._propertyValues.remove$1(key);this._changeHandle.fireEvent$1(key);}},
 get$propertyChanged: function(){return this._changeHandle;},
 _getValueOrUndefined$3: function(key,obj,ifAbsent){if(this._isSet$1(key)===true)return $.index(this._propertyValues,key);else if(!(ifAbsent==null)){var value=ifAbsent.call$1(obj);this._set$2(key,value);return value;}else return $.CTC22;}
};

$$.Property = {"":
 ["defaultValue", "name"],
 "super": "Attachable",
 get$2: function(obj,ifAbsent){var coreValue=this.getCore$2(obj,ifAbsent);if(!(coreValue===$.CTC22))return coreValue;else return this.defaultValue;},
 get$1: function(obj) {
  return this.get$2(obj,null)
},
 getCore$2: function(obj,ifAbsent){return obj.get$propertyValues()._getValueOrUndefined$3(this,obj,ifAbsent);},
 set$2: function(obj,value){obj.get$propertyValues()._set$2(this,value);},
 clear$1: function(obj){obj.get$propertyValues()._remove$1(this);},
 toString$0: function(){return 'Property \''+$.S(this.name)+'\'';}
};

$$._UndefinedValue = {"":
 [],
 "super": "Object"
};

$$.AttachedEvent = {"":
 ["name"],
 "super": "Attachable",
 addHandler$2: function(obj,handler){return $._AttachableEventHelper_addHandler(obj,this,handler);},
 fireEvent$2: function(obj,args){$._AttachableEventHelper_fireEvent(obj,this,args);}
};

$$._AttachableEventHelper = {"":
 ["_handlers?", "_propertyChangeHandleId"],
 "super": "Object"
};

$$.PElement = {"":
 [],
 "super": "AttachableObjectImpl",
 clip$0: function() { return this.clip.call$0(); },
 get$width: function(){return this._width;},
 set$width: function(value){this._width=value;this.invalidateDraw$0();},
 get$height: function(){return this._height;},
 set$height: function(value){this._height=value;this.invalidateDraw$0();},
 get$size: function(){return $.Size$(this._width,this._height);},
 get$visualChildCount: function(){return 0;},
 getTransform$0: function(){var tx=$.AffineTransform$(1,0,0,1,0,0);$.forEach(this._transforms,tx.get$concatenate());return tx;},
 draw$1: function(ctx){this.update$0();var dirty=this._lastDrawSize==null;this.drawCore$1(ctx);return dirty;},
 update$0: function(){this._updatedEventHandle.fireEvent$1($.CTC25);},
 drawCore$1: function(ctx){if(this.cacheEnabled===true)this._drawCached$1(ctx);else this._drawNormal$1(ctx);},
 addTransform$0: function(){var tx=$.AffineTransform$(1,0,0,1,0,0);this._transforms.push(tx);return tx;},
 invalidateDraw$0: function(){if(!(this._lastDrawSize==null)){this._lastDrawSize=null;this._invalidateParent$0();}},
 getVisualChild$1: function(index){throw $.$$throw('no children for this type');},
 registerParent$1: function(parent$){this._lib2_parent=parent$;},
 _drawCached$1: function(ctx){var t1=this._cacheCanvas;if(t1==null||!$.eqB($.CanvasUtil_getCanvasSize(t1),this._lastDrawSize)){if(this._cacheCanvas==null)this._cacheCanvas=$._Elements_CanvasElement(null,null);t1=this.get$width();this._cacheCanvas.set$width(t1);t1=this.get$height();this._cacheCanvas.set$height(t1);this._drawInternal$1(this._cacheCanvas.get$context2d());}ctx.save$0();$.CanvasUtil_transform(ctx,this.getTransform$0());ctx.drawImage$3(this._cacheCanvas,0,0);ctx.restore$0();},
 _drawNormal$1: function(ctx){var tx=this.getTransform$0();if(this._isClipped$2(tx,ctx)===true)return;ctx.save$0();$.CanvasUtil_transform(ctx,tx);if(this.clip===true){ctx.beginPath$0();ctx.rect$4(0,0,this.get$width(),this.get$height());ctx.clip$0();}this._drawInternal$1(ctx);ctx.restore$0();},
 _drawInternal$1: function(ctx){var t1=this._alpha;if(!(t1==null))ctx.set$globalAlpha(t1);this.drawOverride$1(ctx);this._lastDrawSize=this.get$size();},
 _isClipped$2: function(tx,ctx){if(this.clip===true);return false;},
 _invalidateParent$0: function(){this._invalidatedEventHandle.fireEvent$1($.CTC25);this._lib2_parent.childInvalidated$1(this);}
};

$$.ElementParentImpl = {"":
 [],
 "super": "PElement",
 onChildrenChanged$0: function(){this.invalidateDraw$0();},
 childInvalidated$1: function(child){this.invalidateDraw$0();},
 update$0: function(){this._forEach$1(new $.ElementParentImpl_update_anon());$.PElement.prototype.update$0.call(this);},
 drawOverride$1: function(ctx){this._forEach$1(new $.ElementParentImpl_drawOverride_anon(ctx));},
 _forEach$1: function(f){var length$=this.get$visualChildCount();if(typeof length$!=='number')return this._forEach$1$bailout(1,f,length$);for(var i=0;i<length$;++i)f.call$1(this.getVisualChild$1(i));},
 _forEach$1$bailout: function(state,f,length$){for(var i=0;$.ltB(i,length$);++i)f.call$1(this.getVisualChild$1(i));}
};

$$.Panel = {"":
 [],
 "super": "ElementParentImpl",
 addElement$1: function(element){this.insertAt$2(element,this._children.length);},
 insertAt$2: function(element,index){if(index==null)index=0;element.registerParent$1(this);$.insertRange$3(this._children,index,1,element);$.CTC31.set$2(element,element.addTransform$0());this.onChildrenChanged$0();},
 getVisualChild$1: function(index){var t1=this._children;if(index!==(index|0))throw $.iae(index);if(index<0||index>=t1.length)throw $.ioore(index);return t1[index];},
 get$visualChildCount: function(){return this._children.length;},
 getChildTransform$1: function(child){return $.CTC31.get$1(child);},
 drawOverride$1: function(ctx){var t1=this.background;if(!(t1==null)){ctx.set$fillStyle(t1);ctx.fillRect$4(0,0,this.get$width(),this.get$height());}$.ElementParentImpl.prototype.drawOverride$1.call(this,ctx);}
};

$$.PCanvas = {"":
 ["_children", "background", "_transforms", "cacheEnabled", "_updatedEventHandle", "_invalidatedEventHandle", "_cacheCanvas", "_width", "_height", "_alpha", "_lastDrawSize", "clip", "_lib2_parent", "propertyValues", "_disposed"],
 "super": "Panel",
 setTopLeft$2: function(element,value){this.getChildTransform$1(element).setToTranslation$2(value.get$x(),value.get$y());},
 setCenter$2: function(element,value){this.setTopLeft$2(element,$.Coordinate_difference(value,$.Vector$($.div(element.get$width(),2),$.div(element.get$height(),2))));}
};

$$.Stage = {"":
 ["_canvas?", "_element?", "_invalidatedEventHandle", "_ctx", "propertyValues", "_disposed"],
 "super": "AttachableObjectImpl",
 get$rootElement: function(){return this._element;},
 draw$0: function(){var t1=this._ctx;var t2=t1==null;var t3=this._canvas;if(t2)this._ctx=t3.get$context2d();else t1.clearRect$4(0,0,t3.get$width(),t3.get$height());return this._element.draw$1(this._ctx);},
 childInvalidated$1: function(child){this._invalidatedEventHandle.fireEvent$1($.CTC25);},
 Stage$2: function(_canvas,_element){this._element.registerParent$1(this);}
};

$$.Shape = {"":
 ["_fillStyle", "shapeType", "_transforms", "cacheEnabled", "_updatedEventHandle", "_invalidatedEventHandle", "_cacheCanvas", "_width", "_height", "_alpha", "_lastDrawSize", "clip", "_lib2_parent", "propertyValues", "_disposed"],
 "super": "PElement",
 get$fillStyle: function(){return this._fillStyle;},
 set$fillStyle: function(value){this._fillStyle=value;this.invalidateDraw$0();},
 drawOverride$1: function(ctx){ctx.set$fillStyle(this._fillStyle);switch(this.shapeType){case $.CTC14:ctx.fillRect$4(0,0,this.get$size().get$width(),this.get$size().get$height());break;case $.CTC15:$.CanvasUtil_ellipse(ctx,0,0,this.get$width(),this.get$height());ctx.fill$0();break;default:throw $.$$throw('shape not known...');}},
 toString$0: function(){return 'Shape ['+$.S(this._fillStyle)+', '+$.S(this.shapeType.get$name())+']';}
};

$$.ShapeType = {"":
 ["name?"],
 "super": "Object"
};

$$.ClickManager = {"":
 ["_stage", "_mouseDownElement"],
 "super": "Object",
 _mouseMove$1: function(e){this._updateMouseLocation$1($.getMouseEventCoordinate(e));},
 get$_mouseMove: function() { return new $.BoundClosure(this, '_mouseMove$1'); },
 _mouseOut$1: function(e){this._updateMouseLocation$1(null);},
 get$_mouseOut: function() { return new $.BoundClosure(this, '_mouseOut$1'); },
 _mouseUp$1: function(e){if(!(this._mouseDownElement==null)){var upElement=$.$$(this._updateMouseLocation$1($.getMouseEventCoordinate(e))).firstOrDefault$1(new $.ClickManager__mouseUp_anon());if($.eqB(upElement,this._mouseDownElement))this._doClick$2(upElement,e);this._mouseDownElement=null;}},
 get$_mouseUp: function() { return new $.BoundClosure(this, '_mouseUp$1'); },
 _mouseDown$1: function(e){this._mouseDownElement=$.$$(this._updateMouseLocation$1($.getMouseEventCoordinate(e))).firstOrDefault$1(new $.ClickManager__mouseDown_anon());},
 get$_mouseDown: function() { return new $.BoundClosure(this, '_mouseDown$1'); },
 _updateMouseLocation$1: function(value){return $.Mouse_markMouseOver(this._stage,value);},
 _doClick$2: function(element,e){$.CTC23.fireEvent$2(element,$.ElementMouseEventArgs_ElementMouseEventArgs(element,e));},
 ClickManager$1: function(_stage){var t1=this._stage;$.add$1(t1.get$_canvas().get$on().get$mouseMove(),this.get$_mouseMove());$.add$1(t1.get$_canvas().get$on().get$mouseOut(),this.get$_mouseOut());$.add$1(t1.get$_canvas().get$on().get$mouseUp(),this.get$_mouseUp());$.add$1(t1.get$_canvas().get$on().get$mouseDown(),this.get$_mouseDown());}
};

$$.ElementMouseEventArgs = {"":
 ["element?", "shiftKey?"],
 "super": "EventArgs"
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 "super": "Closure",
 call$1: function(value){var t1=this.values_2;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.call$1$bailout(1,value,t1);var length$=t1.length;for(var i=0;i<length$;++i){if(i<0||i>=length$)throw $.ioore(i);var t2=t1[i];if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_3,null);return length$;},
 call$1$bailout: function(state,value,t1){var length$=$.get$length(t1);for(var i=0;$.ltB(i,length$);++i){var t2=$.index(t1,i);if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_3,null);return length$;}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 "super": "Closure",
 call$1: function(i){return $.index(this.copies_4,i);}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 "super": "Closure",
 call$2: function(i,x){$.indexSet(this.copies_5,i,x);}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 "super": "Closure",
 call$0: function(){}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["writeSlot_8", "findSlot_7", "readSlot_6"],
 "super": "Closure",
 call$1: function(e){var t1={};if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(typeof e==='object'&&e!==null&&!!e.is$Date)throw $.$$throw($.CTC3);if(typeof e==='object'&&e!==null&&!!e.is$RegExp)throw $.$$throw($.CTC4);if(typeof e==='object'&&e!==null&&e.is$_FileImpl())return e;if(typeof e==='object'&&e!==null&&e.is$File())throw $.$$throw($.CTC5);if(typeof e==='object'&&e!==null&&e.is$_BlobImpl())return e;if(typeof e==='object'&&e!==null&&e.is$Blob())throw $.$$throw($.CTC6);if(typeof e==='object'&&e!==null&&e.is$_FileListImpl())return e;if(typeof e==='object'&&e!==null&&e.is$FileList())throw $.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_ImageDataImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ImageData())throw $.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBuffer())throw $.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferViewImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBufferView())throw $.$$throw($.CTC9);if(typeof e==='object'&&e!==null&&e.is$Map()){var slot=this.findSlot_7.call$1(e);t1.copy_1=this.readSlot_6.call$1(slot);var t2=t1.copy_1;if(!(t2==null))return t2;t1.copy_1={};this.writeSlot_8.call$2(slot,t1.copy_1);e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this,t1));return t1.copy_1;}if(typeof e==='object'&&e!==null&&(e.constructor===Array||e.is$List())){if(typeof e!=='object'||e===null||(e.constructor!==Array||!!e.immutable$list)&&!e.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,e,0,0,0,0,0,0);var length$=e.length;slot=this.findSlot_7.call$1(e);t2=this.readSlot_6;var copy=t2.call$1(slot);if(!(copy==null)){if(true===copy){copy=new Array(length$);this.writeSlot_8.call$2(slot,copy);}return copy;}t1=e instanceof Array&&!!!(e.immutable$list);var t3=this.writeSlot_8;if(t1){t3.call$2(slot,true);for(var i=0;i<length$;++i){if(i<0||i>=e.length)throw $.ioore(i);var element=e[i];var elementCopy=this.call$1(element);if(!(elementCopy==null?element==null:elementCopy===element)){copy=t2.call$1(slot);if(true===copy){copy=new Array(length$);t3.call$2(slot,copy);}if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(2,copy,i,t3,e,length$,elementCopy,slot);for(var j=0;j<i;++j){if(j<0||j>=e.length)throw $.ioore(j);t1=e[j];if(j<0||j>=copy.length)throw $.ioore(j);copy[j]=t1;}if(i<0||i>=copy.length)throw $.ioore(i);copy[i]=elementCopy;++i;break;}}if(copy==null){t3.call$2(slot,e);copy=e;}}else{copy=new Array(length$);t3.call$2(slot,copy);i=0;}if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(3,e,copy,length$,i,0,0,0);for(;i<length$;++i){if(i<0||i>=e.length)throw $.ioore(i);t1=this.call$1(e[i]);if(i<0||i>=copy.length)throw $.ioore(i);copy[i]=t1;}return copy;}throw $.$$throw($.CTC10);},
 call$1$bailout: function(state,env0,env1,env2,env3,env4,env5,env6){switch(state){case 1:var e=env0;break;case 2:copy=env0;i=env1;t3=env2;e=env3;length$=env4;elementCopy=env5;slot=env6;break;case 3:e=env0;copy=env1;length$=env2;i=env3;break;}switch(state){case 0:var t1={};if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(typeof e==='object'&&e!==null&&!!e.is$Date)throw $.$$throw($.CTC3);if(typeof e==='object'&&e!==null&&!!e.is$RegExp)throw $.$$throw($.CTC4);if(typeof e==='object'&&e!==null&&e.is$_FileImpl())return e;if(typeof e==='object'&&e!==null&&e.is$File())throw $.$$throw($.CTC5);if(typeof e==='object'&&e!==null&&e.is$_BlobImpl())return e;if(typeof e==='object'&&e!==null&&e.is$Blob())throw $.$$throw($.CTC6);if(typeof e==='object'&&e!==null&&e.is$_FileListImpl())return e;if(typeof e==='object'&&e!==null&&e.is$FileList())throw $.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_ImageDataImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ImageData())throw $.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBuffer())throw $.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferViewImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBufferView())throw $.$$throw($.CTC9);if(typeof e==='object'&&e!==null&&e.is$Map()){var slot=this.findSlot_7.call$1(e);t1.copy_1=this.readSlot_6.call$1(slot);var t2=t1.copy_1;if(!(t2==null))return t2;t1.copy_1={};this.writeSlot_8.call$2(slot,t1.copy_1);e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this,t1));return t1.copy_1;}default:if(state===3||state===2||state===1||state===0&&typeof e==='object'&&e!==null&&(e.constructor===Array||e.is$List()))switch(state){case 0:case 1:state=0;var length$=$.get$length(e);slot=this.findSlot_7.call$1(e);t2=this.readSlot_6;var copy=t2.call$1(slot);if(!(copy==null)){if(true===copy){copy=new Array(length$);this.writeSlot_8.call$2(slot,copy);}return copy;}t1=e instanceof Array&&!!!(e.immutable$list);var t3=this.writeSlot_8;case 2:if(state===2||state===0&&t1)switch(state){case 0:t3.call$2(slot,true);var i=0;case 2:L0:while(true)switch(state){case 0:if(!$.ltB(i,length$))break L0;var element=$.index(e,i);var elementCopy=this.call$1(element);case 2:if(state===2||state===0&&!(elementCopy==null?element==null:elementCopy===element))switch(state){case 0:copy=t2.call$1(slot);if(true===copy){copy=new Array(length$);t3.call$2(slot,copy);}case 2:state=0;for(var j=0;j<i;++j)$.indexSet(copy,j,$.index(e,j));$.indexSet(copy,i,elementCopy);++i;break L0;}++i;}if(copy==null){t3.call$2(slot,e);copy=e;}}else{copy=new Array(length$);t3.call$2(slot,copy);i=0;}case 3:state=0;for(;$.ltB(i,length$);++i)$.indexSet(copy,i,this.call$1($.index(e,i)));return copy;}throw $.$$throw($.CTC10);}}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 "super": "Closure",
 call$2: function(key,value){this.box_0.copy_1[key] = this.walk_9.call$1(value);}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 "super": "Closure",
 call$2: function(k,v){var t1=this.box_0;if(t1.first_1!==true)$.add$1(this.result_3,', ');t1.first_1=false;t1=this.result_3;var t2=this.visiting_2;$.Collections__emitObject(k,t1,t2);$.add$1(t1,': ');$.Collections__emitObject(v,t1,t2);}
};

$$.ClickDemo_ClickDemo_anon = {"":
 ["blue_0"],
 "super": "Closure",
 call$1: function(args){var t1=this.blue_0;t1.set$fillStyle($.eqB(t1.get$fillStyle(),'blue')?'lightblue':'blue');}
};

$$.ClickManager__mouseDown_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return $.CTC18.get$1(e);}
};

$$.Mouse_markMouseOver_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){$.CTC21.clear$1(e);$.CTC17.clear$1(e);}
};

$$.Mouse_markMouseOver_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(e){$.CTC21.set$2(e,true);}
};

$$.AffineTransform_toString_anon = {"":
 [],
 "super": "Closure",
 call$1: function(n){return $.toString(n);}
};

$$.Enumerable_select_anon = {"":
 ["this_1", "f_0"],
 "super": "Closure",
 call$1: function(s){return $._SelectIterator$(s,this.f_0,$.getRuntimeTypeInfo(this.this_1).T,'Object');}
};

$$.Enumerable_firstOrDefault_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return true;}
};

$$.ClickManager__mouseUp_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return $.CTC18.get$1(e);}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 "super": "Closure",
 call$0: function(){return this.closure_0.call$0();}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 "super": "Closure",
 call$0: function(){return this.closure_2.call$1(this.arg1_1);}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 "super": "Closure",
 call$0: function(){return this.closure_5.call$2(this.arg1_4,this.arg2_3);}
};

$$.ElementParentImpl_drawOverride_anon = {"":
 ["ctx_0"],
 "super": "Closure",
 call$1: function(e){return e.drawCore$1(this.ctx_0);}
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$0: function(){return $._ElementRectImpl$(this.this_0);}
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return $._completeMeasurementFutures();}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 "super": "Closure",
 call$1: function(value){var t1=this.values_0;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.call$1$bailout(1,value,t1);var length$=t1.length;for(var i=0;i<length$;++i){if(i<0||i>=length$)throw $.ioore(i);var t2=t1[i];if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_1,null);return length$;},
 call$1$bailout: function(state,value,t1){var length$=$.get$length(t1);for(var i=0;$.ltB(i,length$);++i){var t2=$.index(t1,i);if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_1,null);return length$;}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 "super": "Closure",
 call$1: function(i){return $.index(this.copies_2,i);}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 "super": "Closure",
 call$2: function(i,x){$.indexSet(this.copies_3,i,x);}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["writeSlot_6", "findSlot_5", "readSlot_4"],
 "super": "Closure",
 call$1: function(e){if(typeof e!=='object'||e===null||(e.constructor!==Array||!!e.immutable$list)&&!e.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,e,0,0);if(e instanceof Date)throw $.$$throw($.CTC3);if(e instanceof RegExp)throw $.$$throw($.CTC4);if($._isJavaScriptSimpleObject(e)){var slot=this.findSlot_5.call$1(e);var copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;copy=$.makeLiteralMap([]);if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(2,e,slot,copy);this.writeSlot_6.call$2(slot,copy);for(var t1=$.iterator(Object.keys(e));t1.hasNext$0()===true;){var t2=t1.next$0();var t3=this.call$1(e[t2]);if(t2!==(t2|0))throw $.iae(t2);if(t2<0||t2>=copy.length)throw $.ioore(t2);copy[t2]=t3;}return copy;}if(e instanceof Array){slot=this.findSlot_5.call$1(e);copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;this.writeSlot_6.call$2(slot,e);var length$=e.length;for(var i=0;i<length$;++i){if(i<0||i>=e.length)throw $.ioore(i);t1=this.call$1(e[i]);if(i<0||i>=e.length)throw $.ioore(i);e[i]=t1;}return e;}return e;},
 call$1$bailout: function(state,env0,env1,env2){switch(state){case 1:var e=env0;break;case 2:e=env0;slot=env1;copy=env2;break;}switch(state){case 0:case 1:state=0;if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(e instanceof Date)throw $.$$throw($.CTC3);if(e instanceof RegExp)throw $.$$throw($.CTC4);case 2:if(state===2||state===0&&$._isJavaScriptSimpleObject(e))switch(state){case 0:var slot=this.findSlot_5.call$1(e);var copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;copy=$.makeLiteralMap([]);case 2:state=0;this.writeSlot_6.call$2(slot,copy);for(var t1=$.iterator(Object.keys(e));t1.hasNext$0()===true;){var t2=t1.next$0();$.indexSet(copy,t2,this.call$1(e[t2]));}return copy;}if(e instanceof Array){slot=this.findSlot_5.call$1(e);copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;this.writeSlot_6.call$2(slot,e);var length$=$.get$length(e);for(var i=0;$.ltB(i,length$);++i)$.indexSet(e,i,this.call$1($.index(e,i)));return e;}return e;}}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element){var t1=this.box_0;t1.counter_1=$.add(t1.counter_1,1);}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$1: function(entry){this.f_0.call$2(entry.get$key(),entry.get$value());}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 "super": "Closure",
 call$1: function(object){if(object instanceof Date)return true;if(typeof object==='object'&&object!==null&&(object.constructor===Array||object.is$List())){if(typeof object!=='object'||object===null||object.constructor!==Array&&!object.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,object);for(var i=0;t1=object.length,i<t1;++i){if(i<0||i>=t1)throw $.ioore(i);if(this.call$1(object[i])===true)return true;}}return false;var t1;},
 call$1$bailout: function(state,env0){switch(state){case 1:var object=env0;break;}switch(state){case 0:if(object instanceof Date)return true;case 1:if(state===1||state===0&&typeof object==='object'&&object!==null&&(object.constructor===Array||object.is$List()))switch(state){case 0:case 1:state=0;for(var i=0;$.ltB(i,$.get$length(object));++i)if(this.call$1($.index(object,i))===true)return true;}return false;}}
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 "super": "Closure",
 call$0: function(){return $.CTC29;}
};

$$.ElementParentImpl_update_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return e.update$0();}
};

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 "super": "Closure",
 call$2: function(id,handler){handler.call$1(this.args_0);}
};

$$._AttachableEventHelper_addHandler_anon = {"":
 [],
 "super": "Closure",
 call$0: function(){return $.EventHandle$();}
};

$$._AttachableEventHelper_createInstance_anon = {"":
 ["obj_0"],
 "super": "Closure",
 call$1: function(property){$._AttachableEventHelper_fireEvent(this.obj_0,property,property);}
};

$$.startRootIsolate_anon = {"":
 [],
 "super": "Closure",
 call$0: function(){$._TimerFactory__factory=$._timerFactory;return;}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 "super": "Closure",
 call$2: function(value,ignoreReplyTo){this.port_1.close$0();var t1=typeof value==='object'&&value!==null&&!!value.is$Exception;var t2=this.completer_0;if(t1)t2.completeException$1(value);else t2.complete$1(value);}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 "super": "Closure",
 call$0: function(){var t1=this.this_2;var t2=this.replyTo_0;t1._checkReplyTo$1(t2);var workerMessage=$._serializeMessage($.makeLiteralMap(['command','message','port',t1,'msg',this.message_1,'replyTo',t2]));if($._globalState().get$isWorker()===true)$._globalState().get$mainManager().postMessage$1(workerMessage);else $.index($._globalState().get$managers(),t1.get$_workerId()).postMessage$1(workerMessage);}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 "super": "Closure",
 call$1: function(_){return this.callback_0.call$0();}
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 "super": "Closure",
 call$1: function(value){var t1=this.values_2;$.indexSet(t1,this.pos_4,value);var t2=this.box_0;var remaining=$.sub(t2.remaining_1,1);t2.remaining_1=remaining;if($.eqB(remaining,0)&&this.result_3.get$isComplete()!==true)this.completer_5.complete$1(t1);}
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 "super": "Closure",
 call$1: function(exception){if(this.result_6.get$isComplete()!==true)this.completer_7.completeException$2(exception,this.future_8.get$stackTrace());return true;}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e){return this.this_0._dispatch$1(e);}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e){return this.this_0._dispatch$1(e);}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 "super": "Closure",
 call$2: function(k,v){return $.add$1(this.values_0,v);}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry){var t1=this.list_2;var t2=this.box_0;var t3=t2.index_1;t2.index_1=$.add(t3,1);$.indexSet(t1,t3,entry.get$value());}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$2: function(key,value){var t1=this.list_2;var t2=this.box_0;var t3=t2.i_1;t2.i_1=$.add(t3,1);$.indexSet(t1,t3,value);}
};

$$.NoneHashMap_getValues_anon = {"":
 [],
 "super": "Closure",
 call$1: function(t){return t.get$Item2();}
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 "super": "Closure",
 call$0: function(){var t1={};var t2=this.this_5;var t3=this.replyTo_3;t2._checkReplyTo$1(t3);var isolate=$.index($._globalState().get$isolates(),t2.get$_isolateId());if(isolate==null)return;if(t2.get$_receivePort().get$_callback()==null)return;var shouldSerialize=!($._globalState().get$currentContext()==null)&&!$.eqB($._globalState().get$currentContext().get$id(),t2.get$_isolateId());var msg=this.message_4;t1.msg_1=msg;t1.reply_2=t3;if(shouldSerialize){t1.msg_1=$._serializeMessage(t1.msg_1);t1.reply_2=$._serializeMessage(t1.reply_2);}$._globalState().get$topEventLoop().enqueue$3(isolate,new $._NativeJsSendPort_send_anon0(t2,t1,shouldSerialize),'receive '+$.S(msg));}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 "super": "Closure",
 call$0: function(){var t1=this.this_7;if(!(t1.get$_receivePort().get$_callback()==null)){if(this.shouldSerialize_6===true){var t2=this.box_0;t2.msg_1=$._deserializeMessage(t2.msg_1);t2.reply_2=$._deserializeMessage(t2.reply_2);}t1=t1.get$_receivePort();t2=this.box_0;t1._callback$2(t2.msg_1,t2.reply_2);}}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 "super": "Closure",
 call$2: function(k,v){return $.add$1(this.keys_0,k);}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry){var t1=this.list_2;var t2=this.box_0;var t3=t2.index_10;t2.index_10=$.add(t3,1);$.indexSet(t1,t3,entry.get$key());}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$2: function(key,value){var t1=this.list_2;var t2=this.box_0;var t3=t2.i_10;t2.i_10=$.add(t3,1);$.indexSet(t1,t3,key);}
};

$$.NoneHashMap_getKeys_anon = {"":
 [],
 "super": "Closure",
 call$1: function(t){return t.get$Item1();}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 "super": "Closure",
 call$2: function(key,val){var t1=this.box_0.copy_10;var t2=this.this_2;$.indexSet(t1,t2._dispatch$1(key),t2._dispatch$1(val));}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 "super": "Closure",
 call$0: function(){if(this.this_0.runIteration$0()!==true)return;$._window().setTimeout$2(this,0);}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function(){return this.callback_0.call$1(this.this_1);}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function(){return this.callback_0.call$1(this.this_1);}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function(){return 'Closure';},
 is$Function: true
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.div$slow = function(a,b){if($.checkNumbers(a,b))return a / b;return a.operator$div$1(b);};

$.getMouseEventCoordinate = function(event$){return $.Coordinate$(event$.get$offsetX(),event$.get$offsetY());};

$.startsWith = function(receiver,other){$.checkString(other);var length$=other.length;if(length$>receiver.length)return false;return other == receiver.substring(0, length$);};

$._InputElementEventsImpl$ = function(_ptr){return new $._InputElementEventsImpl(_ptr);};

$._NativeJsSendPort$ = function(_receivePort,isolateId){return new $._NativeJsSendPort(_receivePort,isolateId);};

$.eqB = function(a,b){if(a == null)return b == null;if(b == null)return false;if(typeof a === "object")if(!!a.operator$eq$1)return a.operator$eq$1(b)===true;return a === b;};

$.FutureAlreadyCompleteException$ = function(){return new $.FutureAlreadyCompleteException();};

$.set$length = function(receiver,newLength){if($.isJsArray(receiver)){$.checkNull(newLength);if(!(typeof newLength==='number'&&Math.floor(newLength) === newLength))throw $.$$throw($.IllegalArgumentException$(newLength));if(newLength<0)throw $.$$throw($.IndexOutOfRangeException$(newLength));$.checkGrowable(receiver,'set length');receiver.length = newLength;}else receiver.set$length(newLength);return newLength;};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win,message,targetOrigin,messagePorts){    win.postMessage(message, targetOrigin, messagePorts);
};

$._Device_userAgent = function(){return $.window().get$navigator().get$userAgent();};

$.checkNum = function(value){if(!(typeof value==='number')){$.checkNull(value);throw $.$$throw($.IllegalArgumentException$(value));}return value;};

$.convertDartClosureToJS = function(closure,arity){if(closure==null)return;var function$=closure.$identity;if(!!function$)return function$;function$=function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };closure.$identity = function$;return function$;};

$._TextTrackListEventsImpl$ = function(_ptr){return new $._TextTrackListEventsImpl(_ptr);};

$.StackTrace$ = function(stack){return new $.StackTrace(stack);};

$.ObjectNotClosureException$ = function(){return new $.ObjectNotClosureException();};

$._MediaStreamTrackEventsImpl$ = function(_ptr){return new $._MediaStreamTrackEventsImpl(_ptr);};

$._JsVisitedMap$ = function(){return new $._JsVisitedMap(null);};

$.isJsArray = function(value){return !(value==null)&&value.constructor === Array;};

$.Primitives_objectTypeName = function(object){var name$=$.constructorNameFallback(object);if($.eqB(name$,'Object')){var decompiled=String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];if(typeof decompiled==='string')name$=decompiled;}return $.charCodeAt(name$,0)===36?$.substring$1(name$,1):name$;};

$.clear = function(receiver){if(!$.isJsArray(receiver))return receiver.clear$0();$.set$length(receiver,0);};

$._fillStatics = function(context){  $globals = context.isolateStatics;
  $static_init();
};

$.ListIterator$ = function(list,T){var t1=new $.ListIterator(0,list);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr){return new $._JavaScriptAudioNodeEventsImpl(_ptr);};

$.forEach = function(receiver,f){if(!$.isJsArray(receiver))return receiver.forEach$1(f);else return $.Collections_forEach(receiver,f);};

$.StackOverflowException$ = function(){return new $.StackOverflowException();};

$.Collections_forEach = function(iterable,f){for(var t1=$.iterator(iterable);t1.hasNext$0()===true;)f.call$1(t1.next$0());};

$.isEmpty = function(receiver){if(typeof receiver==='string'||$.isJsArray(receiver))return receiver.length === 0;return receiver.isEmpty$0();};

$.Size$ = function(width,height){return new $.Size(width,height);};

$._Collections_forEach = function(iterable,f){for(var t1=$.iterator(iterable);t1.hasNext$0()===true;)f.call$1(t1.next$0());};

$._DOMWindowCrossFrameImpl__close = function(win){win.close()};

$._IDBTransactionEventsImpl$ = function(_ptr){return new $._IDBTransactionEventsImpl(_ptr);};

$.dynamicFunction = function(name$){var f=Object.prototype[name$];if(!(f==null)&&!!f.methods)return f.methods;var methods={};var dartMethod=Object.getPrototypeOf($.CTC33)[name$];if(!(dartMethod==null))$.propertySet(methods,'Object',dartMethod);var bind=function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};bind.methods = methods;$.defineProperty(Object.prototype,name$,bind);return methods;};

$.ListImplementation_List$from = function(other,E){var result=$.ListImplementation_List(null);for(var t1=$.iterator(other);t1.hasNext$0()===true;)result.push(t1.next$0());return result;};

$._Timer$repeating = function(milliSeconds,callback){var t1=new $._Timer(false,null);t1._Timer$repeating$2(milliSeconds,callback);return t1;};

$._EventSourceEventsImpl$ = function(_ptr){return new $._EventSourceEventsImpl(_ptr);};

$.ElementMouseEventArgs$_internal = function(element,shiftKey){return new $.ElementMouseEventArgs(element,shiftKey);};

$._convertNativeToDart_AcceptStructuredClone = function(object){var values=[];var copies=[];var t1=new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies,values);var t2=new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies);return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies),t1,t2).call$1(object);};

$.buildDynamicMetadata = function(inputTable){var result=[];for(var i=0;i<inputTable.length;++i){var tag=inputTable[i][0];var array=inputTable[i];var tags=array[1];var set={};var tagNames=tags.split('|');for(var j=0,index=1;j<tagNames.length;++j){$.propertySet(set,tagNames[j],true);index=j;array=tagNames;}result.push($.MetaInfo$(tag,tags,set));}return result;};

$.ClickDemo_ClickDemo = function(canvas){var pCanvas=$.PCanvas$(200,200,false);pCanvas.background='yellow';var blue=$.Shape$(100,100,'blue',$.CTC14);$.ClickManager_setClickable(blue,true);$.ClickManager_addHandler(blue,new $.ClickDemo_ClickDemo_anon(blue));pCanvas.addElement$1(blue);var green=$.Shape$(70,70,'green',$.CTC14);pCanvas.addElement$1(green);pCanvas.setTopLeft$2(green,$.Coordinate$(110,15));var red=$.Shape$(40,40,'red',$.CTC15);pCanvas.addElement$1(red);pCanvas.setCenter$2(red,$.Coordinate$(50,150));pCanvas.addTransform$0().translate$2($.div($.sub(canvas.get$width(),pCanvas.get$width()),2),$.div($.sub(canvas.get$height(),pCanvas.get$height()),2));var rootPanel=$.PCanvas$(500,500,false);rootPanel.addElement$1(pCanvas);var stage=$.Stage$(canvas,rootPanel);return $.ClickDemo$_internal(canvas,stage,$.ClickManager$(stage));};

$.PCanvas$ = function(w,h,enableCache){return new $.PCanvas($.ListImplementation_List(null,'PElement'),null,$.ListImplementation_List(null,'AffineTransform'),enableCache,$.EventHandle$('EventArgs'),$.EventHandle$('EventArgs'),null,w,h,null,null,false,null,$.PropertyValues$(),false);};

$.ClickDemo$_internal = function(_canvas,_stage,_clickMan){return new $.ClickDemo(_canvas,_stage,_clickMan);};

$.ge$slow = function(a,b){if($.checkNumbers(a,b))return a >= b;return a.operator$ge$1(b);};

$._convertDartToNative_PrepareForStructuredClone = function(value){var values=[];var copies=[];var t1=new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies,values);var t2=new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);var t3=new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);var t4=new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();var copy=new $._convertDartToNative_PrepareForStructuredClone_walk(t3,t1,t2).call$1(value);t4.call$0();return copy;};

$.floor = function(receiver){return Math.floor(receiver);};

$._WebSocketEventsImpl$ = function(_ptr){return new $._WebSocketEventsImpl(_ptr);};

$.shr = function(a,b){if($.checkNumbers(a,b)){if(b<0)throw $.$$throw($.IllegalArgumentException$(b));if(a>0){if(b > 31)return 0;return a >>> b;}if(b>31)b=31;return (a >> b) >>> 0;}return a.operator$shr$1(b);};

$._convertDartToNative_SerializedScriptValue = function(value){return $._convertDartToNative_PrepareForStructuredClone(value);};

$._deserializeMessage = function(message){if($._globalState().get$needSerialization()===true)return $._JsDeserializer$().deserialize$1(message);else return message;};

$.indexSet$slow = function(a,index,value){if($.isJsArray(a)){if(!(typeof index==='number'&&Math.floor(index) === index))throw $.$$throw($.IllegalArgumentException$(index));if(index<0||$.geB(index,$.get$length(a)))throw $.$$throw($.IndexOutOfRangeException$(index));$.checkMutable(a,'indexed set');a[index] = value;return;}a.operator$indexSet$2(index,value);};

$.and = function(a,b){if($.checkNumbers(a,b))return (a & b) >>> 0;return a.operator$and$1(b);};

$._MediaStreamEventsImpl$ = function(_ptr){return new $._MediaStreamEventsImpl(_ptr);};

$.setRuntimeTypeInfo = function(target,typeInfo){if(!(target==null))target.builtin$typeInfo = typeInfo;};

$.hashCode = function(receiver){if(typeof receiver==='number')return receiver & 0x1FFFFFFF;if(!(typeof receiver==='string'))return receiver.hashCode$0();var length$=receiver.length;for(var hash=0,i=0;i<length$;++i){var hash0=536870911&hash+receiver.charCodeAt(i);var hash1=536870911&hash0+524287&hash0 << 10;hash1=(hash1^$.shr(hash1,6))>>>0;hash=hash1;}hash0=536870911&hash+67108863&hash << 3;hash0=(hash0^$.shr(hash0,11))>>>0;return 536870911&hash0+16383&hash0 << 15;};

$.FutureImpl_FutureImpl$immediate = function(value,T){var res=$.FutureImpl$();res._setValue$1(value);return res;};

$.mul$slow = function(a,b){if($.checkNumbers(a,b))return a * b;return a.operator$mul$1(b);};

$._waitForPendingPorts = function(message,callback){var finder=$._PendingSendPortFinder$();finder.traverse$1(message);$.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));};

$.gt = function(a,b){return typeof a==='number'&&typeof b==='number'?a > b:$.gt$slow(a,b);};

$._SimpleEnumerable$ = function(_source,T){var t1=new $._SimpleEnumerable(_source);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._IsolateContext$ = function(){var t1=new $._IsolateContext(null,null,null);t1._IsolateContext$0();return t1;};

$.charCodeAt = function(receiver,index){if(typeof receiver==='string'){if(index<0)throw $.$$throw($.IndexOutOfRangeException$(index));if(index>=receiver.length)throw $.$$throw($.IndexOutOfRangeException$(index));return receiver.charCodeAt(index);}else return receiver.charCodeAt$1(index);};

$.getTypeNameOf = function(obj){if($._getTypeNameOf==null)$._getTypeNameOf=$.getFunctionForTypeNameOf();return $._getTypeNameOf.call$1(obj);};

$.getFunctionForTypeNameOf = function(){if(!(typeof(navigator)==='object'))return $.typeNameInChrome;var userAgent=navigator.userAgent;if($.contains(userAgent,'Chrome')||$.contains(userAgent,'DumpRenderTree'))return $.typeNameInChrome;else if($.contains(userAgent,'Firefox'))return $.typeNameInFirefox;else if($.contains(userAgent,'MSIE'))return $.typeNameInIE;else if($.contains(userAgent,'Opera'))return $.typeNameInOpera;else if($.contains(userAgent,'Safari'))return $.typeNameInSafari;else return $.constructorNameFallback;};

$.removeRange = function(receiver,start,length$){if(!$.isJsArray(receiver))return receiver.removeRange$2(start,length$);$.checkGrowable(receiver,'removeRange');if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)throw $.$$throw($.IllegalArgumentException$(length$));var receiverLength=receiver.length;if(start<0||start>=receiverLength)throw $.$$throw($.IndexOutOfRangeException$(start));var t1=start+length$;if(t1>receiverLength)throw $.$$throw($.IndexOutOfRangeException$(t1));var t2=receiverLength-length$;$.Arrays_copy(receiver,t1,receiver,start,t2-start);$.set$length(receiver,t2);};

$.ListImplementation_List = function(length$,E){return $.Primitives_newList(length$);};

$.document = function(){return document;};

$.contains$1 = function(receiver,other){return $.contains$2(receiver,other,0);};

$.mul = function(a,b){return typeof a==='number'&&typeof b==='number'?a * b:$.mul$slow(a,b);};

$.isValidNumber = function(value){return !(value==null)&&$.isInfinite(value)!==true&&$.isNaN(value)!==true;};

$._browserPrefix = function(){if($._cachedBrowserPrefix==null)if($._Device_isFirefox()===true)$._cachedBrowserPrefix='-moz-';else if($._Device_isIE()===true)$._cachedBrowserPrefix='-ms-';else if($._Device_isOpera()===true)$._cachedBrowserPrefix='-o-';else $._cachedBrowserPrefix='-webkit-';return $._cachedBrowserPrefix;};

$._EventsImpl$ = function(_ptr){return new $._EventsImpl(_ptr);};

$._BodyElementEventsImpl$ = function(_ptr){return new $._BodyElementEventsImpl(_ptr);};

$.neg = function(a){if(typeof a === "number")return -a;return a.negate$0();};

$.Strings_join = function(strings,separator){return $.StringImplementation_join(strings,separator);};

$.StringImplementation_join = function(strings,separator){$.checkNull(strings);$.checkNull(separator);return $.stringJoinUnchecked($.StringImplementation__toJsStringArray(strings),separator);};

$.add$1 = function(receiver,value){if($.isJsArray(receiver)){$.checkGrowable(receiver,'add');receiver.push(value);return;}return receiver.add$1(value);};

$._Timer$ = function(milliSeconds,callback){var t1=new $._Timer(true,null);t1._Timer$2(milliSeconds,callback);return t1;};

$._JsCopier$ = function(){var t1=new $._JsCopier($._MessageTraverserVisitedMap$());t1._JsCopier$0();return t1;};

$.get$length = function(receiver){if(typeof receiver==='string'||$.isJsArray(receiver))return receiver.length;else return receiver.get$length();};

$.dynamicBind = function(obj,name$,methods,arguments$){var tag=$.getTypeNameOf(obj);var method=methods[tag];if(method==null&&!($._dynamicMetadata0()==null))for(var i=0;i<$._dynamicMetadata0().length;++i){var entry=$._dynamicMetadata0()[i];if(entry.get$_lib4_set()[tag]){method=methods[entry.get$_tag()];if(!(method==null))break;}}if(method==null)method=methods['Object'];var proto=Object.getPrototypeOf(obj);if(method==null)method=function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};if(!proto.hasOwnProperty(name$))$.defineProperty(proto,name$,method);return method.apply(obj, arguments$);};

$.isNaN = function(receiver){if(typeof receiver==='number')return isNaN(receiver);else return receiver.isNaN$0();};

$.regExpMakeNative = function(regExp,global){var pattern=regExp.get$pattern();var multiLine=regExp.get$multiLine();var ignoreCase=regExp.get$ignoreCase();$.checkString(pattern);var sb=$.StringBufferImpl$('');if(multiLine===true)$.add$1(sb,'m');if(ignoreCase===true)$.add$1(sb,'i');if(global)$.add$1(sb,'g');try{return new RegExp(pattern, $.toString(sb));}catch(exception){var t1=$.unwrapException(exception);var e=t1;throw $.$$throw($.IllegalJSRegExpException$(pattern,String(e)));}};

$.main = function(){$.ClickDemo_ClickDemo($.document().query$1('#content')).requestFrame$0();};

$.ceil = function(receiver){return Math.ceil(receiver);};

$.PropertyValues$ = function(){return new $.PropertyValues($.NoneHashMap$('Property','Object'),$.EventHandle$('Property'),false);};

$.iterator = function(receiver){if($.isJsArray(receiver))return $.ListIterator$(receiver);return receiver.iterator$0();};

$.Maps_mapToString = function(m){var result=$.StringBufferImpl$('');$.Maps__emitMap(m,result,$.ListImplementation_List(null));return result.toString$0();};

$.GlobalId$_internal = function(value){return new $.GlobalId(value,$.Util_getHashCode([value]));};

$.UnsupportedOperationException$ = function(_message){return new $.UnsupportedOperationException(_message);};

$.removeLast = function(receiver){if($.isJsArray(receiver)){$.checkGrowable(receiver,'removeLast');if($.get$length(receiver)===0)throw $.$$throw($.IndexOutOfRangeException$(-1));return receiver.pop();}return receiver.removeLast$0();};

$.invokeClosure = function(closure,isolate,numberOfArguments,arg1,arg2){if($.eqB(numberOfArguments,0))return $._callInIsolate(isolate,new $.invokeClosure_anon(closure));else if($.eqB(numberOfArguments,1))return $._callInIsolate(isolate,new $.invokeClosure_anon0(closure,arg1));else if($.eqB(numberOfArguments,2))return $._callInIsolate(isolate,new $.invokeClosure_anon1(closure,arg1,arg2));else throw $.$$throw($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));};

$.MetaInfo$ = function(_tag,_tags,_set){return new $.MetaInfo(_tag,_tags,_set);};

$.add = function(a,b){return typeof a==='number'&&typeof b==='number'?a + b:$.add$slow(a,b);};

$._HttpRequestEventsImpl$ = function(_ptr){return new $._HttpRequestEventsImpl(_ptr);};

$.geB = function(a,b){return typeof a==='number'&&typeof b==='number'?a >= b:$.ge$slow(a,b)===true;};

$._isJavaScriptSimpleObject = function(value){return Object.getPrototypeOf(value) === Object.prototype;};

$.ioore = function(index){throw $.$$throw($.IndexOutOfRangeException$(index));};

$._SelectIterator$ = function(_source,_func,TSource,TOutput){var t1=new $._SelectIterator(_source,_func);$.setRuntimeTypeInfo(t1,{ 'TSource': TSource, 'TOutput': TOutput });return t1;};

$._JsDeserializer$ = function(){return new $._JsDeserializer(null);};

$._ElementRectImpl$ = function(element){return new $._ElementRectImpl($._SimpleClientRect$(element.get$$$dom_clientLeft(),element.get$$$dom_clientTop(),element.get$$$dom_clientWidth(),element.get$$$dom_clientHeight()),$._SimpleClientRect$(element.get$$$dom_offsetLeft(),element.get$$$dom_offsetTop(),element.get$$$dom_offsetWidth(),element.get$$$dom_offsetHeight()),$._SimpleClientRect$(element.get$$$dom_scrollLeft(),element.get$$$dom_scrollTop(),element.get$$$dom_scrollWidth(),element.get$$$dom_scrollHeight()),element.$dom_getBoundingClientRect$0(),element.$dom_getClientRects$0());};

$._callInIsolate = function(isolate,function$){isolate.eval$1(function$);$._globalState().get$topEventLoop().run$0();};

$._convertNativeToDart_IDBKey = function(nativeKey){if(new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey)===true)throw $.$$throw($.CTC28);return nativeKey;};

$.addLast = function(receiver,value){if(!$.isJsArray(receiver))return receiver.addLast$1(value);$.checkGrowable(receiver,'addLast');receiver.push(value);};

$.ClickManager_setClickable = function(element,value){if(value)$.CTC18.set$2(element,true);else $.CTC18.clear$1(element);};

$.leB = function(a,b){return typeof a==='number'&&typeof b==='number'?a <= b:$.le$slow(a,b)===true;};

$._IDBRequestEventsImpl$ = function(_ptr){return new $._IDBRequestEventsImpl(_ptr);};

$.typeNameInFirefox = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='Document')return 'HTMLDocument';if(name$==='XMLDocument')return 'Document';if(name$==='WorkerMessageEvent')return 'MessageEvent';if(name$==='DragEvent')return 'MouseEvent';if(name$==='DataTransfer')return 'Clipboard';if(name$==='FormData')return 'DOMFormData';return name$;};

$._WorkerEventsImpl$ = function(_ptr){return new $._WorkerEventsImpl(_ptr);};

$.ExceptionImplementation$ = function(msg){return new $.ExceptionImplementation(msg);};

$._DOMWindowCrossFrameImpl$ = function(_window){return new $._DOMWindowCrossFrameImpl(_window);};

$.sub$slow = function(a,b){if($.checkNumbers(a,b))return a - b;return a.operator$sub$1(b);};

$.RetainedUtil_transformPointGlobalToLocal = function(element,point){return element.getTransform$0().createInverse$0().transformCoordinate$1(point);};

$.Collections_collectionToString = function(c){var result=$.StringBufferImpl$('');$.Collections__emitCollection(c,result,$.ListImplementation_List(null));return result.toString$0();};

$._SharedWorkerContextEventsImpl$ = function(_ptr){return new $._SharedWorkerContextEventsImpl(_ptr);};

$.indexOf$2 = function(receiver,element,start){if($.isJsArray(receiver))return $.Arrays_indexOf(receiver,element,start,receiver.length);else{$.checkNull(element);if(start<0)return -1;return receiver.indexOf(element, start);}return receiver.indexOf$2(element,start);};

$._maybeScheduleMeasurementFrame = function(){if($._nextMeasurementFrameScheduled===true)return;$._nextMeasurementFrameScheduled=true;if($._firstMeasurementRequest===true){$.add$1($.window().get$on().get$message(),new $._maybeScheduleMeasurementFrame_anon());$._firstMeasurementRequest=false;}$.window().postMessage$2('DART-MEASURE','*');};

$.AffineTransform$ = function(scaleX,shearY,shearX,scaleY,translateX,translateY){return new $.AffineTransform(scaleX,shearY,shearX,scaleY,translateX,translateY);};

$.RetainedUtil_hitTest = function(stage,point){return $.RetainedUtil__hitTest(stage.get$rootElement(),point);};

$.typeNameInIE = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='Document'){if(!!obj.xmlVersion)return 'Document';return 'HTMLDocument';}if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='DataTransfer')return 'Clipboard';if(name$==='DragEvent')return 'MouseEvent';if(name$==='HTMLDDElement')return 'HTMLElement';if(name$==='HTMLDTElement')return 'HTMLElement';if(name$==='HTMLTableDataCellElement')return 'HTMLTableCellElement';if(name$==='HTMLTableHeaderCellElement')return 'HTMLTableCellElement';if(name$==='HTMLPhraseElement')return 'HTMLElement';if(name$==='MSStyleCSSProperties')return 'CSSStyleDeclaration';if(name$==='MouseWheelEvent')return 'WheelEvent';if(name$==='FormData')return 'DOMFormData';return name$;};

$._TextTrackEventsImpl$ = function(_ptr){return new $._TextTrackEventsImpl(_ptr);};

$.DoubleLinkedQueue$ = function(E){var t1=new $.DoubleLinkedQueue(null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueue$0();return t1;};

$.Primitives_newList = function(length$){if(length$==null)return new Array();if(!(typeof length$==='number'&&Math.floor(length$) === length$)||length$<0)throw $.$$throw($.IllegalArgumentException$(length$));var result=new Array(length$);result.fixed$length = true;return result;};

$._globalState = function(){return $globalState;};

$.substring$2 = function(receiver,startIndex,endIndex){$.checkNum(startIndex);var length$=receiver.length;if(endIndex==null)endIndex=length$;$.checkNum(endIndex);if(startIndex<0)throw $.$$throw($.IndexOutOfRangeException$(startIndex));if($.gtB(startIndex,endIndex))throw $.$$throw($.IndexOutOfRangeException$(startIndex));if($.gtB(endIndex,length$))throw $.$$throw($.IndexOutOfRangeException$(endIndex));return $.substringUnchecked(receiver,startIndex,endIndex);};

$.StringBufferImpl$ = function(content$){var t1=new $.StringBufferImpl(null,null);t1.StringBufferImpl$1(content$);return t1;};

$._globalState0 = function(val){$globalState = val;};

$.getRuntimeTypeInfo = function(target){if(target==null)return;var res=target.builtin$typeInfo;return res==null?{}:res;};

$.window = function(){return window;};

$.HashMapImplementation$ = function(K,V){var t1=new $.HashMapImplementation(null,null,null,null,null);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });t1.HashMapImplementation$0();return t1;};

$._SVGElementInstanceEventsImpl$ = function(_ptr){return new $._SVGElementInstanceEventsImpl(_ptr);};

$._FixedSizeListIterator$ = function(array,T){var t1=new $._FixedSizeListIterator($.get$length(array),array,0);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._MainManagerStub$ = function(){return new $._MainManagerStub();};

$._FileReaderEventsImpl$ = function(_ptr){return new $._FileReaderEventsImpl(_ptr);};

$.DetailedIllegalArgumentException$ = function(arg,message){return new $.DetailedIllegalArgumentException(arg,message,'');};

$.regExpTest = function(regExp,str){return $.regExpGetNative(regExp).test(str);};

$.HashMapImplementation__nextProbe = function(currentProbe,numberOfProbes,length$){return $.and($.add(currentProbe,numberOfProbes),$.sub(length$,1));};

$.Coordinate$ = function(x,y){return new $.Coordinate(x,y);};

$.makeLiteralMap = function(keyValuePairs){var iterator=$.iterator(keyValuePairs);var result=$.LinkedHashMapImplementation$();for(;iterator.hasNext$0()===true;)result.operator$indexSet$2(iterator.next$0(),iterator.next$0());return result;};

$._createMeasurementFuture = function(computeValue,completer){if($._pendingRequests==null){$._pendingRequests=[];$._maybeScheduleMeasurementFrame();}$.add$1($._pendingRequests,$._MeasurementRequest$(computeValue,completer));return completer.get$future();};

$.Tuple$ = function(Item1,Item2,T1,T2){var t1=new $.Tuple(Item1,Item2);$.setRuntimeTypeInfo(t1,{ 'T1': T1, 'T2': T2 });return t1;};

$.isInfinite = function(receiver){if(!(typeof receiver==='number'))return receiver.isInfinite$0();return receiver == Infinity||receiver == -Infinity;};

$.CompleterImpl$ = function(T){var t1=new $.CompleterImpl($.FutureImpl$());$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$.HashMapImplementation__computeLoadLimit = function(capacity){return $.tdiv(capacity*3,4);};

$.NoMoreElementsException$ = function(){return new $.NoMoreElementsException();};

$._WindowEventsImpl$ = function(_ptr){return new $._WindowEventsImpl(_ptr);};

$._EventListenerListImpl$ = function(_ptr,_type){return new $._EventListenerListImpl(_ptr,_type);};

$.gt$slow = function(a,b){if($.checkNumbers(a,b))return a > b;return a.operator$gt$1(b);};

$.iae = function(argument){throw $.$$throw($.IllegalArgumentException$(argument));};

$._DOMApplicationCacheEventsImpl$ = function(_ptr){return new $._DOMApplicationCacheEventsImpl(_ptr);};

$.typeNameInChrome = function(obj){var name$=obj.constructor.name;if(name$==='Window')return 'DOMWindow';if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='WebKitMutationObserver')return 'MutationObserver';if(name$==='FormData')return 'DOMFormData';return name$;};

$.Collections__emitCollection = function(c,result,visiting){$.add$1(visiting,c);var isList=typeof c==='object'&&c!==null&&(c.constructor===Array||c.is$List());$.add$1(result,isList?'[':'{');for(var t1=$.iterator(c),first=true;t1.hasNext$0()===true;){var t2=t1.next$0();if(!first)$.add$1(result,', ');$.Collections__emitObject(t2,result,visiting);first=false;}$.add$1(result,isList?']':'}');$.removeLast(visiting);};

$._document = function(){return document;};

$._FrameSetElementEventsImpl$ = function(_ptr){return new $._FrameSetElementEventsImpl(_ptr);};

$.StringImplementation__toJsStringArray = function(strings){if(typeof strings!=='object'||strings===null||(strings.constructor!==Array||!!strings.immutable$list)&&!strings.is$JavaScriptIndexingBehavior())return $.StringImplementation__toJsStringArray$bailout(1,strings);$.checkNull(strings);var length$=strings.length;if($.isJsArray(strings)){for(var i=0;i<length$;++i){if(i<0||i>=strings.length)throw $.ioore(i);var string=strings[i];$.checkNull(string);if(!(typeof string==='string'))throw $.$$throw($.IllegalArgumentException$(string));}var array=strings;}else{array=$.ListImplementation_List(length$);for(i=0;i<length$;++i){if(i<0||i>=strings.length)throw $.ioore(i);string=strings[i];$.checkNull(string);if(!(typeof string==='string'))throw $.$$throw($.IllegalArgumentException$(string));if(i<0||i>=array.length)throw $.ioore(i);array[i]=string;}}return array;};

$.listInsertRange = function(receiver,start,length$,initialValue){if(typeof receiver!=='object'||receiver===null||(receiver.constructor!==Array||!!receiver.immutable$list)&&!receiver.is$JavaScriptIndexingBehavior())return $.listInsertRange$bailout(1,receiver,start,length$,initialValue);if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)throw $.$$throw($.IllegalArgumentException$(length$));if(!(typeof start==='number'&&Math.floor(start) === start))throw $.$$throw($.IllegalArgumentException$(start));var receiverLength=receiver.length;if(start<0||start>receiverLength)throw $.$$throw($.IndexOutOfRangeException$(start));var t1=receiverLength+length$;$.set$length(receiver,t1);var t2=start+length$;$.Arrays_copy(receiver,start,receiver,t2,receiverLength-start);if(!(initialValue==null))for(var i=start;i<t2;++i){if(i<0||i>=receiver.length)throw $.ioore(i);receiver[i]=initialValue;}$.set$length(receiver,t1);};

$.IllegalJSRegExpException$ = function(_pattern,_errmsg){return new $.IllegalJSRegExpException(_pattern,_errmsg);};

$.dynamicSetMetadata = function(inputTable){var t1=$.buildDynamicMetadata(inputTable);$._dynamicMetadata(t1);};

$._timerFactory = function(millis,callback,repeating){return repeating===true?$._Timer$repeating(millis,callback):$._Timer$(millis,callback);};

$._IDBDatabaseEventsImpl$ = function(_ptr){return new $._IDBDatabaseEventsImpl(_ptr);};

$.toStringForNativeObject = function(obj){return 'Instance of '+$.getTypeNameOf(obj);};

$._DOMWindowCrossFrameImpl__top = function(win){return win.top;};

$.constructorNameFallback = function(obj){var constructor$=obj.constructor;if(typeof(constructor$)==='function'){var name$=constructor$.name;if(typeof name$==='string')var t1=!(name$==='')&&!(name$==='Object')&&!(name$==='Function.prototype');else t1=false;if(t1)return name$;}var string=Object.prototype.toString.call(obj);return string.substring(8, string.length - 1);};

$.ltB = function(a,b){return typeof a==='number'&&typeof b==='number'?a < b:$.lt$slow(a,b)===true;};

$.tdiv = function(a,b){if($.checkNumbers(a,b))return $.truncate(a / b);return a.operator$tdiv$1(b);};

$.unwrapException = function(ex){if("dartException" in ex)return ex.dartException;var message=ex.message;if(ex instanceof TypeError){var type=ex.type;var name$=ex.arguments ? ex.arguments[0] : "";if($.eqB(type,'property_not_function')||$.eqB(type,'called_non_callable')||$.eqB(type,'non_object_property_call')||$.eqB(type,'non_object_property_load'))if(typeof name$==='string'&&$.startsWith(name$,'call$')===true)return $.ObjectNotClosureException$();else return $.NullPointerException$(null,$.CTC11);else if($.eqB(type,'undefined_method'))if(typeof name$==='string'&&$.startsWith(name$,'call$')===true)return $.ObjectNotClosureException$();else return $.NoSuchMethodException$('',name$,[],null);var ieErrorCode=ex.number & 0xffff;var ieFacilityNumber=ex.number>>16 & 0x1FFF;if(typeof message==='string')if($.endsWith(message,'is null')===true||$.endsWith(message,'is undefined')===true||$.endsWith(message,'is null or undefined')===true)return $.NullPointerException$(null,$.CTC11);else{if($.contains$1(message,' is not a function')!==true)var t1=ieErrorCode===438&&ieFacilityNumber===10;else t1=true;if(t1)return $.NoSuchMethodException$('','<unknown>',[],null);}return $.ExceptionImplementation$(typeof message==='string'?message:'');}if(ex instanceof RangeError){if(typeof message==='string'&&$.contains$1(message,'call stack')===true)return $.StackOverflowException$();return $.IllegalArgumentException$('');}if(typeof InternalError == 'function' && ex instanceof InternalError)if(typeof message==='string'&&message==='too much recursion')return $.StackOverflowException$();return ex;};

$.GlobalId_GlobalId = function(){var t1=$.GlobalId__globalId;$.GlobalId__globalId=$.add(t1,1);return $.GlobalId$_internal(t1);};

$.Vector$ = function(x,y){return new $.Vector(x,y);};

$.checkNumbers = function(a,b){if(typeof a==='number')if(typeof b==='number')return true;else{$.checkNull(b);throw $.$$throw($.IllegalArgumentException$(b));}return false;};

$._MediaStreamTrackListEventsImpl$ = function(_ptr){return new $._MediaStreamTrackListEventsImpl(_ptr);};

$._ReceivePortImpl$ = function(){var t1=$._ReceivePortImpl__nextFreeId;$._ReceivePortImpl__nextFreeId=$.add(t1,1);t1=new $._ReceivePortImpl(t1,null);t1._ReceivePortImpl$0();return t1;};

$.NoSuchMethodException$ = function(_receiver,_functionName,_arguments,existingArgumentNames){return new $.NoSuchMethodException(_receiver,_functionName,_arguments,existingArgumentNames);};

$.stringJoinUnchecked = function(array,separator){return array.join(separator);};

$._WorkerSendPort$ = function(_workerId,isolateId,_receivePortId){return new $._WorkerSendPort(_workerId,_receivePortId,isolateId);};

$.S = function(value){var res=$.toString(value);if(!(typeof res==='string'))throw $.$$throw($.IllegalArgumentException$(value));return res;};

$.checkString = function(value){if(!(typeof value==='string')){$.checkNull(value);throw $.$$throw($.IllegalArgumentException$(value));}return value;};

$._DoubleLinkedQueueIterator$ = function(_sentinel,E){var t1=new $._DoubleLinkedQueueIterator(_sentinel,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1._DoubleLinkedQueueIterator$1(_sentinel);return t1;};

$.Arrays_indexOf = function(a,element,startIndex,endIndex){var t1=a.length;if(startIndex>=t1)return -1;if(startIndex<0)startIndex=0;for(var i=startIndex;i<endIndex;++i){if(i<0||i>=t1)throw $.ioore(i);if($.eqB(a[i],element))return i;}return -1;};

$._WhereIterator$ = function(_source,_func,T){var t1=new $._WhereIterator(_source,_func,null,null);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$.$$ = function(source){if(typeof source==='object'&&source!==null&&!!source.is$Enumerable)return source;else return $.Enumerable_Enumerable(source);};

$._Device_isIE = function(){return $._Device_isOpera()!==true&&$.contains$2($._Device_userAgent(),'MSIE',0)===true;};

$._Device_isOpera = function(){return $.contains$2($._Device_userAgent(),'Opera',0);};

$.EventHandle$ = function(T){var t1=new $.EventHandle(null,false);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._SimpleClientRect$ = function(left,top$,width,height){return new $._SimpleClientRect(left,top$,width,height);};

$.startRootIsolate = function(entry){var t1=$._Manager$();$._globalState0(t1);if($._globalState().get$isWorker()===true)return;var rootContext=$._IsolateContext$();$._globalState().set$rootContext(rootContext);$._fillStatics(rootContext);$._globalState().set$currentContext(rootContext);if(!($._window()==null))rootContext.eval$1(new $.startRootIsolate_anon());rootContext.eval$1(entry);$._globalState().get$topEventLoop().run$0();};

$.lt$slow = function(a,b){if($.checkNumbers(a,b))return a < b;return a.operator$lt$1(b);};

$.Collections__emitObject = function(o,result,visiting){if(typeof o==='object'&&o!==null&&(o.constructor===Array||o.is$Collection()))if($.Collections__containsRef(visiting,o))$.add$1(result,typeof o==='object'&&o!==null&&(o.constructor===Array||o.is$List())?'[...]':'{...}');else $.Collections__emitCollection(o,result,visiting);else if(typeof o==='object'&&o!==null&&o.is$Map())if($.Collections__containsRef(visiting,o))$.add$1(result,'{...}');else $.Maps__emitMap(o,result,visiting);else $.add$1(result,o==null?'null':o);};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr){return new $._DedicatedWorkerContextEventsImpl(_ptr);};

$.NoneHashMap$ = function(K,V){var t1=new $.NoneHashMap($.ListImplementation_List(null,'Tuple<K, V>'));$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });return t1;};

$.requireArgumentNotNull = function(argument,argName){if(argument==null)throw $.$$throw($.NullArgumentException$(argName));};

$.truncate = function(receiver){return receiver<0?$.ceil(receiver):$.floor(receiver);};

$._EventLoop$ = function(){return new $._EventLoop($.DoubleLinkedQueue$('_IsolateEvent'));};

$.Stage$ = function(_canvas,_element){var t1=new $.Stage(_canvas,_element,$.EventHandle$('EventArgs'),null,$.PropertyValues$(),false);t1.Stage$2(_canvas,_element);return t1;};

$.substringUnchecked = function(receiver,startIndex,endIndex){return receiver.substring(startIndex, endIndex);};

$._FuncEnumerable$ = function(_source,_func,TSource,TOutput){var t1=new $._FuncEnumerable(_source,_func);$.setRuntimeTypeInfo(t1,{ 'TSource': TSource, 'TOutput': TOutput });return t1;};

$._convertNativeToDart_IDBAny = function(object){return $._convertNativeToDart_AcceptStructuredClone(object);};

$.contains = function(userAgent,name$){return !(userAgent.indexOf(name$)===-1);};

$._AudioContextEventsImpl$ = function(_ptr){return new $._AudioContextEventsImpl(_ptr);};

$.toString = function(value){if(typeof value == "object" && value !== null)if($.isJsArray(value))return $.Collections_collectionToString(value);else return value.toString$0();if(value === 0 && (1 / value) < 0)return '-0.0';if(value==null)return 'null';if(typeof value == "function")return 'Closure';return String(value);};

$._TextTrackCueEventsImpl$ = function(_ptr){return new $._TextTrackCueEventsImpl(_ptr);};

$.typeNameInSafari = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='WebKitMutationObserver')return 'MutationObserver';if(name$==='FormData')return 'DOMFormData';return name$;};

$._AttachableEventHelper$ = function(_propertyChangeHandleId){return new $._AttachableEventHelper($.NoneHashMap$('Attachable','EventHandle'),_propertyChangeHandleId);};

$.endsWith = function(receiver,other){$.checkString(other);var receiverLength=receiver.length;var otherLength=other.length;if(otherLength>receiverLength)return false;return other===$.substring$1(receiver,receiverLength-otherLength);};

$.contains$2 = function(receiver,other,startIndex){if(!(typeof receiver==='string'))return receiver.contains$2(other,startIndex);$.checkNull(other);return $.stringContainsUnchecked(receiver,other,startIndex);};

$._WorkerContextEventsImpl$ = function(_ptr){return new $._WorkerContextEventsImpl(_ptr);};

$._ElementEventsImpl$ = function(_ptr){return new $._ElementEventsImpl(_ptr);};

$._dynamicMetadata = function(table){$dynamicMetadata = table;};

$._dynamicMetadata0 = function(){if(typeof($dynamicMetadata)==='undefined'){var t1=[];$._dynamicMetadata(t1);}return $dynamicMetadata;};

$._SpeechRecognitionEventsImpl$ = function(_ptr){return new $._SpeechRecognitionEventsImpl(_ptr);};

$.add$slow = function(a,b){if($.checkNumbers(a,b))return a + b;return a.operator$add$1(b);};

$.Util_getHashCode = function(source){for(var t1=$.iterator(source),hash=0;t1.hasNext$0()===true;){var t2=t1.next$0();var next=t2==null?0:$.hashCode(t2);if(typeof next!=='number')throw $.iae(next);var hash0=536870911&hash+next;var hash1=536870911&hash0+((524287&hash0)<<10>>>0);hash1=(hash1^$.shr(hash1,6))>>>0;hash=hash1;}hash0=536870911&hash+((67108863&hash)<<3>>>0);hash0=(hash0^$.shr(hash0,11))>>>0;return 536870911&hash0+((16383&hash0)<<15>>>0);};

$.IllegalArgumentException$ = function(arg){return new $.IllegalArgumentException(arg);};

$._AttachableEventHelper_createInstance = function(obj){return $._AttachableEventHelper$($.add$1(obj.get$propertyValues().get$propertyChanged(),new $._AttachableEventHelper_createInstance_anon(obj)));};

$._HttpRequestUploadEventsImpl$ = function(_ptr){return new $._HttpRequestUploadEventsImpl(_ptr);};

$.Mouse_markMouseOver = function(stage,coordinate){$.requireArgumentNotNull(stage,'stage');var t1=!(coordinate==null);$.requireArgument(coordinate==null||coordinate.get$isValid()===true,'coordinate',null);var items=$.CTC16.get$1(stage);if(!(items==null)){$.forEach(items,new $.Mouse_markMouseOver_anon());$.CTC16.clear$1(stage);}if(t1){var hits=$.RetainedUtil_hitTest(stage,coordinate);$.CTC16.set$2(stage,hits);$.forEach(hits,new $.Mouse_markMouseOver_anon0());if($.gtB($.get$length(hits),0))$.CTC17.set$2($.index(hits,0),true);return hits;}return;};

$._PendingSendPortFinder$ = function(){var t1=$._MessageTraverserVisitedMap$();t1=new $._PendingSendPortFinder([],t1);t1._PendingSendPortFinder$0();return t1;};

$.Futures_wait = function(futures){var t1={};if(typeof futures!=='string'&&(typeof futures!=='object'||futures===null||futures.constructor!==Array&&!futures.is$JavaScriptIndexingBehavior()))return $.Futures_wait$bailout(1,futures,t1);if($.isEmpty(futures)===true)return $.FutureImpl_FutureImpl$immediate($.CTC11,'List');var completer=$.CompleterImpl$('List');var result=completer.get$future();t1.remaining_1=futures.length;var values=$.ListImplementation_List(futures.length);for(var i=0;t2=futures.length,i<t2;++i){if(i<0||i>=t2)throw $.ioore(i);var future=futures[i];future.then$1(new $.Futures_wait_anon(completer,i,t1,result,values));future.handleException$1(new $.Futures_wait_anon0(future,completer,result));}return result;var t2;};

$.checkNull = function(object){if(object==null)throw $.$$throw($.NullPointerException$(null,$.CTC11));return object;};

$.Arrays_copy = function(src,srcStart,dst,dstStart,count){if(typeof src!=='string'&&(typeof src!=='object'||src===null||src.constructor!==Array&&!src.is$JavaScriptIndexingBehavior()))return $.Arrays_copy$bailout(1,src,srcStart,dst,dstStart,count);if(typeof dst!=='object'||dst===null||(dst.constructor!==Array||!!dst.immutable$list)&&!dst.is$JavaScriptIndexingBehavior())return $.Arrays_copy$bailout(1,src,srcStart,dst,dstStart,count);if(srcStart<dstStart)for(var i=srcStart+count-1,j=dstStart+count-1;i>=srcStart;--i,--j){if(i!==(i|0))throw $.iae(i);if(i<0||i>=src.length)throw $.ioore(i);var t1=src[i];if(j!==(j|0))throw $.iae(j);if(j<0||j>=dst.length)throw $.ioore(j);dst[j]=t1;}else for(t1=srcStart+count,i=srcStart,j=dstStart;i<t1;++i,++j){if(i<0||i>=src.length)throw $.ioore(i);var t2=src[i];if(j<0||j>=dst.length)throw $.ioore(j);dst[j]=t2;}};

$.CanvasUtil_ellipse = function(ctx,x,y,width,height){var hB=$.mul($.div(width,2),0.5522847498307935);var vB=$.mul($.div(height,2),0.5522847498307935);if(typeof width!=='number')throw $.iae(width);var eX=x+width;if(typeof height!=='number')throw $.iae(height);var eY=y+height;var mX=x+width/2;var mY=y+height/2;ctx.beginPath$0();ctx.moveTo$2(x,mY);if(typeof vB!=='number')throw $.iae(vB);var t1=mY-vB;if(typeof hB!=='number')throw $.iae(hB);var t2=mX-hB;ctx.bezierCurveTo$6(x,t1,t2,y,mX,y);var t3=mX+hB;ctx.bezierCurveTo$6(t3,y,eX,t1,eX,mY);t1=mY+vB;ctx.bezierCurveTo$6(eX,t1,t3,eY,mX,eY);ctx.bezierCurveTo$6(t2,eY,x,t1,x,mY);ctx.closePath$0();};

$._PeerConnection00EventsImpl$ = function(_ptr){return new $._PeerConnection00EventsImpl(_ptr);};

$._AbstractWorkerEventsImpl$ = function(_ptr){return new $._AbstractWorkerEventsImpl(_ptr);};

$.indexSet = function(a,index,value){if(a.constructor === Array && !a.immutable$list){var key=index >>> 0;if(key===index&&key<a.length){a[key] = value;return;}}$.indexSet$slow(a,index,value);};

$.index$slow = function(a,index){if(typeof a==='string'||$.isJsArray(a)){if(!(typeof index==='number'&&Math.floor(index) === index)){if(!(typeof index==='number'))throw $.$$throw($.IllegalArgumentException$(index));if(!($.truncate(index)===index))throw $.$$throw($.IllegalArgumentException$(index));}if($.ltB(index,0)||$.geB(index,$.get$length(a)))throw $.$$throw($.IndexOutOfRangeException$(index));return a[index];}return a.operator$index$1(index);};

$.div = function(a,b){return typeof a==='number'&&typeof b==='number'?a / b:$.div$slow(a,b);};

$._MeasurementRequest$ = function(computeValue,completer,T){var t1=new $._MeasurementRequest(computeValue,completer,null,false);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$.Collections__containsRef = function(c,ref){for(var t1=$.iterator(c);t1.hasNext$0()===true;){var t2=t1.next$0();if(t2==null?ref==null:t2===ref)return true;}return false;};

$._Elements_CanvasElement = function(width,height){var _e=$._document().$dom_createElement$1('canvas');if(!(width==null))_e.set$width(width);if(!(height==null))_e.set$height(height);return _e;};

$._MediaElementEventsImpl$ = function(_ptr){return new $._MediaElementEventsImpl(_ptr);};

$.$$throw = function(ex){if(ex==null)ex=$.CTC0;var jsError=new Error();jsError.name = ex;jsError.description = ex;jsError.dartException = ex;jsError.toString = $.toStringWrapper.call$0;throw jsError;};

$._MessagePortEventsImpl$ = function(_ptr){return new $._MessagePortEventsImpl(_ptr);};

$.getTraceFromException = function(exception){return $.StackTrace$(exception.stack);};

$._IsolateEvent$ = function(isolate,fn,message){return new $._IsolateEvent(isolate,fn,message);};

$.Enumerable_Enumerable = function(source,T){$.requireArgumentNotNull(source,'source');return $._SimpleEnumerable$(source,T);};

$.Maps__emitMap = function(m,result,visiting){var t1={};$.add$1(visiting,m);$.add$1(result,'{');t1.first_1=true;$.forEach(m,new $.Maps__emitMap_anon(result,t1,visiting));$.add$1(result,'}');$.removeLast(visiting);};

$._MessageTraverser_isPrimitive = function(x){return x==null||typeof x==='string'||typeof x==='number'||typeof x==='boolean';};

$._Deserializer_isPrimitive = function(x){return x==null||typeof x==='string'||typeof x==='number'||typeof x==='boolean';};

$.propertySet = function(object,property,value){object[property] = value;};

$.CanvasUtil_transform = function(ctx,tx){$.requireArgumentNotNull(ctx,'ctx');$.requireArgumentNotNull(tx,'tx');ctx.transform$6(tx.get$scaleX(),tx.get$shearY(),tx.get$shearX(),tx.get$scaleY(),tx.get$translateX(),tx.get$translateY());};

$._BatteryManagerEventsImpl$ = function(_ptr){return new $._BatteryManagerEventsImpl(_ptr);};

$._Device_isFirefox = function(){return $.contains$2($._Device_userAgent(),'Firefox',0);};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr){return new $._IDBOpenDBRequestEventsImpl(_ptr);};

$.checkMutable = function(list,reason){if(!!(list.immutable$list))throw $.$$throw($.UnsupportedOperationException$(reason));};

$._AttachableEventHelper_fireEvent = function(obj,attachable,args){var helper=$.CTC24.get$1(obj);if(!(helper==null)){var handle=$.index(helper.get$_handlers(),attachable);if(!(handle==null))handle.fireEvent$1(args);}};

$.sqrt = function(value){return Math.sqrt($.checkNum(value));};

$.checkGrowable = function(list,reason){if(!!(list.fixed$length))throw $.$$throw($.UnsupportedOperationException$(reason));};

$._serializeMessage = function(message){if($._globalState().get$needSerialization()===true)return $._JsSerializer$().traverse$1(message);else return $._JsCopier$().traverse$1(message);};

$.Rect$ = function(left,top$,width,height){return new $.Rect(left,top$,width,height);};

$.index = function(a,index){if(typeof a == "string" || a.constructor === Array){var key=index >>> 0;if(key===index&&key<a.length)return a[key];}return $.index$slow(a,index);};

$.IndexOutOfRangeException$ = function(_value){return new $.IndexOutOfRangeException(_value);};

$.le$slow = function(a,b){if($.checkNumbers(a,b))return a <= b;return a.operator$le$1(b);};

$.KeyValuePair$ = function(key,value,K,V){var t1=new $.KeyValuePair(key,value);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });return t1;};

$.RetainedUtil__hitTest = function(element,point){point=$.RetainedUtil_transformPointGlobalToLocal(element,point);var bounds=$.Rect$(0,0,element.get$width(),element.get$height());var hits=$.ListImplementation_List(null,'PElement');if(bounds.contains$1(point)===true){var length$=element.get$visualChildCount();if(typeof length$!=='number')return $.RetainedUtil__hitTest$bailout(1,element,length$,point,hits);for(var t1=length$-1,i=0;i<length$;++i){hits=$.RetainedUtil__hitTest(element.getVisualChild$1(t1-i),point);if(hits.length>0)break;}hits.push(element);return hits;}else return [];};

$._DocumentEventsImpl$ = function(_ptr){return new $._DocumentEventsImpl(_ptr);};

$.Shape$ = function(w,h,fillStyle,shapeType){return new $.Shape(fillStyle,shapeType,$.ListImplementation_List(null,'AffineTransform'),true,$.EventHandle$('EventArgs'),$.EventHandle$('EventArgs'),null,w,h,null,null,false,null,$.PropertyValues$(),false);};

$.typeNameInOpera = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='FormData')return 'DOMFormData';return name$;};

$.xor = function(a,b){if($.checkNumbers(a,b))return (a ^ b) >>> 0;return a.operator$xor$1(b);};

$._window = function(){return typeof window != "undefined"?window:null;};

$.substring$1 = function(receiver,startIndex){if(!(typeof receiver==='string'))return receiver.substring$1(startIndex);return $.substring$2(receiver,startIndex,null);};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr){return new $._IDBVersionChangeRequestEventsImpl(_ptr);};

$._MessageTraverserVisitedMap$ = function(){return new $._MessageTraverserVisitedMap();};

$.NullArgumentException$ = function(arg){return new $.NullArgumentException(arg,arg);};

$.FutureNotCompleteException$ = function(){return new $.FutureNotCompleteException();};

$.CanvasUtil_getCanvasSize = function(canvasElement){return $.Size$(canvasElement.get$width(),canvasElement.get$height());};

$._JsSerializer$ = function(){var t1=new $._JsSerializer(0,$._MessageTraverserVisitedMap$());t1._JsSerializer$0();return t1;};

$.ClickManager$ = function(_stage){var t1=new $.ClickManager(_stage,null);t1.ClickManager$1(_stage);return t1;};

$.eq = function(a,b){if(a == null)return b == null;if(b == null)return false;if(typeof a === "object")if(!!a.operator$eq$1)return a.operator$eq$1(b);return a === b;};

$.LinkedHashMapImplementation$ = function(K,V){var t1=new $.LinkedHashMapImplementation(null,null);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });t1.LinkedHashMapImplementation$0();return t1;};

$.NullPointerException$ = function(functionName,arguments$){return new $.NullPointerException(functionName,arguments$);};

$._DoubleLinkedQueueEntrySentinel$ = function(E){var t1=new $._DoubleLinkedQueueEntrySentinel(null,null,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueueEntry$1(null);t1._DoubleLinkedQueueEntrySentinel$0();return t1;};

$.FutureImpl$ = function(T){var t1=new $.FutureImpl(false,null,null,null,false,[],[],[]);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._DOMWindowCrossFrameImpl__createSafe = function(w){var t1=$.window();if(w==null?t1==null:w===t1)return w;else return $._DOMWindowCrossFrameImpl$(w);};

$.toStringWrapper = function(){return $.toString(this.dartException);};

$.ElementMouseEventArgs_ElementMouseEventArgs = function(element,mouseEvent){return $.ElementMouseEventArgs$_internal(element,mouseEvent.get$shiftKey());};

$.gtB = function(a,b){return typeof a==='number'&&typeof b==='number'?a > b:$.gt$slow(a,b)===true;};

$.stringContainsUnchecked = function(receiver,other,startIndex){return !($.indexOf$2(receiver,other,startIndex)===-1);};

$.requireArgument = function(truth,arg,message){if(!truth)if(!(message==null))throw $.$$throw($.DetailedIllegalArgumentException$(arg,message));else throw $.$$throw($.IllegalArgumentException$(arg));};

$.defineProperty = function(obj,property,value){Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});};

$.Primitives_objectToString = function(object){return 'Instance of \''+$.S($.Primitives_objectTypeName(object))+'\'';};

$.shl = function(a,b){if($.checkNumbers(a,b)){if(b<0)throw $.$$throw($.IllegalArgumentException$(b));if(b > 31)return 0;return (a << b) >>> 0;}return a.operator$shl$1(b);};

$._currentIsolate = function(){return $._globalState().get$currentContext();};

$.lt = function(a,b){return typeof a==='number'&&typeof b==='number'?a < b:$.lt$slow(a,b);};

$.insertRange$3 = function(receiver,start,length$,initialValue){if(!$.isJsArray(receiver))return receiver.insertRange$3(start,length$,initialValue);return $.listInsertRange(receiver,start,length$,initialValue);};

$._FileWriterEventsImpl$ = function(_ptr){return new $._FileWriterEventsImpl(_ptr);};

$._completeMeasurementFutures = function(){if($.eqB($._nextMeasurementFrameScheduled,false))return;$._nextMeasurementFrameScheduled=false;if(!($._pendingRequests==null))for(var t1=$.iterator($._pendingRequests);t1.hasNext$0()===true;){var request=t1.next$0();try{var t2=request.computeValue$0();request.set$value(t2);}catch(exception){t2=$.unwrapException(exception);var e=t2;t2=e;request.set$value(t2);request.set$exception(true);}}var completedRequests=$._pendingRequests;var readyMeasurementFrameCallbacks=$._pendingMeasurementFrameCallbacks;$._pendingRequests=null;$._pendingMeasurementFrameCallbacks=null;if(!(completedRequests==null))for(t1=$.iterator(completedRequests);t1.hasNext$0()===true;){t2=t1.next$0();if(t2.get$exception()===true)t2.get$completer().completeException$1(t2.get$value());else t2.get$completer().complete$1(t2.get$value());}if(!(readyMeasurementFrameCallbacks==null))for(t1=$.iterator(readyMeasurementFrameCallbacks);t1.hasNext$0()===true;)t1.next$0().call$0();};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win,message,targetOrigin){    win.postMessage(message, targetOrigin);
};

$._Manager$ = function(){var t1=new $._Manager(0,0,1,null,null,null,null,null,null,null,null,null);t1._Manager$0();return t1;};

$.regExpGetNative = function(regExp){var r=regExp._re;return r==null?regExp._re = $.regExpMakeNative(regExp,false):r;};

$._NotificationEventsImpl$ = function(_ptr){return new $._NotificationEventsImpl(_ptr);};

$.Coordinate_difference = function(a,b){return $.Vector$($.sub(a.x,b.get$x()),$.sub(a.y,b.get$y()));};

$.ClickManager_addHandler = function(element,handler){return $.CTC23.addHandler$2(element,handler);};

$.sub = function(a,b){return typeof a==='number'&&typeof b==='number'?a - b:$.sub$slow(a,b);};

$._AttachableEventHelper_addHandler = function(obj,property,watcher){return $.add$1($.CTC24.get$2(obj,$._AttachableEventHelper_createInstance).get$_handlers().putIfAbsent$2(property,new $._AttachableEventHelper_addHandler_anon()),watcher);};

$.DoubleLinkedQueueEntry$ = function(e,E){var t1=new $.DoubleLinkedQueueEntry(null,null,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueueEntry$1(e);return t1;};

$.Arrays_copy$bailout = function(state,src,srcStart,dst,dstStart,count){if(srcStart<dstStart)for(var i=srcStart+count-1,j=dstStart+count-1;i>=srcStart;--i,--j)$.indexSet(dst,j,$.index(src,i));else for(var t1=srcStart+count,i=srcStart,j=dstStart;i<t1;++i,++j)$.indexSet(dst,j,$.index(src,i));};

$.StringImplementation__toJsStringArray$bailout = function(state,strings){$.checkNull(strings);var length$=$.get$length(strings);if($.isJsArray(strings)){for(var i=0;$.ltB(i,length$);++i){var string=$.index(strings,i);$.checkNull(string);if(!(typeof string==='string'))throw $.$$throw($.IllegalArgumentException$(string));}var array=strings;}else{array=$.ListImplementation_List(length$);for(i=0;$.ltB(i,length$);++i){string=$.index(strings,i);$.checkNull(string);if(!(typeof string==='string'))throw $.$$throw($.IllegalArgumentException$(string));if(i<0||i>=array.length)throw $.ioore(i);array[i]=string;}}return array;};

$.listInsertRange$bailout = function(state,receiver,start,length$,initialValue){if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)throw $.$$throw($.IllegalArgumentException$(length$));if(!(typeof start==='number'&&Math.floor(start) === start))throw $.$$throw($.IllegalArgumentException$(start));var receiverLength=receiver.length;if(start<0||start>receiverLength)throw $.$$throw($.IndexOutOfRangeException$(start));var t1=receiverLength+length$;$.set$length(receiver,t1);var t2=start+length$;$.Arrays_copy(receiver,start,receiver,t2,receiverLength-start);if(!(initialValue==null))for(var i=start;i<t2;++i)$.indexSet(receiver,i,initialValue);$.set$length(receiver,t1);};

$.RetainedUtil__hitTest$bailout = function(state,env0,env1,env2,env3){switch(state){case 1:var element=env0;length$=env1;point=env2;hits=env3;break;}switch(state){case 0:var point=$.RetainedUtil_transformPointGlobalToLocal(element,point);var bounds=$.Rect$(0,0,element.get$width(),element.get$height());var hits=$.ListImplementation_List(null,'PElement');case 1:if(state===1||state===0&&bounds.contains$1(point)===true)switch(state){case 0:var length$=element.get$visualChildCount();case 1:state=0;for(var i=0;$.ltB(i,length$);++i){hits=$.RetainedUtil__hitTest(element.getVisualChild$1($.sub($.sub(length$,1),i)),point);if(hits.length>0)break;}hits.push(element);return hits;}else return [];}};

$.Futures_wait$bailout = function(state,futures,t1){if($.isEmpty(futures)===true)return $.FutureImpl_FutureImpl$immediate($.CTC11,'List');var completer=$.CompleterImpl$('List');var result=completer.get$future();t1.remaining_1=$.get$length(futures);var values=$.ListImplementation_List($.get$length(futures));for(var i=0;$.ltB(i,$.get$length(futures));++i){var future=$.index(futures,i);future.then$1(new $.Futures_wait_anon(completer,i,t1,result,values));future.handleException$1(new $.Futures_wait_anon0(future,completer,result));}return result;};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$._AttachableEventHelper_createInstance.call$1 = $._AttachableEventHelper_createInstance;
$._AttachableEventHelper_createInstance.$name = "_AttachableEventHelper_createInstance";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC11 = Isolate.makeConstantList([]);
$.CTC12 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC34 = 'Cannot removeLast on immutable List.';
$.CTC13 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC35 = null;
$.CTC20 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC36 = false;
$.CTC37 = '^#[_a-zA-Z]\\w*$';
$.CTC = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC38 = 'structured clone of File';
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC39 = 'IsMouseDirectlyOver';
$.CTC17 = new Isolate.$isolateProperties.Property(false, 'IsMouseDirectlyOver');
$.CTC40 = 'structured clone of other type';
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC41 = 0;
$.CTC42 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC26 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC43 = 'clickEvent';
$.CTC23 = new Isolate.$isolateProperties.AttachedEvent('clickEvent');
$.CTC27 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC44 = 'IsMouseOver';
$.CTC21 = new Isolate.$isolateProperties.Property(false, 'IsMouseOver');
$.CTC45 = 'Ellipse';
$.CTC15 = new Isolate.$isolateProperties.ShapeType('Ellipse');
$.CTC25 = new Isolate.$isolateProperties.EventArgs();
$.CTC46 = '_attachableEventHelperProperty';
$.CTC24 = new Isolate.$isolateProperties.Property(null, '_attachableEventHelperProperty');
$.CTC33 = new Isolate.$isolateProperties.Object();
$.CTC47 = new Isolate.$isolateProperties.Coordinate(0, 0);
$.CTC48 = 'structured clone of FileList';
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC49 = 'isClickable';
$.CTC18 = new Isolate.$isolateProperties.Property(false, 'isClickable');
$.CTC50 = 'offsetX is only supported on elements';
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('offsetX is only supported on elements');
$.CTC51 = 'structured clone of RegExp';
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC52 = 'structured clone of Blob';
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC53 = 'Rectangle';
$.CTC14 = new Isolate.$isolateProperties.ShapeType('Rectangle');
$.CTC54 = 'Cannot removeRange on immutable List.';
$.CTC30 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeRange on immutable List.');
$.CTC55 = 'Cannot insertRange on immutable List.';
$.CTC32 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot insertRange on immutable List.');
$.CTC56 = 'Cannot add to immutable List.';
$.CTC1 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC22 = new Isolate.$isolateProperties._UndefinedValue();
$.CTC57 = 'IDBKey containing Date';
$.CTC28 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC58 = 'structured clone of Date';
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC29 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC42, Isolate.$isolateProperties.CTC42, Isolate.$isolateProperties.CTC42, Isolate.$isolateProperties.CTC42, Isolate.$isolateProperties.CTC11);
$.CTC59 = 'structured clone of ArrayBuffer';
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC60 = '_stageMouseCacheProperty';
$.CTC16 = new Isolate.$isolateProperties.Property(null, '_stageMouseCacheProperty');
$.CTC61 = 'panelTransform';
$.CTC31 = new Isolate.$isolateProperties.Property(null, 'panelTransform');
$.CTC2 = new Isolate.$isolateProperties._Default();
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC11);
$.CTC62 = 'structured clone of ArrayBufferView';
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.HashMapImplementation__DELETED_KEY = Isolate.$isolateProperties.CTC27;
$._pendingMeasurementFrameCallbacks = null;
$._MEASUREMENT_MESSAGE = 'DART-MEASURE';
$.HashMapImplementation__INITIAL_CAPACITY = 8;
$._nextMeasurementFrameScheduled = false;
$._pendingRequests = null;
$.GlobalId__globalId = 0;
$._ReceivePortImpl__nextFreeId = 1;
$._TimerFactory__factory = null;
$._cachedBrowserPrefix = null;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$._firstMeasurementRequest = true;
$._getTypeNameOf = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter =   function(field, prototype) {
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

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$IDBKeyRange: function() { return false; },
 is$Blob: function() { return false; },
 is$File: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 is$Element: function() { return false; },
 is$List: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$FileList: function() { return false; },
 is$Map: function() { return false; },
 is$Collection: function() { return false; },
 is$ImageData: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._AbstractWorkerEventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function(){return this.toString();},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["name?", "value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function(){return $._AudioContextEventsImpl$(this);}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["name?", "value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function(){return $._BatteryManagerEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('Blob', [], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function(){return $._BodyElementEventsImpl$(this);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName){return this.getPropertyValue(propertyName);},
 setProperty$3: function(propertyName,value,priority){return this.setProperty(propertyName,value,priority);},
 get$clear: function(){return this.getPropertyValue$1('clear');},
 clear$0: function() { return this.get$clear().call$0(); },
 get$clip: function(){return this.getPropertyValue$1('clip');},
 clip$0: function() { return this.get$clip().call$0(); },
 get$height: function(){return this.getPropertyValue$1('height');},
 set$height: function(value){this.setProperty$3('height',value,'');},
 get$left: function(){return this.getPropertyValue$1('left');},
 get$top: function(){return this.getPropertyValue$1('top');},
 get$transform: function(){return this.getPropertyValue$1($.S($._browserPrefix())+'transform');},
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.get$transform().call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 get$width: function(){return this.getPropertyValue$1('width');},
 set$width: function(value){this.setProperty$3('width',value,'');}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["height=", "width="], {
 getContext$1: function(contextId){return this.getContext(contextId);},
 get$context2d: function(){return this.getContext$1('2d');},
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle=", "globalAlpha!"], {
 beginPath$0: function(){return this.beginPath();},
 bezierCurveTo$6: function(cp1x,cp1y,cp2x,cp2y,x,y){return this.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);},
 clearRect$4: function(x,y,width,height){return this.clearRect(x,y,width,height);},
 clip$0: function(){return this.clip();},
 closePath$0: function(){return this.closePath();},
 drawImage$9: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh){return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);},
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 fill$0: function(){return this.fill();},
 fillRect$4: function(x,y,width,height){return this.fillRect(x,y,width,height);},
 moveTo$2: function(x,y){return this.moveTo(x,y);},
 rect$4: function(x,y,width,height){return this.rect(x,y,width,height);},
 restore$0: function(){return this.restore();},
 save$0: function(){return this.save();},
 transform$6: function(m11,m12,m21,m22,dx,dy){return this.transform(m11,m12,m21,m22,dx,dy);},
 translate$2: function(tx,ty){return this.translate(tx,ty);}
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["height?", "left?", "top?", "width?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 select$1: function(arg0) { return this.select.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function(){return $._DOMApplicationCacheEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 update$0: function(){return this.update();}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?", "name?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'String');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token){return this.add(token);},
 remove$1: function(token){return this.remove(token);},
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file,type){return this.add(data_OR_file,type);},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function(){return $._DedicatedWorkerContextEventsImpl$(this);},
 postMessage$2: function(message,messagePorts){return this.postMessage(message,messagePorts);},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 get$on: function(){return $._DocumentEventsImpl$(this);},
 $dom_createElement$1: function(tagName){return this.createElement(tagName);},
 $dom_getElementById$1: function(elementId){return this.getElementById(elementId);},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);},
 query$1: function(selectors){if($.CTC.hasMatch$1(selectors)===true)return this.$dom_getElementById$1($.substring$1(selectors,1));return this.$dom_querySelector$1(selectors);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors){return this.$dom_querySelector$1(selectors);},
 get$rect: function(){return $._createMeasurementFuture(new $._DocumentFragmentImpl_rect_anon(),$.CompleterImpl$('ElementRect'));},
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().call$4(arg0, arg1, arg2, arg3); },
 get$translate: function(){return false;},
 translate$2: function(arg0, arg1) { return this.get$translate().call$2(arg0, arg1); },
 get$id: function(){return '';},
 get$parent: function(){return;},
 get$on: function(){return $._ElementEventsImpl$(this);},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["id?"], {
 query$1: function(selectors){return this.$dom_querySelector$1(selectors);},
 get$rect: function(){return $._createMeasurementFuture(new $._ElementImpl_rect_anon(this),$.CompleterImpl$('ElementRect'));},
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().call$4(arg0, arg1, arg2, arg3); },
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._ElementEventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 translate$2: function(arg0, arg1) { return this.translate.call$2(arg0, arg1); },
 get$$$dom_clientHeight: function(){return this.clientHeight;},
 get$$$dom_clientLeft: function(){return this.clientLeft;},
 get$$$dom_clientTop: function(){return this.clientTop;},
 get$$$dom_clientWidth: function(){return this.clientWidth;},
 get$$$dom_offsetHeight: function(){return this.offsetHeight;},
 get$$$dom_offsetLeft: function(){return this.offsetLeft;},
 get$$$dom_offsetTop: function(){return this.offsetTop;},
 get$$$dom_offsetWidth: function(){return this.offsetWidth;},
 get$$$dom_scrollHeight: function(){return this.scrollHeight;},
 get$$$dom_scrollLeft: function(){return this.scrollLeft;},
 get$$$dom_scrollTop: function(){return this.scrollTop;},
 get$$$dom_scrollWidth: function(){return this.scrollWidth;},
 $dom_getBoundingClientRect$0: function(){return this.getBoundingClientRect();},
 $dom_getClientRects$0: function(){return this.getClientRects();},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 moveTo$4: function(parent,name,successCallback,errorCallback){return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback,1),$.convertDartClosureToJS(errorCallback,1));},
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
},
 remove$2: function(successCallback,errorCallback){return this.remove($.convertDartClosureToJS(successCallback,0),$.convertDartClosureToJS(errorCallback,1));},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 moveTo$2: function(parent,name){return this.moveTo(parent,name);},
 remove$0: function(){return this.remove();}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('EventException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('EventSource', [], {
 get$on: function(){return $._EventSourceEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._EventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 $dom_addEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
},
 $dom_removeEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
}
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'File');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 get$on: function(){return $._FileReaderEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('FileWriter', ["length?"], {
 get$on: function(){return $._FileWriterEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'num');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'num');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?", "name?"], {
 reset$0: function(){return this.reset();},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["height?", "name?", "width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function(){return $._FrameSetElementEventsImpl$(this);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Node');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function(){return this.length;},
 set$length: function(value){this.length = value;},
 remove$1: function(index){return this.remove(index);},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 get$on: function(){return $._HttpRequestEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('XMLHttpRequestException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function(){return $._HttpRequestUploadEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function(){return $._convertNativeToDart_IDBKey(this.get$_key());},
 get$_key: function(){return this.key;}
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function(){return $._convertNativeToDart_IDBAny(this.get$_lib_value());},
 get$_lib_value: function(){return this.value;}
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 get$on: function(){return $._IDBDatabaseEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('IDBDatabaseException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBKeyRange', [], {
 is$IDBKeyRange: function() { return true; }
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 add$2: function(value,key){if(!$.eqB($.CTC2,key))return this._add_1$2($._convertDartToNative_SerializedScriptValue(value),key);return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC2)
},
 _add_1$2: function(value,key){return this.add(value,key);},
 _add_2$1: function(value){return this.add(value);},
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function(){return $._IDBOpenDBRequestEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('IDBRequest', [], {
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._IDBRequestEventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 $dom_addEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
},
 $dom_removeEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
}
});

$.$defineNativeClass('IDBTransaction', [], {
 get$on: function(){return $._IDBTransactionEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function(){return $._IDBVersionChangeRequestEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLIFrameElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["height?", "width?"], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["height=", "name?", "width=", "x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["height=", "name?", "value=", "width="], {
 get$on: function(){return $._InputElementEventsImpl$(this);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function(){return $._JavaScriptAudioNodeEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('KeyboardEvent', ["shiftKey?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('Location', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function(){return $._MediaElementEventsImpl$(this);},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'String');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('MediaStream', [], {
 get$on: function(){return $._MediaStreamEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
},
 $dom_removeEventListener$3: function(type,listener,useCapture){  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', [], {
 get$on: function(){return $._MediaStreamTrackEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function(){return $._MediaStreamTrackListEventsImpl$(this);},
 add$1: function(track){return this.add(track);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 remove$1: function(track){return this.remove(track);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function(){return $._MessagePortEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 postMessage$2: function(message,messagePorts){return this.postMessage(message,messagePorts);},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["shiftKey?", "x?", "y?"], {
 get$offsetX: function(){if(!!this.offsetX)return this.get$_offsetX();else{var target=this.target;if(!(typeof target==='object'&&target!==null&&target.is$Element()))throw $.$$throw($.CTC19);return $.sub(this.clientX,target.$dom_getBoundingClientRect$0().get$left());}},
 get$offsetY: function(){if(!!this.offsetY)return this.get$_offsetY();else{var target=this.target;if(!(typeof target==='object'&&target!==null&&target.is$Element()))throw $.$$throw($.CTC19);return $.sub(this.clientY,target.$dom_getBoundingClientRect$0().get$top());}},
 get$_offsetX: function(){return this.offsetX},
 get$_offsetY: function(){return this.offsetY}
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Node');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 remove$0: function(){if(!(this.get$parent()==null))this.get$parent().$dom_removeChild$1(this);return this;},
 get$parent: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {return this.parentNode;}  } else {
    return Object.prototype.get$parent.call(this);
  }
},
 set$text: function(value){this.textContent = value;},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_appendChild$1: function(newChild){return this.appendChild(newChild);},
 $dom_removeChild$1: function(oldChild){return this.removeChild(oldChild);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_replaceChild$2: function(newChild,oldChild){return this.replaceChild(newChild,oldChild);}
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Node');},
 add$1: function(value){this._parent.$dom_appendChild$1(value);},
 addLast$1: function(value){this._parent.$dom_appendChild$1(value);},
 removeLast$0: function(){var result=this.last$0();if(!(result==null))this._parent.$dom_removeChild$1(result);return result;},
 clear$0: function(){this._parent.set$text('');},
 operator$indexSet$2: function(index,value){this._parent.$dom_replaceChild$2(value,this.operator$index$1(index));},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 last$0: function(){return this.operator$index$1($.sub($.get$length(this),1));},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));},
 operator$index$1: function(index){return this[index];},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function(){return $._NotificationEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 get$on: function(){return $._PeerConnection00EventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('WebKitPoint', ["x?", "y?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('RangeException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('Rect', ["left?", "top?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', ["rootElement?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function(){return this.id;},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function(){return $._SVGElementInstanceEventsImpl$(this);}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('SVGFEBlendElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGLineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMatrix', [], {
 translate$2: function(x,y){return this.translate(x,y);}
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPatternElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["height=", "width=", "x?", "y?"], {
});

$.$defineNativeClass('SVGRectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGUseElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewSpec', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('Screen', ["height?", "width?"], {
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function(){return $._SharedWorkerContextEventsImpl$(this);}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function(){return $._SpeechRecognitionEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key){return !(this.$dom_getItem$1(key)==null);},
 operator$index$1: function(key){return this.$dom_getItem$1(key);},
 operator$indexSet$2: function(key,value){return this.$dom_setItem$2(key,value);},
 putIfAbsent$2: function(key,ifAbsent){if(this.containsKey$1(key)!==true)this.operator$indexSet$2(key,ifAbsent.call$0());return this.operator$index$1(key);},
 remove$1: function(key){var value=this.operator$index$1(key);this.$dom_removeItem$1(key);return value;},
 clear$0: function(){return this.$dom_clear$0();},
 forEach$1: function(f){for(var i=0;true;++i){var key=this.$dom_key$1(i);if(key==null)return;f.call$2(key,this.operator$index$1(key));}},
 getKeys$0: function(){var keys=[];this.forEach$1(new $._StorageImpl_getKeys_anon(keys));return keys;},
 getValues$0: function(){var values=[];this.forEach$1(new $._StorageImpl_getValues_anon(values));return values;},
 get$length: function(){return this.get$$$dom_length();},
 isEmpty$0: function(){return this.$dom_key$1(0)==null;},
 get$$$dom_length: function(){return this.length;},
 $dom_clear$0: function(){return this.clear();},
 $dom_getItem$1: function(key){return this.getItem(key);},
 $dom_key$1: function(index){return this.key(index);},
 $dom_removeItem$1: function(key){return this.removeItem(key);},
 $dom_setItem$2: function(key,data){return this.setItem(key,data);},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'StyleSheet');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function(){return $._TextTrackEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('TextTrackCue', ["id?", "text!"], {
 get$on: function(){return $._TextTrackCueEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function(){return $._TextTrackListEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchEvent', ["shiftKey?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){throw $.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Touch');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){throw $.$$throw($.CTC1);},
 addLast$1: function(value){throw $.$$throw($.CTC1);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 removeLast$0: function(){throw $.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){throw $.$$throw($.CTC30);},
 insertRange$3: function(start,rangeLength,initialValue){throw $.$$throw($.CTC32);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('WebSocket', [], {
 get$on: function(){return $._WebSocketEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$2: function(code,reason){return this.close(code,reason);},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('DOMWindow', ["length?", "name?", "navigator?"], {
 get$_top: function(){return this.top;},
 get$top: function(){return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());},
 requestAnimationFrame$1: function(callback){this._ensureRequestAnimationFrame$0();return this._requestAnimationFrame$1(callback);},
 _requestAnimationFrame$1: function(callback){return this.requestAnimationFrame($.convertDartClosureToJS(callback,1));},
 _ensureRequestAnimationFrame$0: function(){   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
},
 get$on: function(){return $._WindowEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 moveTo$2: function(x,y){return this.moveTo(x,y);},
 postMessage$3: function(message,targetOrigin,messagePorts){return this.postMessage(message,targetOrigin,messagePorts);},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 setInterval$2: function(handler,timeout){return this.setInterval($.convertDartClosureToJS(handler,0),timeout);},
 setTimeout$2: function(handler,timeout){return this.setTimeout($.convertDartClosureToJS(handler,0),timeout);}
});

$.$defineNativeClass('Worker', [], {
 get$on: function(){return $._WorkerEventsImpl$(this);},
 postMessage$2: function(message,messagePorts){return this.postMessage(message,messagePorts);},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._WorkerContextEventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 setInterval$2: function(handler,timeout){return this.setInterval($.convertDartClosureToJS(handler,0),timeout);},
 setTimeout$2: function(handler,timeout){return this.setTimeout($.convertDartClosureToJS(handler,0),timeout);}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["message?", "name?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function(){return this.reset();}
});

$.$defineNativeClass('Worker', [], {
 get$id: function(){return this.id;},
 postMessage$1: function(msg){return this.postMessage(msg);}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler,timeout){return this.setTimeout($.convertDartClosureToJS(handler,0),timeout);},
 setInterval$2: function(handler,timeout){return this.setInterval($.convertDartClosureToJS(handler,0),timeout);}
});

// 337 dynamic classes.
// 355 classes
// 30 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
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
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter =   function(field, prototype) {
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
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
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
    if (supportsProto) {
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

//@ sourceMappingURL=click_demo.dart.js.map