/**
 * Class reperesenting a 2d vector.
 **/
class Vec2 extends Coordinate {
  const Vec2([num x = 0, num y = 0]) : super(x,y);


  static Vec2 difference(Coordinate a, Coordinate b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  /**
   * Computes the length of the vector.
   **/
  num get length() => Math.sqrt(x * x + y * y);

  Vec2 get normal() => this.scale(1 / this.length);

  /**
   * Ads a (Coordinate) and returns the result as new (Vec2).
   **/
  Vec2 operator +(Coordinate other) => new Vec2(x + other.x, y + other.y);

  /**
   * Subtract a (Coordinate) and returns the result as new (Vec2).
   **/
  Vec2 operator -(Coordinate other) => difference(this, other);

  /**
   * Multiply the vector with a (Coordinate) and returns the result as new (Vec2).
   **/
  Vec2 operator *(num magnitude) => this.scale(magnitude);

  /**
   * Computes the distance between the (Coordinate) and the vector.
   **/
  num getDistance (Coordinate other) => (this - other).length;

  Vec2 scale(num magnitude) => new Vec2(x * magnitude, y * magnitude);

  /**
   * Computes the dot product with the given vector.
   **/
  num dot(Vec2 other) => x * other.x + y * other.y;


  /**
   * Computes the cross product with the given vector.
   **/
  num cross(Vec2 other) => x * other.y - y * other.x;

  /**
   * Computes the angle between the given vector and the other vector.
   **/
  num getAngle (Vec2 other) => Math.acos(dot(other));


  Vec2 clone() => new Vec2(x, y);

  String toString() => '{"x":${x},"y":${y}}';
}
