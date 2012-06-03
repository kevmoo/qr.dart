#library('dartlib_core');

#source('internal/_simple_set.dart');

#source('global_id.dart');
#source('events/event.dart');
#source('events/event_handle.dart');
#source('disposable.dart');

#source('math/size.dart');
#source('math/coordinate.dart');
#source('math/vec2.dart');
#source('math/rect.dart');

typedef bool Predicate<T>(T obj);
typedef T Func<T>();
typedef void Action<T>(T param);
typedef TR Func1<T1, TR>(T1 param);
