library hop_runner;

import 'dart:async';
import 'dart:io';

import 'package:hop/hop.dart';
import 'package:hop/hop_tasks.dart';
import 'package:hop_git/hop_git.dart';
import 'package:hop_unittest/hop_unittest.dart';

import '../test/harness_console.dart' as test_console;

void main(List<String> args) {
  addTask('test', createUnitTestTask(test_console.main));

  //
  // Analyzer
  //
  addTask('analyze_libs', createAnalyzerTask(() => _getLibs(['lib', 'web'])));

  addTask('build', createProcessTask('pub', args: ['build']));

  addTask('pages', _ghPages);

  runHop(args);
}

Future<List<String>> _getLibs(Iterable<String> parentDirs) {
  final files = new List<String>();

  return Future.forEach(parentDirs, (String d) {
    return new Directory(d)
        .list()
        .where((FileSystemEntity fse) => fse is File)
        .map((File file) => file.path)
        .where((String p) => p.endsWith('.dart'))
        .toList()
        .then((source) {
      files.addAll(source);
    });
  }).then((_) => files);
}

Future<bool> _ghPages(TaskContext ctx) =>
    branchForDir(ctx, 'master', 'build/web', 'gh-pages');
