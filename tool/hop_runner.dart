import 'dart:io';
import 'package:bot/bot.dart';
import 'package:hop/hop.dart';
import 'package:hop/tasks.dart';
import '../test/console_test_harness.dart' as test_console;

void main() {
  _assertKnownPath();

  addAsyncTask('test', createUnitTestTask(test_console.testCore));
  addAsyncTask('docs', _compileDocs);

  //
  // Dart2js
  //
  final paths = $(['click', 'drag', 'fract', 'qr', 'spin'])
      .map((d) => "example/$d/${d}_demo.dart")
      .toList();
  paths.add('test/browser_test_harness.dart');

  addAsyncTask('dart2js', createDart2JsTask(paths));
  runHopCore();
}

Future<bool> _compileDocs(TaskContext state) {
  _assertKnownPath();
  return _getLibs().chain((libs) {
    final args = ['--omit-generation-time', '--out', 'build/doc', '--verbose'];
    args.addAll(libs);
    return startProcess(state, "dartdoc", args);
  });
}

Future<List<String>> _getLibs() {
  final completer = new Completer<List<String>>();

  final lister = new Directory('lib').list();
  final libs = new List<String>();

  lister.onFile = (String file) {
    if(file.endsWith('.dart')) {
      // excluded test because of issues with dartdoc and sdk libs
      // DARTBUG: http://code.google.com/p/dart/issues/detail?id=5460
      // in this case, unittest
      if(!file.endsWith('test.dart')) {
        libs.add(file);
      }
    }
  };

  lister.onDone = (bool done) {
    if(done) {
      completer.complete(libs);
    } else {
      completer.completeException('did not finish');
    }
  };

  lister.onError = (error) {
    completer.completeException(error);
  };

  return completer.future;
}

void _assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('tool/hop_runner.dart');
  assert(thisFile.existsSync());
}
