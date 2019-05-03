import 'dart:math' as math;

import 'bot.dart';

class AffineTransform {
  num _scX, _shY, _shX, _scY, _tX, _tY;

  AffineTransform(
      [num scaleX = 1,
      num shearY = 0,
      num shearX = 0,
      num scaleY = 1,
      num translateX = 0,
      num translateY = 0])
      : _scX = scaleX,
        _scY = scaleY,
        _tX = translateX,
        _tY = translateY,
        _shX = shearX,
        _shY = shearY;

  factory AffineTransform.fromRotate(num theta, num x, num y) {
    return AffineTransform()..setToRotation(theta, x, y);
  }

  factory AffineTransform.fromScale(num sx, num sy) {
    return AffineTransform(sx, 0, 0, sy, 0, 0);
  }

  factory AffineTransform.fromTranslat(num x, num y) {
    return AffineTransform(1, 0, 0, 1, x, y);
  }

  num get scaleX => _scX;

  num get scaleY => _scY;

  num get translateX => _tX;

  num get translateY => _tY;

  Vector get translateVector => Vector(translateX, translateY);

  num get shearX => _shX;

  num get shearY => _shY;

  num get determinant => _scX * _scY - _shX * _shY;

  bool get isIdentity {
    return _scX == 1 &&
        _shY == 0 &&
        _shX == 0 &&
        _scY == 1 &&
        _tX == 0 &&
        _tY == 0;
  }

  void scale(num sx, num sy) {
    _scX *= sx;
    _shY *= sx;
    _shX *= sy;
    _scY *= sy;
  }

  void concatenate(AffineTransform tx) {
    var m0 = _scX;
    var m1 = _shX;
    _scX = tx._scX * m0 + tx._shY * m1;
    _shX = tx._shX * m0 + tx._scY * m1;
    _tX += tx._tX * m0 + tx._tY * m1;

    m0 = _shY;
    m1 = _scY;
    _shY = tx._scX * m0 + tx._shY * m1;
    _scY = tx._shX * m0 + tx._scY * m1;
    _tY += tx._tX * m0 + tx._tY * m1;
  }

  void rotate(num theta, num x, num y) {
    concatenate(AffineTransform.fromRotate(theta, x, y));
  }

  void translate(num dx, num dy) {
    _tX += dx * _scX + dy * _shX;
    _tY += dx * _shY + dy * _scY;
  }

  void setToScale(num sx, num sy) {
    setTransform(sx, 0, 0, sy, 0, 0);
  }

  void setToRotation(num theta, num x, num y) {
    var cos = math.cos(theta);
    var sin = math.sin(theta);
    setTransform(
        cos, sin, -sin, cos, x - x * cos + y * sin, y - x * sin - y * cos);
  }

  void setToTranslation(num dx, num dy) {
    setTransform(1, 0, 0, 1, dx, dy);
  }

  void setFromTransfrom(AffineTransform tx) {
    setTransform(tx._scX, tx._shY, tx._shX, tx._scY, tx._tX, tx._tY);
  }

  void setTransform(num m00, num m10, num m01, num m11, num m02, num m12) {
    _scX = m00;
    _shY = m10;
    _shX = m01;
    _scY = m11;
    _tX = m02;
    _tY = m12;
  }

  Coordinate transformCoordinate([math.Point point = const Coordinate()]) {
    var x = point.x * _scX + point.y * _shX + _tX;
    var y = point.x * _shY + point.y * _scY + _tY;

    return Coordinate(x, y);
  }

  AffineTransform createInverse() {
    var det = determinant;
    return AffineTransform(_scY / det, -_shY / det, -_shX / det, _scX / det,
        (_shX * _tY - _scY * _tX) / det, (_shY * _tX - _scX * _tY) / det);
  }

  AffineTransform lerpTx(AffineTransform other, num x) {
    final m00 = lerp(scaleX, other.scaleX, x);
    final m10 = lerp(shearY, other.shearY, x);
    final m01 = lerp(shearX, other.shearX, x);
    final m11 = lerp(scaleY, other.scaleY, x);
    final m02 = lerp(translateX, other.translateX, x);
    final m12 = lerp(translateY, other.translateY, x);

    return AffineTransform(m00, m10, m01, m11, m02, m12);
  }

  AffineTransform clone() {
    return AffineTransform(_scX, _shY, _shX, _scY, _tX, _tY);
  }

  @override
  bool operator ==(Object other) {
    return other is AffineTransform &&
        _scX == other._scX &&
        _shX == other._shX &&
        _tX == other._tX &&
        _shY == other._shY &&
        _scY == other._scY &&
        _tY == other._tY;
  }

  @override
  int get hashCode => 0;

  @override
  String toString() =>
      [scaleX, shearY, shearX, scaleY, translateX, translateY].join(', ');
}

bool isValidNumber(num value) {
  return value != null && !value.isInfinite && !value.isNaN;
}

class Size {
  final num width, height;

  const Size(this.width, this.height);

  @override
  bool operator ==(Object other) {
    return other is Size && width == other.width && height == other.height;
  }

  num get area => width * height;

  num get aspectRatio => width / height;

  bool fitsInside(Size target) {
    return width <= target.width && height <= target.height;
  }

  bool isEmpty() => area == 0;

  num get perimeter => (width + height) * 2;

  bool get isValid =>
      isValidNumber(width) &&
      isValidNumber(height) &&
      width >= 0 &&
      height >= 0;

  Size scale(num magnitude) => Size(width * magnitude, height * magnitude);

  Size operator *(num magnitude) => scale(magnitude);

  Vector toVector() => Vector(width, height);

  @override
  String toString() => '($width x $height)';

  @override
  int get hashCode => width.hashCode ^ 37 * height.hashCode;
}

class Coordinate<T extends num> extends math.Point<T> {
  const Coordinate([T x, T y]) : super(x, y);

  bool get isValid => isValidNumber(x) && isValidNumber(y);

  @override
  Vector<T> operator -(math.Point<T> other) => difference(this, other);

  @override
  Coordinate<T> operator +(math.Point<T> other) =>
      Coordinate<T>(x + other.x, y + other.y);

  Vector toVector() => Vector(x, y);

  Size toSize() => Size(x, y);

  static Vector<T> difference<T extends num>(
          math.Point<T> a, math.Point<T> b) =>
      Vector<T>(a.x - b.x, a.y - b.y);

  static bool valid(math.Point point) =>
      isValidNumber(point.x) && isValidNumber(point.y);
}

class Vector<T extends num> extends Coordinate<T> {
  const Vector([T x, T y]) : super(x, y);

  Vector get normal => scale(1 / magnitude);

  double get angle => math.atan2(y, x);

  @override
  Vector<T> operator +(math.Point<T> other) =>
      Vector<T>(x + other.x, y + other.y);

  @override
  Vector<T> operator *(num magnitude) => scale(magnitude);

  Vector<T> scale(num magnitude) =>
      Vector<T>(x * magnitude as T, y * magnitude as T);

  num dot(Vector other) => x * other.x + y * other.y;

  num cross(Vector other) => x * other.y - y * other.x;

  num getAngle(Vector other) => other.angle - angle;

  Vector rotate(num angle) {
    var cos = math.cos(angle);
    var sin = math.sin(angle);
    var newX = x * cos - y * sin;
    var newY = y * cos + x * sin;
    return Vector(newX, newY);
  }

  Vector rotateAroundPoint(Coordinate<T> axisPoint, num angle) {
    return (this - axisPoint).rotate(angle) + axisPoint;
  }
}
