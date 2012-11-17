library test_hop;

import 'dart:io' as io;
import 'package:bot/bot.dart';
import 'package:bot/hop.dart';
import 'package:bot/io.dart';
import 'package:bot/tasks.dart';
import 'package:bot/test.dart';
import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'async/_async_runner.dart';
import 'bot/_bot_runner.dart';
import 'qr/_qr_runner.dart';

part 'hop/sync_tests.dart';
part 'hop/task_list_tests.dart';
part 'hop/integration_tests.dart';
part 'hop/async_tests.dart';
part 'tasks/process_tests.dart';
part 'test_runner.dart';

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  runBotTests();
  runAsyncTests();
  runQrTests();

  group('hop', () {
    group('async tasks', AsyncTests.run);
    group('sync tasks', SyncTests.run);
    group('task list', TaskListTests.run);
    group('integration', IntegrationTests.run);
  });

  group('tasks', () {
    group('process', ProcessTests.run);
  });
}
