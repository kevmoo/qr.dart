void requireArgument(bool truth, [String arg = ""]) {
  if(!truth) {
    throw new IllegalArgumentException(arg);
  }
}

void requireArgumentNotNull(argument, [String argName = ""]) {
  if(argument == null) {
    throw new NullArgumentException(argName);
  }
}
