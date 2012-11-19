library test_qr;

import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'qr/_qr_runner.dart';

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  runQrTests();
}
