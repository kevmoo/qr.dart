part of hop;

class Runner {
  static const String RAW_TASK_LIST_CMD = 'print_raw_task_list';
  static final ArgParser _parser = _getParser();
  final ArgResults _args;
  final Tasks _state;

  factory Runner(Tasks state, List<String> arguments) {
    final result = _parser.parse(arguments);
    return new Runner._internal(state, result);
  }

  Runner._internal(this._state, this._args){
    _state.requireFrozen();
  }

  Future<bool> run() {
    _state.requireFrozen();
    if(_args.rest.length > 0) {
      final taskName = _args.rest[0];
      if(_state.hasTask(taskName)) {
        return _runTask(taskName);
      } else if(taskName == RAW_TASK_LIST_CMD) {
        _printRawTasks();
        return new Future.immediate(true);
      }
      else {
        print('No task named "$taskName".');
        return new Future.immediate(false);
      }
    } else {
      _printHelp();
      return new Future.immediate(true);
    }
  }

  @protected
  TaskContext getContext(String taskName) {
    return new TaskContext(taskName);
  }

  Future<bool> _runTask(String taskName) {
    final task = _state.getTask(taskName);
    assert(task != null);

    final context = getContext(task.name);
    final completer = new Completer<bool>();

    // DARTBUG: http://code.google.com/p/dart/issues/detail?id=6405
    // Hopefully this issue will be resolved. Having the catch inline here
    // means we're missing the stack trace and duplicating error handling code.
    Future<bool> future;
    try {
      future = task.run(context);
    } catch(e) {
      context.error('Error');
      context.error(e.toString());
      completer.completeException(e);
      return completer.future;
    }

    assert(future != null);

    future.onComplete((f) {
      if(f.hasValue) {
        if(f.value == true) {
          context.success('Finished');
          completer.complete(true);
        } else {
          context.error('Failed');
          if(f.value == false) {
            completer.complete(false);
          } else {
            context.error('${f.value} returned from task');
            completer.completeException('Return value from task must be true or false');
          }
        }
      } else {
        context.error('Error');
        context.error(f.exception.toString());
        context.error(f.stackTrace.toString());
        completer.completeException(f.exception, f.stackTrace);
      }
      context.dispose();
    });

    return completer.future;
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
