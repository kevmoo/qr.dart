class RetainedUtil {
  static List<PElement> hitTest(Stage stage, core.Coordinate point){
    return _hitTest(stage.rootElement, point);
  }

  static List<PElement> _hitTest(PElement element, core.Coordinate point){
    point = transformPointGlobalToLocal(element, point);

    var bounds = new core.Box(0, 0, element.width, element.height);

    var hits = new List<PElement>();
    if (bounds.contains(point)) {

      var length = element.visualChildCount;
      for (var i = 0; i < length; i++) {
        var e = element.getVisualChild(length - 1 - i);
        hits = _hitTest(e, point);
        if (hits.length > 0) {
          break;
        }
      }
      hits.add(element);
      return hits;
    } else {
      return [];
    }
  }

  static core.Coordinate transformPointLocalToGlobal(PElement element,
                                                     core.Coordinate point) {
    var tx = element.getTransformToRoot();
    return tx.transformCoordinate(point);
  }

  static core.Coordinate transformPointGlobalToLocal(PElement element,
                                                     core.Coordinate point) {
    var tx = element.getTransform();
    return tx.createInverse().transformCoordinate(point);
  }

  static List<core.Coordinate> getCorners(PElement element) {
    final rect = new core.Box(0,0,element.width, element.height);
    final points = rect.getCorners();
    return core.$(points).select((p) {
      return transformPointLocalToGlobal(element, p);
    }).toList();
  }
}
