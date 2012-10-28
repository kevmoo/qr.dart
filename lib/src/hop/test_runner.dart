part of bot_hop;

Func1<TaskContext, Future<bool>> getTestRunner(Action1<Configuration> testRunner) {
  return (TaskContext state) {
    // TODO: do something w/ state

    final config = new _HopTestConfiguration(state);
    final future = config.future;
    testRunner(config);
    runTests();
    return future;
  };
}

class _HopTestConfiguration extends Configuration {
  final Completer<bool> _completer;
  final TaskContext _state;

  _HopTestConfiguration(this._state) : this._completer = new Completer<bool>();

  Future<bool> get future => _completer.future;

  get autoStart => false;

  void onStart() {
     // no need to post message
  }

  void logTestcaseMessage(TestCase testCase, String message) {
    // something eles?
  }

  void onTestResult(TestCase testCase) {
    super.onTestResult(testCase);
    _state.fine(testCase.description);
  }

  void onDone(int passed, int failed, int errors, List<TestCase> results,
              String uncaughtError) {
    final bool success = failed == 0 && errors == 0 && uncaughtError == null;
    _completer.complete(success);
  }
}

