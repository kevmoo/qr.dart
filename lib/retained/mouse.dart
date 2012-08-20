class Mouse {
  static final core.Property<bool> isMouseOverProperty =
      const core.Property<bool>("IsMouseOver", false);
  static final core.Property<bool> isMouseDirectlyOverProperty =
      const core.Property<bool>("IsMouseDirectlyOver", false);
  static final core.Property<List<PElement>> _stageMouseCacheProperty =
      const core.Property<List<PElement>>("_stageMouseCacheProperty");

  static bool isMouseOver(PElement element){
    return isMouseOverProperty.get(element);
  }

  static bool isMouseDirectlyOver(PElement element){
    return isMouseDirectlyOverProperty.get(element);
  }

  static List<PElement> markMouseOver(Stage stage,
      [core.Coordinate coordinate = null]) {
    core.requireArgumentNotNull(stage, 'stage');
    core.requireArgument(coordinate == null || coordinate.isValid, 'coordinate');

    final items = _stageMouseCacheProperty.get(stage);
    if (items != null) {
      items.forEach((e) {
        isMouseOverProperty.clear(e);
        isMouseDirectlyOverProperty.clear(e);
      });
      _stageMouseCacheProperty.clear(stage);
    }
    if (coordinate != null) {
      var hits = RetainedUtil.hitTest(stage, coordinate);
      _stageMouseCacheProperty.set(stage, hits);
      hits.forEach((e) {
        isMouseOverProperty.set(e, true);
      });
      if (hits.length > 0) {
        isMouseDirectlyOverProperty.set(hits[0], true);
      }
      return hits;
    }
    return null;
  }
}
