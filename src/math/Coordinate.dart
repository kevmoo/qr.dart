class Coordinate {
  final num x, y;

  const Coordinate([this.x = 0, this.y = 0]);

  bool operator ==(Coordinate other) {
    return other !== null && x == other.x && y == other.y;
  }
}
