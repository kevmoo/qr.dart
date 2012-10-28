library console_test_harness;

import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';

main() {
  final config = new VmConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
  configure(config);
  groupSep = ' - ';

  test('hello, world', () {
    expect(true, true);
  });
}
