/**
 * Class reperesenting a 2d vector.
 **/
class Vec2 extends Coordinate {
  const Vec2([num x = 0, num y = 0]) : super(x,y);

  /**
   * Computes the length of this [Vec2].
   **/
  num get length() => Math.sqrt(x * x + y * y);

  Vec2 get normal() => this.scale(1 / this.length);

  /**
   * Adds a [Coordinate] and returns the result as new [Vec2].
   **/
  Vec2 operator +(Coordinate other) => new Vec2(x + other.x, y + other.y);

  /**
   * Multiplies each dimensions by the provided magnitude and returns a new [Vec2].
   **/
  Vec2 operator *(num magnitude) => this.scale(magnitude);

  /**
   * Multiplies each dimensions by the provided magnitude and returns a new [Vec2].
   **/
  Vec2 scale(num magnitude) => new Vec2(x * magnitude, y * magnitude);

  /**
   * Computes the dot product with the given [Vec2].
   **/
  num dot(Vec2 other) => x * other.x + y * other.y;

  /**
   * Computes the cross product with the given [Vec2].
   **/
  num cross(Vec2 other) => x * other.y - y * other.x;

  /**
   * Computes the angle between this and another [Vec2].
   **/
  num getAngle (Vec2 other) => Math.acos(dot(other));

  Vec2 clone() => new Vec2(x, y);
}
