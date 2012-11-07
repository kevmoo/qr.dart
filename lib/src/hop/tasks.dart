part of hop;

class Tasks {
  static const _reservedTasks = const[Runner.RAW_TASK_LIST_CMD];
  final Map<String, _HopTask> _tasks = new Map();
  ReadOnlyCollection<String> _sortedTaskNames;

  Tasks();

  /// Can only be accessed when frozen
  /// Always sorted
  SequenceCollection<String> get taskNames {
    requireFrozen();
    return _sortedTaskNames;
  }

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
    if(!isFrozen) {
      throw "not frozen!";
    }
  }

  void freeze() {
    require(!isFrozen, "Already frozen.");
    final list = new List<String>.from(_tasks.keys);
    list.sort();
    _sortedTaskNames = new ReadOnlyCollection<String>.wrap(list);
  }

  bool get isFrozen => _sortedTaskNames != null;

  void _addTask(_HopTask task) {
    requireArgumentNotNull(task);
    require(!isFrozen, "Cannot add a task. Frozen.");
    requireArgument(!_reservedTasks.contains(task.name));
    requireArgument(!_tasks.containsKey(task.name), 'A task with name ${task.name} already exists');
    _tasks[task.name] = task;
  }
}
