part of hop_tasks;

// TODO: allow arguments? Specifically minify

Func1<TaskContext, Future<bool>> createDart2JsTask(List<String> inputs) {
  return (context) {
    final futureFuncs = $(inputs).map((p) => () => _dart2js(context, p)).toList();
    return _chainTasks(futureFuncs);
  };
}

Future<bool> _dart2js(TaskContext state, String file, [String output = null]) {
  if(output == null) {
    output = "${file}.js";
  }

  final packageDir = new io.Directory('packages');
  assert(packageDir.existsSync());

  final args = ["--package-root=${packageDir.path}",
                '--throw-on-error',
                '-v',
                "--out=$output",
                file];

  return startProcess(state, 'dart2js', args);
}

Future<bool> _chainTasks(List<Func<Future<bool>>> futures, [int index=0]) {
  assert(futures.length > 0);
  assert(index >= 0);
  assert(index <= futures.length);
  if(index == futures.length) {
    return new Future.immediate(true);
  }
  final func = futures[index];
  final future = func();
  return future.chain((bool status) {
    if(status) {
      return _chainTasks(futures, index+1);
    }
    else {
      return new Future.immediate(false);
    }
  });
}
