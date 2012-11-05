part of hop;

abstract class TaskContext extends DisposableImpl {

  void fine(String message) {
    _printCore(message, Color.BLUE);
  }

  void error(String message) {
    _printCore(message, Color.RED);
  }

  void success(String message) {
    _printCore(message, Color.GREEN);
  }

  void _printCore(String message, Color color);
}

class _SubTaskContext extends TaskContext {
  final String _name;
  final RootTaskContext _parent;

  _SubTaskContext(this._parent, this._name);

  void _printCore(String message, Color color) {
    _parent.printCore(message, color, _name);
  }
}

class RootTaskContext {
  TaskContext getSubContext(String name) {
    return new _SubTaskContext(this, name);
  }

  void print(String message) {
    printCore(message);
  }

  @protected
  void printCore(String message, [Color color = null, String taskName = null]) {
    if(taskName != null) {
      prnt("${taskName}: ", color);
    }
    prntLine(message);
  }
}
