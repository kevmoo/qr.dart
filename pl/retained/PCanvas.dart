class PCanvas extends Panel{
  
  PCanvas(int w, int h, [bool enableCache = false]):super(w, h, enableCache);
 
  /*
  void setTopLeft(PElement element, Coordinate value){
    var tx = getChildTransform(element);
    tx.setToTranslation(value.x, value.y);
  }

  /**
   * @param {!pl.retained.Element} element
   * @param {!goog.math.Coordinate=} opt_value
   * @return {!goog.math.Coordinate}
   */
  pl.retained.Canvas.prototype.topLeft = function(element, opt_value) {
    var tx = this.getChildTransform(element);
    if (opt_value) {
      tx.setToTranslation(opt_value.x, opt_value.y);
    }
    return pl.ex.transformCoordinate(tx, new goog.math.Coordinate());
  };

  /**
   * @param {!pl.retained.Element} element
   * @param {!goog.math.Coordinate=} opt_value
   * @return {!goog.math.Coordinate}
   */
  pl.retained.Canvas.prototype.center = function(element, opt_value) {
    var sizeOffset = new goog.math.Vec2(element.width / 2, element.height / 2);
    if (opt_value) {
      var tl = goog.math.Vec2.difference(opt_value, sizeOffset);
      this.topLeft(element, tl);
    }
    return sizeOffset.add(this.topLeft(element));
  };
*/
}

