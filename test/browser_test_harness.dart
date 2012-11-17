import 'package:unittest/html_enhanced_config.dart';
import 'package:unittest/unittest.dart';
import 'qr/_qr_runner.dart';

main() {
  groupSep = ' - ';
  useHtmlEnhancedConfiguration();

  runQrTests();
}
