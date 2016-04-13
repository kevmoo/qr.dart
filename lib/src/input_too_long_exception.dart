class InputTooLongException implements Exception {
  final int providedInput;
  final int inputLimit;
  final String message;

  InputTooLongException._internal(
      this.providedInput, this.inputLimit, this.message);

  factory InputTooLongException(int providedInput, int inputLimit) {
    final String message = "Input too long. $providedInput > $inputLimit";

    return new InputTooLongException._internal(
        providedInput, inputLimit, message);
  }

  String toString() => 'QrInputTooLongException: $message';
}
