library console_test_harness;

import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'package:bot/test.dart';

part '_basic_sync_tests.dart';

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  group('sync tests', SyncTests.run);
}
