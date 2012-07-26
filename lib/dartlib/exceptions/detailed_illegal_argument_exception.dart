class DetailedIllegalArgumentException extends IllegalArgumentException {
  final argument;
  final message;
  
  DetailedIllegalArgumentException([String arg = '', String message]) :
    this.argument = arg,
    this.message = message,
    super();

  String toString() {
    if(message == null || message.length == 0) {
      return "Illegal argument: $argument";
    } else {
      return "Illegal argument: $argument -- $message";
    }
  }
}
