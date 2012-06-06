class ShapeType {
  static final ShapeType rect = const ShapeType._internal("Rectangle");
  static final ShapeType ellipse = const ShapeType._internal("Ellipse");
  final String name;

  const ShapeType._internal(this.name);
}
