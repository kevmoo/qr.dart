typedef bool Predicate<T>(T obj);
typedef void Action();
typedef void Action1<T>(T param);
typedef void Action2<T1, T2>(T1 param1, T2 param2);
typedef T Func<T>();
typedef TR Func1<T1, TR>(T1 param);
typedef TR Func2<T1, T2, TR>(T1 param1, T2 param2);
