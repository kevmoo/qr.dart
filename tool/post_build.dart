import 'dart:io';

void main(List<String> args) {
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
}
