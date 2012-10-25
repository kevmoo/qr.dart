library bot_hop;

// TODO: documentation for tasks
// TODO: formalize print/log model

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

Future<bool> runProcess(TaskContext state, String command, List<String> args) {
  state.fine("Starting process:");
  state.fine("$command ${Strings.join(args, ' ')}");
  final processFuture = Process.start(command, args);
  return processFuture.chain((process) {
    return _runProcess(process, state);
  });
}

Future<bool> _runProcess(process, state) {
  final completer = new Completer<bool>();

  process.stdout.onData = () {
    final data = process.stdout.read();
    assert(data != null);
    final str = new String.fromCharCodes(data).trim();
    state.fine(str);
  };

  process.stderr.onData = () {
    final data = process.stderr.read();
    assert(data != null);
    final str = new String.fromCharCodes(data).trim();
    state.error(str);
  };

  process.onExit = (int exitCode){
    completer.complete(exitCode == 0);
  };

  return completer.future;
}

Func1<TaskContext, Future<bool>> getDart2jsTask(List<String> inputs) {
  return (context) {
    final futureFuncs = $(inputs).map((p) => () => _dart2js(context, p)).toList();
    return _chainTasks(futureFuncs);
  };
}

Future<bool> _chainTasks(List<Func<Future<bool>>> futures, [int index=0]) {
  assert(futures.length > 0);
  assert(index >= 0);
  assert(index <= futures.length);
  if(index == futures.length) {
    return new Future.immediate(true);
  }
  final func = futures[index];
  final future = func();
  return future.chain((bool status) {
    if(status) {
      return _chainTasks(futures, index+1);
    }
    else {
      return new Future.immediate(false);
    }
  });
}

Future<bool> _dart2js(TaskContext state, String file, [String output = null]) {
  if(output == null) {
    output = "${file}.js";
  }

  final packageDir = new Directory('packages');
  assert(packageDir.existsSync());

  final args = ["--package-root=${packageDir.path}",
                '--throw-on-error',
                '-v',
                "--out=$output",
                file];

  return runProcess(state, 'dart2js', args);
}
