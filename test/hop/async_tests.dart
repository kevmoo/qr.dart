part of test_hop;

class AsyncTests {
  static void run() {
    test('null result bad' , _testNullResult);
  }

  static void _testNullResult() {
    _testSimpleAsyncTask('null', (ctx) {
        // no-op - basically null
      },
      (Future f) {
        expect(f.value, EXIT_CODE_TASK_ERROR);
        // TODO: take a look at output complaining about null future
      }
    );
  }

  static Action0 _testSimpleAsyncTask(String name, Func1<TaskContext,
                                     Future<bool>> taskFuture,
                                     Action1<Future<bool>> completeHandler) {
    final tasks = new Tasks();
    tasks.addTaskAsync(name, taskFuture);
    tasks.freeze();

    final runner = new TestRunner(tasks, [name]);
    final future = runner.run();
    expect(future, isNotNull);
    expect(future.isComplete, isTrue);

    final onComplete = expectAsync1(completeHandler);

    future.onComplete(onComplete);
  }
}
