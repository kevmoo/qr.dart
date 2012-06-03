class PCanvas extends Panel{

  PCanvas(int w, int h, [bool enableCache = false]):super(w, h, enableCache);

  void setTopLeft(PElement element, core.Coordinate value){
    var tx = getChildTransform(element);
    tx.setToTranslation(value.x, value.y);
  }

  core.Coordinate getTopLeft(PElement element){
    var tx = getChildTransform(element);
    return tx.transformCoordinate();
  }

  void setCenter(PElement element, core.Coordinate value){
    var sizeOffset = new core.Vector(element.width/2, element.height/2);
    var delta = core.Coordinate.difference(value, sizeOffset);
    setTopLeft(element, delta);
  }

  core.Coordinate getCenter(PElement element){
    var sizeOffset = new core.Vector(element.width/2, element.height/2);
    return sizeOffset + getTopLeft(element);
  }
}

