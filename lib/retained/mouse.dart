class Mouse {
  static final core.Property<bool> _isMouseOverProperty = const core.Property<bool>("IsMouseOver", false);
  static final core.Property<bool> _isMouseDirectlyOverProperty = const core.Property<bool>("IsMouseDirectlyOver", false);
  static final core.Property<bool> _stageMouseCacheProperty = const core.Property<bool>("_stageMouseCacheProperty");

  static bool isMouseOver(PElement element){
    return _isMouseOverProperty.get(element);
  }

  static bool isMouseDirectlyOver(PElement element){
    return _isMouseDirectlyOverProperty.get(element);
  }
}
