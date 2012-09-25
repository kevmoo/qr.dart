#import('dart:html');
#import('dart:math', prefix:'math');
#import('package:bot/bot.dart');
#import('package:bot/retained.dart');

main(){
  final CanvasElement canvas = document.query("#content");
  final ctx = canvas.context2d;
  final tx = new AffineTransform();
  tx.scale(200, 200);
  tx.translate(0, 1.5);
  tx.rotate(-math.PI / 2, 2, 0);

  CanvasUtil.transform(ctx, tx);

  ctx.lineWidth = .01;
  ctx.strokeStyle = 'black';

  ctx.beginPath();
  drawBranch(ctx);
  ctx.stroke();
}

void drawBranch(CanvasRenderingContext2D ctx, [int levels = 12]) {
  if(levels == 0) {
    return;
  }
  ctx.moveTo(0, 0);
  ctx.lineTo(1, 0);

  final ratio = 0.62;
  final angle = math.PI / 3;

  // Right branch
  ctx.save();
  var rightTx = new AffineTransform();
  rightTx.translate(1, 0);
  rightTx.scale(ratio, ratio);
  rightTx.rotate(angle, 0,0);
  CanvasUtil.transform(ctx, rightTx);
  drawBranch(ctx, levels - 1);
  ctx.restore();

  // left branch
  ctx.save();
  rightTx = new AffineTransform();
  rightTx.translate(1, 0);
  rightTx.scale(ratio, ratio);
  rightTx.rotate(-angle, 0,0);
  CanvasUtil.transform(ctx, rightTx);
  drawBranch(ctx, levels - 1);
  ctx.restore();
}