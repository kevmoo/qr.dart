// TODO: rename Items to be lower case
class Tuple3<T1, T2, T3>
  extends Tuple<T1, T2> {
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
}
