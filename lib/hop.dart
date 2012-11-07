library hop;

// TODO: documentation for tasks
// TODO: formalize print/log model
// TODO: ponder indent for output

import 'package:args/args.dart';
import 'package:bot/bot.dart';
import 'package:bot/io.dart';

part 'src/hop/runner.dart';
part 'src/hop/tasks.dart';
part 'src/hop/_hop_task.dart';
part 'src/hop/task_context.dart';

final _sharedState = new Tasks();

// per /usr/include/sysexits.h
final EXIT_CODE_SUCCESS = 0;
final EXIT_CODE_USAGE = 64;

void runHopCore() {
  _sharedState.freeze();
  final options = new Options();
  final runner = new Runner(_sharedState, options.arguments);
  runner.run();
}

void addTask(String name, Func1<TaskContext, bool> execFunc) {
  _sharedState.addTask(name, execFunc);
}

void addAsyncTask(String name, Func1<TaskContext, Future<bool>> execFuture) {
  _sharedState.addTaskAsync(name, execFuture);
}

/**
 * An annotation used to mark a field, getter, setter, or method, as one that
 * should only be accessed by subclasses.
 * See DARTBUG http://code.google.com/p/dart/issues/detail?id=6119
 */
const protected = const _Protected();

// TODO: move this to BOT
class _Protected {
  const _Protected();
}
