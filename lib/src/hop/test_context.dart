part of bot_hop;

class TaskContext extends DisposableImpl {
  final String name;

  TaskContext(this.name);

  void fine(String message) {
    _print(message, Color.BLUE);
  }

  void error(String message) {
    _print(message, Color.RED);
  }

  void success(String message) {
    _print(message, Color.GREEN);
  }

  void _print(String message, Color color) {
    validateNotDisposed();
    prnt("${name}: ", color);
    prntLine(message);
  }
}
