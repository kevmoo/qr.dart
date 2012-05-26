interface IElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
}
