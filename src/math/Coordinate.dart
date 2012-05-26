class Coordinate {
  final num x, y;

  const Coordinate([num this.x = 0, num this.y = 0]);

  bool operator ==(Coordinate other) {
    return other !== null && x == other.x && y == other.y;
  }
}
