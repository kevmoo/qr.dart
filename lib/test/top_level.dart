void pending() {
  throw new ExpectException('Not implemented');
}

final Matcher throwsInvalidOperationException =
  const _Throws(const _InvalidOperationException());

final Matcher throwsNullArgumentException =
  const _Throws(const _NullArgumentException());

class _InvalidOperationException extends _ExceptionMatcher {
  const _InvalidOperationException() : super("InvalidOperationException");
  bool matches(item) => item is InvalidOperationException;
}

class _NullArgumentException extends _ExceptionMatcher {
  const _NullArgumentException() : super("NullArgumentException");
  bool matches(item) => item is NullArgumentException;
}

//
// Copied from unittest on 2012-07-16
// Would love these to be public
// http://code.google.com/p/dart/issues/detail?id=4107
//

/* abstract */ class _ExceptionMatcher extends BaseMatcher {
  final String _name;
  const _ExceptionMatcher(this._name);
  Description describe(Description description) =>
      description.add(_name);
}

class _Throws extends BaseMatcher {
  final Matcher _matcher;

  const _Throws([Matcher matcher = null]) : this._matcher = matcher;

  bool matches(item) {
    if (item is Future) {
      // Queue up an asynchronous expectation that validates when the future
      // completes.
      item.onComplete(expectAsync1((future) {
        if (future.hasValue) {
          expect(false, reason:
              "Expected future to fail, but succeeded with '${future.value}'.");
        } else if (_matcher != null) {
          var reason;
          if (future.stackTrace != null) {
            var stackTrace = future.stackTrace.toString();
            stackTrace = "  ${stackTrace.replaceAll("\n", "\n  ")}";
            reason = "Actual exception trace:\n$stackTrace";
          }
          expect(future.exception, _matcher, reason: reason);
        }
      }));

      // It hasn't failed yet.
      return true;
    }

    try {
      item();
      return false;
    } catch (final e) {
      return _matcher == null || _matcher.matches(e);
    }
  }

  Description describe(Description description) {
    if (_matcher == null) {
      return description.add("throws an exception");
    } else {
      return description.add('throws an exception which matches ').
          addDescriptionOf(_matcher);
    }
  }

  Description describeMismatch(item, Description mismatchDescription) {
    if (_matcher == null) {
      return mismatchDescription.add(' no exception');
    } else {
      return mismatchDescription.
          add(' no exception or exception does not match ').
          addDescriptionOf(_matcher);
    }
  }
}
