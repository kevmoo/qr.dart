class Tuple<T1, T2> {
  final T1 Item1;
  final T2 Item2;

  Tuple(this.Item1, this.Item2);

  bool operator ==(Tuple<T1, T2> other) {
    return other !== null && Item1 == other.Item1 && Item2 == other.Item2;
  }
}
