import 'dart:io';

import 'package:path/path.dart' as p;

const _placeholder = '<!-- BUILD_INFO -->';

Future<void> main(List<String> args) async {
  if (args.isEmpty) {
    print('No arguments passed to script.');
    exit(1);
  }

  final stagingDir = Directory(args[0]);
  if (!stagingDir.existsSync()) {
    print('Staging directory ${stagingDir.path} does not exist.');
    exit(1);
  }

  print('Files in staging directory ${stagingDir.path}:');
  final files = stagingDir.listSync(recursive: true);
  var depsFileFound = false;
  for (final file in files) {
    print(' - ${file.path}');
    if (file is File && file.path.endsWith('.deps')) {
      print('Deleting ${file.path}...');
      file.deleteSync();
      depsFileFound = true;
    }
  }

  if (!depsFileFound) {
    print('No .deps file found to delete.');
  } else {
    print('Cleanup complete.');
  }

  if (!_isWorkingTreeClean()) {
    print('Skipping build info injection: working tree is dirty.');
    return;
  }

  final currentBranch = _runGit(['branch', '--show-current']);
  if (currentBranch != 'master') {
    print(
      'Skipping build info injection: '
      'current branch is "$currentBranch" (expected "master").',
    );
    return;
  }

  final htmlFilePath = p.join(stagingDir.path, 'index.html');
  final htmlFile = File(htmlFilePath);

  if (!htmlFile.existsSync()) {
    print('index.html not found at $htmlFilePath');
    // Not fatal, maybe just building something else? But user expects it.
    // Let's just log and continue.
    return;
  }

  final contents = htmlFile.readAsStringSync();

  // Get Tool version - in this case Dart version
  final version = 'Dart version ${Platform.version.split(' ').first}';

  final gitInfo = _runGit(['rev-parse', 'HEAD']);

  // If clean, link to the commit
  // Assuming GitHub repo structure: https://github.com/kevmoo/qr.dart/commit/<SHA>

  // Shorten SHA for display
  final shortSha = gitInfo.substring(0, 7);
  final replacement =
      '<code>$version • <a href="https://github.com/kevmoo/qr.dart/commit/'
      '$gitInfo">$shortSha</a></code>';

  // Replace placeholder
  final newContent = contents.replaceAll(_placeholder, replacement);

  if (newContent == contents) {
    print('WARNING: $_placeholder placeholder not found in index.html');
  } else {
    print('Injected build info into index.html');
    htmlFile.writeAsStringSync(newContent);
  }
}

String _runGit(List<String> args) {
  final result = Process.runSync('git', args);

  if (result.exitCode != 0) {
    // If git fails, maybe just return empty or throw?
    // Content said "ProcessException"
    throw ProcessException(
      'git',
      args,
      result.stderr as String,
      result.exitCode,
    );
  }

  return (result.stdout as String).trim();
}

bool _isWorkingTreeClean() => _runGit(['status', '--porcelain']).isEmpty;
