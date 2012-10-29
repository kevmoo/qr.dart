library hop;

// TODO: documentation for tasks
// TODO: formalize print/log model
// TODO: tests

import 'dart:io';
import 'dart:isolate';
import 'package:args/args.dart';
import 'package:unittest/unittest.dart';
import 'package:bot/bot.dart';
import 'package:bot/io.dart';

part 'src/hop/_hop_runner.dart';
part 'src/hop/_hop_state.dart';
part 'src/hop/_hop_task.dart';
part 'src/hop/test_context.dart';
part 'src/hop/test_runner.dart';
part 'src/hop/process.dart';
part 'src/hop/dart2js.dart';

final _sharedState = new _HopState();

void runHopCore() {
  _sharedState.freeze();
  final options = new Options();
  final runner = new _HopRunner(_sharedState, options.arguments);
  runner.run();
}

void addTask(String name, Func1<TaskContext, bool> execFunc) {
  _sharedState.addTask(name, execFunc);
}

void addAsyncTask(String name, Func1<TaskContext, Future<bool>> execFuture) {
  _sharedState.addTaskAsync(name, execFuture);
}
