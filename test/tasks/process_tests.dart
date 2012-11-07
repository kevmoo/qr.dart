part of test_hop;

// TODO: support windows? Test on Linux?
// TODO: need to extend TestTaskContext to have logging events
//       needed to verify output of commands, right?

class ProcessTests {
  static void run() {
    test('test command success', _testProcessSuccess);
    test('test command fail', _testProcessFail);
    test('test command does not exist', _testProcessMissing);
  }

  static void _testProcessSuccess() {
    final scriptPath = _getTestScriptPath('bash_exit_0');

    final rootCtx = new TestTaskContext();
    final ctx = rootCtx.getSubContext('process');

    final onComplete = expectAsync1((Future<bool> f) {
      expect(f.hasValue, isTrue);
      expect(f.value, isTrue);
    });

    final future = startProcess(ctx, scriptPath);

    future.onComplete(onComplete);
  }

  static void _testProcessFail() {
    final scriptPath = _getTestScriptPath('bash_exit_1');
    final rootCtx = new TestTaskContext();
    final ctx = rootCtx.getSubContext('process');

    final onComplete = expectAsync1((Future<bool> f) {
      expect(f.hasValue, isTrue);
      expect(f.value, isFalse);
    });

    final future = startProcess(ctx, scriptPath);

    future.onComplete(onComplete);
  }

  static void _testProcessMissing() {
    // NOTE: making the relatively safe assumption that this is not
    // a valid command on the test system. Could find out w/ 'which'..but...eh
    final scriptPath = 'does_not_exist_right';
    final rootCtx = new TestTaskContext();
    final ctx = rootCtx.getSubContext('process');

    final onComplete = expectAsync1((Future<bool> f) {
      expect(f.hasValue, isFalse);
      expect(f.exception is io.ProcessException, isTrue);
    });

    final future = startProcess(ctx, scriptPath);

    future.onComplete(onComplete);
  }

  static String _getTestScriptPath(String name) {
    // Since there is no way to figure out where 'this' file is, we have to
    // assume that script was run from the root of the project
    // so...the file should be at...

    final filePath = 'test/tasks/process_scripts/$name';
    final file = new io.File(filePath);

    if(!file.existsSync()) {
      throw
'''Could not find file "$filePath".
Are you running this script from the root of the project?''';
    }
    return filePath;
  }
}
