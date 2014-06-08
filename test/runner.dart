library test_bot_qr;

import 'package:unittest/unittest.dart';

import 'qr_bit_buffer_test.dart' as qr_bit_buffer;
import 'qr_code_test.dart' as qr_code;

void main() {
  group('qr bit buffer', qr_bit_buffer.main);
  group('qr code', qr_code.main);
}
