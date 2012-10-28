part of bot_hop;

Func1<TaskContext, Future<bool>> getDart2jsTask(List<String> inputs) {
  return (context) {
    final futureFuncs = $(inputs).map((p) => () => _dart2js(context, p)).toList();
    return _chainTasks(futureFuncs);
  };
}

Future<bool> _dart2js(TaskContext state, String file, [String output = null]) {
  if(output == null) {
    output = "${file}.js";
  }

  final packageDir = new Directory('packages');
  assert(packageDir.existsSync());

  final args = ["--package-root=${packageDir.path}",
                '--throw-on-error',
                '-v',
                "--out=$output",
                file];

  return runProcess(state, 'dart2js', args);
}
