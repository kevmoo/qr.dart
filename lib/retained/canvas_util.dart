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
