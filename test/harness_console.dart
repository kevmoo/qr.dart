library test_qr;

import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'qr/_qr_runner.dart';

import 'test_dump_render_tree.dart' as drt;

void main() {
  final config = new VMConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  unittestConfiguration = config;
  groupSep = ' - ';

  runQrTests();
  drt.main();
}
