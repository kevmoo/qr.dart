class gEventTarget extends Disposable {
  void dispatchEvent(e){
    ROOT_dispatchEvent(this, e);
  }
}
