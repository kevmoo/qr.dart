
library json_pretty.tool.pages;

import 'dart:async';
import 'dart:io';
import 'package:bot/bot.dart';
import 'package:git/git.dart';
import 'package:hop/hop.dart';
import 'package:path/path.dart' as p;

Future buildWebToPages(TaskContext ctx) {
  GitDir gitDir;

  return GitDir.fromExisting(p.current)
       .then((GitDir value) {
         gitDir = value;

         return gitDir.updateBranch(_TARGET_BRANCH, _populateBranch,
             'updated pages');
       })
       .then((Commit value) {
         if(value == null) {
           ctx.info('No commit. Nothing changed.');
         } else {
           ctx.info('New commit created at branch $_TARGET_BRANCH');
           ctx.info('Message: ${value.message}');
         }
       });
}

Future _populateBranch(Directory dir) {
  return copyDirectory('build/web', dir.path);
}

const _TARGET_BRANCH = 'gh-pages';

/// Stolen from [hop_docgen].
Future copyDirectory(String sourceDirectory, String targetDir) {
  requireArgument(FileSystemEntity.isDirectorySync(sourceDirectory),
      'sourceDirectory', 'Must exist');
  _requireEmptyDir(targetDir, 'targetDir');

  var dir = new Directory(sourceDirectory);

  return streamForEachAsync(dir.list(recursive: true, followLinks: false),
      (fse) => _copyItem(fse, sourceDirectory, targetDir));
}

/// Stolen from [hop_docgen].
dynamic _copyItem(FileSystemEntity fse, String source, String target) {
  if(fse is Directory) return null;
  if(fse is Link) {
    throw new ArgumentError('Cannot rock on the link at ${fse.path}');
  }

  var relative = p.relative(fse.path, from: source);

  var newPath = p.join(target, relative);

  var parentDirPath = p.dirname(newPath);

  var parentDir = new Directory(parentDirPath);

  return parentDir.create(recursive: true).then((_) {
    return (fse as File).copy(newPath);
  });
}

/// Stolen from [hop_docgen].
void _requireEmptyDir(String path, String argName) {
  requireArgument(FileSystemEntity.isDirectorySync(path), argName,
      '$path does not exist or is not a directory.');

  var dir = new Directory(path);

  requireArgument(dir.listSync().isEmpty, argName,
      '$path is not empty.');
}
