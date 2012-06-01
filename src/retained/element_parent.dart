interface IElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
  EventRoot<EventArgs> get updated();
}
