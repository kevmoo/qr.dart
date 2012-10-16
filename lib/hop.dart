#library('bot_hop');

// TODO: documentation for tasks
// TODO: formalize print/log model

#import('dart:isolate');
#import('package:args/args.dart');
#import('package:unittest/unittest.dart');
#import('package:bot/bot.dart');
#import('package:bot/io.dart');

#source('src/hop/test_context.dart');
#source('src/hop/test_runner.dart');
#source('src/hop/_hop_runner.dart');
#source('src/hop/_hop_task.dart');
#source('src/hop/_hop_state.dart');

final _sharedState = new _HopState();

void runHopCore() {
  _sharedState.freeze();
  final options = new Options();
  new _HopRunner(_sharedState, options.arguments);
}

void addTask(String name, Action1<TaskContext> execFunc) {
  _sharedState.addTask(name, execFunc);
}

void addAsyncTask(String name, Func1<TaskContext, Future<bool>> execFuture) {
  _sharedState.addTaskAsync(name, execFuture);
}
