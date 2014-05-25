library qr.tool.pages;

import 'dart:async';
import 'dart:io';

import 'package:bot_io/bot_io.dart';
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
