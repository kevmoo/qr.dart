class RetainedUtil {
  static List<PElement> hitTest(Stage stage, Coordinate point){
    return _hitTest(stage.rootElement, point);
  }

  static List<PElement> _hitTest(PElement element, Coordinate point){
    point = transformPointGlobalToLocal(element, point);

    var bounds = new Box(0, 0, element.width, element.height);

    var hits = new List<PElement>();
    if (bounds.contains(point) && element is ParentElement) {
      final ParentElement p = element;

      var length = p.visualChildCount;
      for (var i = 0; i < length; i++) {
        var e = p.getVisualChild(length - 1 - i);
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

  static Coordinate transformPointLocalToGlobal(PElement element,
                                                     Coordinate point) {
    var tx = element.getTransformToRoot();
    return tx.transformCoordinate(point);
  }

  static Coordinate transformPointGlobalToLocal(PElement element,
                                                     Coordinate point) {
    var tx = element.getTransform();
    return tx.createInverse().transformCoordinate(point);
  }

  static List<Coordinate> getCorners(PElement element) {
    final rect = new Box(0,0,element.width, element.height);
    final points = rect.getCorners();
    return $(points).map((p) {
      return transformPointLocalToGlobal(element, p);
    }).toList();
  }
}
