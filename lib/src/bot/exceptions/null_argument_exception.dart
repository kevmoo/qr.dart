// DARTBUG: hoping http://code.google.com/p/dart/issues/detail?id=4587 gets fixed
//       so we don't need to create our own copy of arg and can just use super's
class NullArgumentException extends IllegalArgumentException {
  final String theArg;
  const NullArgumentException([String arg = ""]) : this.theArg = arg, super(arg);
  String toString() => "Null argument(s): $theArg";
}
