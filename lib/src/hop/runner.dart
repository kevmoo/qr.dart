part of hop;

class Runner {
  static const String RAW_TASK_LIST_CMD = 'print_raw_task_list';
  static final ArgParser _parser = _getParser();
  final ArgResults _args;
  final Tasks _state;

  Runner(this._state, List<String> arguments) :
    _args = _parser.parse(arguments) {
    _state.requireFrozen();
  }

  Future<bool> run() {
    _state.requireFrozen();

    final ctx = getContext();

    switch(_args.rest.length) {
      case 0:
        _printHelp(ctx);
        return new Future.immediate(true);
      case 1:
        final taskName = _args.rest[0];
        if(_state.hasTask(taskName)) {
          var subCtx = ctx.getSubContext(taskName);
          return _runTask(subCtx, taskName);
        } else if(taskName == RAW_TASK_LIST_CMD) {
          _printRawTasks(ctx);
          return new Future.immediate(true);
        }
        else {
          ctx.print('No task named "$taskName".');
          return new Future.immediate(false);
        }

        // DARTBUG: http://code.google.com/p/dart/issues/detail?id=6563
        // all paths have a return, this break shouldn't be needed
        break;
      default:
        ctx.print('Too many arguments');
        ctx.print('--options must come before task name');
        return new Future.immediate(false);
    }
  }

  @protected
  RootTaskContext getContext() {
    final bool colorEnabled = _args['color'];
    return new RootTaskContext(colorEnabled);
  }

  Future<bool> _runTask(TaskContext context, String taskName) {
    final task = _state.getTask(taskName);
    assert(task != null);

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

  void _printHelp(RootTaskContext ctx) {
    ctx.print('Welcome to HOP');
    ctx.print('');
    ctx.print('Tasks:');
    _printRawTasks(ctx);
    ctx.print('');
    ctx.print(_parser.getUsage());
  }

  void _printRawTasks(RootTaskContext ctx) {
    for(final t in _state.taskNames) {
      ctx.print(t);
    }
  }

  static ArgParser _getParser() {
    final parser = new ArgParser();

    parser.addFlag('color', defaultsTo: true);


    // TODO: put help in a const
    // parser.addFlag('help', abbr: '?', help: 'print help text', negatable: false);

    // TODO: other global flag ideas
    // verbose - show a lot of output
    // trace - show stack dump on fail?

    return parser;
  }
}
