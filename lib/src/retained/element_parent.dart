part of bot_retained;

abstract class ElementParent {
  void childInvalidated(PElement child);
  AffineTransform getTransformToRoot();
  EventRoot<EventArgs> get invalidated;
}
