part of test_hop;

class IntegrationTests {
  static final hopPath = 'bin/hop';

  static void run() {
    test('hop output is sorted', _testOutputSorted);
    test('bad hop command', _testBadHopCommand);
  }

  static void _testBadHopCommand() {
    final onComplete = expectAsync1((Future<io.ProcessResult> f) {
      expect(f.hasValue, isTrue);
      final pr = f.value;
      expect(pr.exitCode, equals(EXIT_CODE_USAGE));
    });

    final f = io.Process.run(hopPath, ['bad_command_name']);
    f.onComplete(onComplete);
  }

  static void _testOutputSorted() {
    final onComplete = expectAsync1((Future<io.ProcessResult> f) {
      expect(f.hasValue, isTrue);
      final pr = f.value;
      expect(pr.exitCode, equals(EXIT_CODE_SUCCESS));
      final lines = pr.stdout.trim().split('\n');
      expect(lines, orderedEquals(['about', 'dart2js', 'docs', 'pages', 'test']));
    });

    final f = io.Process.run(hopPath, [Runner.RAW_TASK_LIST_CMD]);
    f.onComplete(onComplete);
  }
}