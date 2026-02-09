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
  medium,

  /// Level L (Low) ~7% error correction.
  low,

  /// Level H (High) ~30% error correction.
  high,

  /// Level Q (Quartile) ~25% error correction.
  quartile,
}
