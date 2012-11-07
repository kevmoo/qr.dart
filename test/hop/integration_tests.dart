part of test_hop;

class IntegrationTests {
  static void run() {
    test('hop output is sorted', _testOutputSorted);
  }

  static void _testOutputSorted() {
    final onComplete = expectAsync1((Future<io.ProcessResult> f) {
      expect(f.hasValue, isTrue);
      final pr = f.value;
      expect(pr.exitCode, equals(EXIT_CODE_SUCCESS));
      final lines = pr.stdout.trim().split('\n');
      expect(lines, orderedEquals(['about', 'docs', 'test']));
    });

    final f = io.Process.run('hop', [Runner.RAW_TASK_LIST_CMD]);
    f.onComplete(onComplete);
  }
}