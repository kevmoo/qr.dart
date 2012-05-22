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
    
    PCanvas pCanvas = new PCanvas(200, 200);
    var blue = new Shape(100, 100, 'blue');
    var green = new Shape(75, 75, 'green');
    var red = new Shape(50, 50, 'red');

    pCanvas.addElement(blue);
    pCanvas.addElement(green);
    pCanvas.addElement(red);
    _element = pCanvas;

    _element.addTransform().translate(
      (canvas.width - _element.width) / 2, 
      (canvas.height - _element.height) / 2);
    this._tx = _element.addTransform();
    _stage = new Stage(_canvas, _element);
  }
  
  void start(){
    _requestFrame();
  }
  
  bool _onFrame(num highResTime){
    _tx.rotate(Math.PI * 0.01, 100, 100);
    _stage.draw();
    _requestFrame();    
  }
  
  void _requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }
}
