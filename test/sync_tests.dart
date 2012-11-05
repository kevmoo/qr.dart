part of test_hop;

// TODO: create a custom runer to silence output
// ...and to allow testing output

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
      expect(f.value, isTrue);
    });
  }

  static void _testFalseIsFail() {
    _testSimpleSyncTask('fail', (ctx) => false, (f) {
      expect(f.value, isFalse);
    });
  }

  static void _testNullIsSad() {
    _testSimpleSyncTask('null', (ctx) => null,(Future f) {
      expect(f.exception, isNotNull);
    });
  }

  static void _testExceptionIsSad() {
    _testSimpleSyncTask('exception', (ctx) {
        throw 'sorry';
      },
      (Future f) {
        expect(f.exception, 'sorry');
      }
    );
  }

  static void _testBadParam() {
    final tasks = new Tasks();
    tasks.addTask('good', (ctx) => true);
    tasks.freeze();

    final runner = new Runner(tasks, ['bad']);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1((f) {
      expect(f.value, isFalse);
      // TODO: test that proper error message is printed
    });

    future.onComplete(onComplete);
  }

  static void _testNoParam() {
    final tasks = new Tasks();
    tasks.addTask('good', (ctx) => true);
    tasks.freeze();

    final runner = new Runner(tasks, []);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1((f) {
      expect(f.value, isTrue);
      // TODO: test that task list is printed
    });

    future.onComplete(onComplete);
  }

  static Action0 _testSimpleSyncTask(String name, Func1<TaskContext, bool> task,
                            Action1<Future<bool>> completeHandler) {
    final tasks = new Tasks();
    tasks.addTask(name, task);
    tasks.freeze();

    final runner = new Runner(tasks, [name]);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1(completeHandler);

    future.onComplete(onComplete);
  }
}