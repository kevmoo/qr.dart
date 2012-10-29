part of bot_retained;

class PCanvas extends Panel{

  PCanvas(int w, int h, [bool enableCache = false]):super(w, h, enableCache);

  void setTopLeft(PElement element, Coordinate value){
    var tx = getChildTransform(element);
    tx.setToTranslation(value.x, value.y);
  }

  Coordinate getTopLeft(PElement element){
    var tx = getChildTransform(element);
    return tx.transformCoordinate();
  }

  void setCenter(PElement element, Coordinate value){
    var sizeOffset = new Vector(element.width/2, element.height/2);
    var delta = Coordinate.difference(value, sizeOffset);
    setTopLeft(element, delta);
  }

  Coordinate getCenter(PElement element){
    var sizeOffset = new Vector(element.width/2, element.height/2);
    return sizeOffset + getTopLeft(element);
  }
}

