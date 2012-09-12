interface ElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
  EventRoot<EventArgs> get invalidated;
}
