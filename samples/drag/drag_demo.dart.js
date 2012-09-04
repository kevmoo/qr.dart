function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["millisecondsSinceEpoch?", "isUtc"],
 "super": "Object",
 operator$eq$1: function(other){if(!(typeof other==='object'&&other!==null&&!!other.is$Date))return false;return $.eq(this.millisecondsSinceEpoch,other.get$millisecondsSinceEpoch());},
 operator$lt$1: function(other){return $.lt(this.millisecondsSinceEpoch,other.get$millisecondsSinceEpoch());},
 operator$le$1: function(other){return $.le(this.millisecondsSinceEpoch,other.get$millisecondsSinceEpoch());},
 operator$gt$1: function(other){return $.gt(this.millisecondsSinceEpoch,other.get$millisecondsSinceEpoch());},
 operator$ge$1: function(other){return $.ge(this.millisecondsSinceEpoch,other.get$millisecondsSinceEpoch());},
 hashCode$0: function(){return this.millisecondsSinceEpoch;},
 toString$0: function(){var t1=new $.DateImplementation_toString_fourDigits();var t2=new $.DateImplementation_toString_threeDigits();var t3=new $.DateImplementation_toString_twoDigits();var y=t1.call$1(this.get$year());var m=t3.call$1(this.get$month());var d=t3.call$1(this.get$day());var h=t3.call$1(this.get$hour());var min=t3.call$1(this.get$minute());var sec=t3.call$1(this.get$second());var ms=t2.call$1(this.get$millisecond());if(this.isUtc===true)return $.S(y)+'-'+$.S(m)+'-'+$.S(d)+' '+$.S(h)+':'+$.S(min)+':'+$.S(sec)+'.'+$.S(ms)+'Z';else return $.S(y)+'-'+$.S(m)+'-'+$.S(d)+' '+$.S(h)+':'+$.S(min)+':'+$.S(sec)+'.'+$.S(ms);},
 add$1: function(duration){return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch,duration.get$inMilliseconds()),this.isUtc);},
 difference$1: function(other){var ms=this.millisecondsSinceEpoch;if(typeof ms!=='number')return this.difference$1$bailout(1,other,ms);var otherMs=other.millisecondsSinceEpoch;if(typeof otherMs!=='number')return this.difference$1$bailout(2,ms,otherMs);return $.DurationImplementation$(0,0,0,0,ms-otherMs);},
 difference$1$bailout: function(state,env0,env1){switch(state){case 1:var other=env0;ms=env1;break;case 2:ms=env0;otherMs=env1;break;}switch(state){case 0:var ms=this.millisecondsSinceEpoch;case 1:state=0;var otherMs=other.millisecondsSinceEpoch;case 2:state=0;return $.DurationImplementation$(0,0,0,0,$.sub(ms,otherMs));}},
 get$year: function(){return $.Primitives_getYear(this);},
 get$month: function(){return $.Primitives_getMonth(this);},
 get$day: function(){return $.Primitives_getDay(this);},
 get$hour: function(){return $.Primitives_getHours(this);},
 get$minute: function(){return $.Primitives_getMinutes(this);},
 get$second: function(){return $.Primitives_getSeconds(this);},
 get$millisecond: function(){return $.Primitives_getMilliseconds(this);},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch,isUtc){var t1=this.millisecondsSinceEpoch;if($.gtB($.abs(t1),8640000000000000))$.$$throw($.IllegalArgumentException$(t1));t1=this.isUtc;if(t1==null)$.$$throw($.IllegalArgumentException$(t1));},
 DateImplementation$now$0: function(){$.Primitives_lazyAsJsDate(this);},
 is$Date: true
};

$$.DurationImplementation = {"":
 ["inMilliseconds?"],
 "super": "Object",
 get$inHours: function(){return $.tdiv(this.inMilliseconds,3600000);},
 get$inMinutes: function(){return $.tdiv(this.inMilliseconds,60000);},
 get$inSeconds: function(){return $.tdiv(this.inMilliseconds,1000);},
 operator$eq$1: function(other){if(!(typeof other==='object'&&other!==null&&!!other.is$Duration))return false;return $.eq(this.inMilliseconds,other.get$inMilliseconds());},
 hashCode$0: function(){return $.hashCode(this.inMilliseconds);},
 toString$0: function(){var t1=new $.DurationImplementation_toString_threeDigits();var t2=new $.DurationImplementation_toString_twoDigits();var t3=this.inMilliseconds;if($.ltB(t3,0))return '-'+$.S($.DurationImplementation$(0,0,0,0,$.neg(t3)));var twoDigitMinutes=t2.call$1($.remainder(this.get$inMinutes(),60));var twoDigitSeconds=t2.call$1($.remainder(this.get$inSeconds(),60));var threeDigitMs=t1.call$1($.remainder(t3,1000));return $.S(this.get$inHours())+':'+$.S(twoDigitMinutes)+':'+$.S(twoDigitSeconds)+'.'+$.S(threeDigitMs);},
 is$Duration: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 "super": "Object",
 toString$0: function(){var t1=this._msg;return t1==null?'Exception':'Exception: '+$.S(t1);},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib0_value?", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 "super": "Object",
 get$value: function(){if(this.get$isComplete()!==true)$.$$throw($.FutureNotCompleteException$());var t1=this._exception;if(!(t1==null))$.$$throw(t1);return this._lib0_value;},
 get$exception: function(){if(this.get$isComplete()!==true)$.$$throw($.FutureNotCompleteException$());return this._exception;},
 get$stackTrace: function(){if(this.get$isComplete()!==true)$.$$throw($.FutureNotCompleteException$());return this._stackTrace;},
 get$isComplete: function(){return this._isComplete;},
 get$hasValue: function(){return this.get$isComplete()===true&&this._exception==null;},
 then$1: function(onSuccess){if(this.get$hasValue()===true)onSuccess.call$1(this.get$value());else if(this.get$isComplete()!==true)this._successListeners.push(onSuccess);else if(this._exceptionHandled!==true)$.$$throw(this._exception);},
 handleException$1: function(onException){if(this._exceptionHandled===true)return;if(this._isComplete===true){var t1=this._exception;if(!(t1==null))this._exceptionHandled=onException.call$1(t1);}else this._exceptionHandlers.push(onException);},
 _complete$0: function(){this._isComplete=true;try{if(!(this._exception==null))for(var t1=$.iterator(this._exceptionHandlers);t1.hasNext$0()===true;){var handler=t1.next$0();if($.eqB(handler.call$1(this._exception),true)){this._exceptionHandled=true;break;}}if(this.get$hasValue()===true)for(t1=$.iterator(this._successListeners);t1.hasNext$0()===true;){var listener=t1.next$0();listener.call$1(this.get$value());}else if(this._exceptionHandled!==true&&$.gtB($.get$length(this._successListeners),0))$.$$throw(this._exception);}finally{for(t1=$.iterator(this._completionListeners);t1.hasNext$0()===true;){var listener0=t1.next$0();try{listener0.call$1(this);}catch(exception){$.unwrapException(exception);}}}},
 _setValue$1: function(value){if(this._isComplete===true)$.$$throw($.FutureAlreadyCompleteException$());this._lib0_value=value;this._complete$0();},
 _setException$2: function(exception,stackTrace){if(exception==null)$.$$throw($.IllegalArgumentException$(null));if(this._isComplete===true)$.$$throw($.FutureAlreadyCompleteException$());this._exception=exception;this._stackTrace=stackTrace;this._complete$0();}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 "super": "Object",
 get$future: function(){return this._futureImpl;},
 complete$1: function(value){this._futureImpl._setValue$1(value);},
 get$complete: function() { return new $.BoundClosure(this, 'complete$1'); },
 completeException$2: function(exception,stackTrace){this._futureImpl._setException$2(exception,stackTrace);},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 "super": "Object",
 _probeForAdding$1: function(key){var t1=$.hashCode(key);if(t1!==(t1|0))return this._probeForAdding$1$bailout(1,key,t1,0,0,0);var t3=$.get$length(this._keys);if(t3!==(t3|0))return this._probeForAdding$1$bailout(2,key,t1,t3,0,0);var hash=(t1&t3-1)>>>0;for(var numberOfProbes=1,insertionIndex=-1;true;){t1=this._keys;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this._probeForAdding$1$bailout(3,key,hash,numberOfProbes,insertionIndex,t1);if(hash<0||hash>=t1.length)$.ioore(hash);var existingKey=t1[hash];if(existingKey==null){if(insertionIndex<0)return hash;return insertionIndex;}else if($.eqB(existingKey,key))return hash;else if(insertionIndex<0&&$.CTC14===existingKey)insertionIndex=hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));if(hash!==(hash|0))return this._probeForAdding$1$bailout(4,numberOfProbes0,key,insertionIndex,hash,0);numberOfProbes=numberOfProbes0;}},
 _probeForAdding$1$bailout: function(state,env0,env1,env2,env3,env4){switch(state){case 1:var key=env0;t1=env1;break;case 2:key=env0;t1=env1;t3=env2;break;case 3:key=env0;hash=env1;numberOfProbes=env2;insertionIndex=env3;t1=env4;break;case 4:numberOfProbes0=env0;key=env1;insertionIndex=env2;hash=env3;break;}switch(state){case 0:var t1=$.hashCode(key);case 1:state=0;var t3=$.get$length(this._keys);case 2:state=0;var hash=$.and(t1,$.sub(t3,1));var numberOfProbes=1;var insertionIndex=-1;default:L0:while(true)switch(state){case 0:if(!true)break L0;t1=this._keys;case 3:state=0;var existingKey=$.index(t1,hash);if(existingKey==null){if($.ltB(insertionIndex,0))return hash;return insertionIndex;}else if($.eqB(existingKey,key))return hash;else if($.ltB(insertionIndex,0)&&$.CTC14===existingKey)insertionIndex=hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));case 4:state=0;numberOfProbes=numberOfProbes0;}}},
 _probeForLookup$1: function(key){var hash=$.and($.hashCode(key),$.sub($.get$length(this._keys),1));if(hash!==(hash|0))return this._probeForLookup$1$bailout(1,key,hash);for(var numberOfProbes=1;true;){var existingKey=$.index(this._keys,hash);if(existingKey==null)return -1;if($.eqB(existingKey,key))return hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));numberOfProbes=numberOfProbes0;}},
 _probeForLookup$1$bailout: function(state,key,hash){for(var numberOfProbes=1;true;){var existingKey=$.index(this._keys,hash);if(existingKey==null)return -1;if($.eqB(existingKey,key))return hash;var numberOfProbes0=numberOfProbes+1;hash=$.HashMapImplementation__nextProbe(hash,numberOfProbes,$.get$length(this._keys));numberOfProbes=numberOfProbes0;}},
 _ensureCapacity$0: function(){var newNumberOfEntries=$.add(this._numberOfEntries,1);if($.geB(newNumberOfEntries,this._loadLimit)){this._grow$1($.mul($.get$length(this._keys),2));return;}var numberOfFree=$.sub($.sub($.get$length(this._keys),newNumberOfEntries),this._numberOfDeleted);if($.gtB(this._numberOfDeleted,numberOfFree))this._grow$1($.get$length(this._keys));},
 _grow$1: function(newCapacity){var capacity=$.get$length(this._keys);if(typeof capacity!=='number')return this._grow$1$bailout(1,newCapacity,capacity,0,0);this._loadLimit=$.tdiv($.mul(newCapacity,3),4);var oldKeys=this._keys;if(typeof oldKeys!=='string'&&(typeof oldKeys!=='object'||oldKeys===null||oldKeys.constructor!==Array&&!oldKeys.is$JavaScriptIndexingBehavior()))return this._grow$1$bailout(2,newCapacity,oldKeys,capacity,0);var oldValues=this._values;if(typeof oldValues!=='string'&&(typeof oldValues!=='object'||oldValues===null||oldValues.constructor!==Array&&!oldValues.is$JavaScriptIndexingBehavior()))return this._grow$1$bailout(3,newCapacity,oldKeys,oldValues,capacity);this._keys=$.ListImplementation_List(newCapacity);this._values=$.ListImplementation_List(newCapacity,$.getRuntimeTypeInfo(this).V);for(var i=0;i<capacity;++i){if(i<0||i>=oldKeys.length)$.ioore(i);var key=oldKeys[i];if(key==null||key===$.CTC14)continue;if(i<0||i>=oldValues.length)$.ioore(i);var value=oldValues[i];var newIndex=this._probeForAdding$1(key);$.indexSet(this._keys,newIndex,key);$.indexSet(this._values,newIndex,value);}this._numberOfDeleted=0;},
 _grow$1$bailout: function(state,env0,env1,env2,env3){switch(state){case 1:var newCapacity=env0;capacity=env1;break;case 2:newCapacity=env0;oldKeys=env1;capacity=env2;break;case 3:newCapacity=env0;oldKeys=env1;oldValues=env2;capacity=env3;break;}switch(state){case 0:var capacity=$.get$length(this._keys);case 1:state=0;this._loadLimit=$.tdiv($.mul(newCapacity,3),4);var oldKeys=this._keys;case 2:state=0;var oldValues=this._values;case 3:state=0;this._keys=$.ListImplementation_List(newCapacity);this._values=$.ListImplementation_List(newCapacity,$.getRuntimeTypeInfo(this).V);for(var i=0;$.ltB(i,capacity);++i){var key=$.index(oldKeys,i);if(key==null||key===$.CTC14)continue;var value=$.index(oldValues,i);var newIndex=this._probeForAdding$1(key);$.indexSet(this._keys,newIndex,key);$.indexSet(this._values,newIndex,value);}this._numberOfDeleted=0;}},
 clear$0: function(){this._numberOfEntries=0;this._numberOfDeleted=0;var length$=$.get$length(this._keys);if(typeof length$!=='number')return this.clear$0$bailout(1,length$);for(var i=0;i<length$;++i){$.indexSet(this._keys,i,null);$.indexSet(this._values,i,null);}},
 clear$0$bailout: function(state,length$){for(var i=0;$.ltB(i,length$);++i){$.indexSet(this._keys,i,null);$.indexSet(this._values,i,null);}},
 operator$indexSet$2: function(key,value){this._ensureCapacity$0();var index=this._probeForAdding$1(key);var t1=this._keys;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.operator$indexSet$2$bailout(1,key,value,index,t1);if(index!==(index|0))$.iae(index);if(index<0||index>=t1.length)$.ioore(index);if(!(t1[index]==null)){if(index<0||index>=t1.length)$.ioore(index);var t2=t1[index]===$.CTC14;t1=t2;}else t1=true;if(t1){t1=this._numberOfEntries;if(typeof t1!=='number')return this.operator$indexSet$2$bailout(3,key,value,t1,index);this._numberOfEntries=t1+1;}t1=this._keys;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(4,key,value,t1,index);if(index<0||index>=t1.length)$.ioore(index);t1[index]=key;t1=this._values;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(5,value,t1,index,0);if(index<0||index>=t1.length)$.ioore(index);t1[index]=value;},
 operator$indexSet$2$bailout: function(state,env0,env1,env2,env3){switch(state){case 1:var key=env0;var value=env1;index=env2;t1=env3;break;case 2:key=env0;value=env1;index=env2;t1=env3;break;case 3:key=env0;value=env1;t1=env2;index=env3;break;case 4:key=env0;value=env1;t1=env2;index=env3;break;case 5:value=env0;t1=env1;index=env2;break;}switch(state){case 0:this._ensureCapacity$0();var index=this._probeForAdding$1(key);var t1=this._keys;case 1:state=0;case 2:if(state===2||state===0&&!($.index(t1,index)==null))switch(state){case 0:t1=this._keys;case 2:state=0;var t3=$.index(t1,index)===$.CTC14;t1=t3;}else t1=true;case 3:if(state===3||state===0&&t1)switch(state){case 0:t1=this._numberOfEntries;case 3:state=0;this._numberOfEntries=$.add(t1,1);}t1=this._keys;case 4:state=0;$.indexSet(t1,index,key);t1=this._values;case 5:state=0;$.indexSet(t1,index,value);}},
 operator$index$1: function(key){var index=this._probeForLookup$1(key);if($.ltB(index,0))return;return $.index(this._values,index);},
 remove$1: function(key){var index=this._probeForLookup$1(key);if($.geB(index,0)){this._numberOfEntries=$.sub(this._numberOfEntries,1);var value=$.index(this._values,index);$.indexSet(this._values,index,null);$.indexSet(this._keys,index,$.CTC14);this._numberOfDeleted=$.add(this._numberOfDeleted,1);return value;}return;},
 isEmpty$0: function(){return $.eq(this._numberOfEntries,0);},
 get$length: function(){return this._numberOfEntries;},
 forEach$1: function(f){var length$=$.get$length(this._keys);if(typeof length$!=='number')return this.forEach$1$bailout(1,f,length$);for(var i=0;i<length$;++i){var key=$.index(this._keys,i);if(!(key==null)&&!(key===$.CTC14))f.call$2(key,$.index(this._values,i));}},
 forEach$1$bailout: function(state,f,length$){for(var i=0;$.ltB(i,length$);++i){var key=$.index(this._keys,i);if(!(key==null)&&!(key===$.CTC14))f.call$2(key,$.index(this._values,i));}},
 getKeys$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).K);t1.i_10=0;this.forEach$1(new $.HashMapImplementation_getKeys__(list,t1));return list;},
 getValues$0: function(){var t1={};var list=$.ListImplementation_List($.get$length(this),$.getRuntimeTypeInfo(this).V);t1.i_1=0;this.forEach$1(new $.HashMapImplementation_getValues__(list,t1));return list;},
 containsKey$1: function(key){return !$.eqB(this._probeForLookup$1(key),-1);},
 toString$0: function(){return $.Maps_mapToString(this);},
 HashMapImplementation$0: function(){this._numberOfEntries=0;this._numberOfDeleted=0;this._loadLimit=6;this._keys=$.ListImplementation_List(8);this._values=$.ListImplementation_List(8,$.getRuntimeTypeInfo(this).V);},
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
 operator$indexSet$2: function(key,value){if(this._map.containsKey$1(key)===true){var t1=this._map;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.operator$indexSet$2$bailout(1,key,value,t1);if(key!==(key|0))$.iae(key);if(key<0||key>=t1.length)$.ioore(key);t1[key].get$element().set$value(value);}else{$.addLast(this._list,$.KeyValuePair$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V));t1=this._map;if(typeof t1!=='object'||t1===null||(t1.constructor!==Array||!!t1.immutable$list)&&!t1.is$JavaScriptIndexingBehavior())return this.operator$indexSet$2$bailout(2,key,t1,0);var t3=this._list.lastEntry$0();if(key!==(key|0))$.iae(key);if(key<0||key>=t1.length)$.ioore(key);t1[key]=t3;}},
 operator$indexSet$2$bailout: function(state,env0,env1,env2){switch(state){case 1:var key=env0;var value=env1;t1=env2;break;case 2:key=env0;t1=env1;break;}switch(state){case 0:default:if(state===1||state===0&&this._map.containsKey$1(key)===true)switch(state){case 0:var t1=this._map;case 1:state=0;$.index(t1,key).get$element().set$value(value);}else switch(state){case 0:$.addLast(this._list,$.KeyValuePair$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V));t1=this._map;case 2:state=0;$.indexSet(t1,key,this._list.lastEntry$0());}}},
 operator$index$1: function(key){var entry=$.index(this._map,key);if(entry==null)return;return entry.get$element().get$value();},
 remove$1: function(key){var entry=this._map.remove$1(key);if(entry==null)return;entry.remove$0();return entry.get$element().get$value();},
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
 ["_previous=", "_next=", "_lib0_element?"],
 "super": "Object",
 _link$2: function(p,n){this._next=n;this._previous=p;p.set$_next(this);n.set$_previous(this);},
 prepend$1: function(e){$.DoubleLinkedQueueEntry$(e,$.getRuntimeTypeInfo(this).E)._link$2(this._previous,this);},
 remove$0: function(){var t1=this._next;this._previous.set$_next(t1);t1=this._previous;this._next.set$_previous(t1);this._next=null;this._previous=null;return this._lib0_element;},
 _asNonSentinelEntry$0: function(){return this;},
 previousEntry$0: function(){return this._previous._asNonSentinelEntry$0();},
 get$element: function(){return this._lib0_element;},
 DoubleLinkedQueueEntry$1: function(e){this._lib0_element=e;}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_lib0_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function(){$.$$throw($.CTC15);},
 _asNonSentinelEntry$0: function(){return;},
 get$element: function(){$.$$throw($.CTC15);},
 _DoubleLinkedQueueEntrySentinel$0: function(){this._link$2(this,this);}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value){this._sentinel.prepend$1(value);},
 add$1: function(value){this.addLast$1(value);},
 removeLast$0: function(){return this._sentinel.get$_previous().remove$0();},
 removeFirst$0: function(){return this._sentinel.get$_next().remove$0();},
 lastEntry$0: function(){return this._sentinel.previousEntry$0();},
 get$length: function(){var t1={};t1.counter_1=0;this.forEach$1(new $.DoubleLinkedQueue_length__(t1));return t1.counter_1;},
 isEmpty$0: function(){var t1=this._sentinel.get$_next();var t2=this._sentinel;return t1==null?t2==null:t1===t2;},
 clear$0: function(){var t1=this._sentinel;t1.set$_next(t1);t1=this._sentinel;t1.set$_previous(t1);},
 forEach$1: function(f){var entry=this._sentinel.get$_next();for(;t1=this._sentinel,!(entry==null?t1==null:entry===t1);){var nextEntry=entry.get$_next();f.call$1(entry.get$_lib0_element());entry=nextEntry;}var t1;},
 iterator$0: function(){return $._DoubleLinkedQueueIterator$(this._sentinel,$.getRuntimeTypeInfo(this).E);},
 toString$0: function(){return $.Collections_collectionToString(this);},
 DoubleLinkedQueue$0: function(){this._sentinel=$._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function(){var t1=this._currentEntry.get$_next();var t2=this._sentinel;return !(t1==null?t2==null:t1===t2);},
 next$0: function(){if(this.hasNext$0()!==true)$.$$throw($.CTC12);this._currentEntry=this._currentEntry.get$_next();return this._currentEntry.get$element();},
 _DoubleLinkedQueueIterator$1: function(_sentinel){this._currentEntry=this._sentinel;}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib0_pattern"],
 "super": "Object",
 firstMatch$1: function(str){var m=$.regExpExec(this,$.checkString(str));if(m==null)return;var matchStart=$.regExpMatchStart(m);var t1=$.get$length($.index(m,0));if(typeof t1!=='number')$.iae(t1);var matchEnd=matchStart+t1;return $._MatchImplementation$(this.get$pattern(),str,matchStart,matchEnd,m);},
 hasMatch$1: function(str){return $.regExpTest(this,$.checkString(str));},
 get$pattern: function(){return this._lib0_pattern;},
 get$multiLine: function(){return this._multiLine;},
 get$ignoreCase: function(){return this._ignoreCase;},
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

$$._MatchImplementation = {"":
 ["pattern", "str", "_start", "_end", "_groups"],
 "super": "Object",
 group$1: function(index){return $.index(this._groups,index);},
 operator$index$1: function(index){return this.group$1(index);}
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
 toString$0: function(){var sb=$.StringBufferImpl$('');var t1=this._arguments;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.toString$0$bailout(1,t1,sb);var i=0;for(;i<t1.length;++i){if(i>0)sb.add$1(', ');if(i<0||i>=t1.length)$.ioore(i);sb.add$1(t1[i]);}t1=this._existingArgumentNames;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.toString$0$bailout(2,sb,t1);var actualParameters=sb.toString$0();sb=$.StringBufferImpl$('');for(i=0;i<t1.length;++i){if(i>0)sb.add$1(', ');if(i<0||i>=t1.length)$.ioore(i);sb.add$1(t1[i]);}var formalParameters=sb.toString$0();t1=this._functionName;return 'NoSuchMethodException: incorrect number of arguments passed to method named \''+$.S(t1)+'\'\nReceiver: '+$.S(this._receiver)+'\n'+'Tried calling: '+$.S(t1)+'('+$.S(actualParameters)+')\n'+'Found: '+$.S(t1)+'('+$.S(formalParameters)+')';},
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

$$.FormatException = {"":
 ["message?"],
 "super": "Object",
 toString$0: function(){return 'FormatException: '+$.S(this.message);},
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
 next$0: function(){if(this.hasNext$0()!==true)$.$$throw($.NoMoreElementsException$());var value=this.list[this.i];var t1=this.i;if(typeof t1!=='number')return this.next$0$bailout(1,t1,value);this.i=t1+1;return value;},
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
 toString$0: function(){return 'Closure';}
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_lib4_set?"],
 "super": "Object",
 _lib4_set$2: function(arg0, arg1) { return this._lib4_set.call$2(arg0, arg1); }
};

$$.DraggerDemo = {"":
 ["_canvas", "_stage", "_tx", "_dragger", "_demoMapper", "_mouseLocation", "_frameRequested", "_overShape"],
 "super": "Object",
 requestFrame$0: function(){if(this._frameRequested!==true){this._frameRequested=true;$.window().requestAnimationFrame$1(this.get$_onFrame());}},
 _onStageInvalidated$1: function(args){this.requestFrame$0();},
 get$_onStageInvalidated: function() { return new $.BoundClosure(this, '_onStageInvalidated$1'); },
 _onDrag$1: function(delta){var t1=this._tx;t1.translate$2(delta.get$x(),delta.get$y());t1=t1.get$translateVector();this._demoMapper.set$input(t1);this.requestFrame$0();},
 get$_onDrag: function() { return new $.BoundClosure(this, '_onDrag$1'); },
 _onDragStart$1: function(e){if(this._overShape!==true)e.cancel$0();},
 get$_onDragStart: function() { return new $.BoundClosure(this, '_onDragStart$1'); },
 _onFrame$1: function(highResTime){var t1=this._stage;t1.draw$0();var ctx=t1.get$ctx();ctx.save$0();ctx.set$fillStyle('black');ctx.set$shadowColor('white');ctx.set$shadowBlur(2);ctx.set$shadowOffsetX(1);ctx.set$shadowOffsetY(1);ctx.set$font('20px Fixed, monospace');t1=this._demoMapper;var inputText=' Input: '+$.S(t1.get$input());var outputText='Output: '+$.S(t1.get$output());var t2=this._canvas;var bottom=t2.get$height();t2.get$width();ctx.fillText$3(inputText,10,$.sub(bottom,40));ctx.fillText$3(outputText,10,$.sub(bottom,20));ctx.restore$0();this._frameRequested=false;this.requestFrame$0();},
 get$_onFrame: function() { return new $.BoundClosure(this, '_onFrame$1'); },
 _canvas_mouseMove$1: function(e){this._setMouse$1($.getMouseEventCoordinate(e));},
 get$_canvas_mouseMove: function() { return new $.BoundClosure(this, '_canvas_mouseMove$1'); },
 _canvas_mouseOut$1: function(e){this._setMouse$1(null);},
 get$_canvas_mouseOut: function() { return new $.BoundClosure(this, '_canvas_mouseOut$1'); },
 _setMouse$1: function(value){this._mouseLocation=value;var hits=$.Mouse_markMouseOver(this._stage,this._mouseLocation);if(!(hits==null))if($.gtB($.get$length(hits),0)){var t1=$.index(hits,0);t1=typeof t1==='object'&&t1!==null&&!!t1.is$ImgElement;}else t1=false;else t1=false;var t2=this._canvas;if(t1){t2.get$style().set$cursor('pointer');this._overShape=true;}else{t2.get$style().set$cursor('auto');this._overShape=false;}this.requestFrame$0();},
 DraggerDemo$_internal$4: function(_canvas,_stage,_tx,_dragger){var t1=this._canvas;$.add$1(t1.get$on().get$mouseMove(),this.get$_canvas_mouseMove());$.add$1(t1.get$on().get$mouseOut(),this.get$_canvas_mouseOut());var t2=this._dragger;$.add$1(t2.get$dragDelta(),this.get$_onDrag());$.add$1(t2.get$dragStart(),this.get$_onDragStart());$.add$1(this._demoMapper.get$outputChanged(),new $.anon1(this));$.add$1(this._stage.get$invalidated(),this.get$_onStageInvalidated());}
};

$$._DemoValue = {"":
 ["_sendPort", "_completer", "_innerFuture", "_input", "_future", "_output", "_pending", "_outputChangedHandle", "_inputChangedHandle", "_errorHandle"],
 "super": "SendPortValue"
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
 get$blur: function(){return this.operator$index$1('blur');},
 get$load: function(){return this.operator$index$1('load');},
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
 get$blur: function(){return this.operator$index$1('blur');},
 get$dragStart: function(){return this.operator$index$1('dragstart');},
 get$input: function(){return this.operator$index$1('input');},
 get$load: function(){return this.operator$index$1('load');},
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
 get$blur: function(){return this.operator$index$1('blur');},
 get$dragStart: function(){return this.operator$index$1('dragstart');},
 get$input: function(){return this.operator$index$1('input');},
 get$load: function(){return this.operator$index$1('load');},
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
 remove$2: function(listener,useCapture){this._remove$2(listener,useCapture);return this;},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener,useCapture){this._ptr.$dom_addEventListener$3(this._type,listener,useCapture);},
 _remove$2: function(listener,useCapture){this._ptr.$dom_removeEventListener$3(this._type,listener,useCapture);}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$load: function(){return this.operator$index$1('load');}
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$blur: function(){return this.operator$index$1('blur');},
 get$load: function(){return this.operator$index$1('load');},
 get$message: function(){return this.operator$index$1('message');}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$load: function(){return this.operator$index$1('load');}
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$load: function(){return this.operator$index$1('load');}
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
 get$blur: function(){return this.operator$index$1('blur');},
 get$dragStart: function(){return this.operator$index$1('dragstart');},
 get$input: function(){return this.operator$index$1('input');},
 get$load: function(){return this.operator$index$1('load');},
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
 get$blur: function(){return this.operator$index$1('blur');},
 get$dragStart: function(){return this.operator$index$1('dragstart');},
 get$input: function(){return this.operator$index$1('input');},
 get$load: function(){return this.operator$index$1('load');},
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
 blur$0: function(){return $._DOMWindowCrossFrameImpl__blur(this._window);},
 get$blur: function() { return new $.BoundClosure0(this, 'blur$0'); },
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
 next$0: function(){if(this.hasNext$0()!==true)$.$$throw($.CTC12);var t1=this._array;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.next$0$bailout(1,t1,0);var t3=this._pos;if(typeof t3!=='number')return this.next$0$bailout(2,t1,t3);this._pos=t3+1;if(t3!==(t3|0))$.iae(t3);if(t3<0||t3>=t1.length)$.ioore(t3);return t1[t3];},
 next$0$bailout: function(state,env0,env1){switch(state){case 1:t1=env0;break;case 2:t1=env0;t3=env1;break;}switch(state){case 0:if(this.hasNext$0()!==true)$.$$throw($.CTC12);var t1=this._array;case 1:state=0;var t3=this._pos;case 2:state=0;this._pos=$.add(t3,1);return $.index(t1,t3);}}
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId=", "nextManagerId=", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
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
 ["id=", "ports?", "isolateStatics"],
 "super": "Object",
 initGlobals$0: function(){$initGlobals(this);},
 eval$1: function(code){var old=$._globalState().get$currentContext();$._globalState().set$currentContext(this);this._setGlobals$0();var result=null;try{result=code.call$0();}finally{var t1=old;$._globalState().set$currentContext(t1);t1=old;if(!(t1==null))t1._setGlobals$0();}return result;},
 _setGlobals$0: function(){$setGlobals(this);},
 lookup$1: function(portId){return $.index(this.ports,portId);},
 register$2: function(portId,port){if(this.ports.containsKey$1(portId)===true)$.$$throw($.ExceptionImplementation$('Registry: ports must be registered only once.'));$.indexSet(this.ports,portId,port);$.indexSet($._globalState().get$isolates(),this.id,this);},
 unregister$1: function(portId){this.ports.remove$1(portId);if($.isEmpty(this.ports)===true)$._globalState().get$isolates().remove$1(this.id);},
 _IsolateContext$0: function(){var t1=$._globalState();var t2=t1.get$nextIsolateId();t1.set$nextIsolateId($.add(t2,1));this.id=t2;this.ports=$.HashMapImplementation$('int','ReceivePort');this.initGlobals$0();}
};

$$._EventLoop = {"":
 ["events"],
 "super": "Object",
 enqueue$3: function(isolate,fn,msg){$.addLast(this.events,$._IsolateEvent$(isolate,fn,msg));},
 dequeue$0: function(){if($.isEmpty(this.events)===true)return;return this.events.removeFirst$0();},
 runIteration$0: function(){var event$=this.dequeue$0();if(event$==null){if($._globalState().get$isWorker()===true)$._globalState().maybeCloseWorker$0();else if(!($._globalState().get$rootContext()==null)&&$._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id())===true&&$._globalState().get$fromCommandLine()===true&&$.isEmpty($._globalState().get$rootContext().get$ports())===true)$.$$throw($.ExceptionImplementation$('Program exited with open ReceivePorts.'));return false;}event$.process$0();return true;},
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
 set$id: function(i){$.$$throw($.NotImplementedException$(null));},
 set$onmessage: function(f){$.$$throw($.ExceptionImplementation$('onmessage should not be set on MainManagerStub'));},
 postMessage$1: function(msg){$globalThis.postMessage(msg);},
 terminate$0: function(){}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 "super": "Object",
 _checkReplyTo$1: function(replyTo){if(!(replyTo==null)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_NativeJsSendPort)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_WorkerSendPort)&&!(typeof replyTo==='object'&&replyTo!==null&&!!replyTo.is$_BufferingSendPort))$.$$throw($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));},
 call$1: function(message){var completer=$.CompleterImpl$();var port=$._ReceivePortImpl$();this.send$2(message,port.toSendPort$0());port.receive$1(new $._BaseSendPort_call_anon(port,completer));return completer.get$future();},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message,replyTo){$._waitForPendingPorts([message,replyTo],new $._NativeJsSendPort_send_anon(this,message,replyTo));},
 send$1: function(message) {
  return this.send$2(message,null)
},
 operator$eq$1: function(other){return typeof other==='object'&&other!==null&&!!other.is$_NativeJsSendPort&&$.eqB(this._receivePort,other._receivePort);},
 hashCode$0: function(){return this._receivePort.get$_id();},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message,replyTo){$._waitForPendingPorts([message,replyTo],new $._WorkerSendPort_send_anon(this,message,replyTo));},
 send$1: function(message) {
  return this.send$2(message,null)
},
 operator$eq$1: function(other){if(typeof other==='object'&&other!==null&&!!other.is$_WorkerSendPort)var t1=$.eqB(this._workerId,other._workerId)&&$.eqB(this._isolateId,other._isolateId)&&$.eqB(this._receivePortId,other._receivePortId);else t1=false;return t1;},
 hashCode$0: function(){return $.xor($.xor($.shl(this._workerId,16),$.shl(this._isolateId,8)),this._receivePortId);},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._BufferingSendPort = {"":
 ["_id?", "_port!", "_futurePort?", "pending=", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message,replyTo){var t1=this._port;if(!(t1==null))t1.send$2(message,replyTo);else $.add$1(this.pending,$.makeLiteralMap(['message',message,'replyTo',replyTo]));},
 send$1: function(message) {
  return this.send$2(message,null)
},
 operator$eq$1: function(other){return typeof other==='object'&&other!==null&&!!other.is$_BufferingSendPort&&$.eqB(this._id,other._id);},
 hashCode$0: function(){return this._id;},
 _BufferingSendPort$2: function(isolateId,_futurePort){$._BufferingSendPort__idCount=$.add($._BufferingSendPort__idCount,1);this._futurePort.then$1(new $.anon0(this));},
 is$_BufferingSendPort: true,
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
 visitList$1: function(list){if(!($.index(this._visited,list)==null))return;$.indexSet(this._visited,list,true);$.forEach(list,new $._PendingSendPortFinder_visitList_anon(this));},
 visitMap$1: function(map){if(!($.index(this._visited,map)==null))return;$.indexSet(this._visited,map,true);$.forEach(map.getValues$0(),new $._PendingSendPortFinder_visitMap_anon(this));},
 visitSendPort$1: function(port){if(!!port.is$_BufferingSendPort&&port._port==null)this.ports.push(port.get$_futurePort());},
 _PendingSendPortFinder$0: function(){this._visited=$._JsVisitedMap$();}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 "super": "_Serializer",
 visitSendPort$1: function(x){if(typeof x==='object'&&x!==null&&!!x.is$_NativeJsSendPort)return this.visitNativeJsSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_WorkerSendPort)return this.visitWorkerSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_BufferingSendPort)return this.visitBufferingSendPort$1(x);$.$$throw('Illegal underlying port '+$.S(x));},
 visitNativeJsSendPort$1: function(port){return ['sendport',$._globalState().get$currentManagerId(),port._isolateId,port._receivePort.get$_id()];},
 visitWorkerSendPort$1: function(port){return ['sendport',port._workerId,port._isolateId,port._receivePortId];},
 visitBufferingSendPort$1: function(port){var t1=port._port;if(!(t1==null))return this.visitSendPort$1(t1);else $.$$throw('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');},
 _JsSerializer$0: function(){this._visited=$._JsVisitedMap$();}
};

