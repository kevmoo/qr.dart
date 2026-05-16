import 'error_correct_level.dart';
import 'payload.dart';
import 'qr_code.dart';
import 'rs_block.dart';

final class QrValidationResult {
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

  const QrValidationResult._({
    this.qrCode,
    required this.validTypeNumbers,
    required this.validErrorCorrectLevels,
  });

  /// Validates [payload] against the requested [typeNumber] and
  /// [errorCorrectLevel], returning a [QrValidationResult].
  factory QrValidationResult.fromPayload({
    required QrPayload payload,
    required int typeNumber,
    required QrErrorCorrectLevel errorCorrectLevel,
  }) {
    RangeError.checkValueInInterval(typeNumber, 1, 40, 'typeNumber');
    // Required bits only changes at types 10 and 27.
    final requiredBitsFor1 = payload.calculateRequiredBits(1);
    final requiredBitsFor10 = payload.calculateRequiredBits(10);
    final requiredBitsFor27 = payload.calculateRequiredBits(27);

    int getRequiredBits(int type) {
      if (type < 10) return requiredBitsFor1;
      if (type < 27) return requiredBitsFor10;
      return requiredBitsFor27;
    }

    // 1. Validate Types
    final validTypes = <int>[];
    for (var type = 1; type <= 40; type++) {
      final required = getRequiredBits(type);
      final capacity = QrRsBlock.getTotalDataBits(type, errorCorrectLevel);
      if (required <= capacity) {
        // Found minType, all subsequent types are also valid.
        for (var t = type; t <= 40; t++) {
          validTypes.add(t);
        }
        break;
      }
    }

    // 2. Validate Error Levels
    final validErrorLevels = <QrErrorCorrectLevel>[];
    for (final level in QrErrorCorrectLevel.values) {
      final requiredForType = getRequiredBits(typeNumber);
      final capacity = QrRsBlock.getTotalDataBits(typeNumber, level);
      if (requiredForType <= capacity) {
        validErrorLevels.add(level);
      }
    }

    // 3. Generate Code if valid
    QrCode? code;
    if (validTypes.contains(typeNumber) &&
        validErrorLevels.contains(errorCorrectLevel)) {
      code = QrCode(typeNumber, errorCorrectLevel, payload);
    }

    return QrValidationResult._(
      qrCode: code,
      validTypeNumbers: List.unmodifiable(validTypes),
      validErrorCorrectLevels: List.unmodifiable(validErrorLevels),
    );
  }

  /// Whether the configuration provided to generate this result is valid.
  bool get isValid => qrCode != null;
}
