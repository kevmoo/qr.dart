class _HopRunner {
  static final ArgParser _parser = _getParser();
  final ArgResults _args;
  final _HopState _state;

  factory _HopRunner(_HopState state, List<String> arguments) {
    final result = _parser.parse(arguments);
    return new _HopRunner._internal(state, result);
  }

  _HopRunner._internal(this._state, this._args){
    _state.requireFrozen();
    if(_args.rest.length > 0) {
      final taskName = _args.rest[0];
      if(_state.hasTask(taskName)) {
        _runTask(taskName);
      } else {
        print('No task named "$taskName".');
      }
    } else {
      _printHelp();
    }
  }

  void _runTask(String taskName) {
    final task = _state.getTask(taskName);
    assert(task != null);

    final context = new TaskContext(task.name);
    final future = task.run(context);

    future.onComplete((f) {
      if(f.hasValue) {
        if(f.value) {
          context.success('Finished');
        } else {
          context.error('Failed');
        }
      } else {
        context.error('Error');
      }
      context.dispose();
    });
  }

  void _printHelp() {
    print('Welcome to HOP');
    print('');
    print('Tasks:');
    for(final t in _state.taskNames) {
      print(t);
    }

    print('');
    print(_parser.getUsage());
  }

  static ArgParser _getParser() {
    final parser = new ArgParser();

    // TODO: put help in a const
    parser.addFlag('help', '?', 'print help text', false, false);

    // TODO: other global flag ideas
    // verbose - show a lot of output
    // trace - show stack dump on fail?


    return parser;
  }
}
