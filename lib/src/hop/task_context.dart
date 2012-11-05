part of hop;

class TaskContext extends DisposableImpl {
  final String name;

  TaskContext(this.name);

  void fine(String message) {
    printCore(message, Color.BLUE);
  }

  void error(String message) {
    printCore(message, Color.RED);
  }

  void success(String message) {
    printCore(message, Color.GREEN);
  }

  @protected
  void printCore(String message, Color color) {
    validateNotDisposed();
    prnt("${name}: ", color);
    prntLine(message);
  }
}
