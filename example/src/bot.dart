num lerp(num a, num b, num x) => a + x * (b - a);

// TODO: test!
class BungeeNum {
  num target;
  num current;
  num? _velocity;

  BungeeNum(this.target, [num? current]) : current = current ?? target;

  bool update() {
    if (_velocity == null) {
      _velocity = 0;
    } else {
      _velocity = _velocity! * 0.8;
    }

    final force = target - current;

    _velocity = _velocity! + force * 0.05;

    current += _velocity!;

    final delta = (current - target).abs();

    if (delta < 0.01 && _velocity!.abs() < 0.01) {
      current = target;
      _velocity = null;
      return false;
    } else {
      return true;
    }
  }
}
