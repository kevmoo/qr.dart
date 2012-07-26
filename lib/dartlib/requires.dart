void requireArgument(bool truth, [String arg = "", String message]) {
  if(!truth) {
    if(message != null) {
      throw new DetailedIllegalArgumentException(arg, message);      
    } else {
      throw new IllegalArgumentException(arg);
    }
  }
}

void requireArgumentNotNull(argument, [String argName = ""]) {
  if(argument == null) {
    throw new NullArgumentException(argName);
  }
}