$$._JsCopier = {"":
 ["_visited"],
 "super": "_Copier",
 visitSendPort$1: function(x){if(typeof x==='object'&&x!==null&&!!x.is$_NativeJsSendPort)return this.visitNativeJsSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_WorkerSendPort)return this.visitWorkerSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$_BufferingSendPort)return this.visitBufferingSendPort$1(x);$.$$throw('Illegal underlying port '+$.S(this.get$p()));},
 visitNativeJsSendPort$1: function(port){return $._NativeJsSendPort$(port._receivePort,port._isolateId);},
 visitWorkerSendPort$1: function(port){return $._WorkerSendPort$(port._workerId,port._isolateId,port._receivePortId);},
 visitBufferingSendPort$1: function(port){var t1=port._port;if(!(t1==null))return this.visitSendPort$1(t1);else $.$$throw('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');},
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
 traverse$1: function(x){if($._MessageTraverser_isPrimitive(x))return this.visitPrimitive$1(x);this._visited.reset$0();var result=null;try{result=this._dispatch$1(x);}finally{this._visited.cleanup$0();}return result;},
 _dispatch$1: function(x){if($._MessageTraverser_isPrimitive(x))return this.visitPrimitive$1(x);if(typeof x==='object'&&x!==null&&(x.constructor===Array||x.is$List()))return this.visitList$1(x);if(typeof x==='object'&&x!==null&&x.is$Map())return this.visitMap$1(x);if(typeof x==='object'&&x!==null&&!!x.is$SendPort)return this.visitSendPort$1(x);if(typeof x==='object'&&x!==null&&!!x.is$SendPortSync)return this.visitSendPortSync$1(x);return this.visitObject$1(x);},
 visitObject$1: function(x){$.$$throw('Message serialization: Illegal value '+$.S(x)+' passed');}
};

$$._Copier = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x){return x;},
 visitList$1: function(list){if(typeof list!=='object'||list===null||list.constructor!==Array&&!list.is$JavaScriptIndexingBehavior())return this.visitList$1$bailout(1,list);var copy=this._visited.operator$index$1(list);if(!(copy==null))return copy;var len=list.length;copy=$.ListImplementation_List(len);this._visited.operator$indexSet$2(list,copy);for(var i=0;i<len;++i){if(i<0||i>=list.length)$.ioore(i);var t1=this._dispatch$1(list[i]);if(i<0||i>=copy.length)$.ioore(i);copy[i]=t1;}return copy;},
 visitList$1$bailout: function(state,list){var copy=$.index(this._visited,list);if(!(copy==null))return copy;var len=$.get$length(list);copy=$.ListImplementation_List(len);$.indexSet(this._visited,list,copy);for(var i=0;$.ltB(i,len);++i){var t1=this._dispatch$1($.index(list,i));if(i<0||i>=copy.length)$.ioore(i);copy[i]=t1;}return copy;},
 visitMap$1: function(map){var t1={};t1.copy_10=$.index(this._visited,map);var t2=t1.copy_10;if(!(t2==null))return t2;t1.copy_10=$.HashMapImplementation$();$.indexSet(this._visited,map,t1.copy_10);map.forEach$1(new $._Copier_visitMap_anon(this,t1));return t1.copy_10;}
};

$$._Serializer = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x){return x;},
 visitList$1: function(list){var copyId=$.index(this._visited,list);if(!(copyId==null))return ['ref',copyId];var id=this._nextFreeRefId;this._nextFreeRefId=id+1;$.indexSet(this._visited,list,id);return ['list',id,this._serializeList$1(list)];},
 visitMap$1: function(map){var copyId=$.index(this._visited,map);if(!(copyId==null))return ['ref',copyId];var id=this._nextFreeRefId;this._nextFreeRefId=id+1;$.indexSet(this._visited,map,id);return ['map',id,this._serializeList$1(map.getKeys$0()),this._serializeList$1(map.getValues$0())];},
 _serializeList$1: function(list){if(typeof list!=='string'&&(typeof list!=='object'||list===null||list.constructor!==Array&&!list.is$JavaScriptIndexingBehavior()))return this._serializeList$1$bailout(1,list);var len=list.length;var result=$.ListImplementation_List(len);for(var i=0;i<len;++i){if(i<0||i>=list.length)$.ioore(i);var t1=this._dispatch$1(list[i]);if(i<0||i>=result.length)$.ioore(i);result[i]=t1;}return result;},
 _serializeList$1$bailout: function(state,list){var len=$.get$length(list);var result=$.ListImplementation_List(len);for(var i=0;$.ltB(i,len);++i){var t1=this._dispatch$1($.index(list,i));if(i<0||i>=result.length)$.ioore(i);result[i]=t1;}return result;}
};

