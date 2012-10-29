part of hop;

class _HopRunner {
  static const String RAW_TASK_LIST_CMD = 'print_raw_task_list';
  static final ArgParser _parser = _getParser();
  final ArgResults _args;
  final _HopState _state;

  factory _HopRunner(_HopState state, List<String> arguments) {
    final result = _parser.parse(arguments);
    return new _HopRunner._internal(state, result);
  }

  _HopRunner._internal(this._state, this._args){
    _state.requireFrozen();
  }

  void run() {
    _state.requireFrozen();
    if(_args.rest.length > 0) {
      final taskName = _args.rest[0];
      if(_state.hasTask(taskName)) {
        _runTask(taskName);
      } else if(taskName == RAW_TASK_LIST_CMD) {
        _printRawTasks();
      }
      else {
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
        if(f.value == true) {
          context.success('Finished');
        } else {
          context.error('Failed');
          if(f.value != false) {
            context.error('${f.value} returned from task');
          }
        }
      } else {
        context.error('Error');
        context.error(f.exception.toString());
        context.error(f.stackTrace.toString());
      }
      context.dispose();
    });
  }

  void _printHelp() {
    print('Welcome to HOP');
    print('');
    print('Tasks:');
    _printRawTasks();
    // print('');
    // print(_parser.getUsage());
  }

  void _printRawTasks() {
    for(final t in _state.taskNames) {
      print(t);
    }
  }

  static ArgParser _getParser() {
    final parser = new ArgParser();

    // TODO: put help in a const
    // parser.addFlag('help', abbr: '?', help: 'print help text', negatable: false);

    // TODO: other global flag ideas
    // verbose - show a lot of output
    // trace - show stack dump on fail?

    return parser;
  }
}
