#import('dart:io');
#import('package:bot/bot.dart');
#import('package:bot/hop.dart');
#import('../test/console_test_harness.dart', prefix: 'test_console');

void main() {
  _assertKnownPath();

  addAsyncTask('test', getTestRunner(test_console.testCore));
  addAsyncTask('docs', _compileDocs);
  addAsyncTask('dart2js', _dart2jsAll);
  runHopCore();
}

Future<bool> _dart2jsAll(TaskContext state) {
  final paths = $(['click', 'drag', 'fract', 'qr', 'spin'])
      .map((d) => "example/$d/${d}_demo.dart")
      .toList();
  paths.add('test/browser_test_harness.dart');

  final futureFuncs = $(paths).map((p) => () => _dart2js(state, p)).toList();

  return _chainTasks(futureFuncs);
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

Future<bool> _dart2js(TaskContext state, String file) {
  _assertKnownPath();

  final packageDir = new Directory('packages');
  assert(packageDir.existsSync());

  final args = ["--package-root=${packageDir.path}",
                '--throw-on-error',
                '-v',
                "--out=${file}.js",
                file];

  return _runProcess(state, 'dart2js', args);
}

Future<bool> _compileDocs(TaskContext state) {
  _assertKnownPath();
  return _runProcess(state, "bin/compile_docs", []);
}

void _assertKnownPath() {
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