$$._Deserializer = {"":
 [],
 "super": "Object",
 deserialize$1: function(x){if($._Deserializer_isPrimitive(x))return x;this._deserialized=$.HashMapImplementation$();return this._deserializeHelper$1(x);},
 _deserializeHelper$1: function(x){if($._Deserializer_isPrimitive(x))return x;switch($.index(x,0)){case 'ref':return this._deserializeRef$1(x);case 'list':return this._deserializeList$1(x);case 'map':return this._deserializeMap$1(x);case 'sendport':return this.deserializeSendPort$1(x);default:return this.deserializeObject$1(x);}},
 _deserializeRef$1: function(x){var id=$.index(x,1);return $.index(this._deserialized,id);},
 _deserializeList$1: function(x){var id=$.index(x,1);var dartList=$.index(x,2);if(typeof dartList!=='object'||dartList===null||(dartList.constructor!==Array||!!dartList.immutable$list)&&!dartList.is$JavaScriptIndexingBehavior())return this._deserializeList$1$bailout(1,dartList,id);$.indexSet(this._deserialized,id,dartList);var len=dartList.length;for(var i=0;i<len;++i){if(i<0||i>=dartList.length)$.ioore(i);var t1=this._deserializeHelper$1(dartList[i]);if(i<0||i>=dartList.length)$.ioore(i);dartList[i]=t1;}return dartList;},
 _deserializeList$1$bailout: function(state,dartList,id){$.indexSet(this._deserialized,id,dartList);var len=$.get$length(dartList);for(var i=0;$.ltB(i,len);++i)$.indexSet(dartList,i,this._deserializeHelper$1($.index(dartList,i)));return dartList;},
 _deserializeMap$1: function(x){var result=$.HashMapImplementation$();var id=$.index(x,1);$.indexSet(this._deserialized,id,result);var keys=$.index(x,2);if(typeof keys!=='string'&&(typeof keys!=='object'||keys===null||keys.constructor!==Array&&!keys.is$JavaScriptIndexingBehavior()))return this._deserializeMap$1$bailout(1,x,result,keys);var values=$.index(x,3);if(typeof values!=='string'&&(typeof values!=='object'||values===null||values.constructor!==Array&&!values.is$JavaScriptIndexingBehavior()))return this._deserializeMap$1$bailout(2,values,result,keys);var len=keys.length;for(var i=0;i<len;++i){if(i<0||i>=keys.length)$.ioore(i);var key=this._deserializeHelper$1(keys[i]);if(i<0||i>=values.length)$.ioore(i);result.operator$indexSet$2(key,this._deserializeHelper$1(values[i]));}return result;},
 _deserializeMap$1$bailout: function(state,env0,env1,env2){switch(state){case 1:var x=env0;result=env1;keys=env2;break;case 2:values=env0;result=env1;keys=env2;break;}switch(state){case 0:var result=$.HashMapImplementation$();var id=$.index(x,1);$.indexSet(this._deserialized,id,result);var keys=$.index(x,2);case 1:state=0;var values=$.index(x,3);case 2:state=0;var len=$.get$length(keys);for(var i=0;$.ltB(i,len);++i)result.operator$indexSet$2(this._deserializeHelper$1($.index(keys,i)),this._deserializeHelper$1($.index(values,i)));return result;}},
 deserializeObject$1: function(x){$.$$throw('Unexpected serialized object');}
};

$$._Timer = {"":
 ["_once", "_handle"],
 "super": "Object",
 cancel$0: function(){if(this._once===true)$._window().clearTimeout$1(this._handle);else $._window().clearInterval$1(this._handle);},
 _Timer$repeating$2: function(milliSeconds,callback){this._handle=$._window().setInterval$2(new $.anon3(this,callback),milliSeconds);},
 _Timer$2: function(milliSeconds,callback){this._handle=$._window().setTimeout$2(new $.anon2(this,callback),milliSeconds);}
};

$$.Uri = {"":
 ["scheme", "userInfo", "domain", "port", "path", "query", "fragment"],
 "super": "Object",
 query$1: function(arg0) { return this.query.call$1(arg0); },
 isAbsolute$0: function(){if(''===this.scheme)return false;if(!(''===this.fragment))return false;return true;},
 hasAuthority$0: function(){return !$.eqB(this.userInfo,'')||!$.eqB(this.domain,'')||!$.eqB(this.port,0);},
 toString$0: function(){var sb=$.StringBufferImpl$('');var t1=this.scheme;$.Uri__addIfNonEmpty(sb,t1,t1,':');if(this.hasAuthority$0()===true||$.eqB(t1,'file')){sb.add$1('//');t1=this.userInfo;$.Uri__addIfNonEmpty(sb,t1,t1,'@');t1=this.domain;sb.add$1(t1==null?'null':t1);t1=this.port;if(!$.eqB(t1,0)){sb.add$1(':');sb.add$1($.toString(t1));}}t1=this.path;sb.add$1(t1==null?'null':t1);t1=this.query;$.Uri__addIfNonEmpty(sb,t1,'?',t1);t1=this.fragment;$.Uri__addIfNonEmpty(sb,t1,'#',t1);return sb.toString$0();}
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
 iterator$0: function(){$.$$throw($.CTC17);},
 join$1: function(separator){var sb=$.StringBufferImpl$('');for(var t1=$.iterator(this);t1.hasNext$0()===true;){var t2=t1.next$0();if($.gtB($.get$length(sb),0))sb.add$1(separator);sb.add$1(t2);}return sb.toString$0();},
 join$0: function() {
  return this.join$1(', ')
},
 select$1: function(f){$.requireArgumentNotNull(f,'f');return $._FuncEnumerable$(this,new $.Enumerable_select_anon(this,f));},
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
 ["_source", "_lib1_func"],
 "super": "Enumerable",
 _lib1_func$1: function(arg0) { return this._lib1_func.call$1(arg0); },
 _lib1_func$1: function(arg0) { return this._lib1_func.call$1(arg0); },
 iterator$0: function(){return this._lib1_func$1($.iterator(this._source));}
};

$$._SelectIterator = {"":
 ["_source", "_lib1_func"],
 "super": "Object",
 _lib1_func$1: function(arg0) { return this._lib1_func.call$1(arg0); },
 _lib1_func$1: function(arg0) { return this._lib1_func.call$1(arg0); },
 hasNext$0: function(){return this._source.hasNext$0();},
 next$0: function(){return this._lib1_func$1(this._source.next$0());}
};

$$.NoneHashMap = {"":
 ["_lib1_values"],
 "super": "Object",
 getKeys$0: function(){return $.$$(this._lib1_values).select$1(new $.NoneHashMap_getKeys_anon()).toList$0();},
 getValues$0: function(){return $.$$(this._lib1_values).select$1(new $.NoneHashMap_getValues_anon()).toList$0();},
 get$length: function(){return this._lib1_values.length;},
 forEach$1: function(f){for(var t1=$.iterator(this._lib1_values);t1.hasNext$0()===true;){var t2=t1.next$0();f.call$2(t2.get$Item1(),t2.get$Item2());}},
 containsKey$1: function(key){for(var t1=$.iterator(this._lib1_values);t1.hasNext$0()===true;)if($.eqB(t1.next$0().get$Item1(),key))return true;return false;},
 operator$index$1: function(key){for(var t1=$.iterator(this._lib1_values);t1.hasNext$0()===true;){var t2=t1.next$0();if($.eqB(t2.get$Item1(),key))return t2.get$Item2();}return;},
 operator$indexSet$2: function(key,value){var newT=$.Tuple$(key,value,$.getRuntimeTypeInfo(this).K,$.getRuntimeTypeInfo(this).V);for(var t1=this._lib1_values,i=0;i<t1.length;++i){if(i<0||i>=t1.length)$.ioore(i);if($.eqB(t1[i].get$Item1(),key)){if(i<0||i>=t1.length)$.ioore(i);t1[i]=newT;return;}}t1.push(newT);},
 remove$1: function(key){for(var t1=this._lib1_values,i=0;i<t1.length;++i){if(i<0||i>=t1.length)$.ioore(i);if($.eqB(t1[i].get$Item1(),key)){if(i<0||i>=t1.length)$.ioore(i);var t=t1[i];$.removeRange(t1,i,1);return t.get$Item2();}}return;},
 clear$0: function(){$.$$throw('not impled');},
 isEmpty$0: function(){$.$$throw('not impled');},
 is$Map: function() { return true; }
};

$$.EventHandle = {"":
 ["_handlers", "_disposed"],
 "super": "DisposableImpl",
 fireEvent$1: function(args){var t1=this._handlers;if(!(t1==null))$.forEach(t1,new $.EventHandle_fireEvent_anon(args));},
 add$1: function(handler){var id=$.GlobalId_GlobalId();if(this._handlers==null)this._handlers=$.HashMapImplementation$('GlobalId','Action1<T>');$.indexSet(this._handlers,id,handler);return id;},
 remove$1: function(id){var t1=this._handlers;if(!(t1==null))return !(t1.remove$1(id)==null);else return false;}
};

$$.EventArgs = {"":
 [],
 "super": "Object"
};

$$.CancelableEventArgs = {"":
 ["_canceled"],
 "super": "EventArgs",
 get$isCanceled: function(){return this._canceled;},
 cancel$0: function(){this._canceled=true;}
};

$$.Size = {"":
 ["width?", "height?"],
 "super": "Object",
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this.width,other.get$width())&&$.eqB(this.height,other.get$height());},
 get$area: function(){return $.mul(this.width,this.height);},
 isEmpty$0: function(){return $.eq(this.get$area(),0);},
 get$isValid: function(){var t1=this.width;if(!(t1==null)&&$.isInfinite(t1)!==true&&$.isNaN(t1)!==true){var t2=this.height;t1=!(t2==null)&&$.isInfinite(t2)!==true&&$.isNaN(t2)!==true&&$.geB(t1,0)&&$.geB(t2,0);}else t1=false;return t1;},
 scale$1: function(magnitude){return $.Size$($.mul(this.width,magnitude),$.mul(this.height,magnitude));},
 operator$mul$1: function(magnitude){return this.scale$1(magnitude);},
 toString$0: function(){return '('+$.S(this.width)+' x '+$.S(this.height)+')';}
};

$$.Coordinate = {"":
 ["x?", "y?"],
 "super": "Object",
 get$isValid: function(){var t1=this.x;if(!(t1==null)&&$.isInfinite(t1)!==true&&$.isNaN(t1)!==true){t1=this.y;t1=!(t1==null)&&$.isInfinite(t1)!==true&&$.isNaN(t1)!==true;}else t1=false;return t1;},
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
 get$translateVector: function(){return $.Vector$(this.get$translateX(),this.get$translateY());},
 get$shearX: function(){return this._m01;},
 get$shearY: function(){return this._m10;},
 get$determinant: function(){return $.sub($.mul(this._m00,this._m11),$.mul(this._m01,this._m10));},
 concatenate$1: function(tx){var m0=this._m00;var m1=this._m01;this._m00=$.add($.mul(tx.get$_m00(),m0),$.mul(tx.get$_m10(),m1));this._m01=$.add($.mul(tx.get$_m01(),m0),$.mul(tx.get$_m11(),m1));this._m02=$.add(this._m02,$.add($.mul(tx.get$_m02(),m0),$.mul(tx.get$_m12(),m1)));var m00=this._m10;var m10=this._m11;this._m10=$.add($.mul(tx.get$_m00(),m00),$.mul(tx.get$_m10(),m10));this._m11=$.add($.mul(tx.get$_m01(),m00),$.mul(tx.get$_m11(),m10));this._m12=$.add(this._m12,$.add($.mul(tx.get$_m02(),m00),$.mul(tx.get$_m12(),m10)));return this;},
 get$concatenate: function() { return new $.BoundClosure(this, 'concatenate$1'); },
 translate$2: function(dx,dy){this._m02=$.add(this._m02,$.add($.mul(dx,this._m00),$.mul(dy,this._m01)));this._m12=$.add(this._m12,$.add($.mul(dx,this._m10),$.mul(dy,this._m11)));return this;},
 transformCoordinate$1: function(point){return $.Coordinate$($.add($.add($.mul(point.get$x(),this._m00),$.mul(point.get$y(),this._m01)),this._m02),$.add($.add($.mul(point.get$x(),this._m10),$.mul(point.get$y(),this._m11)),this._m12));},
 createInverse$0: function(){var det=this.get$determinant();return $.AffineTransform$($.div(this._m11,det),$.div($.neg(this._m10),det),$.div($.neg(this._m01),det),$.div(this._m00,det),$.div($.sub($.mul(this._m01,this._m12),$.mul(this._m11,this._m02)),det),$.div($.sub($.mul(this._m10,this._m02),$.mul(this._m00,this._m12)),det));},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(this._m00,other.get$_m00())&&$.eqB(this._m01,other.get$_m01())&&$.eqB(this._m02,other.get$_m02())&&$.eqB(this._m10,other.get$_m10())&&$.eqB(this._m11,other.get$_m11())&&$.eqB(this._m12,other.get$_m12());}
};

$$.Attachable = {"":
 [],
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
 get$_set: function() { return new $.BoundClosure1(this, '_set$2'); },
 _isSet$1: function(key){return this._propertyValues.containsKey$1(key);},
 _lib1_remove$1: function(key){if(this._isSet$1(key)===true){this._propertyValues.remove$1(key);this._changeHandle.fireEvent$1(key);}},
 _getValueOrUndefined$3: function(key,obj,ifAbsent){if(this._isSet$1(key)===true)return $.index(this._propertyValues,key);else if(!(ifAbsent==null)){var value=ifAbsent.call$1(obj);this._set$2(key,value);return value;}else return $.CTC26;}
};

$$.Property = {"":
 ["defaultValue", "name"],
 "super": "Attachable",
 get$2: function(obj,ifAbsent){var coreValue=this.getCore$2(obj,ifAbsent);if(!(coreValue===$.CTC26))return coreValue;else return this.defaultValue;},
 get$1: function(obj) {
  return this.get$2(obj,null)
},
 getCore$2: function(obj,ifAbsent){return obj.get$propertyValues()._getValueOrUndefined$3(this,obj,ifAbsent);},
 set$2: function(obj,value){obj.get$propertyValues()._set$2(this,value);},
 clear$1: function(obj){obj.get$propertyValues()._lib1_remove$1(this);},
 toString$0: function(){return 'Property \''+$.S(this.name)+'\'';}
};

$$._UndefinedValue = {"":
 [],
 "super": "Object"
};

$$.FutureValue = {"":
 [],
 "super": "Object",
 get$input: function(){return this._input;},
 set$input: function(value){this._input=value;if(this._future==null)this._startFuture$0();else this._pending=true;this._inputChangedHandle.fireEvent$1($.CTC22);},
 get$output: function(){return this._output;},
 get$outputChanged: function(){return this._outputChangedHandle;},
 _startFuture$0: function(){this._future=this.getFuture$1(this._input);this._future.handleException$1(this.get$_futureException());this._future.then$1(this.get$_futureCompleted());},
 _futureException$1: function(exception){this._future=null;this._errorHandle.fireEvent$1(exception);this._cleanup$0();return true;},
 get$_futureException: function() { return new $.BoundClosure(this, '_futureException$1'); },
 _futureCompleted$1: function(value){this._future=null;this._output=value;this._outputChangedHandle.fireEvent$1($.CTC22);this._cleanup$0();},
 get$_futureCompleted: function() { return new $.BoundClosure(this, '_futureCompleted$1'); },
 _cleanup$0: function(){if(this._pending===true){this._pending=false;this._startFuture$0();}}
};

$$.FutureValueResult = {"":
 ["value?", "exception?"],
 "super": "Object",
 get$isException: function(){return !(this.exception==null);},
 toMap$0: function(){return $.makeLiteralMap(['value',this.value,'exception',this.exception]);},
 operator$eq$1: function(other){return !(other==null)&&$.eqB(other.get$value(),this.value)&&$.eqB(other.get$exception(),this.exception);},
 FutureValueResult$fromException$1: function(exception){$.requireArgumentNotNull(this.exception,'exception');}
};

$$.SendPortValue = {"":
 [],
 "super": "FutureValue",
 getFuture$1: function(value){this._completer=$.CompleterImpl$($.getRuntimeTypeInfo(this).TOutput);this._innerFuture=this._sendPort.call$1(value);this._innerFuture.then$1(this.get$__futureCompleted());return this._completer.get$future();},
 __futureCompleted$1: function(value){this._innerFuture=null;if(typeof value==='object'&&value!==null&&value.is$Map()&&$.FutureValueResult_isMyMap(value))this._sendValueResultCompleted$1($.FutureValueResult_FutureValueResult$fromMap(value));else this._lib3_complete$1(value);},
 get$__futureCompleted: function() { return new $.BoundClosure(this, '__futureCompleted$1'); },
 _sendValueResultCompleted$1: function(value){if(value.get$isException()===true)this._completeException$1(value.get$exception());else this._lib3_complete$1(value.get$value());},
 _lib3_complete$1: function(value){var c=this._completer;this._completer=null;c.complete$1(value);},
 _completeException$1: function(exception){var c=this._completer;this._completer=null;c.completeException$1(exception);}
};

$$.SendValuePort = {"":
 ["_func"],
 "super": "Object",
 _func$1: function(arg0) { return this._func.call$1(arg0); },
 _func$1: function(arg0) { return this._func.call$1(arg0); },
 SendValuePort$1: function(_func){$.port().receive$1(new $.anon(this));}
};

$$.Dragger = {"":
 ["_element?", "_dragDeltaHandle", "_dragStartHandle", "_clientLoc"],
 "super": "Object",
 get$dragDelta: function(){return this._dragDeltaHandle;},
 get$dragStart: function(){return this._dragStartHandle;},
 get$isDragging: function(){return !(this._clientLoc==null);},
 _onMouseDown$1: function(event$){var args=$.CancelableEventArgs$();this._dragStartHandle.fireEvent$1(args);if(args.get$isCanceled()!==true){event$.preventDefault$0();this._clientLoc=$.Coordinate$(event$.get$clientX(),event$.get$clientY());}},
 get$_onMouseDown: function() { return new $.BoundClosure(this, '_onMouseDown$1'); },
 _handleMove$1: function(event$){if(this.get$isDragging()===true){var newLoc=$.Coordinate$(event$.get$clientX(),event$.get$clientY());var delta=newLoc.operator$sub$1(this._clientLoc);this._dragDeltaHandle.fireEvent$1(delta);this._clientLoc=newLoc;}},
 get$_handleMove: function() { return new $.BoundClosure(this, '_handleMove$1'); },
 _endDrag$1: function(event$){if(this.get$isDragging()===true)this._clientLoc=null;},
 get$_endDrag: function() { return new $.BoundClosure(this, '_endDrag$1'); },
 Dragger$1: function(_element){$.add$1(this._element.get$on().get$mouseDown(),this.get$_onMouseDown());$.add$1($.window().get$on().get$mouseMove(),this.get$_handleMove());$.add$1($.window().get$on().get$mouseUp(),this.get$_endDrag());$.add$1($.window().get$on().get$blur(),this.get$_endDrag());}
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
 get$invalidated: function(){return this._invalidatedEventHandle;},
 getTransform$0: function(){var tx=$.AffineTransform$(1,0,0,1,0,0);$.forEach(this._transforms,tx.get$concatenate());return tx;},
 draw$1: function(ctx){this.update$0();var dirty=this._lastDrawSize==null;this.drawInternal$1(ctx);return dirty;},
 update$0: function(){this._updatedEventHandle.fireEvent$1($.CTC22);},
 addTransform$0: function(){var tx=$.AffineTransform$(1,0,0,1,0,0);this._transforms.push(tx);return tx;},
 drawCore$1: function(ctx){var t1=this._alpha;if(!(t1==null))ctx.set$globalAlpha(t1);this.drawOverride$1(ctx);this._lastDrawSize=this.get$size();},
 invalidateDraw$0: function(){if(!(this._lastDrawSize==null)){this._lastDrawSize=null;this._invalidateParent$0();}},
 getVisualChild$1: function(index){$.$$throw('no children for this type');},
 registerParent$1: function(parent$){this._lib2_parent=parent$;},
 drawInternal$1: function(ctx){if(this.cacheEnabled===true)this._drawCached$1(ctx);else this._drawNormal$1(ctx);},
 _drawCached$1: function(ctx){var t1=this._cacheCanvas;if(t1==null||!$.eqB($.CanvasUtil_getCanvasSize(t1),this._lastDrawSize)){if(this._cacheCanvas==null)this._cacheCanvas=$._Elements_CanvasElement(null,null);t1=this.get$width();this._cacheCanvas.set$width(t1);t1=this.get$height();this._cacheCanvas.set$height(t1);this.drawCore$1(this._cacheCanvas.get$context2d());}ctx.save$0();$.CanvasUtil_transform(ctx,this.getTransform$0());ctx.drawImage$3(this._cacheCanvas,0,0);ctx.restore$0();},
 _drawNormal$1: function(ctx){var tx=this.getTransform$0();if(this._isClipped$2(tx,ctx)===true)return;ctx.save$0();$.CanvasUtil_transform(ctx,tx);if(this.clip===true){ctx.beginPath$0();ctx.rect$4(0,0,this.get$width(),this.get$height());ctx.clip$0();}this.drawCore$1(ctx);ctx.restore$0();},
 _isClipped$2: function(tx,ctx){if(this.clip===true);return false;},
 _invalidateParent$0: function(){this._invalidatedEventHandle.fireEvent$1($.CTC22);this._lib2_parent.childInvalidated$1(this);}
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
 insertAt$2: function(element,index){if(index==null)index=0;element.registerParent$1(this);$.insertRange$3(this._children,index,1,element);$.CTC28.set$2(element,element.addTransform$0());this.onChildrenChanged$0();},
 getVisualChild$1: function(index){var t1=this._children;if(index!==(index|0))$.iae(index);if(index<0||index>=t1.length)$.ioore(index);return t1[index];},
 get$visualChildCount: function(){return this._children.length;},
 drawOverride$1: function(ctx){var t1=this.background;if(!(t1==null)){ctx.set$fillStyle(t1);ctx.fillRect$4(0,0,this.get$width(),this.get$height());}$.ElementParentImpl.prototype.drawOverride$1.call(this,ctx);}
};

