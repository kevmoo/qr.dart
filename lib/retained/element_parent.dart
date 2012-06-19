interface IElementParent {
  void childInvalidated(PElement child);
  core.AffineTransform getTransformToRoot();
  core.EventRoot<core.EventArgs> get updated();
}
