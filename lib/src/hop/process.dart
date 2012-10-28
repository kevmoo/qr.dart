part of bot_hop;

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