$$.PCanvas = {"":
 ["_children", "background", "_transforms", "cacheEnabled", "_updatedEventHandle", "_invalidatedEventHandle", "_cacheCanvas", "_width", "_height", "_alpha", "_lastDrawSize", "clip", "_lib2_parent", "propertyValues", "_disposed"],
 "super": "Panel"
};

$$.Stage = {"":
 ["_lib2_canvas", "_lib2_element?", "_invalidatedEventHandle", "_ctx", "propertyValues", "_disposed"],
 "super": "AttachableObjectImpl",
 get$invalidated: function(){return this._invalidatedEventHandle;},
 get$rootElement: function(){return this._lib2_element;},
 get$ctx: function(){if(this._ctx==null)this._ctx=this._lib2_canvas.get$context2d();return this._ctx;},
 draw$0: function(){var t1=this._ctx;var t2=t1==null;var t3=this._lib2_canvas;if(t2)this._ctx=t3.get$context2d();else t1.clearRect$4(0,0,t3.get$width(),t3.get$height());return this._lib2_element.draw$1(this._ctx);},
 childInvalidated$1: function(child){this._invalidatedEventHandle.fireEvent$1($.CTC22);},
 Stage$2: function(_canvas,_element){this._lib2_element.registerParent$1(this);}
};

$$.ImgElement = {"":
 [],
 "super": "PElement",
 drawOverride$1: function(ctx){var t1=this._image;if(t1.get$complete()===true)this._doDraw$1(ctx);else if(this._waitingOnLoad!==true){this._waitingOnLoad=true;$.add$1(t1.get$on().get$load(),this.get$_onImageLoad());}},
 _doDraw$1: function(ctx){ctx.drawImage$5(this._image,0,0,this.get$width(),this.get$height());},
 _onImageLoad$1: function(event$){this.invalidateDraw$0();},
 get$_onImageLoad: function() { return new $.BoundClosure(this, '_onImageLoad$1'); },
 is$ImgElement: true
};

$$.SpriteElement = {"":
 ["startCoordinate", "nextDelta", "count", "_frame", "_image", "_waitingOnLoad", "_transforms", "cacheEnabled", "_updatedEventHandle", "_invalidatedEventHandle", "_cacheCanvas", "_width", "_height", "_alpha", "_lastDrawSize", "clip", "_lib2_parent", "propertyValues", "_disposed"],
 "super": "ImgElement",
 _doDraw$1: function(ctx){var t1=this.count;if(typeof t1!=='number')$.iae(t1);var msPerFrame=$.tdiv(1000,t1);var theFrame=$.mod($.tdiv($.toInt($.window().get$performance().webkitNow$0()),msPerFrame),t1);var rect=$.Rect_Rect$fromCoordSize($.add(this.startCoordinate,$.mul(this.nextDelta,theFrame)),this.get$size());$.CanvasUtil_drawImage(ctx,this._image,rect,null);}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 "super": "Closure",
 call$1: function(value){var t1=this.values_2;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.call$1$bailout(1,value,t1);var length$=t1.length;for(var i=0;i<length$;++i){if(i<0||i>=length$)$.ioore(i);var t2=t1[i];if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_3,null);return length$;},
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
 call$1: function(e){var t1={};if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(typeof e==='object'&&e!==null&&!!e.is$Date)$.$$throw($.CTC4);if(typeof e==='object'&&e!==null&&!!e.is$RegExp)$.$$throw($.CTC5);if(typeof e==='object'&&e!==null&&e.is$_FileImpl())return e;if(typeof e==='object'&&e!==null&&e.is$File())$.$$throw($.CTC6);if(typeof e==='object'&&e!==null&&e.is$_BlobImpl())return e;if(typeof e==='object'&&e!==null&&e.is$Blob())$.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_FileListImpl())return e;if(typeof e==='object'&&e!==null&&e.is$FileList())$.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ImageDataImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ImageData())$.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBuffer())$.$$throw($.CTC9);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferViewImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBufferView())$.$$throw($.CTC10);if(typeof e==='object'&&e!==null&&e.is$Map()){var slot=this.findSlot_7.call$1(e);t1.copy_1=this.readSlot_6.call$1(slot);var t2=t1.copy_1;if(!(t2==null))return t2;t1.copy_1={};this.writeSlot_8.call$2(slot,t1.copy_1);e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this,t1));return t1.copy_1;}if(typeof e==='object'&&e!==null&&(e.constructor===Array||e.is$List())){if(typeof e!=='object'||e===null||(e.constructor!==Array||!!e.immutable$list)&&!e.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,e,0,0,0,0,0,0);var length$=e.length;slot=this.findSlot_7.call$1(e);t2=this.readSlot_6;var copy=t2.call$1(slot);if(!(copy==null)){if(true===copy){copy=new Array(length$);this.writeSlot_8.call$2(slot,copy);}return copy;}t1=e instanceof Array&&!!!(e.immutable$list);var t3=this.writeSlot_8;if(t1){t3.call$2(slot,true);for(var i=0;i<length$;++i){if(i<0||i>=e.length)$.ioore(i);var element=e[i];var elementCopy=this.call$1(element);if(!(elementCopy==null?element==null:elementCopy===element)){copy=t2.call$1(slot);if(true===copy){copy=new Array(length$);t3.call$2(slot,copy);}if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(2,copy,i,t3,e,length$,elementCopy,slot);for(var j=0;j<i;++j){if(j<0||j>=e.length)$.ioore(j);t1=e[j];if(j<0||j>=copy.length)$.ioore(j);copy[j]=t1;}if(i<0||i>=copy.length)$.ioore(i);copy[i]=elementCopy;++i;break;}}if(copy==null){t3.call$2(slot,e);copy=e;}}else{copy=new Array(length$);t3.call$2(slot,copy);i=0;}if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(3,e,copy,length$,i,0,0,0);for(;i<length$;++i){if(i<0||i>=e.length)$.ioore(i);t1=this.call$1(e[i]);if(i<0||i>=copy.length)$.ioore(i);copy[i]=t1;}return copy;}$.$$throw($.CTC11);},
 call$1$bailout: function(state,env0,env1,env2,env3,env4,env5,env6){switch(state){case 1:var e=env0;break;case 2:copy=env0;i=env1;t3=env2;e=env3;length$=env4;elementCopy=env5;slot=env6;break;case 3:e=env0;copy=env1;length$=env2;i=env3;break;}switch(state){case 0:var t1={};if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(typeof e==='object'&&e!==null&&!!e.is$Date)$.$$throw($.CTC4);if(typeof e==='object'&&e!==null&&!!e.is$RegExp)$.$$throw($.CTC5);if(typeof e==='object'&&e!==null&&e.is$_FileImpl())return e;if(typeof e==='object'&&e!==null&&e.is$File())$.$$throw($.CTC6);if(typeof e==='object'&&e!==null&&e.is$_BlobImpl())return e;if(typeof e==='object'&&e!==null&&e.is$Blob())$.$$throw($.CTC7);if(typeof e==='object'&&e!==null&&e.is$_FileListImpl())return e;if(typeof e==='object'&&e!==null&&e.is$FileList())$.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ImageDataImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ImageData())$.$$throw($.CTC8);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBuffer())$.$$throw($.CTC9);if(typeof e==='object'&&e!==null&&e.is$_ArrayBufferViewImpl())return e;if(typeof e==='object'&&e!==null&&e.is$ArrayBufferView())$.$$throw($.CTC10);if(typeof e==='object'&&e!==null&&e.is$Map()){var slot=this.findSlot_7.call$1(e);t1.copy_1=this.readSlot_6.call$1(slot);var t2=t1.copy_1;if(!(t2==null))return t2;t1.copy_1={};this.writeSlot_8.call$2(slot,t1.copy_1);e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this,t1));return t1.copy_1;}default:if(state===3||state===2||state===1||state===0&&typeof e==='object'&&e!==null&&(e.constructor===Array||e.is$List()))switch(state){case 0:case 1:state=0;var length$=$.get$length(e);slot=this.findSlot_7.call$1(e);t2=this.readSlot_6;var copy=t2.call$1(slot);if(!(copy==null)){if(true===copy){copy=new Array(length$);this.writeSlot_8.call$2(slot,copy);}return copy;}t1=e instanceof Array&&!!!(e.immutable$list);var t3=this.writeSlot_8;case 2:if(state===2||state===0&&t1)switch(state){case 0:t3.call$2(slot,true);var i=0;case 2:L0:while(true)switch(state){case 0:if(!$.ltB(i,length$))break L0;var element=$.index(e,i);var elementCopy=this.call$1(element);case 2:if(state===2||state===0&&!(elementCopy==null?element==null:elementCopy===element))switch(state){case 0:copy=t2.call$1(slot);if(true===copy){copy=new Array(length$);t3.call$2(slot,copy);}case 2:state=0;for(var j=0;j<i;++j)$.indexSet(copy,j,$.index(e,j));$.indexSet(copy,i,elementCopy);++i;break L0;}++i;}if(copy==null){t3.call$2(slot,e);copy=e;}}else{copy=new Array(length$);t3.call$2(slot,copy);i=0;}case 3:state=0;for(;$.ltB(i,length$);++i)$.indexSet(copy,i,this.call$1($.index(e,i)));return copy;}$.$$throw($.CTC11);}}
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

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 "super": "Closure",
 call$2: function(id,handler){handler.call$1(this.args_0);}
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

$$.anon1 = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e){return this.this_0.requestFrame$0();}
};

$$._demoIsolate_anon = {"":
 [],
 "super": "Closure",
 call$1: function(input){var start=$.DateImplementation$now();var delta=null;do delta=$.DateImplementation$now().difference$1(start);while($.ltB(delta.get$inSeconds(),1));return $.mul(input.get$x(),input.get$y());}
};

$$.anon = {"":
 ["this_0"],
 "super": "Closure",
 call$2: function(value,reply){var _message=null;try{var t1=this.this_0;var output=t1._func$1(value);_message=$.FutureValueResult$(output,$.getRuntimeTypeInfo(t1).TOutput);}catch(exception){t1=$.unwrapException(exception);var ex=t1;var exString=$.toString(ex);_message=$.FutureValueResult$fromException(exString,$.getRuntimeTypeInfo(this.this_0).TOutput);}reply.send$1(_message.toMap$0());}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element){var t1=this.box_0;t1.counter_1=$.add(t1.counter_1,1);}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 "super": "Closure",
 call$1: function(value){var t1=this.values_0;if(typeof t1!=='string'&&(typeof t1!=='object'||t1===null||t1.constructor!==Array&&!t1.is$JavaScriptIndexingBehavior()))return this.call$1$bailout(1,value,t1);var length$=t1.length;for(var i=0;i<length$;++i){if(i<0||i>=length$)$.ioore(i);var t2=t1[i];if(t2==null?value==null:t2===value)return i;}$.add$1(t1,value);$.add$1(this.copies_1,null);return length$;},
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
 call$1: function(e){if(typeof e!=='object'||e===null||(e.constructor!==Array||!!e.immutable$list)&&!e.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,e,0,0);if(e instanceof Date)$.$$throw($.CTC4);if(e instanceof RegExp)$.$$throw($.CTC5);if($._isJavaScriptSimpleObject(e)){var slot=this.findSlot_5.call$1(e);var copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;copy=$.makeLiteralMap([]);if(typeof copy!=='object'||copy===null||(copy.constructor!==Array||!!copy.immutable$list)&&!copy.is$JavaScriptIndexingBehavior())return this.call$1$bailout(2,e,slot,copy);this.writeSlot_6.call$2(slot,copy);for(var t1=$.iterator(Object.keys(e));t1.hasNext$0()===true;){var t2=t1.next$0();var t3=this.call$1(e[t2]);if(t2!==(t2|0))$.iae(t2);if(t2<0||t2>=copy.length)$.ioore(t2);copy[t2]=t3;}return copy;}if(e instanceof Array){slot=this.findSlot_5.call$1(e);copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;this.writeSlot_6.call$2(slot,e);var length$=e.length;for(var i=0;i<length$;++i){if(i<0||i>=e.length)$.ioore(i);t1=this.call$1(e[i]);if(i<0||i>=e.length)$.ioore(i);e[i]=t1;}return e;}return e;},
 call$1$bailout: function(state,env0,env1,env2){switch(state){case 1:var e=env0;break;case 2:e=env0;slot=env1;copy=env2;break;}switch(state){case 0:case 1:state=0;if(e==null)return e;if(typeof e==='boolean')return e;if(typeof e==='number')return e;if(typeof e==='string')return e;if(e instanceof Date)$.$$throw($.CTC4);if(e instanceof RegExp)$.$$throw($.CTC5);case 2:if(state===2||state===0&&$._isJavaScriptSimpleObject(e))switch(state){case 0:var slot=this.findSlot_5.call$1(e);var copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;copy=$.makeLiteralMap([]);case 2:state=0;this.writeSlot_6.call$2(slot,copy);for(var t1=$.iterator(Object.keys(e));t1.hasNext$0()===true;){var t2=t1.next$0();$.indexSet(copy,t2,this.call$1(e[t2]));}return copy;}if(e instanceof Array){slot=this.findSlot_5.call$1(e);copy=this.readSlot_4.call$1(slot);if(!(copy==null))return copy;this.writeSlot_6.call$2(slot,e);var length$=$.get$length(e);for(var i=0;$.ltB(i,length$);++i)$.indexSet(e,i,this.call$1($.index(e,i)));return e;}return e;}}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$1: function(entry){this.f_0.call$2(entry.get$key(),entry.get$value());}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 "super": "Closure",
 call$1: function(object){if(object instanceof Date)return true;if(typeof object==='object'&&object!==null&&(object.constructor===Array||object.is$List())){if(typeof object!=='object'||object===null||object.constructor!==Array&&!object.is$JavaScriptIndexingBehavior())return this.call$1$bailout(1,object);for(var i=0;t1=object.length,i<t1;++i){if(i<0||i>=t1)$.ioore(i);if(this.call$1(object[i])===true)return true;}}return false;var t1;},
 call$1$bailout: function(state,env0){switch(state){case 1:var object=env0;break;}switch(state){case 0:if(object instanceof Date)return true;case 1:if(state===1||state===0&&typeof object==='object'&&object!==null&&(object.constructor===Array||object.is$List()))switch(state){case 0:case 1:state=0;for(var i=0;$.ltB(i,$.get$length(object));++i)if(this.call$1($.index(object,i))===true)return true;}return false;}}
};

$$.DurationImplementation_toString_threeDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n){if($.geB(n,100))return $.S(n);if($.gtB(n,10))return '0'+$.S(n);return '00'+$.S(n);}
};

$$.DurationImplementation_toString_twoDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n){if($.geB(n,10))return $.S(n);return '0'+$.S(n);}
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n){var absN=$.abs(n);var sign=$.ltB(n,0)?'-':'';if($.geB(absN,1000))return $.S(n);if($.geB(absN,100))return sign+'0'+$.S(absN);if($.geB(absN,10))return sign+'00'+$.S(absN);return sign+'000'+$.S(absN);}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n){if($.geB(n,100))return $.S(n);if($.geB(n,10))return '0'+$.S(n);return '00'+$.S(n);}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n){if($.geB(n,10))return $.S(n);return '0'+$.S(n);}
};

$$._IsolateNatives__spawn_anon = {"":
 ["port_1", "completer_0"],
 "super": "Closure",
 call$2: function(msg,replyPort){this.port_1.close$0();this.completer_0.complete$1(replyPort);}
};

$$.anon0 = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(p){var t1=this.this_0;t1.set$_port(p);for(var t2=$.iterator(t1.get$pending());t2.hasNext$0()===true;){var t3=t2.next$0();p.send$2($.index(t3,'message'),$.index(t3,'replyTo'));}t1.set$pending(null);}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 "super": "Closure",
 call$2: function(value,ignoreReplyTo){this.port_1.close$0();var t1=typeof value==='object'&&value!==null&&!!value.is$Exception;var t2=this.completer_0;if(t1)t2.completeException$1(value);else t2.complete$1(value);}
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

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 "super": "Closure",
 call$1: function(_){return this.callback_0.call$0();}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 "super": "Closure",
 call$0: function(){var t1=this.this_2;var t2=this.replyTo_0;t1._checkReplyTo$1(t2);var workerMessage=$._serializeMessage($.makeLiteralMap(['command','message','port',t1,'msg',this.message_1,'replyTo',t2]));if($._globalState().get$isWorker()===true)$._globalState().get$mainManager().postMessage$1(workerMessage);else $.index($._globalState().get$managers(),t1.get$_workerId()).postMessage$1(workerMessage);}
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

$$.Enumerable_select_anon = {"":
 ["this_1", "f_0"],
 "super": "Closure",
 call$1: function(s){return $._SelectIterator$(s,this.f_0,$.getRuntimeTypeInfo(this.this_1).T,'Object');}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry){var t1=this.list_2;var t2=this.box_0;var t3=t2.index_1;t2.index_1=$.add(t3,1);$.indexSet(t1,t3,entry.get$value());}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 "super": "Closure",
 call$2: function(k,v){return $.add$1(this.keys_0,k);}
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

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry){var t1=this.list_2;var t2=this.box_0;var t3=t2.index_10;t2.index_10=$.add(t3,1);$.indexSet(t1,t3,entry.get$key());}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 "super": "Closure",
 call$2: function(key,val){var t1=this.box_0.copy_10;var t2=this.this_2;$.indexSet(t1,t2._dispatch$1(key),t2._dispatch$1(val));}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e){return this.this_0._dispatch$1(e);}
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

$$._IsolateNatives__startNonWorker_function = {"":
 ["functionName_1", "replyPort_0"],
 "super": "Closure",
 call$0: function(){$._IsolateNatives__startIsolate($._IsolateNatives__getJSFunctionFromName(this.functionName_1),this.replyPort_0);}
};

$$._IsolateNatives__spawnWorker_anon = {"":
 ["worker_0"],
 "super": "Closure",
 call$1: function(e){$._IsolateNatives__processWorkerMessage(this.worker_0,e);}
};

$$._IsolateNatives__processWorkerMessage_function = {"":
 ["entryPoint_1", "replyTo_0"],
 "super": "Closure",
 call$0: function(){$._IsolateNatives__startIsolate(this.entryPoint_1,this.replyTo_0);}
};

$$.ElementParentImpl_drawOverride_anon = {"":
 ["ctx_0"],
 "super": "Closure",
 call$1: function(e){return e.drawInternal$1(this.ctx_0);}
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

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 "super": "Closure",
 call$0: function(){return $.CTC21;}
};

$$.ElementParentImpl_update_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){return e.update$0();}
};

$$.Mouse_markMouseOver_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e){$.CTC27.clear$1(e);$.CTC24.clear$1(e);}
};

$$.Mouse_markMouseOver_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(e){$.CTC27.set$2(e,true);}
};

$$.startRootIsolate_anon = {"":
 [],
 "super": "Closure",
 call$0: function(){$._TimerFactory__factory=$._timerFactory;return;}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 "super": "Closure",
 call$0: function(){if(this.this_0.runIteration$0()!==true)return;$._window().setTimeout$2(this,0);}
};

$$.anon2 = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function(){return this.callback_0.call$1(this.this_1);}
};

$$.anon3 = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function(){return this.callback_0.call$1(this.this_1);}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.div$slow = function(a,b){if($.checkNumbers(a,b))return a / b;return a.operator$div$1(b);};

$.getMouseEventCoordinate = function(event$){var element=event$.get$currentTarget();return $.Coordinate$(event$.get$clientX(),event$.get$clientY()).operator$sub$1($.getElementCoordinate(element));};

$.startsWith = function(receiver,other){$.checkString(other);var length$=other.length;if(length$>receiver.length)return false;return other == receiver.substring(0, length$);};

$._InputElementEventsImpl$ = function(_ptr){return new $._InputElementEventsImpl(_ptr);};

$._NativeJsSendPort$ = function(_receivePort,isolateId){return new $._NativeJsSendPort(_receivePort,isolateId);};

$.eqB = function(a,b){if(a == null)return b == null;if(b == null)return false;if(typeof a === "object")if(!!a.operator$eq$1)return a.operator$eq$1(b)===true;return a === b;};

$.FutureAlreadyCompleteException$ = function(){return new $.FutureAlreadyCompleteException();};

