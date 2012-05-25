#import('dart:html');
#import('../pl/pl.dart');


main(){
  CanvasElement canvas = document.query("#content");
  var demo = new Demo(canvas);
  demo.start();
}

class Demo{
  CanvasElement _canvas;
  Stage _stage;
  AffineTransform _tx;
  Coordinate _mouseLocation;

  Demo(CanvasElement canvas){
    _canvas = canvas;
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);

    PCanvas pCanvas = new PCanvas(200, 200);
    var blue = new Shape(100, 100, 'blue');
    var green = new Shape(70, 70, 'green');
    var red = new Shape(40, 40, 'red');

    pCanvas.addElement(blue);

    pCanvas.addElement(green);
    pCanvas.setTopLeft(green, new Coordinate(15, 15));

    pCanvas.addElement(red);
    pCanvas.setCenter(red, new Coordinate(50, 50));
    
    
    pCanvas.addTransform().translate(
      (canvas.width - pCanvas.width) / 2,
      (canvas.height - pCanvas.height) / 2);
      
    this._tx = pCanvas.addTransform();

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(pCanvas);
    
    _stage = new Stage(_canvas, rootPanel);
  }

  void start(){
    _requestFrame();
  }

  bool _onFrame(num highResTime){
    _tx.rotate(Math.PI * 0.01, 100, 100);
    _stage.draw();
    if(_mouseLocation != null){
      Helper.borderHitTest(_stage, _mouseLocation);
    }
    //Helper.borderElements(_stage);
    _requestFrame();
  }

  void _requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }

  void _canvas_mouseMove(MouseEvent e){
    _mouseLocation = new Coordinate(e.offsetX, e.offsetY);
  }

  void _canvas_mouseOut(MouseEvent e){
    _mouseLocation = null;
  }
}
