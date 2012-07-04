class Rect{
  final num left, top, width, height;

  const Rect(this.left, this.top, this.width, this.height);

  bool get isValid() => topLeft.isValid && size.isValid;

  bool contains(Coordinate point){
    return point.x >= left &&
        point.x <= left + width &&
        point.y >= top &&
        point.y <= top + height;
  }
}