$.set$length = function(receiver,newLength){if($.isJsArray(receiver)){$.checkNull(newLength);if(!(typeof newLength==='number'&&newLength===(newLength|0)))$.$$throw($.IllegalArgumentException$(newLength));if(newLength<0)$.$$throw($.IndexOutOfRangeException$(newLength));$.checkGrowable(receiver,'set length');receiver.length = newLength;}else receiver.set$length(newLength);return newLength;};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win,message,targetOrigin,messagePorts){    win.postMessage(message, targetOrigin, messagePorts);
};

$._Device_userAgent = function(){return $.window().get$navigator().get$userAgent();};

$.checkNum = function(value){if(!(typeof value==='number')){$.checkNull(value);$.$$throw($.IllegalArgumentException$(value));}return value;};

$.convertDartClosureToJS = function(closure,arity){if(closure==null)return;var function$=closure.$identity;if(!!function$)return function$;function$=function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };closure.$identity = function$;return function$;};

$._TextTrackListEventsImpl$ = function(_ptr){return new $._TextTrackListEventsImpl(_ptr);};

$.StackTrace$ = function(stack){return new $.StackTrace(stack);};

$.Arrays_lastIndexOf = function(a,element,startIndex){if(typeof a!=='string'&&(typeof a!=='object'||a===null||a.constructor!==Array&&!a.is$JavaScriptIndexingBehavior()))return $.Arrays_lastIndexOf$bailout(1,a,element,startIndex);if(startIndex<0)return -1;var t1=a.length;if(startIndex>=t1)startIndex=t1-1;for(var i=startIndex;i>=0;--i){if(i!==(i|0))$.iae(i);if(i<0||i>=a.length)$.ioore(i);if($.eqB(a[i],element))return i;}return -1;};

$.ObjectNotClosureException$ = function(){return new $.ObjectNotClosureException();};

$._MediaStreamTrackEventsImpl$ = function(_ptr){return new $._MediaStreamTrackEventsImpl(_ptr);};

$._JsVisitedMap$ = function(){return new $._JsVisitedMap(null);};

$.isJsArray = function(value){return !(value==null)&&value.constructor === Array;};

$.Rect_Rect$fromCoordSize = function(topLeft,size){return $.Rect$(topLeft.get$x(),topLeft.get$y(),size.get$width(),size.get$height());};

$.Primitives_objectTypeName = function(object){var name$=$.constructorNameFallback(object);if($.eqB(name$,'Object')){var decompiled=String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];if(typeof decompiled==='string')name$=decompiled;}return $.charCodeAt(name$,0)===36?$.substring$1(name$,1):name$;};

$.clear = function(receiver){if(!$.isJsArray(receiver))return receiver.clear$0();$.set$length(receiver,0);};

$._fillStatics = function(context){  $globals = context.isolateStatics;
  $static_init();
};

$.remainder = function(a,b){if($.checkNumbers(a,b))return a % b;else return a.remainder$1(b);};

$.ListIterator$ = function(list,T){var t1=new $.ListIterator(0,list);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr){return new $._JavaScriptAudioNodeEventsImpl(_ptr);};

$.StackOverflowException$ = function(){return new $.StackOverflowException();};

$.print = function(object){$.PrintImplementation_print(object);};

$._DOMWindowCrossFrameImpl__close = function(win){win.close()};

$.forEach = function(receiver,f){if(!$.isJsArray(receiver))return receiver.forEach$1(f);else return $.Collections_forEach(receiver,f);};

$.Size$ = function(width,height){return new $.Size(width,height);};

$.PrintImplementation_print = function(obj){if(typeof obj==='string')$.Primitives_printString(obj);else $.Primitives_printString($.toString(obj));};

$.isEmpty = function(receiver){if(typeof receiver==='string'||$.isJsArray(receiver))return receiver.length === 0;return receiver.isEmpty$0();};

$.Collections_forEach = function(iterable,f){for(var t1=$.iterator(iterable);t1.hasNext$0()===true;)f.call$1(t1.next$0());};

$._IDBTransactionEventsImpl$ = function(_ptr){return new $._IDBTransactionEventsImpl(_ptr);};

$.dynamicFunction = function(name$){var f=Object.prototype[name$];if(!(f==null)&&!!f.methods)return f.methods;var methods={};var dartMethod=Object.getPrototypeOf($.CTC30)[name$];if(!(dartMethod==null))$.propertySet(methods,'Object',dartMethod);var bind=function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};bind.methods = methods;$.defineProperty(Object.prototype,name$,bind);return methods;};

$.ListImplementation_List$from = function(other,E){var result=$.ListImplementation_List(null);for(var t1=$.iterator(other);t1.hasNext$0()===true;)result.push(t1.next$0());return result;};

$._Timer$repeating = function(milliSeconds,callback){var t1=new $._Timer(false,null);t1._Timer$repeating$2(milliSeconds,callback);return t1;};

$._EventSourceEventsImpl$ = function(_ptr){return new $._EventSourceEventsImpl(_ptr);};

$._convertNativeToDart_AcceptStructuredClone = function(object){var values=[];var copies=[];var t1=new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies,values);var t2=new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies);return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies),t1,t2).call$1(object);};

$._Collections_forEach = function(iterable,f){for(var t1=$.iterator(iterable);t1.hasNext$0()===true;)f.call$1(t1.next$0());};

$.PCanvas$ = function(w,h,enableCache){return new $.PCanvas($.ListImplementation_List(null,'PElement'),null,$.ListImplementation_List(null,'AffineTransform'),enableCache,$.EventHandle$('EventArgs'),$.EventHandle$('EventArgs'),null,w,h,null,null,false,null,$.PropertyValues$(),false);};

$.SendValuePort$ = function(_func,TInput,TOutput){var t1=new $.SendValuePort(_func);$.setRuntimeTypeInfo(t1,{ 'TInput': TInput, 'TOutput': TOutput });t1.SendValuePort$1(_func);return t1;};

$.ge$slow = function(a,b){if($.checkNumbers(a,b))return a >= b;return a.operator$ge$1(b);};

$._convertDartToNative_PrepareForStructuredClone = function(value){var values=[];var copies=[];var t1=new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies,values);var t2=new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);var t3=new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);var t4=new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();var copy=new $._convertDartToNative_PrepareForStructuredClone_walk(t3,t1,t2).call$1(value);t4.call$0();return copy;};

$.floor = function(receiver){return Math.floor(receiver);};

$.getFunctionForTypeNameOf = function(){if(!(typeof(navigator)==='object'))return $.typeNameInChrome;var userAgent=navigator.userAgent;if($.contains(userAgent,'Chrome')||$.contains(userAgent,'DumpRenderTree'))return $.typeNameInChrome;else if($.contains(userAgent,'Firefox'))return $.typeNameInFirefox;else if($.contains(userAgent,'MSIE'))return $.typeNameInIE;else if($.contains(userAgent,'Opera'))return $.typeNameInOpera;else if($.contains(userAgent,'Safari'))return $.typeNameInSafari;else return $.constructorNameFallback;};

$._WebSocketEventsImpl$ = function(_ptr){return new $._WebSocketEventsImpl(_ptr);};

$.shr = function(a,b){if($.checkNumbers(a,b)){if(b<0)$.$$throw($.IllegalArgumentException$(b));if(a>0){if(b > 31)return 0;return a >>> b;}if(b>31)b=31;return (a >> b) >>> 0;}return a.operator$shr$1(b);};

$._convertDartToNative_SerializedScriptValue = function(value){return $._convertDartToNative_PrepareForStructuredClone(value);};

$._deserializeMessage = function(message){if($._globalState().get$needSerialization()===true)return $._JsDeserializer$().deserialize$1(message);else return message;};

$.indexSet$slow = function(a,index,value){if($.isJsArray(a)){if(!(typeof index==='number'&&index===(index|0)))$.$$throw($.IllegalArgumentException$(index));if(index<0||$.geB(index,$.get$length(a)))$.$$throw($.IndexOutOfRangeException$(index));$.checkMutable(a,'indexed set');a[index] = value;return;}a.operator$indexSet$2(index,value);};

$.and = function(a,b){if($.checkNumbers(a,b))return (a & b) >>> 0;return a.operator$and$1(b);};

$._MediaStreamEventsImpl$ = function(_ptr){return new $._MediaStreamEventsImpl(_ptr);};

$.setRuntimeTypeInfo = function(target,typeInfo){if(!(target==null))target.builtin$typeInfo = typeInfo;};

$.hashCode = function(receiver){if(typeof receiver==='number')return receiver & 0x1FFFFFFF;if(!(typeof receiver==='string'))return receiver.hashCode$0();var length$=receiver.length;for(var hash=0,i=0;i<length$;++i){var hash0=536870911&hash+receiver.charCodeAt(i);var hash1=536870911&hash0+524287&hash0 << 10;hash1=(hash1^$.shr(hash1,6))>>>0;hash=hash1;}hash0=536870911&hash+67108863&hash << 3;hash0=(hash0^$.shr(hash0,11))>>>0;return 536870911&hash0+16383&hash0 << 15;};

$.FutureImpl_FutureImpl$immediate = function(value,T){var res=$.FutureImpl$();res._setValue$1(value);return res;};

$.mul$slow = function(a,b){if($.checkNumbers(a,b))return a * b;return a.operator$mul$1(b);};

$._JsCopier$ = function(){var t1=new $._JsCopier($._MessageTraverserVisitedMap$());t1._JsCopier$0();return t1;};

$._waitForPendingPorts = function(message,callback){var finder=$._PendingSendPortFinder$();finder.traverse$1(message);$.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));};

$.gt = function(a,b){return typeof a==='number'&&typeof b==='number'?a > b:$.gt$slow(a,b);};

$._SimpleEnumerable$ = function(_source,T){var t1=new $._SimpleEnumerable(_source);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._IsolateContext$ = function(){var t1=new $._IsolateContext(null,null,null);t1._IsolateContext$0();return t1;};

$.buildDynamicMetadata = function(inputTable){var result=[];for(var i=0;i<inputTable.length;++i){var tag=inputTable[i][0];var array=inputTable[i];var tags=array[1];var set={};var tagNames=tags.split('|');for(var j=0,index=1;j<tagNames.length;++j){$.propertySet(set,tagNames[j],true);index=j;array=tagNames;}result.push($.MetaInfo$(tag,tags,set));}return result;};

$.charCodeAt = function(receiver,index){if(typeof receiver==='string'){if(index<0)$.$$throw($.IndexOutOfRangeException$(index));if(index>=receiver.length)$.$$throw($.IndexOutOfRangeException$(index));return receiver.charCodeAt(index);}else return receiver.charCodeAt$1(index);};

$.Dragger$ = function(_element){var t1=new $.Dragger(_element,$.EventHandle$('Vector'),$.EventHandle$('CancelableEventArgs'),null);t1.Dragger$1(_element);return t1;};

$.getTypeNameOf = function(obj){if($._getTypeNameOf==null)$._getTypeNameOf=$.getFunctionForTypeNameOf();return $._getTypeNameOf.call$1(obj);};

$.removeRange = function(receiver,start,length$){if(!$.isJsArray(receiver))return receiver.removeRange$2(start,length$);$.checkGrowable(receiver,'removeRange');if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)$.$$throw($.IllegalArgumentException$(length$));var receiverLength=receiver.length;if(start<0||start>=receiverLength)$.$$throw($.IndexOutOfRangeException$(start));var t1=start+length$;if(t1>receiverLength)$.$$throw($.IndexOutOfRangeException$(t1));var t2=receiverLength-length$;$.Arrays_copy(receiver,t1,receiver,start,t2-start);$.set$length(receiver,t2);};

$.ListImplementation_List = function(length$,E){return $.Primitives_newList(length$);};

$.document = function(){return document;};

$.contains$1 = function(receiver,other){return $.contains$2(receiver,other,0);};

$.mul = function(a,b){return typeof a==='number'&&typeof b==='number'?a * b:$.mul$slow(a,b);};

$._IsolateNatives__processWorkerMessage = function(sender,e){var msg=$._deserializeMessage($._IsolateNatives__getEventData(e));switch($.index(msg,'command')){case 'start':var t1=$.index(msg,'id');$._globalState().set$currentManagerId(t1);var entryPoint=$._IsolateNatives__getJSFunctionFromName($.index(msg,'functionName'));var replyTo=$._deserializeMessage($.index(msg,'replyTo'));$._globalState().get$topEventLoop().enqueue$3($._IsolateContext$(),new $._IsolateNatives__processWorkerMessage_function(entryPoint,replyTo),'worker-start');$._globalState().get$topEventLoop().run$0();break;case 'spawn-worker':$._IsolateNatives__spawnWorker($.index(msg,'functionName'),$.index(msg,'uri'),$.index(msg,'replyPort'));break;case 'message':$.index(msg,'port').send$2($.index(msg,'msg'),$.index(msg,'replyTo'));$._globalState().get$topEventLoop().run$0();break;case 'close':$._IsolateNatives__log('Closing Worker');$._globalState().get$managers().remove$1(sender.get$id());sender.terminate$0();$._globalState().get$topEventLoop().run$0();break;case 'log':$._IsolateNatives__log($.index(msg,'msg'));break;case 'print':if($._globalState().get$isWorker()===true)$._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command','print','msg',msg])));else $.print($.index(msg,'msg'));break;case 'error':$.$$throw($.index(msg,'msg'));}};

$._browserPrefix = function(){if($._cachedBrowserPrefix==null)if($._Device_isFirefox()===true)$._cachedBrowserPrefix='-moz-';else $._cachedBrowserPrefix='-webkit-';return $._cachedBrowserPrefix;};

$._EventsImpl$ = function(_ptr){return new $._EventsImpl(_ptr);};

$._BodyElementEventsImpl$ = function(_ptr){return new $._BodyElementEventsImpl(_ptr);};

$._IsolateNatives__log = function(msg){if($._globalState().get$isWorker()===true)$._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command','log','msg',msg])));else try{$._IsolateNatives__consoleLog(msg);}catch(exception){$.unwrapException(exception);var trace=$.getTraceFromException(exception);$.$$throw($.ExceptionImplementation$(trace));}};

$.neg = function(a){if(typeof a === "number")return -a;return a.negate$0();};

$.parseInt = function(str){$.checkString(str);if(!/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))$.$$throw($.FormatException$(str));var trimmed=$.trim(str);if($.gtB($.get$length(trimmed),2))var t1=$.eqB($.index(trimmed,1),'x')||$.eqB($.index(trimmed,1),'X');else t1=false;if(!t1)if($.gtB($.get$length(trimmed),3))t1=$.eqB($.index(trimmed,2),'x')||$.eqB($.index(trimmed,2),'X');else t1=false;else t1=true;var base=t1?16:10;var ret=parseInt(trimmed, base);if($.isNaN(ret)===true)$.$$throw($.FormatException$(str));return ret;};

$.add$1 = function(receiver,value){if($.isJsArray(receiver)){$.checkGrowable(receiver,'add');receiver.push(value);return;}return receiver.add$1(value);};

$._Timer$ = function(milliSeconds,callback){var t1=new $._Timer(true,null);t1._Timer$2(milliSeconds,callback);return t1;};

$.get$length = function(receiver){if(typeof receiver==='string'||$.isJsArray(receiver))return receiver.length;else return receiver.get$length();};

$.Uri__parseIntOrZero = function(val){if(!(val==null)&&!$.eqB(val,''))return $.parseInt(val);else return 0;};

$.SpriteElement_SpriteElement$horizontalFromUrl = function(src,w,h,count,xDelta,start){return $.SpriteElement$($._Elements_ImageElement(src,null,null),w,h,start,$.Vector$(xDelta,0),count);};

$.isNaN = function(receiver){if(typeof receiver==='number')return isNaN(receiver);else return receiver.isNaN$0();};

$.regExpMakeNative = function(regExp,global){var pattern=regExp.get$pattern();var multiLine=regExp.get$multiLine();var ignoreCase=regExp.get$ignoreCase();$.checkString(pattern);var sb=$.StringBufferImpl$('');if(multiLine===true)$.add$1(sb,'m');if(ignoreCase===true)$.add$1(sb,'i');if(global)$.add$1(sb,'g');try{return new RegExp(pattern, $.toString(sb));}catch(exception){var t1=$.unwrapException(exception);var e=t1;$.$$throw($.IllegalJSRegExpException$(pattern,String(e)));}};

$.iterator = function(receiver){if($.isJsArray(receiver))return $.ListIterator$(receiver);return receiver.iterator$0();};

$.port = function(){if($._lazyPort==null)$._lazyPort=$._ReceivePortFactory_ReceivePort();return $._lazyPort;};

$.main = function(){$.DraggerDemo_DraggerDemo($.document().query$1('#content')).requestFrame$0();};

$.FutureValueResult$fromException = function(exception,TOutput){var t1=new $.FutureValueResult(null,exception);$.setRuntimeTypeInfo(t1,{ 'TOutput': TOutput });t1.FutureValueResult$fromException$1(exception);return t1;};

$.ceil = function(receiver){return Math.ceil(receiver);};

$.toInt = function(receiver){if(!(typeof receiver==='number'))return receiver.toInt$0();if($.isNaN(receiver)===true)$.$$throw($.FormatException$('NaN'));if($.isInfinite(receiver)===true)$.$$throw($.FormatException$('Infinity'));var truncated=$.truncate(receiver);return truncated == -0.0?0:truncated;};

$.lastIndexOf$1 = function(receiver,element){if($.isJsArray(receiver))return $.Arrays_lastIndexOf(receiver,element,receiver.length);else if(typeof receiver==='string'){$.checkNull(element);return receiver.lastIndexOf(element);}return receiver.lastIndexOf$1(element);};

$.SpriteElement$ = function(image,width,height,startCoordinate,nextDelta,count){return new $.SpriteElement(startCoordinate,nextDelta,count,0,image,false,$.ListImplementation_List(null,'AffineTransform'),false,$.EventHandle$('EventArgs'),$.EventHandle$('EventArgs'),null,width,height,null,null,false,null,$.PropertyValues$(),false);};

$.PropertyValues$ = function(){return new $.PropertyValues($.NoneHashMap$('Property','Object'),$.EventHandle$('Property'),false);};

$.Primitives_getYear = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCFullYear():$.Primitives_lazyAsJsDate(receiver).getFullYear();};

$.Primitives_getHours = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCHours():$.Primitives_lazyAsJsDate(receiver).getHours();};

$.dynamicBind = function(obj,name$,methods,arguments$){var tag=$.getTypeNameOf(obj);var method=methods[tag];if(method==null&&!($._dynamicMetadata0()==null))for(var i=0;i<$._dynamicMetadata0().length;++i){var entry=$._dynamicMetadata0()[i];if(entry.get$_lib4_set()[tag]){method=methods[entry.get$_tag()];if(!(method==null))break;}}if(method==null)method=methods['Object'];var proto=Object.getPrototypeOf(obj);if(method==null)method=function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};if(!proto.hasOwnProperty(name$))$.defineProperty(proto,name$,method);return method.apply(obj, arguments$);};

$.Maps_mapToString = function(m){var result=$.StringBufferImpl$('');$.Maps__emitMap(m,result,$.ListImplementation_List(null));return result.toString$0();};

$.GlobalId$_internal = function(value){return new $.GlobalId(value,$.Util_getHashCode([value]));};

$.UnsupportedOperationException$ = function(_message){return new $.UnsupportedOperationException(_message);};

$.removeLast = function(receiver){if($.isJsArray(receiver)){$.checkGrowable(receiver,'removeLast');if($.get$length(receiver)===0)$.$$throw($.IndexOutOfRangeException$(-1));return receiver.pop();}return receiver.removeLast$0();};

$._BufferingSendPort$ = function(isolateId,_futurePort){var t1=new $._BufferingSendPort($._BufferingSendPort__idCount,null,_futurePort,[],isolateId);t1._BufferingSendPort$2(isolateId,_futurePort);return t1;};

$.invokeClosure = function(closure,isolate,numberOfArguments,arg1,arg2){if($.eqB(numberOfArguments,0))return $._callInIsolate(isolate,new $.invokeClosure_anon(closure));else if($.eqB(numberOfArguments,1))return $._callInIsolate(isolate,new $.invokeClosure_anon0(closure,arg1));else if($.eqB(numberOfArguments,2))return $._callInIsolate(isolate,new $.invokeClosure_anon1(closure,arg1,arg2));else $.$$throw($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));};

$._IsolateNatives__getJSFunctionName = function(f){return f.$name || (void 0);};

$.MetaInfo$ = function(_tag,_tags,_set){return new $.MetaInfo(_tag,_tags,_set);};

$.addLast = function(receiver,value){if(!$.isJsArray(receiver))return receiver.addLast$1(value);$.checkGrowable(receiver,'addLast');receiver.push(value);};

$._HttpRequestEventsImpl$ = function(_ptr){return new $._HttpRequestEventsImpl(_ptr);};

$.geB = function(a,b){return typeof a==='number'&&typeof b==='number'?a >= b:$.ge$slow(a,b)===true;};

$._isJavaScriptSimpleObject = function(value){return Object.getPrototypeOf(value) === Object.prototype;};

