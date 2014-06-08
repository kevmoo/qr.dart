import 'package:unittest/html_enhanced_config.dart';
import 'package:unittest/unittest.dart';
import 'runner.dart' as runner;

void main() {
  groupSep = ' - ';
  useHtmlEnhancedConfiguration();

  runner.main();
}
