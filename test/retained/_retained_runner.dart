library test_bot_retained;

import 'dart:html';
import 'package:bot/bot.dart';
import 'package:bot/retained.dart';
import 'package:unittest/unittest.dart';

void runRetainedTests() {
  group('bot_retained', () {
    test('test double click manager', _testDoudbleClickManager);
    test('PElement remove transform', _testRemoveTransform);
    test('PElement parent', _testPElementParent);
  });
}

void _testPElementParent() {
  final child = new Shape(10, 10);
  expect(child.parent, isNull);
  expect(() => child.registerParent(null), throwsArgumentError);
  expect(() => child.unregisterParent(null), throwsArgumentError);

  final parentElement = new _TestParentElement();

  // registerParent works
  child.registerParent(parentElement);

  expect(child.parent, isNotNull);

  // register same parent 2nd time doesn't work
  expect(() => child.registerParent(parentElement), throws);

  // unregister works
  child.unregisterParent(parentElement);

  // unregister 2nd time doesn't work
  expect(() => child.unregisterParent(parentElement), throwsArgumentError);

  expect(child.parent, isNull);
}

void _testRemoveTransform() {
  // null param throws
  final element = new Shape(10, 10);
  expect(() => element.removeTransform(null), throwsArgumentError);

  final tx = element.addTransform();
  // valid param returns true
  expect(element.removeTransform(tx), isTrue);

  // calling remove a second time returns false
  expect(element.removeTransform(tx), isFalse);
}

void _testDoudbleClickManager() {
  final canvas = new CanvasElement();

  final element = new Shape(100, 100, 'blue');

  final stage = new Stage(canvas, element);

  final cm = new ClickManager(stage);
  final cm2 = new ClickManager(stage);

  expect(cm2, same(cm));
}
class _TestParentElement extends ParentElement {
  _TestParentElement() : super(10, 10);
}
