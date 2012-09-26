class DisposableImpl implements Disposable {
  bool _disposed = false;

  void dispose(){
    if (!_disposed) {
      // Set disposed_ to true first, in case during the chain of disposal this
      // gets disposed recursively.
      this._disposed = true;
      this.disposeInternal();
    }
  }

  // TODO: throw an object disposed exception?
  void validateNotDisposed() {
    assert(!_disposed);
  }

  bool get isDisposed => _disposed;

  /**
   * Do not call this method directly. Call [dispose] instead.
   * Subclasses should override this method to implement [Disposable] behavior.
   */
  void disposeInternal() {
  }
}
