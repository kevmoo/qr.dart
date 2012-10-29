part of bot;

class Tuple3<T1, T2, T3>
  extends Tuple<T1, T2> {
  final T3 item3;

  const Tuple3(T1 param1, T2 param2, this.item3) :
    super(param1, param2);

  bool operator ==(Tuple3<T1, T2, T3> other) {
    return other != null &&
        item1 == other.item1 &&
        item2 == other.item2 &&
        item3 == other.item3;
  }

  String toString() => "{item1: $item1, item2: $item2, item3: $item3}";

  int get hashCode => Util.getHashCode([item1, item2, item3]);
}
