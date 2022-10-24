class InputTooLongException implements Exception {
  final int providedInput;
  final int inputLimit;
  final String message;

  factory InputTooLongException(int providedInput, int inputLimit) {
    final message = 'Input too long. $providedInput > $inputLimit';

    return InputTooLongException._internal(providedInput, inputLimit, message);
  }

  InputTooLongException._internal(
    this.providedInput,
    this.inputLimit,
    this.message,
  );

  @override
  String toString() => 'QrInputTooLongException: $message';
}
