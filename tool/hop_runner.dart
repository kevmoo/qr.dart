library hop_runner;

import 'dart:async';
import 'dart:io';
import 'package:bot/bot.dart';
import 'package:bot/hop.dart';
import 'package:bot/hop_tasks.dart';
import '../test/console_test_harness.dart' as test_console;


void main() {
  _assertKnownPath();

  addTask('test', createUnitTestTask(test_console.testCore));
  addAsyncTask('pages', _ghPages);

  //
  // Dart2js
  //
  addTask('dart2js', createDart2JsTask(['web/qr_demo.dart'], minify: true));

  runHop();
}

void _assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('tool/hop_runner.dart');
  assert(thisFile.existsSync());
}

Future<bool> _ghPages(TaskContext ctx) {
  final sourceDir = 'web';
  final targetBranch = 'gh-pages';
  final sourceBranch = 'master';

  return branchForDir(ctx, sourceBranch, sourceDir, targetBranch);
}
