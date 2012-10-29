part of bot;

class NullArgumentException extends ArgumentError {
  final String arg;
  const NullArgumentException([String arg = '']) :
    this.arg = arg, super('Null argument: $arg');
  String toString() => "Null argument: $arg";
}
