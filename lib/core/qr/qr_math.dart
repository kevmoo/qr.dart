class QrMath {
  static ReadOnlyCollection _logTable;
  static ReadOnlyCollection _expTable;

  static glog(n) {

    if (n < 1) {
      throw 'glog($n)';
    }

    return LOG_TABLE[n];
  }

  static gexp(n) {

    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return EXP_TABLE[n];
  }

  static get EXP_TABLE() {
    if(_expTable == null) {
      var t = new List(256);
      for (int i = 0; i < 8; i++) {
        t[i] = 1 << i;
      }
      for (int i = 8; i < 256; i++) {
        t[i] = t[i - 4] ^ t[i - 5] ^ t[i - 6] ^ t[i - 8];
      }
      _expTable = new ReadOnlyCollection.wrap(t);
    }
    return _expTable;
  }

  static get LOG_TABLE() {
    if(_logTable == null) {
      var t = new List(256);
      // this was the code I had in pl
      // only to 255? seems really weird
      for (int i = 0; i < 255; i++) {
        t[EXP_TABLE[i]] = i;
      }
      _logTable = new ReadOnlyCollection.wrap(t);
    }
    return _logTable;
  }
}
