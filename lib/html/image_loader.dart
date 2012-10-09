class ImageLoader extends ResourceLoader<ImageElement> {
  ImageLoader(Iterable<String> urls) : super(urls);

  void _doLoad(String blobUrl) {
    final img = new ImageElement(blobUrl);
    assert(!img.complete);
    img.on.load.add((args) {
      assert(args.type == 'load');
      _loadResourceSucceed(blobUrl, img);
    });
  }
}
