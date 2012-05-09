class PElement extends PEventTarget{
  num width, height;

  PElement(int width, int height, [bool enableCache = false])
  {
    this.width = width;
    this.height = height;

    if(enableCache){
      // TODO: init magic here
    }
  }

}
