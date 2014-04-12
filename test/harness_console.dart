library test_qr;

import 'package:unittest/unittest.dart';
import 'qr/_qr_runner.dart';

import 'test_dump_render_tree.dart' as drt;

void main() {
  groupSep = ' - ';

  runQrTests();
  drt.main();
}
