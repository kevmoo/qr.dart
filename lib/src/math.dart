import 'dart:typed_data';

final Uint8List _logTable = _createLogTable();
final Uint8List _expTable = _createExpTable();

int glog(int n) => (n > 0) ? _logTable[n] : throw ArgumentError('glog($n)');

int gexp(int n) => _expTable[n % 255];

Uint8List _createExpTable() => Uint8List.fromList(_createExpIter().toList());
Iterable<int> _createExpIter() sync* {
  var value = 1, _ = 256;
  while (0 < _--) {
    yield value;
    value <<= 1;
    if (value > 0xFE) {
      value ^= 0x1D;
    }
    value %= 256;
  }
}

Uint8List _createLogTable() {
  final list = List.filled(256, 0);
  var i = 0;
  for (var element in _expTable) {
    list[element] = i++;
  }
  return Uint8List.fromList(list);
}
