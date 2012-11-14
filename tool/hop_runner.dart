library hop_runner;

import 'dart:io';
import 'package:bot/bot.dart';
import 'package:hop/hop.dart';
import 'package:hop/tasks.dart';
import '../test/console_test_harness.dart' as test_console;

part 'dartdoc.dart';

void main() {
  _assertKnownPath();

  addAsyncTask('test', createUnitTestTask(test_console.testCore));
  addAsyncTask('docs', _compileDocs);
  addAsyncTask('pages', _ghPages);

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

void _assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('tool/hop_runner.dart');
  assert(thisFile.existsSync());
}

Future<bool> _ghPages(TaskContext ctx) {
  final sourceDir = 'build/doc';
  final targetBranch = 'gh-pages';
  final sourceBranch = 'master';

  return branchForDir(ctx, sourceBranch, sourceDir, targetBranch);
}
