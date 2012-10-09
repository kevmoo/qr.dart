class TextureInput {
  final String name;
  final Box frame;
  final bool rotated;
  final bool trimmed;
  final Box sourceColorRect;
  final Size sourceSize;
  final ImageElement image;

  TextureInput(this.name, this.frame, this.rotated, this.trimmed,
      this.sourceColorRect, this.sourceSize, this.image);

  factory TextureInput.fromHash(String keyName, Map<String, Dynamic> map,
      ImageElement image) {
    final frame = _parseRect(map['frame']);
    final sourceColorRect = _parseRect(map['spriteSourceSize']);
    final sourceSize = _parseCoordinate(map['sourceSize']);

    return new TextureInput(keyName, frame, map['rotated'], map['trimmed'],
        sourceColorRect, sourceSize, image);
  }

  String toString() => this.name;

  static Box _parseRect(Map<String, Dynamic> input) {
    var coord = new Coordinate(input['x'], input['y']);
    var size = new Size(input['w'], input['h']);

    return new Box.fromCoordSize(coord, size);
  }

  static Size _parseCoordinate(Map<String, Dynamic> input) {
    return new Size(input['w'], input['h']);
  }
}
