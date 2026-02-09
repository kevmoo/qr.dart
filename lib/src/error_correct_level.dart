/// QR Code error correction level.
///
/// Recover capacity:
/// * [low] : ~7%
/// * [medium] : ~15%
/// * [quartile] : ~25%
/// * [high] : ~30%
enum QrErrorCorrectLevel {
  // NOTE: the order here MATTERS.
  // The index maps to the QR standard.

  /// Level M (Medium) ~15% error correction.
  medium(15),

  /// Level L (Low) ~7% error correction.
  low(7),

  /// Level H (High) ~30% error correction.
  high(30),

  /// Level Q (Quartile) ~25% error correction.
  quartile(25);

  final int recoveryRate;

  const QrErrorCorrectLevel(this.recoveryRate);
}