$._ElementRectImpl$ = function(element){return new $._ElementRectImpl($._SimpleClientRect$(element.get$$$dom_clientLeft(),element.get$$$dom_clientTop(),element.get$$$dom_clientWidth(),element.get$$$dom_clientHeight()),$._SimpleClientRect$(element.get$$$dom_offsetLeft(),element.get$$$dom_offsetTop(),element.get$$$dom_offsetWidth(),element.get$$$dom_offsetHeight()),$._SimpleClientRect$(element.get$$$dom_scrollLeft(),element.get$$$dom_scrollTop(),element.get$$$dom_scrollWidth(),element.get$$$dom_scrollHeight()),element.$dom_getBoundingClientRect$0(),element.$dom_getClientRects$0());};

$.ioore = function(index){$.$$throw($.IndexOutOfRangeException$(index));};

$._SelectIterator$ = function(_source,_func,TSource,TOutput){var t1=new $._SelectIterator(_source,_func);$.setRuntimeTypeInfo(t1,{ 'TSource': TSource, 'TOutput': TOutput });return t1;};

$._JsDeserializer$ = function(){return new $._JsDeserializer(null);};

$._IsolateNatives__getJSFunctionFromName = function(functionName){    return $globalThis[functionName];
  };

$.add = function(a,b){return typeof a==='number'&&typeof b==='number'?a + b:$.add$slow(a,b);};

$.abs = function(receiver){if(!(typeof receiver==='number'))return receiver.abs$0();return Math.abs(receiver);};

$._callInIsolate = function(isolate,function$){isolate.eval$1(function$);$._globalState().get$topEventLoop().run$0();};

$.getElementCoordinate = function(element){var cr=element.$dom_getBoundingClientRect$0();return $.Coordinate$($.toInt(cr.get$left()),$.toInt(cr.get$top()));};

$.Primitives_printString = function(string){if(typeof dartPrint == "function"){dartPrint(string);return;}if(typeof console == "object"){console.log(string);return;}if(typeof write == "function"){write(string);write("\n");}};

$._convertNativeToDart_IDBKey = function(nativeKey){if(new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey)===true)$.$$throw($.CTC16);return nativeKey;};

$.Primitives_getMilliseconds = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds():$.Primitives_lazyAsJsDate(receiver).getMilliseconds();};

$.leB = function(a,b){return typeof a==='number'&&typeof b==='number'?a <= b:$.le$slow(a,b)===true;};

$.mod = function(a,b){if($.checkNumbers(a,b)){var result=a % b;if(result===0)return 0;if(result>0)return result;if(b<0)return result-b;else return result+b;}return a.operator$mod$1(b);};

$._IDBRequestEventsImpl$ = function(_ptr){return new $._IDBRequestEventsImpl(_ptr);};

$._WorkerEventsImpl$ = function(_ptr){return new $._WorkerEventsImpl(_ptr);};

$.ExceptionImplementation$ = function(msg){return new $.ExceptionImplementation(msg);};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch,isUtc){var t1=new $.DateImplementation(millisecondsSinceEpoch,isUtc);t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch,isUtc);return t1;};

$._DOMWindowCrossFrameImpl$ = function(_window){return new $._DOMWindowCrossFrameImpl(_window);};

$.typeNameInFirefox = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='Document')return 'HTMLDocument';if(name$==='XMLDocument')return 'Document';if(name$==='WorkerMessageEvent')return 'MessageEvent';if(name$==='DragEvent')return 'MouseEvent';if(name$==='DataTransfer')return 'Clipboard';if(name$==='FormData')return 'DOMFormData';return name$;};

$.sub$slow = function(a,b){if($.checkNumbers(a,b))return a - b;return a.operator$sub$1(b);};

$.RetainedUtil_transformPointGlobalToLocal = function(element,point){return element.getTransform$0().createInverse$0().transformCoordinate$1(point);};

$.Collections_collectionToString = function(c){var result=$.StringBufferImpl$('');$.Collections__emitCollection(c,result,$.ListImplementation_List(null));return result.toString$0();};

$._SharedWorkerContextEventsImpl$ = function(_ptr){return new $._SharedWorkerContextEventsImpl(_ptr);};

$.indexOf$2 = function(receiver,element,start){if($.isJsArray(receiver))return $.Arrays_indexOf(receiver,element,start,receiver.length);else{$.checkNull(element);if(start<0)return -1;return receiver.indexOf(element, start);}return receiver.indexOf$2(element,start);};

$._maybeScheduleMeasurementFrame = function(){if($._nextMeasurementFrameScheduled===true)return;$._nextMeasurementFrameScheduled=true;if($._firstMeasurementRequest===true){$.add$1($.window().get$on().get$message(),new $._maybeScheduleMeasurementFrame_anon());$._firstMeasurementRequest=false;}$.window().postMessage$2('DART-MEASURE','*');};

$.AffineTransform$ = function(scaleX,shearY,shearX,scaleY,translateX,translateY){return new $.AffineTransform(scaleX,shearY,shearX,scaleY,translateX,translateY);};

$.RetainedUtil_hitTest = function(stage,point){return $.RetainedUtil__hitTest(stage.get$rootElement(),point);};

$.typeNameInIE = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='Document'){if(!!obj.xmlVersion)return 'Document';return 'HTMLDocument';}if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='DataTransfer')return 'Clipboard';if(name$==='DragEvent')return 'MouseEvent';if(name$==='HTMLDDElement')return 'HTMLElement';if(name$==='HTMLDTElement')return 'HTMLElement';if(name$==='HTMLTableDataCellElement')return 'HTMLTableCellElement';if(name$==='HTMLTableHeaderCellElement')return 'HTMLTableCellElement';if(name$==='HTMLPhraseElement')return 'HTMLElement';if(name$==='MSStyleCSSProperties')return 'CSSStyleDeclaration';if(name$==='MouseWheelEvent')return 'WheelEvent';if(name$==='FormData')return 'DOMFormData';return name$;};

$.trim = function(receiver){if(!(typeof receiver==='string'))return receiver.trim$0();return receiver.trim();};

$._TextTrackEventsImpl$ = function(_ptr){return new $._TextTrackEventsImpl(_ptr);};

$.DoubleLinkedQueue$ = function(E){var t1=new $.DoubleLinkedQueue(null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueue$0();return t1;};

$.Primitives_newList = function(length$){if(length$==null)return new Array();if(!(typeof length$==='number'&&length$===(length$|0))||length$<0)$.$$throw($.IllegalArgumentException$(length$));var result=new Array(length$);result.fixed$length = true;return result;};

$.ge = function(a,b){return typeof a==='number'&&typeof b==='number'?a >= b:$.ge$slow(a,b);};

$._globalState = function(){return $globalState;};

$.substring$2 = function(receiver,startIndex,endIndex){if(!(typeof receiver==='string'))return receiver.substring$2(startIndex,endIndex);$.checkNum(startIndex);var length$=receiver.length;if(endIndex==null)endIndex=length$;$.checkNum(endIndex);if(startIndex<0)$.$$throw($.IndexOutOfRangeException$(startIndex));if($.gtB(startIndex,endIndex))$.$$throw($.IndexOutOfRangeException$(startIndex));if($.gtB(endIndex,length$))$.$$throw($.IndexOutOfRangeException$(endIndex));return $.substringUnchecked(receiver,startIndex,endIndex);};

$.StringBufferImpl$ = function(content$){var t1=new $.StringBufferImpl(null,null);t1.StringBufferImpl$1(content$);return t1;};

$.getRuntimeTypeInfo = function(target){if(target==null)return;var res=target.builtin$typeInfo;return res==null?{}:res;};

$.window = function(){return window;};

$._globalState0 = function(val){$globalState = val;};

$.spawnFunction = function(topLevelFunction){var name$=$._IsolateNatives__getJSFunctionName(topLevelFunction);if(name$==null)$.$$throw($.UnsupportedOperationException$('only top-level functions can be spawned.'));return $._IsolateNatives__spawn(name$,null,false);};

$._DOMWindowCrossFrameImpl__blur = function(win){win.blur()};

$.HashMapImplementation$ = function(K,V){var t1=new $.HashMapImplementation(null,null,null,null,null);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });t1.HashMapImplementation$0();return t1;};

$._SVGElementInstanceEventsImpl$ = function(_ptr){return new $._SVGElementInstanceEventsImpl(_ptr);};

$.Primitives_getMinutes = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCMinutes():$.Primitives_lazyAsJsDate(receiver).getMinutes();};

$.Primitives_lazyAsJsDate = function(receiver){if(receiver.date === (void 0))receiver.date = new Date(receiver.millisecondsSinceEpoch);return receiver.date;};

$.Primitives_getDay = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCDate():$.Primitives_lazyAsJsDate(receiver).getDate();};

$._FixedSizeListIterator$ = function(array,T){var t1=new $._FixedSizeListIterator($.get$length(array),array,0);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._MainManagerStub$ = function(){return new $._MainManagerStub();};

$._FileReaderEventsImpl$ = function(_ptr){return new $._FileReaderEventsImpl(_ptr);};

$.DetailedIllegalArgumentException$ = function(arg,message){return new $.DetailedIllegalArgumentException(arg,message,'');};

$.regExpTest = function(regExp,str){return $.regExpGetNative(regExp).test(str);};

$.HashMapImplementation__nextProbe = function(currentProbe,numberOfProbes,length$){return $.and($.add(currentProbe,numberOfProbes),$.sub(length$,1));};

$.Coordinate$ = function(x,y){return new $.Coordinate(x,y);};

$.makeLiteralMap = function(keyValuePairs){var iterator=$.iterator(keyValuePairs);var result=$.LinkedHashMapImplementation$();for(;iterator.hasNext$0()===true;)result.operator$indexSet$2(iterator.next$0(),iterator.next$0());return result;};

$._IsolateNatives__thisScript = function(){return $thisScriptUrl};

$._createMeasurementFuture = function(computeValue,completer){if($._pendingRequests==null){$._pendingRequests=[];$._maybeScheduleMeasurementFrame();}$.add$1($._pendingRequests,$._MeasurementRequest$(computeValue,completer));return completer.get$future();};

$.Tuple$ = function(Item1,Item2,T1,T2){var t1=new $.Tuple(Item1,Item2);$.setRuntimeTypeInfo(t1,{ 'T1': T1, 'T2': T2 });return t1;};

$.Uri__addIfNonEmpty = function(sb,test,first,second){if(!(''===test)){sb.add$1(first==null?'null':first);sb.add$1(second==null?'null':second);}};

$.CompleterImpl$ = function(T){var t1=new $.CompleterImpl($.FutureImpl$());$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$.isInfinite = function(receiver){if(!(typeof receiver==='number'))return receiver.isInfinite$0();return receiver == Infinity||receiver == -Infinity;};

$.NoMoreElementsException$ = function(){return new $.NoMoreElementsException();};

$._WindowEventsImpl$ = function(_ptr){return new $._WindowEventsImpl(_ptr);};

$._EventListenerListImpl$ = function(_ptr,_type){return new $._EventListenerListImpl(_ptr,_type);};

$.gt$slow = function(a,b){if($.checkNumbers(a,b))return a > b;return a.operator$gt$1(b);};

$.iae = function(argument){$.$$throw($.IllegalArgumentException$(argument));};

$._Elements_ImageElement = function(src,width,height){var _e=$._document().$dom_createElement$1('img');_e.set$src(src);if(!(width==null))_e.set$width(width);if(!(height==null))_e.set$height(height);return _e;};

$._IsolateNatives__getEventData = function(e){return e.data};

$._DOMApplicationCacheEventsImpl$ = function(_ptr){return new $._DOMApplicationCacheEventsImpl(_ptr);};

$._IsolateNatives__spawnWorker = function(functionName,uri,replyPort){if(functionName==null)functionName='main';if(uri==null)uri=$._IsolateNatives__thisScript();if($.Uri$fromString(uri).isAbsolute$0()!==true)uri=$.S($.substring$2($._IsolateNatives__thisScript(),0,$.lastIndexOf$1($._IsolateNatives__thisScript(),'/')))+'/'+$.S(uri);var worker=$._IsolateNatives__newWorker(uri);worker.set$onmessage(new $._IsolateNatives__spawnWorker_anon(worker));var t1=$._globalState();var workerId=t1.get$nextManagerId();t1.set$nextManagerId($.add(workerId,1));worker.set$id(workerId);$.indexSet($._globalState().get$managers(),workerId,worker);worker.postMessage$1($._serializeMessage($.makeLiteralMap(['command','start','id',workerId,'replyTo',$._serializeMessage(replyPort),'functionName',functionName])));};

$.Collections__emitCollection = function(c,result,visiting){$.add$1(visiting,c);var isList=typeof c==='object'&&c!==null&&(c.constructor===Array||c.is$List());$.add$1(result,isList?'[':'{');for(var t1=$.iterator(c),first=true;t1.hasNext$0()===true;){var t2=t1.next$0();if(!first)$.add$1(result,', ');$.Collections__emitObject(t2,result,visiting);first=false;}$.add$1(result,isList?']':'}');$.removeLast(visiting);};

$.typeNameInChrome = function(obj){var name$=obj.constructor.name;if(name$==='Window')return 'DOMWindow';if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='WebKitMutationObserver')return 'MutationObserver';if(name$==='FormData')return 'DOMFormData';return name$;};

$._document = function(){return document;};

$._FrameSetElementEventsImpl$ = function(_ptr){return new $._FrameSetElementEventsImpl(_ptr);};

$.StringImplementation__toJsStringArray = function(strings){if(typeof strings!=='object'||strings===null||(strings.constructor!==Array||!!strings.immutable$list)&&!strings.is$JavaScriptIndexingBehavior())return $.StringImplementation__toJsStringArray$bailout(1,strings);$.checkNull(strings);var length$=strings.length;if($.isJsArray(strings)){for(var i=0;i<length$;++i){if(i<0||i>=strings.length)$.ioore(i);var string=strings[i];$.checkNull(string);if(!(typeof string==='string'))$.$$throw($.IllegalArgumentException$(string));}var array=strings;}else{array=$.ListImplementation_List(length$);for(i=0;i<length$;++i){if(i<0||i>=strings.length)$.ioore(i);string=strings[i];$.checkNull(string);if(!(typeof string==='string'))$.$$throw($.IllegalArgumentException$(string));if(i<0||i>=array.length)$.ioore(i);array[i]=string;}}return array;};

$.listInsertRange = function(receiver,start,length$,initialValue){if(typeof receiver!=='object'||receiver===null||(receiver.constructor!==Array||!!receiver.immutable$list)&&!receiver.is$JavaScriptIndexingBehavior())return $.listInsertRange$bailout(1,receiver,start,length$,initialValue);if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)$.$$throw($.IllegalArgumentException$(length$));if(!(typeof start==='number'&&start===(start|0)))$.$$throw($.IllegalArgumentException$(start));var receiverLength=receiver.length;if(start<0||start>receiverLength)$.$$throw($.IndexOutOfRangeException$(start));var t1=receiverLength+length$;$.set$length(receiver,t1);var t2=start+length$;$.Arrays_copy(receiver,start,receiver,t2,receiverLength-start);if(!(initialValue==null))for(var i=start;i<t2;++i){if(i<0||i>=receiver.length)$.ioore(i);receiver[i]=initialValue;}$.set$length(receiver,t1);};

$.IllegalJSRegExpException$ = function(_pattern,_errmsg){return new $.IllegalJSRegExpException(_pattern,_errmsg);};

$._IsolateNatives__startIsolate = function(topLevel,replyTo){$._fillStatics($._globalState().get$currentContext());$._lazyPort=$._ReceivePortFactory_ReceivePort();replyTo.send$2('spawned',$.port().toSendPort$0());topLevel.call$0();};

$._timerFactory = function(millis,callback,repeating){return repeating===true?$._Timer$repeating(millis,callback):$._Timer$(millis,callback);};

$._IDBDatabaseEventsImpl$ = function(_ptr){return new $._IDBDatabaseEventsImpl(_ptr);};

$.toStringForNativeObject = function(obj){return 'Instance of '+$.getTypeNameOf(obj);};

$._DOMWindowCrossFrameImpl__top = function(win){return win.top;};

$.constructorNameFallback = function(obj){var constructor$=obj.constructor;if(typeof(constructor$)==='function'){var name$=constructor$.name;if(typeof name$==='string')var t1=!(name$==='')&&!(name$==='Object')&&!(name$==='Function.prototype');else t1=false;if(t1)return name$;}var string=Object.prototype.toString.call(obj);return string.substring(8, string.length - 1);};

$.FormatException$ = function(message){return new $.FormatException(message);};

$.ltB = function(a,b){return typeof a==='number'&&typeof b==='number'?a < b:$.lt$slow(a,b)===true;};

$.FutureValueResult$ = function(value,TOutput){var t1=new $.FutureValueResult(value,null);$.setRuntimeTypeInfo(t1,{ 'TOutput': TOutput });return t1;};

$.tdiv = function(a,b){if($.checkNumbers(a,b))return $.truncate(a / b);return a.operator$tdiv$1(b);};

$.unwrapException = function(ex){if("dartException" in ex)return ex.dartException;var message=ex.message;if(ex instanceof TypeError){var type=ex.type;var name$=ex.arguments ? ex.arguments[0] : "";if($.eqB(type,'property_not_function')||$.eqB(type,'called_non_callable')||$.eqB(type,'non_object_property_call')||$.eqB(type,'non_object_property_load'))if(typeof name$==='string'&&$.startsWith(name$,'call$')===true)return $.ObjectNotClosureException$();else return $.NullPointerException$(null,$.CTC0);else if($.eqB(type,'undefined_method'))if(typeof name$==='string'&&$.startsWith(name$,'call$')===true)return $.ObjectNotClosureException$();else return $.NoSuchMethodException$('',name$,[],null);var ieErrorCode=ex.number & 0xffff;var ieFacilityNumber=ex.number>>16 & 0x1FFF;if(typeof message==='string')if($.endsWith(message,'is null')===true||$.endsWith(message,'is undefined')===true||$.endsWith(message,'is null or undefined')===true)return $.NullPointerException$(null,$.CTC0);else{if($.contains$1(message,' is not a function')!==true)var t1=ieErrorCode===438&&ieFacilityNumber===10;else t1=true;if(t1)return $.NoSuchMethodException$('','<unknown>',[],null);}return $.ExceptionImplementation$(typeof message==='string'?message:'');}if(ex instanceof RangeError){if(typeof message==='string'&&$.contains$1(message,'call stack')===true)return $.StackOverflowException$();return $.IllegalArgumentException$('');}if(typeof InternalError == 'function' && ex instanceof InternalError)if(typeof message==='string'&&message==='too much recursion')return $.StackOverflowException$();return ex;};

$.GlobalId_GlobalId = function(){var t1=$.GlobalId__globalId;$.GlobalId__globalId=$.add(t1,1);return $.GlobalId$_internal(t1);};

$.Vector$ = function(x,y){return new $.Vector(x,y);};

$.DraggerDemo_DraggerDemo = function(canvas){var image=$.SpriteElement_SpriteElement$horizontalFromUrl('disasteroids2_master.png',28,28,16,29,$.Coordinate$(35,354));var tx=image.addTransform$0();var rootPanel=$.PCanvas$(500,500,false);rootPanel.addElement$1(image);return $.DraggerDemo$_internal(canvas,$.Stage$(canvas,rootPanel),tx,$.Dragger$(canvas));};

$.checkNumbers = function(a,b){if(typeof a==='number')if(typeof b==='number')return true;else{$.checkNull(b);$.$$throw($.IllegalArgumentException$(b));}return false;};

$._MediaStreamTrackListEventsImpl$ = function(_ptr){return new $._MediaStreamTrackListEventsImpl(_ptr);};

$._ReceivePortImpl$ = function(){var t1=$._ReceivePortImpl__nextFreeId;$._ReceivePortImpl__nextFreeId=$.add(t1,1);t1=new $._ReceivePortImpl(t1,null);t1._ReceivePortImpl$0();return t1;};

$.NoSuchMethodException$ = function(_receiver,_functionName,_arguments,existingArgumentNames){return new $.NoSuchMethodException(_receiver,_functionName,_arguments,existingArgumentNames);};

$.stringJoinUnchecked = function(array,separator){return array.join(separator);};

$._WorkerSendPort$ = function(_workerId,isolateId,_receivePortId){return new $._WorkerSendPort(_workerId,_receivePortId,isolateId);};

$.S = function(value){var res=$.toString(value);if(!(typeof res==='string'))$.$$throw($.IllegalArgumentException$(value));return res;};

$.checkString = function(value){if(!(typeof value==='string')){$.checkNull(value);$.$$throw($.IllegalArgumentException$(value));}return value;};

