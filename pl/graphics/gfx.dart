class gfx {
  static void transform(CanvasRenderingContext2D ctx, AffineTransform tx){
    if (tx != null) {
      ctx.transform(tx.scaleX, tx.shearY, tx.shearX, tx.scaleY, tx.translateX, tx.translateY);
    }
  }
}
