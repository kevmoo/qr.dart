core.Coordinate getMouseEventCoordinate(MouseEvent event) {
  final Element element = event.currentTarget;
  assert(element != null);

  final clientCoord = new core.Coordinate(event.clientX, event.clientY);
  assert(clientCoord.isValid);

  final elementOff = getElementCoordinate(element);
  final shared = clientCoord - elementOff;

  return shared;
}

core.Coordinate getElementCoordinate(Element element) {
  final cr = element.$dom_getBoundingClientRect();
  final crd = new core.Coordinate(cr.left.toInt(), cr.top.toInt());
  assert(crd.isValid);
  return crd;
}
