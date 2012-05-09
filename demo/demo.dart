#import('dart:html');
#import('../pl/pl.dart');


main(){

  CanvasElement canvas = document.query("#content");

  var element = new Shape(100, 100);

  var stage = new Stage(canvas, element);
  stage.draw();
}