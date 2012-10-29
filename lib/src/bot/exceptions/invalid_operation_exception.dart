part of bot;

class InvalidOperationException implements Exception {
  final String message;

  const InvalidOperationException([this.message = ""]);
}
