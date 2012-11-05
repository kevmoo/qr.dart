library test_hop;

import 'package:bot/bot.dart';
import 'package:bot/test.dart';
import 'package:hop/hop.dart';
import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'package:bot/io.dart';

part 'sync_tests.dart';
part 'task_list_tests.dart';
part 'test_runner.dart';

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  group('sync tasks', SyncTests.run);
  group('task list', TaskListTests.run);
}
