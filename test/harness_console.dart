library test_qr;

import 'package:unittest/unittest.dart';

import 'runner.dart' as runner;
import 'test_dump_render_tree.dart' as drt;

void main() {
  groupSep = ' - ';

  runner.main();
  drt.main();
}
