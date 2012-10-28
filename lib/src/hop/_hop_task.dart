part of bot_hop;

class _HopTask {
  final name;
  final Func1<TaskContext, Future<bool>> _exec;

  factory _HopTask.sync(String name, Func1<TaskContext, bool> exec) {
    final futureExec = (TaskContext state) => new Future.immediate(exec(state));

    return new _HopTask.async(name, futureExec);
  }

  _HopTask.async(this.name, this._exec) {
    // TODO: name not null
    // TODO: other name requirements?
  }

  Future<bool> run(TaskContext state) {
    return _exec(state);
  }

  // TODO: ponder this. Nice for showing a heart-beat for long running tasks
  static void _trackFuture(Future future) {
    final timer = new Timer.repeating(100, (t) {
      if(future.isComplete) {
        print('done!');
        t.cancel();
      } else {
        // need to ponder a unified model for 'hearth beat' output
        //_printInline('.');
      }
    });
  }
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
