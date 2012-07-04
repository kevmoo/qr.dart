class Rect{
  final num left, top, width, height;

  const Rect(this.left, this.top, this.width, this.height);

  factory Rect.fromCoordSize(Coordinate topLeft, Size size) {
    return new Rect(topLeft.x, topLeft.y, size.width, size.height);
  }

  Coordinate get topLeft() => new Coordinate(left, top);

  Size get size() => new Size(width, height);

  bool get isValid() => topLeft.isValid && size.isValid;

  bool contains(Coordinate point){
    return point.x >= left &&
        point.x <= left + width &&
        point.y >= top &&
        point.y <= top + height;
  }

  bool operator ==(Rect other) {
    return other !== null && other.left == left && other.top == top &&
        other.width == width && other.height == height;
  }

  String toString() => "Location: $topLeft, Size: $size";
}
