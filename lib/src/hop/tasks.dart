part of hop;

class Tasks {
  static const _reservedTasks = const[Runner.RAW_TASK_LIST_CMD];
  final Map<String, _HopTask> _tasks = new Map();
  bool _frozen = false;

  Tasks();

  Collection<String> get taskNames => _tasks.keys;

  bool hasTask(String taskName) {
    requireFrozen();
    return _tasks.containsKey(taskName);
  }

  _HopTask getTask(String taskName) {
    return _tasks[taskName];
  }

  void addTask(String name, Func1<TaskContext, bool> func) {
    _addTask(new _HopTask.sync(name, func));
  }

  void addTaskAsync(String name, Func1<TaskContext, Future<bool>> execFuture) {
    _addTask(new _HopTask.async(name, execFuture));
  }

  void requireFrozen() {
    if(!_frozen) {
      throw "not frozen!";
    }
  }

  void freeze() {
    require(!_frozen, "Already frozen.");
    _frozen = true;
  }

  void _addTask(_HopTask task) {
    assert(task != null);
    assert(!_frozen);
    require(!_reservedTasks.contains(task.name));
    require(!_tasks.containsKey(task.name), 'A task with name ${task.name} already exists');
    _tasks[task.name] = task;
  }
}
