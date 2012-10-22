#library('test_bot_retained');

#import('dart:html');
#import('package:unittest/unittest.dart');

#import('package:bot/bot.dart');
#import('package:bot/retained.dart');

void runRetainedTests() {
  group('bot_retained', () {
    test('test double click manager', _testDoudbleClickManager);
  });
}

void _testDoudbleClickManager() {
  final canvas = new CanvasElement();

  final element = new Shape(100, 100, 'blue');

  final stage = new Stage(canvas, element);

  final cm = new ClickManager(stage);
  final cm2 = new ClickManager(stage);

  expect(cm2, same(cm));
}