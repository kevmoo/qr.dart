class DetailedIllegalArgumentException extends ArgumentError {
  final argument;

  DetailedIllegalArgumentException([String arg = '', String message]) :
    this.argument = arg,
    super(message);

  String toString() {
    if(message == null || message.length == 0) {
      return "Illegal argument: $argument";
    } else {
      return "Illegal argument: $argument -- $message";
    }
  }
}
