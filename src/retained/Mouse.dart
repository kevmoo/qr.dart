class Mouse {
  static final Property<bool> _isMouseOverProperty = const Property<bool>("IsMouseOver", false);
  static final Property<bool> _isMouseDirectlyOverProperty = const Property<bool>("IsMouseDirectlyOver", false);
  static final Property<bool> _stageMouseCacheProperty = const Property<bool>("_stageMouseCacheProperty");

  static bool isMouseOver(PElement element){
    return _isMouseOverProperty.get(element);
  }

  static bool isMouseDirectlyOver(PElement element){
    return _isMouseDirectlyOverProperty.get(element);
  }
}
