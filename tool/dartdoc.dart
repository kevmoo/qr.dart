part of hop_runner;

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
