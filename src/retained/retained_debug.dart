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

  static void borderHitTest(Stage stage, Coordinate point){
    var ctx = stage.ctx;

    var hits = RetainedUtil.hitTest(stage, point);

    if(hits.length > 0){
      ctx.save();
      ctx.lineWidth = 2;

      ctx.beginPath();

      hits.forEach((e) {
        _borderElement(ctx, e, true);
      });
      ctx.stroke();
      ctx.restore();
    }
  }

  static void _borderElement(CanvasRenderingContext2D ctx, PElement element, [bool excludeChildren = false, Predicate<PElement> filter = null]) {
    ctx.save();
    CanvasUtil.transform(ctx, element.getTransformToRoot());

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
