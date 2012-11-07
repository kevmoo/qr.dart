part of hop_tasks;

Func1<TaskContext, Future<bool>> createUnitTestTask(Action1<unittest.Configuration> unitTestAction) {
  return (TaskContext state) {
    final config = new _HopTestConfiguration(state);
    final future = config.future;
    unitTestAction(config);
    unittest.runTests();
    return future;
  };
}

class _HopTestConfiguration extends unittest.Configuration {
  final Completer<bool> _completer;
  final TaskContext _context;

  _HopTestConfiguration(this._context) : this._completer = new Completer<bool>();

  Future<bool> get future => _completer.future;

  get autoStart => false;

  void onStart() {
     // overloading to prevent 'print' in baseclass
  }

  void logTestcaseMessage(unittest.TestCase testCase, String message) {
    // something eles?
  }

  void onTestResult(unittest.TestCase testCase) {
    super.onTestResult(testCase);

    // result should not be null here
    assert(testCase.result != null);

    if(testCase.result == unittest.PASS) {
      _context.fine(testCase.description);
    }
    else {
      _context.error(
'''[${testCase.result}] ${testCase.description}
${testCase.message}
${testCase.stackTrace}''');
    }
  }

  void onDone(int passed, int failed, int errors, List<unittest.TestCase> results,
              String uncaughtError) {
    final bool success = failed == 0 && errors == 0 && uncaughtError == null;
    final message = "$passed PASSED, $failed FAILED, $errors ERRORS";
    if(success) {
      _context.fine(message);
    } else {
      _context.error(message);
    }
    _completer.complete(success);
  }
}

