class PRect{
  final num left, top, width, height;

  const PRect(this.left, this.top, this.width, this.height);

  bool contains(Coordinate point){
    return point.x >= left &&
        point.x <= left + width &&
        point.y >= top &&
        point.y <= top + height;
  }
}
