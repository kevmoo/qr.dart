class GFX {
  static void transform(CanvasRenderingContext2D ctx, AffineTransform tx){
    ctx.transform(tx.scaleX, tx.shearY, tx.shearX, tx.scaleY, tx.translateX, tx.translateY);
  }
}
