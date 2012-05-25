class Mouse {
  static final Property _isMouseOverProperty = const Property("IsMouseOver", false);
  static final Property _isMouseDirectlyOverProperty = const Property("IsMouseDirectlyOver", false);
  static final Property _stageMouseCacheProperty = const Property("_stageMouseCacheProperty");

  static bool isMouseOver(PElement element){
    return _isMouseOverProperty.get(element);
  }

  static bool isMouseDirectlyOver(PElement element){
    return _isMouseDirectlyOverProperty.get(element);
  }
}
