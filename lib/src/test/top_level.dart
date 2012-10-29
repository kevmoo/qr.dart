part of bot_test;

void pending() {
  throw new ExpectException('Not implemented');
}

final Matcher throwsInvalidOperationException =
  const Throws(const _InvalidOperationException());

final Matcher throwsNullArgumentException =
  const Throws(const _NullArgumentException());

class _InvalidOperationException extends TypeMatcher {
  const _InvalidOperationException() : super("InvalidOperationException");
  bool matches(item, MatchState matchState) => item is InvalidOperationException;
}

class _NullArgumentException extends TypeMatcher {
  const _NullArgumentException() : super("NullArgumentException");
  bool matches(item, MatchState matchState) => item is NullArgumentException;
}
