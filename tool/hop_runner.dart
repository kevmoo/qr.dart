library hop_runner;

import 'dart:async';
import 'dart:io';
import 'package:hop/hop.dart';
import 'package:hop/hop_tasks.dart';
import '../test/harness_console.dart' as test_console;

void main(List<String> args) {

  addTask('test', createUnitTestTask(test_console.testCore));
  addAsyncTask('pages', _ghPages);

  //
  // Dart2js
  //
  addTask('dart2js', createDartCompilerTask(['web/qr_demo.dart'], minify: true));

  //
  // Analyzer
  //
  addTask('analyze_libs',
      createAnalyzerTask(() => _getLibs(['lib', 'web'])));


  addTask('update_js', createCopyJSTask('web', browserDart: true));

  runHop(args);
}

Future<List<String>> _getLibs(Iterable<String> parentDirs) {
  final files = new List<String>();

  return Future.forEach(parentDirs, (String d) {
    return new Directory(d).list()
      .where((FileSystemEntity fse) => fse is File)
      .map((File file) => file.path)
      .where((String p) => p.endsWith('.dart'))
      .toList()
      .then((source) {
        files.addAll(source);
      });
    })
    .then((_) => files);
}

Future<bool> _ghPages(TaskContext ctx) {
  final sourceDir = 'web';
  final targetBranch = 'gh-pages';
  final sourceBranch = 'master';

  return branchForDir(ctx, sourceBranch, sourceDir, targetBranch);
}
