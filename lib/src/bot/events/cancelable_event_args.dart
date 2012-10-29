part of bot;

class CancelableEventArgs extends EventArgs {
  bool _canceled = false;

  bool get isCanceled => _canceled;

  void cancel() {
    _canceled = true;
  }
}
