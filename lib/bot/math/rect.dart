class Box implements Hashable{
  final num left, top, width, height;

  const Box(this.left, this.top, this.width, this.height);

  factory Box.fromCoordSize(Coordinate topLeft, Size size) {
    return new Box(topLeft.x, topLeft.y, size.width, size.height);
  }

  Coordinate get topLeft => new Coordinate(left, top);

  Size get size => new Size(width, height);

  bool get isValid => topLeft.isValid && size.isValid;

  num get right => left + width;

  num get bottom => top + height;

  bool contains(Coordinate point){
    return point.x >= left &&
        point.x <= left + width &&
        point.y >= top &&
        point.y <= top + height;
  }

  // TODO: test!!
  Coordinate constrain(Coordinate value) {
    requireArgumentNotNull(value, 'value');
    requireArgument(value.isValid, 'value');
    assert(isValid);

    final x = math.min(right, math.max(left, value.x));
    final y = math.min(bottom, math.max(top, value.y));

    return new Coordinate(x, y);
  }

  List<Coordinate> getCorners() {
    return [
      new Coordinate(left, top),
      new Coordinate(left + width, top),
      new Coordinate(left + width, top + height),
      new Coordinate(left, top + height)
    ];
  }

  bool operator ==(Box other) {
    return other !== null && other.left == left && other.top == top &&
        other.width == width && other.height == height;
  }

  String toString() => "Location: $topLeft, Size: $size";

  int hashCode() => Util.getHashCode([left, top, width, height]);
}
