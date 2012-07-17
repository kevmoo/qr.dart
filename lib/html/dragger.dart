// a laughably incomplete version of dragger from the closure library
// http://closure-library.googlecode.com/svn/docs/class_goog_fx_Dragger.html
// ...but it works for what I need now

class Dragger {
  final Element _element;
  final core.EventHandle<core.Vector> _dragDeltaHandle;

  core.Coordinate _clientLoc;

  Dragger(this._element) :
    _dragDeltaHandle = new core.EventHandle<core.Vector>() {
    _element.on.mouseDown.add(_onMouseDown);
    window.on.mouseMove.add(_handleMove);
    window.on.mouseUp.add(_endDrag);
    window.on.blur.add(_endDrag);
  }

  core.EventRoot<core.Vector> get dragDelta() => _dragDeltaHandle;

  bool get isDragging() => _clientLoc != null;

  void _onMouseDown(MouseEvent event) {
    assert(!isDragging);
    event.preventDefault();
    _clientLoc = new core.Coordinate(event.clientX, event.clientY);
  }

  void _handleMove(MouseEvent event) {
    if(isDragging) {

      final newLoc = new core.Coordinate(event.clientX, event.clientY);

      final delta = newLoc - _clientLoc;
      _dragDeltaHandle.fireEvent(delta);

      _clientLoc = newLoc;
    }
  }

  void _endDrag(Event event) {
    if(isDragging) {
      _clientLoc = null;
    }
  }
}
