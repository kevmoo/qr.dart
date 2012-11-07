part of test_hop;

// TODO: test output using new TestRunner

class SyncTests {
  static void run() {
    test('true result is cool', _testTrueIsCool);
    test('false result fails', _testFalseIsFail);
    test('null result is sad', _testNullIsSad);
    test('exception is sad', _testExceptionIsSad);
    test('bad task name', _testBadParam);
    test('no task name', _testNoParam);
  }

  static void _testTrueIsCool() {
    _testSimpleSyncTask('good', (ctx) => true, (f) {
      expect(f.value, EXIT_CODE_SUCCESS);
    });
  }

  static void _testFalseIsFail() {
    _testSimpleSyncTask('fail', (ctx) => false, (f) {
      expect(f.value, EXIT_CODE_TASK_FAIL);
    });
  }

  static void _testNullIsSad() {
    _testSimpleSyncTask('null', (ctx) => null,(Future f) {
      expect(f.value, EXIT_CODE_TASK_ERROR);
    });
  }

  static void _testExceptionIsSad() {
    _testSimpleSyncTask('exception', (ctx) {
        throw 'sorry';
      },
      (Future f) {
        expect(f.value, EXIT_CODE_TASK_EXCEPTION);
      }
    );
  }

  static void _testBadParam() {
    final tasks = new Tasks();
    tasks.addTask('good', (ctx) => true);
    tasks.freeze();

    final runner = new TestRunner(tasks, ['bad']);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1((f) {
      expect(f.value, EXIT_CODE_USAGE);
      // TODO: test that proper error message is printed
    });

    future.onComplete(onComplete);
  }

  static void _testNoParam() {
    final tasks = new Tasks();
    tasks.addTask('good', (ctx) => true);
    tasks.freeze();

    final runner = new TestRunner(tasks, []);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1((f) {
      expect(f.value, EXIT_CODE_SUCCESS);
      // TODO: test that task list is printed
    });

    future.onComplete(onComplete);
  }

  static Action0 _testSimpleSyncTask(String name, Func1<TaskContext, bool> task,
                            Action1<Future<bool>> completeHandler) {
    final tasks = new Tasks();
    tasks.addTask(name, task);
    tasks.freeze();

    final runner = new TestRunner(tasks, [name]);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1(completeHandler);

    future.onComplete(onComplete);
  }
}