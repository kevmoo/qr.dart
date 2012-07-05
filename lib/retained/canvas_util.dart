class CanvasUtil {
  /**
   * (√2 - 1) * 4 / 3;
   */
  static final num kappa = 0.55228474983079339840225163227959743809289583383593;

  static void transform(CanvasRenderingContext2D ctx, core.AffineTransform tx){
    core.requireArgumentNotNull(ctx, 'ctx');
    core.requireArgumentNotNull(tx, 'tx');

    ctx.transform(tx.scaleX, tx.shearY, tx.shearX,
      tx.scaleY, tx.translateX, tx.translateY);
  }

  static void centeredCircle(CanvasRenderingContext2D ctx,
                             num x, num y, num radius) {
    ellipse(ctx, x - radius, y - radius, radius * 2, radius * 2);
  }

  static void star(CanvasRenderingContext2D ctx, num x, num y,
                   num outterRadius, [int pointCount = 5]) {
    core.requireArgumentNotNull(ctx, 'ctx');
    core.requireArgument(core.isValidNumber(x), 'x');
    core.requireArgument(core.isValidNumber(y), 'y');
    core.requireArgument(core.isValidNumber(outterRadius), 'outterRadius');
    core.requireArgument(outterRadius >= 0, 'outterRadius');
    core.requireArgument(core.isValidNumber(pointCount), 'pointCount');
    core.requireArgument(pointCount >= 5, 'pointCount');

    final sliceSize = Math.PI / pointCount;

    // some day I'll document how I found this
    // It was a lot of paper + WolframAlpha
    // value is the ratio of the inner radius to the outter radius
    // to give the star 'clean lines'
    final innerRatio = Math.cos(2 * sliceSize) / Math.cos(sliceSize);

    final center = new core.Coordinate(x, y);
    final tx = new core.AffineTransform();
    final outterVect = new core.Vector(0, -outterRadius);
    final innerVect = outterVect.scale(innerRatio);

    ctx.beginPath();

    for(var i = 0; i < pointCount; i++) {
      // outter point
      var radians = i * 2 * sliceSize;
      tx.setToRotation(radians, x, y);
      var point = outterVect + center;
      point = tx.transformCoordinate(point);
      if(i == 0) {
        ctx.moveTo(point.x, point.y);
      }
      else {
        ctx.lineTo(point.x, point.y);
      }

      // inner point
      radians = radians + sliceSize;
      tx.setToRotation(radians, x, y);
      point = innerVect + center;
      point = tx.transformCoordinate(point);
      ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
  }

  static void ellipse(CanvasRenderingContext2D ctx,
                      num x, num y, num width, num height) {
    var hB = (width / 2) * kappa,
      vB = (height / 2) * kappa,
      eX = x + width,
      eY = y + height,
      mX = x + width / 2,
      mY = y + height / 2;
    ctx.beginPath();
    ctx.moveTo(x, mY);
    ctx.bezierCurveTo(x, mY - vB, mX - hB, y, mX, y);
    ctx.bezierCurveTo(mX + hB, y, eX, mY - vB, eX, mY);
    ctx.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
    ctx.bezierCurveTo(mX - hB, eY, x, mY + vB, x, mY);
    ctx.closePath();
  }
}
