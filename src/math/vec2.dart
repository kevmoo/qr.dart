class Vec2 extends Coordinate {
  const Vec2([num x = 0, num y = 0]) : super(x,y);

  static Vec2 difference(Coordinate a, Coordinate b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  num get length() => Math.sqrt(x * x + y * y);

  Vec2 get normal() => this.scale(1 / this.length);

  Vec2 operator +(Coordinate other) => new Vec2(x + other.x, y + other.y);

  Vec2 operator -(Coordinate other) => difference(this, other);

  Vec2 operator *(num magnitude) => this.scale(magnitude);

  num getDistance (Coordinate other) => (this - other).length;

  Vec2 scale(num magnitude) => new Vec2(x * magnitude, y * magnitude);

  num dot(Vec2 other) => x * other.x + y * other.y;

  num cross(Vec2 other) => x * other.y - y * other.x;

  num getAngle (Vec2 other) => Math.acos(dot(other));

  String toString() => '{"x":${x},"y":${y}}';
}
