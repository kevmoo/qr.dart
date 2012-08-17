class RetainedDebug {
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

  static void borderHitTest(Stage stage, core.Coordinate point){
    var ctx = stage.ctx;

    var hits = RetainedUtil.hitTest(stage, point);

    if(hits.length > 0){
      ctx.save();
      ctx.lineWidth = 2;

      hits.forEach((e) {
        _borderElement(ctx, e, true);
      });
      ctx.restore();
    }
  }

  static void _borderElement(CanvasRenderingContext2D ctx, PElement element,
                             [bool excludeChildren = false,
                             core.Func1<PElement, bool> filter = null]) {
    if (filter == null || filter(element)) {
      _borderElementCore(ctx, element);
    }

    if (!excludeChildren) {
      for (var i = 0; i < element.visualChildCount; i++) {
        var e = element.getVisualChild(i);
        _borderElement(ctx, e, false, filter);
      }
    }
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

    final corners = RetainedUtil.getCorners(element);

    ctx.beginPath();
    ctx.moveTo(corners[3].x, corners[3].y);
    for(final p in corners) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
}
