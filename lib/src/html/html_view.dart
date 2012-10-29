part of bot_html;

abstract class HtmlView {
  final DivElement _node;
  bool _dirty;

  HtmlView(this._node) {
    requireArgumentNotNull(this._node, 'node');
    _dirty = true;
  }

  DivElement get node => _node;

  void markDirty() {
    _dirty = true;
  }

  void draw() {
    if(_dirty) {
      updateElement();
      _dirty = false;
    }
  }

  void updateElement();
}