$._DoubleLinkedQueueIterator$ = function(_sentinel,E){var t1=new $._DoubleLinkedQueueIterator(_sentinel,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1._DoubleLinkedQueueIterator$1(_sentinel);return t1;};

$.Arrays_indexOf = function(a,element,startIndex,endIndex){var t1=a.length;if(startIndex>=t1)return -1;if(startIndex<0)startIndex=0;for(var i=startIndex;i<endIndex;++i){if(i<0||i>=t1)$.ioore(i);if($.eqB(a[i],element))return i;}return -1;};

$._ReceivePortFactory_ReceivePort = function(){return $._ReceivePortImpl$();};

$.$$ = function(source){if(typeof source==='object'&&source!==null&&!!source.is$Enumerable)return source;else return $.Enumerable_Enumerable(source);};

$.FutureValueResult_FutureValueResult$fromMap = function(value,TOutput){$.requireArgumentNotNull(value,'value');$.requireArgument($.FutureValueResult_isMyMap(value),'value',null);var ex=$.index(value,'exception');if(!(ex==null))return $.FutureValueResult$fromException(ex);else return $.FutureValueResult$($.index(value,'value'));};

$.EventHandle$ = function(T){var t1=new $.EventHandle(null,false);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._SimpleClientRect$ = function(left,top$,width,height){return new $._SimpleClientRect(left,top$,width,height);};

$._ElementFactoryProvider_Element$tag = function(tag){return document.createElement(tag)};

$.startRootIsolate = function(entry){var t1=$._Manager$();$._globalState0(t1);if($._globalState().get$isWorker()===true)return;var rootContext=$._IsolateContext$();$._globalState().set$rootContext(rootContext);$._fillStatics(rootContext);$._globalState().set$currentContext(rootContext);if(!($._window()==null))rootContext.eval$1(new $.startRootIsolate_anon());rootContext.eval$1(entry);$._globalState().get$topEventLoop().run$0();};

$.lt$slow = function(a,b){if($.checkNumbers(a,b))return a < b;return a.operator$lt$1(b);};

$.Collections__emitObject = function(o,result,visiting){if(typeof o==='object'&&o!==null&&(o.constructor===Array||o.is$Collection()))if($.Collections__containsRef(visiting,o))$.add$1(result,typeof o==='object'&&o!==null&&(o.constructor===Array||o.is$List())?'[...]':'{...}');else $.Collections__emitCollection(o,result,visiting);else if(typeof o==='object'&&o!==null&&o.is$Map())if($.Collections__containsRef(visiting,o))$.add$1(result,'{...}');else $.Maps__emitMap(o,result,visiting);else $.add$1(result,o==null?'null':o);};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr){return new $._DedicatedWorkerContextEventsImpl(_ptr);};

$.NoneHashMap$ = function(K,V){var t1=new $.NoneHashMap($.ListImplementation_List(null,'Tuple<K, V>'));$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });return t1;};

$._IsolateNatives__startNonWorker = function(functionName,uri,replyPort){if(!(uri==null))$.$$throw($.UnsupportedOperationException$('Currently spawnUri is not supported without web workers.'));$._globalState().get$topEventLoop().enqueue$3($._IsolateContext$(),new $._IsolateNatives__startNonWorker_function(functionName,replyPort),'nonworker start');};

$.requireArgumentNotNull = function(argument,argName){if(argument==null)$.$$throw($.NullArgumentException$(argName));};

$.truncate = function(receiver){return receiver<0?$.ceil(receiver):$.floor(receiver);};

$._EventLoop$ = function(){return new $._EventLoop($.DoubleLinkedQueue$('_IsolateEvent'));};

$.Stage$ = function(_canvas,_element){var t1=new $.Stage(_canvas,_element,$.EventHandle$('EventArgs'),null,$.PropertyValues$(),false);t1.Stage$2(_canvas,_element);return t1;};

$.substringUnchecked = function(receiver,startIndex,endIndex){return receiver.substring(startIndex, endIndex);};

$._FuncEnumerable$ = function(_source,_func,TSource,TOutput){var t1=new $._FuncEnumerable(_source,_func);$.setRuntimeTypeInfo(t1,{ 'TSource': TSource, 'TOutput': TOutput });return t1;};

$.toString = function(value){if(typeof value == "object" && value !== null)if($.isJsArray(value))return $.Collections_collectionToString(value);else return value.toString$0();if(value === 0 && (1 / value) < 0)return '-0.0';if(value==null)return 'null';if(typeof value == "function")return 'Closure';return String(value);};

$.contains = function(userAgent,name$){return !(userAgent.indexOf(name$)===-1);};

$._AudioContextEventsImpl$ = function(_ptr){return new $._AudioContextEventsImpl(_ptr);};

$._TextTrackCueEventsImpl$ = function(_ptr){return new $._TextTrackCueEventsImpl(_ptr);};

$.typeNameInSafari = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='CanvasPixelArray')return 'Uint8ClampedArray';if(name$==='WebKitMutationObserver')return 'MutationObserver';if(name$==='FormData')return 'DOMFormData';return name$;};

$._demoIsolate = function(){$.SendValuePort$(new $._demoIsolate_anon(),'Coordinate','int');};

$.regExpExec = function(regExp,str){var result=$.regExpGetNative(regExp).exec(str);if(result === null)return;return result;};

$.endsWith = function(receiver,other){$.checkString(other);var receiverLength=receiver.length;var otherLength=other.length;if(otherLength>receiverLength)return false;return other===$.substring$1(receiver,receiverLength-otherLength);};

$.contains$2 = function(receiver,other,startIndex){if(!(typeof receiver==='string'))return receiver.contains$2(other,startIndex);$.checkNull(other);return $.stringContainsUnchecked(receiver,other,startIndex);};

$.regExpMatchStart = function(m){return m.index;};

$._WorkerContextEventsImpl$ = function(_ptr){return new $._WorkerContextEventsImpl(_ptr);};

$._ElementEventsImpl$ = function(_ptr){return new $._ElementEventsImpl(_ptr);};

$.Primitives_getMonth = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCMonth()+1:$.Primitives_lazyAsJsDate(receiver).getMonth()+1;};

$._dynamicMetadata = function(table){$dynamicMetadata = table;};

$._dynamicMetadata0 = function(){if(typeof($dynamicMetadata)==='undefined'){var t1=[];$._dynamicMetadata(t1);}return $dynamicMetadata;};

$.dynamicSetMetadata = function(inputTable){var t1=$.buildDynamicMetadata(inputTable);$._dynamicMetadata(t1);};

$._SpeechRecognitionEventsImpl$ = function(_ptr){return new $._SpeechRecognitionEventsImpl(_ptr);};

$.Primitives_getSeconds = function(receiver){return receiver.isUtc===true?$.Primitives_lazyAsJsDate(receiver).getUTCSeconds():$.Primitives_lazyAsJsDate(receiver).getSeconds();};

$.add$slow = function(a,b){if($.checkNumbers(a,b))return a + b;return a.operator$add$1(b);};

$.Util_getHashCode = function(source){for(var t1=$.iterator(source),hash=0;t1.hasNext$0()===true;){var t2=t1.next$0();var next=t2==null?0:$.hashCode(t2);if(typeof next!=='number')$.iae(next);var hash0=536870911&hash+next;var hash1=536870911&hash0+((524287&hash0)<<10>>>0);hash1=(hash1^$.shr(hash1,6))>>>0;hash=hash1;}hash0=536870911&hash+((67108863&hash)<<3>>>0);hash0=(hash0^$.shr(hash0,11))>>>0;return 536870911&hash0+((16383&hash0)<<15>>>0);};

$.IllegalArgumentException$ = function(arg){return new $.IllegalArgumentException(arg);};

$._IsolateNatives__startWorker = function(functionName,uri,replyPort){if($._globalState().get$isWorker()===true)$._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command','spawn-worker','functionName',functionName,'uri',uri,'replyPort',replyPort])));else $._IsolateNatives__spawnWorker(functionName,uri,replyPort);};

$._IsolateNatives__spawn = function(functionName,uri,isLight){var completer=$.CompleterImpl$('SendPort');var port=$._ReceivePortFactory_ReceivePort();port.receive$1(new $._IsolateNatives__spawn_anon(port,completer));var signalReply=port.toSendPort$0();if($._globalState().get$useWorkers()===true&&!isLight)$._IsolateNatives__startWorker(functionName,uri,signalReply);else $._IsolateNatives__startNonWorker(functionName,uri,signalReply);return $._BufferingSendPort$($._globalState().get$currentContext().get$id(),completer.get$future());};

$._HttpRequestUploadEventsImpl$ = function(_ptr){return new $._HttpRequestUploadEventsImpl(_ptr);};

$.Mouse_markMouseOver = function(stage,coordinate){$.requireArgumentNotNull(stage,'stage');var t1=!(coordinate==null);$.requireArgument(coordinate==null||coordinate.get$isValid()===true,'coordinate',null);var items=$.CTC23.get$1(stage);if(!(items==null)){$.forEach(items,new $.Mouse_markMouseOver_anon());$.CTC23.clear$1(stage);}if(t1){var hits=$.RetainedUtil_hitTest(stage,coordinate);$.CTC23.set$2(stage,hits);$.forEach(hits,new $.Mouse_markMouseOver_anon0());if($.gtB($.get$length(hits),0))$.CTC24.set$2($.index(hits,0),true);return hits;}return;};

$._PendingSendPortFinder$ = function(){var t1=$._MessageTraverserVisitedMap$();t1=new $._PendingSendPortFinder([],t1);t1._PendingSendPortFinder$0();return t1;};

$.Futures_wait = function(futures){var t1={};if(typeof futures!=='string'&&(typeof futures!=='object'||futures===null||futures.constructor!==Array&&!futures.is$JavaScriptIndexingBehavior()))return $.Futures_wait$bailout(1,futures,t1);if($.isEmpty(futures)===true)return $.FutureImpl_FutureImpl$immediate($.CTC0,'List');var completer=$.CompleterImpl$('List');var result=completer.get$future();t1.remaining_1=futures.length;var values=$.ListImplementation_List(futures.length);for(var i=0;t2=futures.length,i<t2;++i){if(i<0||i>=t2)$.ioore(i);var future=futures[i];future.then$1(new $.Futures_wait_anon(completer,i,t1,result,values));future.handleException$1(new $.Futures_wait_anon0(future,completer,result));}return result;var t2;};

$._MatchImplementation$ = function(pattern,str,_start,_end,_groups){return new $._MatchImplementation(pattern,str,_start,_end,_groups);};

$.checkNull = function(object){if(object==null)$.$$throw($.NullPointerException$(null,$.CTC0));return object;};

$.DateImplementation$now = function(){var t1=new $.DateImplementation($.Primitives_dateNow(),false);t1.DateImplementation$now$0();return t1;};

$.Arrays_copy = function(src,srcStart,dst,dstStart,count){if(typeof src!=='string'&&(typeof src!=='object'||src===null||src.constructor!==Array&&!src.is$JavaScriptIndexingBehavior()))return $.Arrays_copy$bailout(1,src,srcStart,dst,dstStart,count);if(typeof dst!=='object'||dst===null||(dst.constructor!==Array||!!dst.immutable$list)&&!dst.is$JavaScriptIndexingBehavior())return $.Arrays_copy$bailout(1,src,srcStart,dst,dstStart,count);if(srcStart<dstStart)for(var i=srcStart+count-1,j=dstStart+count-1;i>=srcStart;--i,--j){if(i!==(i|0))$.iae(i);if(i<0||i>=src.length)$.ioore(i);var t1=src[i];if(j!==(j|0))$.iae(j);if(j<0||j>=dst.length)$.ioore(j);dst[j]=t1;}else for(t1=srcStart+count,i=srcStart,j=dstStart;i<t1;++i,++j){if(i<0||i>=src.length)$.ioore(i);var t2=src[i];if(j<0||j>=dst.length)$.ioore(j);dst[j]=t2;}};

$._PeerConnection00EventsImpl$ = function(_ptr){return new $._PeerConnection00EventsImpl(_ptr);};

$.indexSet = function(a,index,value){if(a.constructor === Array && !a.immutable$list){var key=index >>> 0;if(key===index&&key<a.length){a[key] = value;return;}}$.indexSet$slow(a,index,value);};

$.index$slow = function(a,index){if(typeof a==='string'||$.isJsArray(a)){if(!(typeof index==='number'&&index===(index|0))){if(!(typeof index==='number'))$.$$throw($.IllegalArgumentException$(index));if(!($.truncate(index)===index))$.$$throw($.IllegalArgumentException$(index));}if($.ltB(index,0)||$.geB(index,$.get$length(a)))$.$$throw($.IndexOutOfRangeException$(index));return a[index];}return a.operator$index$1(index);};

$.div = function(a,b){return typeof a==='number'&&typeof b==='number'?a / b:$.div$slow(a,b);};

$._AbstractWorkerEventsImpl$ = function(_ptr){return new $._AbstractWorkerEventsImpl(_ptr);};

$._MeasurementRequest$ = function(computeValue,completer,T){var t1=new $._MeasurementRequest(computeValue,completer,null,false);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$.Collections__containsRef = function(c,ref){for(var t1=$.iterator(c);t1.hasNext$0()===true;){var t2=t1.next$0();if(t2==null?ref==null:t2===ref)return true;}return false;};

$._Elements_CanvasElement = function(width,height){var _e=$._document().$dom_createElement$1('canvas');if(!(width==null))_e.set$width(width);if(!(height==null))_e.set$height(height);return _e;};

$.Uri$fromString = function(uri){var t1=$.CTC18.firstMatch$1(uri);var t2=$.index(t1,1);t2=!(t2==null)?t2:'';var t3=$.index(t1,2);t3=!(t3==null)?t3:'';var t4=$.index(t1,3);t4=!(t4==null)?t4:'';var t5=$.Uri__parseIntOrZero($.index(t1,4));var t6=$.index(t1,5);t6=!(t6==null)?t6:'';var t7=$.index(t1,6);t7=!(t7==null)?t7:'';t1=$.index(t1,7);t1=!(t1==null)?t1:'';return new $.Uri(t2,t3,t4,t5,t6,t7,t1);};

$._Lists_lastIndexOf = function(a,element,startIndex){if(typeof a!=='string'&&(typeof a!=='object'||a===null||a.constructor!==Array&&!a.is$JavaScriptIndexingBehavior()))return $._Lists_lastIndexOf$bailout(1,a,element,startIndex);if(typeof startIndex!=='number')return $._Lists_lastIndexOf$bailout(1,a,element,startIndex);if(startIndex<0)return -1;var t1=a.length;if(startIndex>=t1)startIndex=t1-1;for(var i=startIndex;i>=0;--i){if(i!==(i|0))$.iae(i);if(i<0||i>=a.length)$.ioore(i);if($.eqB(a[i],element))return i;}return -1;};

$._MediaElementEventsImpl$ = function(_ptr){return new $._MediaElementEventsImpl(_ptr);};

$.$$throw = function(ex){if(ex==null)ex=$.CTC1;var jsError=new Error();jsError.name = ex;jsError.description = ex;jsError.dartException = ex;jsError.toString = $.toStringWrapper.call$0;throw jsError;};

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

$._DemoValue$ = function(){return new $._DemoValue($.spawnFunction($._demoIsolate),null,null,null,null,null,false,$.EventHandle$('EventArgs'),$.EventHandle$('EventArgs'),$.EventHandle$('Object'));};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr){return new $._IDBOpenDBRequestEventsImpl(_ptr);};

$._IsolateNatives__newWorker = function(url){return new Worker(url);};

$.checkMutable = function(list,reason){if(!!(list.immutable$list))$.$$throw($.UnsupportedOperationException$(reason));};

$.sqrt = function(value){return Math.sqrt($.checkNum(value));};

$.checkGrowable = function(list,reason){if(!!(list.fixed$length))$.$$throw($.UnsupportedOperationException$(reason));};

$.le = function(a,b){return typeof a==='number'&&typeof b==='number'?a <= b:$.le$slow(a,b);};

$._serializeMessage = function(message){if($._globalState().get$needSerialization()===true)return $._JsSerializer$().traverse$1(message);else return $._JsCopier$().traverse$1(message);};

$.FutureValueResult_isMyMap = function(value){return !(value==null)&&$.eqB($.get$length(value),2)&&value.containsKey$1('value')===true&&value.containsKey$1('exception')===true;};

$.Rect$ = function(left,top$,width,height){return new $.Rect(left,top$,width,height);};

$._IsolateNatives__consoleLog = function(msg){$globalThis.console.log(msg);};

$.index = function(a,index){if(typeof a == "string" || a.constructor === Array){var key=index >>> 0;if(key===index&&key<a.length)return a[key];}return $.index$slow(a,index);};

$.IndexOutOfRangeException$ = function(_value){return new $.IndexOutOfRangeException(_value);};

$.le$slow = function(a,b){if($.checkNumbers(a,b))return a <= b;return a.operator$le$1(b);};

$.KeyValuePair$ = function(key,value,K,V){var t1=new $.KeyValuePair(key,value);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });return t1;};

$.RetainedUtil__hitTest = function(element,point){point=$.RetainedUtil_transformPointGlobalToLocal(element,point);var bounds=$.Rect$(0,0,element.get$width(),element.get$height());var hits=$.ListImplementation_List(null,'PElement');if(bounds.contains$1(point)===true){var length$=element.get$visualChildCount();if(typeof length$!=='number')return $.RetainedUtil__hitTest$bailout(1,element,length$,point,hits);for(var t1=length$-1,i=0;i<length$;++i){hits=$.RetainedUtil__hitTest(element.getVisualChild$1(t1-i),point);if(hits.length>0)break;}hits.push(element);return hits;}else return [];};

$._DocumentEventsImpl$ = function(_ptr){return new $._DocumentEventsImpl(_ptr);};

$.xor = function(a,b){if($.checkNumbers(a,b))return (a ^ b) >>> 0;return a.operator$xor$1(b);};

$.typeNameInOpera = function(obj){var name$=$.constructorNameFallback(obj);if(name$==='Window')return 'DOMWindow';if(name$==='FormData')return 'DOMFormData';return name$;};

$._window = function(){return typeof window != "undefined"?window:null;};

$.substring$1 = function(receiver,startIndex){if(!(typeof receiver==='string'))return receiver.substring$1(startIndex);return $.substring$2(receiver,startIndex,null);};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr){return new $._IDBVersionChangeRequestEventsImpl(_ptr);};

$._MessageTraverserVisitedMap$ = function(){return new $._MessageTraverserVisitedMap();};

$.Primitives_dateNow = function(){return Date.now();};

$.NullArgumentException$ = function(arg){return new $.NullArgumentException(arg,arg);};

$.FutureNotCompleteException$ = function(){return new $.FutureNotCompleteException();};

$.CanvasUtil_getCanvasSize = function(canvasElement){return $.Size$(canvasElement.get$width(),canvasElement.get$height());};

$.NotImplementedException$ = function(message){return new $.NotImplementedException(message);};

$.DurationImplementation$ = function(days,hours,minutes,seconds,milliseconds){return new $.DurationImplementation($.add($.add($.add($.add($.mul(days,86400000),$.mul(hours,3600000)),$.mul(minutes,60000)),$.mul(seconds,1000)),milliseconds));};

$._JsSerializer$ = function(){var t1=new $._JsSerializer(0,$._MessageTraverserVisitedMap$());t1._JsSerializer$0();return t1;};

$.CancelableEventArgs$ = function(){return new $.CancelableEventArgs(false);};

$.eq = function(a,b){if(a == null)return b == null;if(b == null)return false;if(typeof a === "object")if(!!a.operator$eq$1)return a.operator$eq$1(b);return a === b;};

$.LinkedHashMapImplementation$ = function(K,V){var t1=new $.LinkedHashMapImplementation(null,null);$.setRuntimeTypeInfo(t1,{ 'K': K, 'V': V });t1.LinkedHashMapImplementation$0();return t1;};

$.NullPointerException$ = function(functionName,arguments$){return new $.NullPointerException(functionName,arguments$);};

$._DoubleLinkedQueueEntrySentinel$ = function(E){var t1=new $._DoubleLinkedQueueEntrySentinel(null,null,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueueEntry$1(null);t1._DoubleLinkedQueueEntrySentinel$0();return t1;};

$.FutureImpl$ = function(T){var t1=new $.FutureImpl(false,null,null,null,false,[],[],[]);$.setRuntimeTypeInfo(t1,{ 'T': T });return t1;};

$._DOMWindowCrossFrameImpl__createSafe = function(w){var t1=$.window();if(w==null?t1==null:w===t1)return w;else return $._DOMWindowCrossFrameImpl$(w);};

$.toStringWrapper = function(){return $.toString(this.dartException);};

$.DraggerDemo$_internal = function(_canvas,_stage,_tx,_dragger){var t1=new $.DraggerDemo(_canvas,_stage,_tx,_dragger,$._DemoValue$(),null,false,false);t1.DraggerDemo$_internal$4(_canvas,_stage,_tx,_dragger);return t1;};

$.gtB = function(a,b){return typeof a==='number'&&typeof b==='number'?a > b:$.gt$slow(a,b)===true;};

$.stringContainsUnchecked = function(receiver,other,startIndex){return !($.indexOf$2(receiver,other,startIndex)===-1);};

$.requireArgument = function(truth,arg,message){if(truth!==true)if(!(message==null))$.$$throw($.DetailedIllegalArgumentException$(arg,message));else $.$$throw($.IllegalArgumentException$(arg));};

$.shl = function(a,b){if($.checkNumbers(a,b)){if(b<0)$.$$throw($.IllegalArgumentException$(b));if(b > 31)return 0;return (a << b) >>> 0;}return a.operator$shl$1(b);};

$.CanvasUtil_drawImage = function(ctx,img,sourceRect,targetRect){if(targetRect==null)targetRect=$.Rect$(0,0,sourceRect.get$width(),sourceRect.get$height());ctx.drawImage$9(img,sourceRect.get$left(),sourceRect.get$top(),sourceRect.get$width(),sourceRect.get$height(),targetRect.get$left(),targetRect.get$top(),targetRect.get$width(),targetRect.get$height());};

$.Primitives_objectToString = function(object){return 'Instance of \''+$.S($.Primitives_objectTypeName(object))+'\'';};

$.defineProperty = function(obj,property,value){Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});};

