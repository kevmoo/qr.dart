import 'dart:io';

import 'package:path/path.dart' as p;

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

  // Get git SHA and dirty state
  final clean = _isWorkingTreeClean();

  // NO POINT in including a SHA if it's invalid
  final gitInfo = clean ? _runGit(['rev-parse', 'HEAD']) : 'DIRTY';

  // If clean, link to the commit
  // Assuming GitHub repo structure: https://github.com/kevmoo/qr.dart/commit/<SHA>
  // We can hardcode this or try to parse remote origin url but simpler is better.
  // The user post said: "The commit SHA should like to the code repository" "like" -> "link"

  String replacement;
  if (clean) {
    // Shorten SHA for display
    final shortSha = gitInfo.substring(0, 7);
    replacement =
        '<code>$version • <a href="https://github.com/kevmoo/qr.dart/commit/$gitInfo">$shortSha</a></code>';
  } else {
    replacement = '<code>$version • DIRTY</code>';
  }

  // Replace <!-- BUILD_INFO -->
  final newContent = contents.replaceAll('<!-- BUILD_INFO -->', replacement);

  if (newContent == contents) {
    print('WARNING: <!-- BUILD_INFO --> placeholder not found in index.html');
  } else {
    print('Injected build info into index.html');
    htmlFile.writeAsStringSync(newContent);
  }
}

String _runGit(List<String> args) {
  final result = Process.runSync('git', args);

  if (result.exitCode != 0) {
    // If git fails, maybe just return empty or throw? Content said "ProcessException"
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
