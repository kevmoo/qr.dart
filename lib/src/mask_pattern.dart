enum QrMaskPattern {
  pattern000(_check000),
  pattern001(_check001),
  pattern010(_check010),
  pattern011(_check011),
  pattern100(_check100),
  pattern101(_check101),
  pattern110(_check110),
  pattern111(_check111);

  final bool Function(int i, int j) _check;

  const QrMaskPattern(this._check);

  bool check(int i, int j) => _check(i, j);
}

bool _check000(int i, int j) => (i + j).isEven;
bool _check001(int i, int j) => i.isEven;
bool _check010(int i, int j) => j % 3 == 0;
bool _check011(int i, int j) => (i + j) % 3 == 0;
bool _check100(int i, int j) => ((i ~/ 2) + (j ~/ 3)).isEven;
bool _check101(int i, int j) => ((i * j) % 2 + (i * j) % 3) == 0;
bool _check110(int i, int j) => (((i * j) % 2) + ((i * j) % 3)).isEven;
bool _check111(int i, int j) => (((i * j) % 3) + ((i + j) % 2)).isEven;
