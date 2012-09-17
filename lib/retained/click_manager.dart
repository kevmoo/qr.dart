class ClickManager {
  static final Property<bool> _isClickableProperty =
      new Property<bool>("isClickable", false);

  static final AttachedEvent<ElementMouseEventArgs> _clickEvent =
      new AttachedEvent<ElementMouseEventArgs>('clickEvent');

  final Stage _stage;

  PElement _mouseDownElement;

  ClickManager(this._stage) {
    // TODO: attached property to make sure this is the only CM for this stage
    assert(_stage != null);

    _stage._canvas.on.mouseMove.add(_mouseMove);
    _stage._canvas.on.mouseOut.add(_mouseOut);
    _stage._canvas.on.mouseUp.add(_mouseUp);
    _stage._canvas.on.mouseDown.add(_mouseDown);
  }

  static void setClickable(PElement element, bool value) {
    assert(element != null);
    assert(value != null);
    if(value) {
      _isClickableProperty.set(element, true);
    } else {
      _isClickableProperty.clear(element);
    }
  }

  static bool getClickable(PElement element) {
    assert(element != null);
    return _isClickableProperty.get(element);
  }

  static GlobalId addHandler(PElement element, Action1 handler) {
    return _clickEvent.addHandler(element, handler);
  }

  static bool removeHandler(PElement obj, GlobalId handlerId) {
    return _clickEvent.removeHandler(obj, handlerId);
  }

  void _mouseMove(MouseEvent e) {
    var foo = _updateMouseLocation(getMouseEventCoordinate(e));
    print(foo);
  }

  void _mouseOut(MouseEvent e) {
    _updateMouseLocation(null);
  }

  void _mouseUp(MouseEvent e) {
    // TODO: this does not handle the case where:
    //       1) the mouse left the element
    //       2) mouse up
    //       3) mouse down (outside the element)
    //       4) mouse up on the down element
    //       Weird edge case, but important for comeletness :-/
    //       Mouse capture anyone?

    if(_mouseDownElement != null) {
      final hits = _updateMouseLocation(getMouseEventCoordinate(e));
      final upElement = $(hits).firstOrDefault((e) {
        return _isClickableProperty.get(e);
      });
      if(upElement == _mouseDownElement) {
        _doClick(upElement, e);
      }
      _mouseDownElement = null;
    }
  }

  void _mouseDown(MouseEvent e) {
    final coord = getMouseEventCoordinate(e);
    final hits = _updateMouseLocation(coord);
    _mouseDownElement = $(hits).firstOrDefault((e) {
      return _isClickableProperty.get(e);
    });
  }

  List<PElement> _updateMouseLocation(Coordinate value) {
    return Mouse.markMouseOver(_stage, value);
  }

  void _doClick(PElement element, MouseEvent e) {
    assert(element != null);
    final args = new ElementMouseEventArgs(element, e);
    _clickEvent.fireEvent(element, args);
  }
}
