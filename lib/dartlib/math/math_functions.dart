bool isValidNumber(num value) {
  return value != null && !value.isInfinite() && !value.isNaN();
}

Random get rnd() {
  if(_dartlibHelperRandom == null) {
    _dartlibHelperRandom = new Random();
  }
  return _dartlibHelperRandom;
}

Random _dartlibHelperRandom;
