class Mouse {
  static final Property<bool> _isMouseOverProperty = const Property("IsMouseOver", false);
  static final Property<bool> _isMouseDirectlyOverProperty = const Property("IsMouseDirectlyOver", false);
  static final Property<bool> _stageMouseCacheProperty = const Property("_stageMouseCacheProperty");

  static bool isMouseOver(PElement element){
    return _isMouseOverProperty.get(element);
  }

  static bool isMouseDirectlyOver(PElement element){
    return _isMouseDirectlyOverProperty.get(element);
  }
}
