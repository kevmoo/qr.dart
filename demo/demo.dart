#import('dart:html');
#import('../pl/pl.dart');


main(){
  CanvasElement canvas = document.query("#content");
  var demo = new Demo(canvas);
  demo.start();

}

class Demo{
  CanvasElement _canvas;
  PElement _element;
  Stage _stage;
  AffineTransform _tx;
  
  Demo(CanvasElement canvas){
    _canvas = canvas;
    _element = new Shape(100, 100);
    this._tx = _element.addTransform();
    _stage = new Stage(_canvas, _element);
  }
  
  void start(){
    _requestFrame();
  }
  
  bool _onFrame(num highResTime){
    _tx.rotate(Math.PI * 0.001, 100, 100);
    _stage.draw();
    _requestFrame();    
  }
  
  void _requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }
}
