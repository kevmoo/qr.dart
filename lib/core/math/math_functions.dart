bool isValidNumber(num value) {
  return value != null && !value.isInfinite() && !value.isNaN();
}
