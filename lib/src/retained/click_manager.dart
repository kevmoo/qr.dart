// TODO: rename MouseManager or similiar -> doing more than click now
// TODO: implement dispose. Unregister events from Canvas, etc

class ClickManager {
  static final Property<ClickManager> _clickManagerProperty =
      new Property<ClickManager>("_clickManager");

  static final Property<bool> _isClickableProperty =
      new Property<bool>("isClickable", false);

  static final AttachedEvent<ElementMouseEventArgs> _clickEvent =
      new AttachedEvent<ElementMouseEventArgs>('clickEvent');

  static final AttachedEvent<ElementMouseEventArgs> _mouseDownEvent =
      new AttachedEvent<ElementMouseEventArgs>('mouseDown');

  static final AttachedEvent<ElementMouseEventArgs> _mouseUpEvent =
      new AttachedEvent<ElementMouseEventArgs>('mouseUp');

  static final AttachedEvent<ElementMouseEventArgs> _mouseMoveEvent =
      new AttachedEvent<ElementMouseEventArgs>('mouseMove');

  static final AttachedEvent _mouseOutEvent =
      new AttachedEvent('mouseOut');

  final Stage _stage;

  PElement _mouseDownElement;

  factory ClickManager(Stage stage) {
    requireArgumentNotNull(stage, 'stage');

    return _clickManagerProperty.get(stage, (s) {
      return new ClickManager._internal(s);
    });
  }

  ClickManager._internal(this._stage) {
    assert(!_clickManagerProperty.isSet(this._stage));
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

  static GlobalId addHandler(PElement element,
                             Action1<ElementMouseEventArgs> handler) {
    return _clickEvent.addHandler(element, handler);
  }

  static bool removeHandler(PElement obj, GlobalId handlerId) {
    return _clickEvent.removeHandler(obj, handlerId);
  }

  static GlobalId addMouseMoveHandler(PElement obj,
                                      Action1<ElementMouseEventArgs> handler) {
    return _mouseMoveEvent.addHandler(obj, handler);
  }

  static bool removeMouseMoveHandler(PElement obj, GlobalId handlerId) {
    return _mouseMoveEvent.removeHandler(obj, handlerId);
  }

  static GlobalId addMouseUpHandler(PElement obj,
                                      Action1<ElementMouseEventArgs> handler) {
    return _mouseUpEvent.addHandler(obj, handler);
  }

  static bool removeMouseUpHandler(PElement obj, GlobalId handlerId) {
    return _mouseUpEvent.removeHandler(obj, handlerId);
  }

  static GlobalId addMouseDownHandler(PElement obj,
                                      Action1<ElementMouseEventArgs> handler) {
    return _mouseDownEvent.addHandler(obj, handler);
  }

  static bool removeMouseDownHandler(PElement obj, GlobalId handlerId) {
    return _mouseDownEvent.removeHandler(obj, handlerId);
  }

  static GlobalId addMouseOutHandler(Stage obj,
                                     Action1<ElementMouseEventArgs> handler) {
    return _mouseOutEvent.addHandler(obj, handler);
  }

  static bool removeMouseOutHandler(Stage obj, GlobalId handlerId) {
    return _mouseOutEvent.removeHandler(obj, handlerId);
  }

  void _mouseMove(MouseEvent e) {
    final items = _updateMouseLocation(getMouseEventCoordinate(e));
    if(items.length > 0) {
      final args = new ElementMouseEventArgs(items[0], e);
      items.forEach((e) => _mouseMoveEvent.fireEvent(e, args));
    }
  }

  void _mouseOut(MouseEvent e) {
    _updateMouseLocation(null);
    _mouseOutEvent.fireEvent(_stage, EventArgs.empty);
  }

  void _mouseUp(MouseEvent e) {
    // TODO: this does not handle the case where:
    //       1) the mouse left the element
    //       2) mouse up
    //       3) mouse down (outside the element)
    //       4) mouse up on the down element
    //       Weird edge case, but important for comeletness :-/
    //       Mouse capture anyone?

    final hits = _updateMouseLocation(getMouseEventCoordinate(e));
    final upElement = $(hits).firstOrDefault((e) {
      return _isClickableProperty.get(e);
    });

    if(upElement != null) {
      _doMouseUp(upElement, e);

      // handle click
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
    if(_mouseDownElement != null) {
      _doMouseDown(_mouseDownElement, e);
    }
  }

  List<PElement> _updateMouseLocation(Coordinate value) {
    return Mouse.markMouseOver(_stage, value);
  }

  void _doMouseDown(PElement element, MouseEvent e) {
    assert(element != null);
    final args = new ElementMouseEventArgs(element, e);
    _mouseDownEvent.fireEvent(element, args);
  }

  void _doMouseUp(PElement element, MouseEvent e) {
    assert(element != null);
    final args = new ElementMouseEventArgs(element, e);
    _mouseUpEvent.fireEvent(element, args);
  }

  void _doClick(PElement element, MouseEvent e) {
    assert(element != null);
    final args = new ElementMouseEventArgs(element, e);
    _clickEvent.fireEvent(element, args);
  }
}
