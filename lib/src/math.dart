import 'dart:typed_data';

final Uint8List _logTable = _createLogTable();
final Uint8List _expTable = _createExpTable();

Uint8List getByteList(int count) => Uint8List(count);

int glog(int n) {
  if (n < 1) {
    throw ArgumentError('glog($n)');
  }

  return _logTable[n];
}

int gexp(int n) {
  while (n < 0) {
    n += 255;
  }

  while (n >= 256) {
    n -= 255;
  }

  return _expTable[n];
}

Uint8List _createExpTable() {
  var list = getByteList(256);
  for (var i = 0; i < 8; i++) {
    list[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    list[i] = list[i - 4] ^ list[i - 5] ^ list[i - 6] ^ list[i - 8];
  }
  return list;
}

Uint8List _createLogTable() {
  var list = getByteList(256);
  for (var i = 0; i < 255; i++) {
    list[_expTable[i]] = i;
  }
  return list;
}
