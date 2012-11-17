part of hop;

class _HopTask {
  final name;
  final Func1<TaskContext, Future<bool>> _exec;

  factory _HopTask.sync(String name, Func1<TaskContext, bool> exec) {
    final futureExec = (TaskContext state) => new Future.immediate(exec(state));

    return new _HopTask.async(name, futureExec);
  }

  _HopTask.async(this.name, this._exec) {
    requireArgumentNotNull(name, 'name');
    requireArgument(name.length > 0, 'name');
    // TODO: no whitespace
    // TODO: only alpha-numeric + underscore + hyphen?
    // TODO: must start with alpha
  }

  Future<bool> run(TaskContext state) {
    requireArgumentNotNull(state, 'state');
    return _exec(state);
  }
}
