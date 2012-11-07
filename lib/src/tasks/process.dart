part of hop_tasks;

Func1<TaskContext, Future<bool>> createStartProcessTask(String command, List<String> args) {
  return (context) {
    return startProcess(context, command, args);
  };
}

// TODO: document that start does an 'interactive' process
//       stderr and stdout are piped to context, etc
//       This aligns with io.Process.start
Future<bool> startProcess(TaskContext state, String command, List<String> args) {
  state.fine("Starting process:");
  state.fine("$command ${Strings.join(args, ' ')}");
  final processFuture = io.Process.start(command, args);
  return processFuture.chain((process) {
    return _startProcess(process, state);
  });
}

Future<bool> _startProcess(process, state) {
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
