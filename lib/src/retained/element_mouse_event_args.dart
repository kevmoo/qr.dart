part of bot_retained;

class ElementMouseEventArgs extends EventArgs {
  final PElement element;
  final bool shiftKey;

  factory ElementMouseEventArgs(PElement element, MouseEvent mouseEvent) {
    assert(element != null);
    assert(mouseEvent != null);

    return new ElementMouseEventArgs._internal(element, mouseEvent.shiftKey);
  }

  ElementMouseEventArgs._internal(this.element, this.shiftKey);
}