$._currentIsolate = function(){return $._globalState().get$currentContext();};

$.lt = function(a,b){return typeof a==='number'&&typeof b==='number'?a < b:$.lt$slow(a,b);};

$.insertRange$3 = function(receiver,start,length$,initialValue){if(!$.isJsArray(receiver))return receiver.insertRange$3(start,length$,initialValue);return $.listInsertRange(receiver,start,length$,initialValue);};

$._FileWriterEventsImpl$ = function(_ptr){return new $._FileWriterEventsImpl(_ptr);};

$._completeMeasurementFutures = function(){if($.eqB($._nextMeasurementFrameScheduled,false))return;$._nextMeasurementFrameScheduled=false;if(!($._pendingRequests==null))for(var t1=$.iterator($._pendingRequests);t1.hasNext$0()===true;){var request=t1.next$0();try{var t2=request.computeValue$0();request.set$value(t2);}catch(exception){t2=$.unwrapException(exception);var e=t2;t2=e;request.set$value(t2);request.set$exception(true);}}var completedRequests=$._pendingRequests;var readyMeasurementFrameCallbacks=$._pendingMeasurementFrameCallbacks;$._pendingRequests=null;$._pendingMeasurementFrameCallbacks=null;if(!(completedRequests==null))for(t1=$.iterator(completedRequests);t1.hasNext$0()===true;){t2=t1.next$0();if(t2.get$exception()===true)t2.get$completer().completeException$1(t2.get$value());else t2.get$completer().complete$1(t2.get$value());}if(!(readyMeasurementFrameCallbacks==null))for(t1=$.iterator(readyMeasurementFrameCallbacks);t1.hasNext$0()===true;)t1.next$0().call$0();};

$._Manager$ = function(){var t1=new $._Manager(0,0,1,null,null,null,null,null,null,null,null,null);t1._Manager$0();return t1;};

$.regExpGetNative = function(regExp){var r=regExp._re;return r==null?regExp._re = $.regExpMakeNative(regExp,false):r;};

$._NotificationEventsImpl$ = function(_ptr){return new $._NotificationEventsImpl(_ptr);};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win,message,targetOrigin){    win.postMessage(message, targetOrigin);
};

$.Coordinate_difference = function(a,b){return $.Vector$($.sub(a.x,b.get$x()),$.sub(a.y,b.get$y()));};

$.sub = function(a,b){return typeof a==='number'&&typeof b==='number'?a - b:$.sub$slow(a,b);};

$.DoubleLinkedQueueEntry$ = function(e,E){var t1=new $.DoubleLinkedQueueEntry(null,null,null);$.setRuntimeTypeInfo(t1,{ 'E': E });t1.DoubleLinkedQueueEntry$1(e);return t1;};

$._Lists_lastIndexOf$bailout = function(state,a,element,startIndex){if($.ltB(startIndex,0))return -1;if($.geB(startIndex,$.get$length(a)))startIndex=$.sub($.get$length(a),1);for(var i=startIndex;$.geB(i,0);i=$.sub(i,1))if($.eqB($.index(a,i),element))return i;return -1;};

$.Arrays_lastIndexOf$bailout = function(state,a,element,startIndex){if(startIndex<0)return -1;if($.geB(startIndex,$.get$length(a)))startIndex=$.sub($.get$length(a),1);for(var i=startIndex;$.geB(i,0);i=$.sub(i,1))if($.eqB($.index(a,i),element))return i;return -1;};

$.Arrays_copy$bailout = function(state,src,srcStart,dst,dstStart,count){if(srcStart<dstStart)for(var i=srcStart+count-1,j=dstStart+count-1;i>=srcStart;--i,--j)$.indexSet(dst,j,$.index(src,i));else for(var t1=srcStart+count,i=srcStart,j=dstStart;i<t1;++i,++j)$.indexSet(dst,j,$.index(src,i));};

$.StringImplementation__toJsStringArray$bailout = function(state,strings){$.checkNull(strings);var length$=$.get$length(strings);if($.isJsArray(strings)){for(var i=0;$.ltB(i,length$);++i){var string=$.index(strings,i);$.checkNull(string);if(!(typeof string==='string'))$.$$throw($.IllegalArgumentException$(string));}var array=strings;}else{array=$.ListImplementation_List(length$);for(i=0;$.ltB(i,length$);++i){string=$.index(strings,i);$.checkNull(string);if(!(typeof string==='string'))$.$$throw($.IllegalArgumentException$(string));if(i<0||i>=array.length)$.ioore(i);array[i]=string;}}return array;};

$.listInsertRange$bailout = function(state,receiver,start,length$,initialValue){if(length$===0)return;$.checkNull(start);$.checkNull(length$);if(length$<0)$.$$throw($.IllegalArgumentException$(length$));if(!(typeof start==='number'&&start===(start|0)))$.$$throw($.IllegalArgumentException$(start));var receiverLength=receiver.length;if(start<0||start>receiverLength)$.$$throw($.IndexOutOfRangeException$(start));var t1=receiverLength+length$;$.set$length(receiver,t1);var t2=start+length$;$.Arrays_copy(receiver,start,receiver,t2,receiverLength-start);if(!(initialValue==null))for(var i=start;i<t2;++i)$.indexSet(receiver,i,initialValue);$.set$length(receiver,t1);};

$.RetainedUtil__hitTest$bailout = function(state,env0,env1,env2,env3){switch(state){case 1:var element=env0;length$=env1;point=env2;hits=env3;break;}switch(state){case 0:var point=$.RetainedUtil_transformPointGlobalToLocal(element,point);var bounds=$.Rect$(0,0,element.get$width(),element.get$height());var hits=$.ListImplementation_List(null,'PElement');case 1:if(state===1||state===0&&bounds.contains$1(point)===true)switch(state){case 0:var length$=element.get$visualChildCount();case 1:state=0;for(var i=0;$.ltB(i,length$);++i){hits=$.RetainedUtil__hitTest(element.getVisualChild$1($.sub($.sub(length$,1),i)),point);if(hits.length>0)break;}hits.push(element);return hits;}else return [];}};

$.Futures_wait$bailout = function(state,futures,t1){if($.isEmpty(futures)===true)return $.FutureImpl_FutureImpl$immediate($.CTC0,'List');var completer=$.CompleterImpl$('List');var result=completer.get$future();t1.remaining_1=$.get$length(futures);var values=$.ListImplementation_List($.get$length(futures));for(var i=0;$.ltB(i,$.get$length(futures));++i){var future=$.index(futures,i);future.then$1(new $.Futures_wait_anon(completer,i,t1,result,values));future.handleException$1(new $.Futures_wait_anon0(future,completer,result));}return result;};

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
$._demoIsolate.call$0 = $._demoIsolate;
$._demoIsolate.$name = "_demoIsolate";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC0 = Isolate.makeConstantList([]);
$.CTC15 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC13 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC20 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC11 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC12 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC27 = new Isolate.$isolateProperties.Property(false, 'IsMouseOver');
$.CTC14 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC17 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC30 = new Isolate.$isolateProperties.Object();
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC24 = new Isolate.$isolateProperties.Property(false, 'IsMouseDirectlyOver');
$.CTC22 = new Isolate.$isolateProperties.EventArgs();
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC25 = new Isolate.$isolateProperties.Coordinate(0, 0);
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeRange on immutable List.');
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC28 = new Isolate.$isolateProperties.Property(null, 'panelTransform');
$.CTC29 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot insertRange on immutable List.');
$.CTC2 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC16 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC23 = new Isolate.$isolateProperties.Property(null, '_stageMouseCacheProperty');
$.CTC26 = new Isolate.$isolateProperties._UndefinedValue();
$.CTC21 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC0);
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC18 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$');
$.CTC3 = new Isolate.$isolateProperties._Default();
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC1 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC0);
$._SPAWNED_SIGNAL = 'spawned';
$.Duration_MILLISECONDS_PER_DAY = 86400000;
$.Uri__COMPONENT_PATH = 5;
$.Duration_HOURS_PER_DAY = 24;
$.HashMapImplementation__DELETED_KEY = Isolate.$isolateProperties.CTC14;
$._pendingMeasurementFrameCallbacks = null;
$.DateImplementation__MAX_MILLISECONDS_SINCE_EPOCH = 8640000000000000;
$._BufferingSendPort__idCount = 0;
$.Uri__COMPONENT_PORT = 4;
$._lazyPort = null;
$.Uri__COMPONENT_SCHEME = 1;
$._MEASUREMENT_MESSAGE = 'DART-MEASURE';
$.HashMapImplementation__INITIAL_CAPACITY = 8;
$.Duration_MINUTES_PER_HOUR = 60;
$.Duration_SECONDS_PER_MINUTE = 60;
$._nextMeasurementFrameScheduled = false;
$._pendingRequests = null;
$.GlobalId__globalId = 0;
$.Uri__splitRe = Isolate.$isolateProperties.CTC18;
$.Uri__COMPONENT_USER_INFO = 2;
$.Uri__COMPONENT_FRAGMENT = 7;
$._ReceivePortImpl__nextFreeId = 1;
$._TimerFactory__factory = null;
$._cachedBrowserPrefix = null;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$.Duration_MILLISECONDS_PER_MINUTE = 60000;
$.Uri__COMPONENT_DOMAIN = 3;
$.Duration_MILLISECONDS_PER_SECOND = 1000;
$.Uri__COMPONENT_QUERY_DATA = 6;
$.Duration_MILLISECONDS_PER_HOUR = 3600000;
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
 is$_FileListImpl: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$Blob: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 is$File: function() { return false; },
 is$Map: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$FileList: function() { return false; },
 is$List: function() { return false; },
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

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["height=", "width="], {
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function(){return $._AudioContextEventsImpl$(this);}
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); }
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
 get$on: function(){return $._BodyElementEventsImpl$(this);}
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
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
 set$cursor: function(value){this.setProperty$3('cursor',value,'');},
 set$font: function(value){this.setProperty$3('font',value,'');},
 get$height: function(){return this.getPropertyValue$1('height');},
 set$height: function(value){this.setProperty$3('height',value,'');},
 get$left: function(){return this.getPropertyValue$1('left');},
 set$src: function(value){this.setProperty$3('src',value,'');},
 get$top: function(){return this.getPropertyValue$1('top');},
 get$transform: function(){return this.getPropertyValue$1($.S($._browserPrefix())+'transform');},
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.get$transform().call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 get$width: function(){return this.getPropertyValue$1('width');},
 set$width: function(value){this.setProperty$3('width',value,'');}
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["height=", "width="], {
 getContext$1: function(contextId){return this.getContext(contextId);},
 get$context2d: function(){return this.getContext$1('2d');}
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!", "font!", "globalAlpha!", "shadowBlur!", "shadowColor!", "shadowOffsetX!", "shadowOffsetY!"], {
 beginPath$0: function(){return this.beginPath();},
 clearRect$4: function(x,y,width,height){return this.clearRect(x,y,width,height);},
 clip$0: function(){return this.clip();},
 drawImage$9: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh){return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);},
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 drawImage$5: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh);
},
 fillRect$4: function(x,y,width,height){return this.fillRect(x,y,width,height);},
 fillText$4: function(text,x,y,maxWidth){return this.fillText(text,x,y,maxWidth);},
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
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
 select$1: function(arg0) { return this.select.call$1(arg0); }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function(){return $._DOMApplicationCacheEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 update$0: function(){return this.update();}
});

$.$defineNativeClass('DOMException', ["message?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
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
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'String');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token){return this.add(token);},
 remove$1: function(token){return this.remove(token);},
 toString$0: function(){return this.toString();}
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

$.$defineNativeClass('HTMLDocument', [], {
 get$on: function(){return $._DocumentEventsImpl$(this);},
 $dom_createElement$1: function(tagName){return this.createElement(tagName);},
 $dom_getElementById$1: function(elementId){return this.getElementById(elementId);},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);},
 query$1: function(selectors){if($.CTC.hasMatch$1(selectors)===true)return this.$dom_getElementById$1($.substring$1(selectors,1));return this.$dom_querySelector$1(selectors);}
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors){return this.$dom_querySelector$1(selectors);},
 get$rect: function(){return $._createMeasurementFuture(new $._DocumentFragmentImpl_rect_anon(),$.CompleterImpl$('ElementRect'));},
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().call$4(arg0, arg1, arg2, arg3); },
 get$translate: function(){return false;},
 translate$2: function(arg0, arg1) { return this.get$translate().call$2(arg0, arg1); },
 get$id: function(){return '';},
 get$parent: function(){return;},
 get$style: function(){return $._ElementFactoryProvider_Element$tag('div').get$style();},
 blur$0: function(){},
 get$blur: function() { return new $.BoundClosure0(this, 'blur$0'); },
 set$id: function(value){$.$$throw($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));},
 get$on: function(){return $._ElementEventsImpl$(this);},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);}
});

$.$defineNativeClass('Element', ["id=", "style?"], {
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
 blur$0: function(){return this.blur();},
 get$blur: function() { return new $.BoundClosure0(this, 'blur$0'); },
 $dom_getBoundingClientRect$0: function(){return this.getBoundingClientRect();},
 $dom_getClientRects$0: function(){return this.getClientRects();},
 $dom_querySelector$1: function(selectors){return this.querySelector(selectors);}
});

$.$defineNativeClass('HTMLEmbedElement', ["height=", "src!", "width="], {
});

$.$defineNativeClass('Entry', [], {
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

$.$defineNativeClass('EntrySync', [], {
 remove$0: function(){return this.remove();}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["currentTarget?"], {
 preventDefault$0: function(){return this.preventDefault();}
});

$.$defineNativeClass('EventException', ["message?"], {
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

$.$defineNativeClass('File', [], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["message?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'File');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'num');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function(){return this.reset();}
});

$.$defineNativeClass('HTMLFrameElement', ["height?", "src!", "width?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function(){return $._FrameSetElementEventsImpl$(this);}
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Node');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 get$on: function(){return $._HttpRequestEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 send$1: function(data){return this.send(data);}
});

$.$defineNativeClass('XMLHttpRequestException', ["message?"], {
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
 get$value: function(){return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());},
 get$_lib_value: function(){return this.value;}
});

$.$defineNativeClass('IDBDatabase', [], {
 get$on: function(){return $._IDBDatabaseEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('IDBDatabaseException', ["message?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('IDBObjectStore', [], {
 add$2: function(value,key){if(!$.eqB($.CTC3,key))return this._add_1$2($._convertDartToNative_SerializedScriptValue(value),key);return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC3)
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

$.$defineNativeClass('HTMLIFrameElement', ["height=", "src!", "width="], {
});

$.$defineNativeClass('ImageData', ["height?", "width?"], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["complete?", "height=", "src!", "width=", "x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["height=", "src!", "value=", "width="], {
 get$on: function(){return $._InputElementEventsImpl$(this);}
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('Location', [], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('HTMLMarqueeElement', ["height=", "width="], {
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLMediaElement', ["src!"], {
 get$on: function(){return $._MediaElementEventsImpl$(this);},
 load$0: function(){return this.load();},
 get$load: function() { return new $.BoundClosure0(this, 'load$0'); }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'String');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["clientX?", "clientY?", "x?", "y?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Node');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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
 lastIndexOf$2: function(element,start){return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 last$0: function(){return this.operator$index$1($.sub($.get$length(this),1));},
 removeRange$2: function(start,rangeLength){$.$$throw($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));},
 operator$index$1: function(index){return this[index];},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function(){return $._NotificationEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 cancel$0: function(){return this.cancel();},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLObjectElement', ["height=", "width="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 get$on: function(){return $._PeerConnection00EventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 close$0: function(){return this.close();},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('Performance', [], {
 webkitNow$0: function(){return this.webkitNow();}
});

$.$defineNativeClass('WebKitPoint', ["x?", "y?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
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

$.$defineNativeClass('RangeException', ["message?"], {
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
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCircleElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGDefsElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGDocument', ["rootElement?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function(){return this.id;},
 set$id: function(value){this.id = value;}
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function(){return $._SVGElementInstanceEventsImpl$(this);}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGException', ["message?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('SVGFEBlendElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFETileElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFilterElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGGElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGGlyphRefElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGImageElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGLineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGMaskElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGMatrix', [], {
 translate$2: function(x,y){return this.translate(x,y);}
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
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
});

$.$defineNativeClass('SVGPoint', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGRect', ["height=", "width=", "x?", "y?"], {
});

$.$defineNativeClass('SVGRectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGSVGElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGSwitchElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGTextElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function(){return this.clear();}
});

$.$defineNativeClass('SVGUseElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('SVGViewSpec', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('Screen', ["height?", "width?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["src!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "value="], {
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function(){return $._SharedWorkerContextEventsImpl$(this);}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('HTMLSourceElement', ["src!"], {
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
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

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'StyleSheet');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["height=", "width="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function(){return $._TextTrackEventsImpl$(this);},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);}
});

$.$defineNativeClass('TextTrackCue', ["id=", "text!"], {
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

$.$defineNativeClass('Touch', ["clientX?", "clientY?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){$.$$throw($.UnsupportedOperationException$('Cannot assign element of immutable List.'));},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'Touch');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src!"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index){return this[index];},
 operator$indexSet$2: function(index,value){this[index] = value},
 iterator$0: function(){return $._FixedSizeListIterator$(this,'int');},
 add$1: function(value){$.$$throw($.CTC2);},
 addLast$1: function(value){$.$$throw($.CTC2);},
 forEach$1: function(f){return $._Collections_forEach(this,f);},
 isEmpty$0: function(){return $.eq($.get$length(this),0);},
 lastIndexOf$2: function(element,start){if(start==null)start=$.sub($.get$length(this),1);return $._Lists_lastIndexOf(this,element,start);},
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,null)
},
 removeLast$0: function(){$.$$throw($.CTC13);},
 removeRange$2: function(start,rangeLength){$.$$throw($.CTC19);},
 insertRange$3: function(start,rangeLength,initialValue){$.$$throw($.CTC29);},
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

$.$defineNativeClass('HTMLVideoElement', ["height=", "width="], {
});

$.$defineNativeClass('WebKitNamedFlow', [], {
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
 $dom_removeEventListener$3: function(type,listener,useCapture){return this.removeEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 send$1: function(data){return this.send(data);}
});

$.$defineNativeClass('DOMWindow', ["length?", "navigator?", "performance?"], {
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
 blur$0: function(){return this.blur();},
 get$blur: function() { return new $.BoundClosure0(this, 'blur$0'); },
 clearInterval$1: function(handle){return this.clearInterval(handle);},
 clearTimeout$1: function(handle){return this.clearTimeout(handle);},
 close$0: function(){return this.close();},
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
},
 terminate$0: function(){return this.terminate();}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 get$on: function(){  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {return $._WorkerContextEventsImpl$(this);}  } else {
    return Object.prototype.get$on.call(this);
  }
},
 $dom_addEventListener$3: function(type,listener,useCapture){return this.addEventListener(type,$.convertDartClosureToJS(listener,1),useCapture);},
 clearInterval$1: function(handle){return this.clearInterval(handle);},
 clearTimeout$1: function(handle){return this.clearTimeout(handle);},
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

$.$defineNativeClass('XPathException', ["message?"], {
 toString$0: function(){return this.toString();}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function(){return this.reset();}
});

$.$defineNativeClass('Worker', [], {
 get$id: function(){return this.id;},
 set$id: function(i){this.id = i;},
 set$onmessage: function(f){this.onmessage = f;},
 postMessage$1: function(msg){return this.postMessage(msg);}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler,timeout){return this.setTimeout($.convertDartClosureToJS(handler,0),timeout);},
 setInterval$2: function(handler,timeout){return this.setInterval($.convertDartClosureToJS(handler,0),timeout);}
});

// 255 dynamic classes.
// 382 classes
// 33 !leaf
(function(){
  var v0/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v3/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v4/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v5/*class(_ElementImpl)*/ = [v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v6/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v7/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v8/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v9/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v10/*class(_NodeImpl)*/ = [v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v11/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v12/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v13/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['AbstractWorker', v13/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v0/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v0/*class(_Uint8ArrayImpl)*/,v0/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['WorkerContext', v9/*class(_WorkerContextImpl)*/],
    ['CharacterData', v8/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v7/*class(_DocumentImpl)*/],
    ['DocumentFragment', v6/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v2/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v3/*class(_MediaElementImpl)*/],
    ['Element', v5/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['MouseEvent', v4/*class(_MouseEventImpl)*/],
    ['Event', [v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,'Event|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v10/*class(_NodeImpl)*/],
    ['MediaStream', v11/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v12/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v9/*class(_WorkerContextImpl)*/,v10/*class(_NodeImpl)*/,v11/*class(_MediaStreamImpl)*/,v12/*class(_IDBRequestImpl)*/,v13/*class(_AbstractWorkerImpl)*/,v9/*class(_WorkerContextImpl)*/,v10/*class(_NodeImpl)*/,v11/*class(_MediaStreamImpl)*/,v12/*class(_IDBRequestImpl)*/,v13/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
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
