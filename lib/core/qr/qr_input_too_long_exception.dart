class QrInputTooLongException implements Exception {
  final int providedInput;
  final int inputLimit;
  final String message;

  QrInputTooLongException._internal(this.providedInput, this.inputLimit,
    this.message);

  factory QrInputTooLongException(int providedInput, int inputLimit) {
    final String message = "Input too long. $providedInput > $inputLimit";

    return new QrInputTooLongException._internal(providedInput, inputLimit,
      message);
  }

  String toString() => 'QrInputTooLongException: $message';
}
