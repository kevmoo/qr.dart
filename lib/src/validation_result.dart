import 'error_correct_level.dart';
import 'qr_code.dart';

class QrValidationResult {
  /// The generated [QrCode] if the provided type and error correction level
  /// are valid for the given data.
  ///
  /// If the data is too long for the specified configuration, this will be
  /// `null`.
  final QrCode? qrCode;

  /// The list of type numbers (1-40) that are valid for the provided data
  /// and the requested error correction level.
  final List<int> validTypeNumbers;

  /// The list of [QrErrorCorrectLevel]s that are valid for the provided data
  /// and the requested type number.
  final List<QrErrorCorrectLevel> validErrorCorrectLevels;

  QrValidationResult({
    this.qrCode,
    required this.validTypeNumbers,
    required this.validErrorCorrectLevels,
  });

  /// Whether the configuration provided to generate this result is valid.
  bool get isValid => qrCode != null;
}
