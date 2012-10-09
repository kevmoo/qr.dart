class _ResourceEntry<T> {
  final String url;
  T _resource;
  String _blobUrl;
  int _total = null, _completed = 0;

  _ResourceEntry(this.url);

  int get totalBytes => _total;

  int get completedBytes => _completed;

  void setResource(T resource) {
    assert(resource != null);
    assert(_resource == null);
    _resource = resource;
  }

  bool updateProgress(int completed, int total) {
    assert(completed != null);
    assert(total != null);
    assert(completed <= total);
    assert(_total == null || _total == total);

    var changed = false;
    if(_completed != completed) {
      _completed = completed;
      changed = true;
    }

    if(_total != total) {
      _total = total;
      changed = true;
    }
    return changed;
  }

  bool get completed => _resource != null;

  T get resource => _resource;

  bool matchesBlobUrl(String blobUrl) {
    assert(blobUrl != null);
    return blobUrl == _blobUrl;
  }

  String getBlobUrl(Blob blob) {
    assert(blob != null);
    assert(_blobUrl == null);
    _blobUrl = window.createObjectUrl(blob);
    if(_blobUrl == null) {
      _blobUrl = url;
    }
    return _blobUrl;
  }

  void revokeBlobUrl() {
    assert(_blobUrl != null);
    window.revokeObjectUrl(_blobUrl);
  }
}
