class Helper {
  static void borderElements(stage) {
    var ctx = stage.ctx;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 5;
    ctx.beginPath();
    _borderElement(ctx, stage.rootElement);
    ctx.stroke();
    ctx.restore();
  }
  
  static void borderHitTest(Stage stage, Coordinate point){
    var ctx = stage.ctx;

    var hits = hitTest(stage, point);
    
    if(hits.length > 0){
      ctx.save();
      ctx.lineWidth = 2;

      ctx.beginPath();
      
      _borderElement(ctx, hits[0], true);
      
      hits.forEach((e) {
        //_borderElement(ctx, e, true);
      });
      ctx.stroke();
      ctx.restore();
    }
  }

  static List<PElement> hitTest(Stage stage, Coordinate point){
    return _hitTest(stage.rootElement, point);
  }

  static List<PElement> _hitTest(PElement element, Coordinate point){
    point = transformPointGlobalToLocal(element, point);

    var bounds = new PRect(0, 0, element.width, element.height);

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

  static Coordinate transformPointLocalToGlobal(element, point) {
    var tx = element.getTransformToRoot();
    return tx.transformCoordinate(point);
  }

  static Coordinate transformPointGlobalToLocal(element, point) {
    var tx = element.getTransform();
    return tx.createInverse().transformCoordinate(point);
  }

  static void _borderElement(CanvasRenderingContext2D ctx, PElement element, [bool excludeChildren = false, bool filter(PEelement) = null]) {
    ctx.save();
    GFX.transform(ctx, element.getTransformToRoot());

    if (filter == null || filter(element)) {
      _borderElementCore(ctx, element);
    }

    if (!excludeChildren) {
      for (var i = 0; i < element.visualChildCount; i++) {
        var e = element.getVisualChild(i);
        ctx.save();
        _borderElement(ctx, e, false, filter);
        ctx.restore();
      }
    }
    ctx.restore();
  }

  static void _borderElementCore(CanvasRenderingContext2D ctx, PElement element) {
    if (Mouse.isMouseDirectlyOver(element)) {
      ctx.strokeStyle = 'red';
    } else if (Mouse.isMouseOver(element)) {
      ctx.strokeStyle = 'pink';
    } else if (element.cacheEnabled) {
      ctx.strokeStyle = 'yellow';
    } else {
      ctx.strokeStyle = 'orange';
    }
    ctx.strokeRect(0, 0, element.width, element.height);
  }
}
