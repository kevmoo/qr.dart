interface IElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
  core.EventRoot<core.EventArgs> get updated();
}
