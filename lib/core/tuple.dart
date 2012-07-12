class Tuple<T1 extends Hashable, T2 extends Hashable>
  implements Hashable {
  final T1 Item1;
  final T2 Item2;

  const Tuple(this.Item1, this.Item2);

  bool operator ==(Tuple<T1, T2> other) {
    return other !== null && Item1 == other.Item1 && Item2 == other.Item2;
  }

  String toString() => "Tuple: Item1: $Item1, Item2: $Item2";

  int hashCode() => Util.getHashCode([Item1, Item2]);
}

class Tuple3<T1 extends Hashable, T2 extends Hashable, T3 extends Hashable>
  extends Tuple<T1, T2> implements Hashable {
  final T3 Item3;

  const Tuple3(T1 param1, T2 param2, this.Item3) :
    super(param1, param2);

  bool operator ==(Tuple3<T1, T2, T3> other) {
    return other !== null &&
        Item1 == other.Item1 &&
        Item2 == other.Item2 &&
        Item3 == other.Item3;
  }

  String toString() => "Tuple3: Item1: $Item1, Item2: $Item2, Item3: $Item3";

  int hashCode() => Util.getHashCode([Item1, Item2, Item3]);
}
