library test_dump_render_tree;

import 'package:bot_test/dump_render_tree.dart';

void main() {
  final browserTests = const ['test/harness_browser.html'];

  testDumpRenderTree(browserTests);
}
