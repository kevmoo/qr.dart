#import('package:bot/hop.dart');
#import('../test/console_test_harness.dart', prefix: 'test_console');
#import('dart:io');

void main() {
  assertKnownPath();

  addAsyncTask('test', getTestRunner(test_console.testCore));
  addAsyncTask('docs', _compileDocs);
  runHopCore();
}

Future<bool> _compileDocs(TaskContext state) {
  assertKnownPath();

  return _runProcess(state, "bin/compile_docs", []);
}

void assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('bin/hop_runner.dart');
  assert(thisFile.existsSync());
}

Future<bool> _runProcess(TaskContext state, String command, List<String> args) {
  final completer = new Completer<bool>();
  final process = Process.start(command, args);

  final standardOutput = new ListOutputStream();
  standardOutput.onData = () {
    final data = standardOutput.read();
    assert(data != null);
    final str = new String.fromCharCodes(data).trim();
    state.fine(str);
  };
  process.stdout.pipe(standardOutput, true);

  final errorOutput = new ListOutputStream();
  errorOutput.onData = () {
    final data = standardOutput.read();
    assert(data != null);
    final str = new String.fromCharCodes(data).trim();
    state.error(str);
  };
  process.stderr.pipe(errorOutput, true);

  process.onExit = (int exitCode){
    completer.complete(exitCode == 0);
  };

  return completer.future;
}
