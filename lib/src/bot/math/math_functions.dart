part of bot;

bool isValidNumber(num value) {
  return value != null && !value.isInfinite && !value.isNaN;
}

math.Random get rnd {
  if(_botHelperRandom == null) {
    _botHelperRandom = new math.Random();
  }
  return _botHelperRandom;
}

math.Random _botHelperRandom;
