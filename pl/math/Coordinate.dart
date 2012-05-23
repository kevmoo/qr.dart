class Coordinate {
  final num x, y;

  const Coordinate(num this.x, num this.y);

  bool operator ==(Coordinate other) {
    return other !== null && x == other.x && y == other.y;
  }
}
