part of bot_retained;

class ShapeType {
  static const ShapeType rect = const ShapeType._internal("Rect");
  static const ShapeType ellipse = const ShapeType._internal("Ellipse");
  final String name;

  const ShapeType._internal(this.name);
}
