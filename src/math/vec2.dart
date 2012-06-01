class Vec2 extends Coordinate {
  const Vec2([num x = 0, num y = 0]) : super(x,y);

  Vec2 operator +(Coordinate other){
    return new Vec2(x + other.x, y + other.y);
  }
  
  static Vec2 difference(Coordinate a, Coordinate b){
    return new Vec2(a.x - b.x, a.y - b.y);
  }
}
