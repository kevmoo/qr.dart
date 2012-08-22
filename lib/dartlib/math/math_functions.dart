bool isValidNumber(num value) {
  return value != null && !value.isInfinite() && !value.isNaN();
}

math.Random get rnd {
  if(_dartlibHelperRandom == null) {
    _dartlibHelperRandom = new math.Random();
  }
  return _dartlibHelperRandom;
}

math.Random _dartlibHelperRandom;
