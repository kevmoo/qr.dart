#import('dart:html');
#import('package:bot/bot.dart');
#import('package:bot/retained.dart');

main(){
  CanvasElement canvas = document.query("#content");
  var demo = new ClickDemo(canvas);
  demo.requestFrame();
}

class ClickDemo{
  static const _blueColor = 'blue';

  final CanvasElement _canvas;
  final Stage _stage;
  final ClickManager _clickMan;

  factory ClickDemo(CanvasElement canvas){

    PCanvas pCanvas = new PCanvas(200, 200);
    pCanvas.background = 'yellow';

    var blue = new Shape(100, 100, _blueColor);
    ClickManager.setClickable(blue, true);
    final clickHandler = (args) {
      blue.fillStyle = (blue.fillStyle == _blueColor) ? 'lightblue' : _blueColor;
    };

    ClickManager.addHandler(blue, clickHandler);

    pCanvas.addElement(blue);

    var green = new Shape(70, 70, 'green');
    pCanvas.addElement(green);
    pCanvas.setTopLeft(green, const Coordinate(110, 15));

    var red = new Shape(40, 40, 'red', ShapeType.ellipse);
    pCanvas.addElement(red);
    pCanvas.setCenter(red, const Coordinate(50, 150));

    pCanvas.addTransform().translate(
      (canvas.width - pCanvas.width) / 2,
      (canvas.height - pCanvas.height) / 2);

    var rootPanel = new PCanvas(500, 500);
    rootPanel.addElement(pCanvas);

    var stage = new Stage(canvas, rootPanel);

    final cm = new ClickManager(stage);

    return new ClickDemo._internal(canvas, stage, cm);
  }

  ClickDemo._internal(this._canvas, this._stage, this._clickMan);

  void requestFrame(){
    window.requestAnimationFrame(_onFrame);
  }

  void _onFrame(int highResTime){
    _stage.draw();
    requestFrame();
  }
}
