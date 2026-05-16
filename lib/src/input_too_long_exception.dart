import 'package:meta/meta.dart';

import 'error_correct_level.dart';
import 'qr_code.dart';

/// Thrown when the provided data exceeds the capacity of a QR code.
///
/// This exception is thrown by the [QrCode] factory constructor when the input
/// payload requires more bits than can be stored in the maximum QR code version
/// (Version 40) for the requested [QrErrorCorrectLevel].
final class InputTooLongException implements Exception {
  /// The total number of data bits required by the provided input payload.
  final int inputBits;

  /// The maximum number of data bits that can be stored in a Version 40
  /// QR code at the requested error correction level.
  final int inputLimit;

  InputTooLongException._(this.inputBits, this.inputLimit)
    : assert(inputBits > inputLimit);

  @override
  String toString() => 'Input too long. $inputBits > $inputLimit';
}

@internal
InputTooLongException createExp(int inputBits, int inputLimit) =>
    InputTooLongException._(inputBits, inputLimit);
