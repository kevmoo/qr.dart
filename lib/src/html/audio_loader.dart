class AudioLoader extends ResourceLoader<AudioBuffer> {
  final AudioContext context;

  AudioLoader(this.context, Iterable<String> urlList) :
    super(urlList);

  void _doLoad(String blobUrl) {
    // Load buffer asynchronously
    final HttpRequest arrayBufferRequest = new HttpRequest();
    arrayBufferRequest.open("GET", blobUrl, true);
    arrayBufferRequest.responseType = "arraybuffer";

    arrayBufferRequest.on.load.add((args) {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        arrayBufferRequest.response,
        (buffer) => _saveBuffer(blobUrl, buffer),
        (buffer) => _onAudioLoadError(blobUrl, 'decode error', buffer));
    });

    arrayBufferRequest.on.error.add((args) {
      _onAudioLoadError(blobUrl, 'BufferLoader: XHR error', args);
    });

    arrayBufferRequest.send();
  }

  void _onAudioLoadError(String blobUrl, String description, error) {
    print(['Error!', description, error]);
    _loadResourceFailed(blobUrl);
  }

  void _saveBuffer(String blobUrl, AudioBuffer buffer) {
    if (buffer == null) {
      _onAudioLoadError(blobUrl, 'null buffer', '');
    }
    _loadResourceSucceed(blobUrl, buffer);
  }
}
