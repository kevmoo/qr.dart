part of bot;

class Tuple<T1, T2> {
  final T1 item1;
  final T2 item2;

  const Tuple(this.item1, this.item2);

  bool operator ==(Tuple<T1, T2> other) {
    return other != null && item1 == other.item1 && item2 == other.item2;
  }

  String toString() => "{item1: $item1, item2: $item2}";

  int get hashCode => Util.getHashCode([item1, item2]);

  dynamic toJson() => { 'item1' : item1, 'item2' : item2 };
}
