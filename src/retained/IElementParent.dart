interface IElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
  IEvent<EventArgs> get updated();
}
