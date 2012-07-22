class QrRsBlock {
  final int totalCount;
  final int dataCount;

  QrRsBlock(this.totalCount, this.dataCount);

  static List<QrRsBlock> getRSBlocks(int typeNumber, int errorCorrectLevel) {

    var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);

    var length = rsBlock.length / 3;

    var list = new List<QrRsBlock>();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.add(new QrRsBlock(totalCount, dataCount));
      }
    }

    return list;
  }

  static getRsBlockTable(int typeNumber, int errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QrErrorCorrectLevel.L:
      return _rsBlockTable[(typeNumber - 1) * 4 + 0];
      case QrErrorCorrectLevel.M:
      return _rsBlockTable[(typeNumber - 1) * 4 + 1];
      case QrErrorCorrectLevel.Q:
      return _rsBlockTable[(typeNumber - 1) * 4 + 2];
      case QrErrorCorrectLevel.H:
      return _rsBlockTable[(typeNumber - 1) * 4 + 3];
      default:
      throw 'bad rs block @ typeNumber: $typeNumber/errorCorrectLevel:$errorCorrectLevel';
    }
  }

  static List<List<int>> _rsBlockTable = const [
    // L
    // M
    // Q
    // H
    // 1
    const [1, 26, 19],
    const [1, 26, 16],
    const [1, 26, 13],
    const [1, 26, 9],

    // 2
    const [1, 44, 34],
    const [1, 44, 28],
    const [1, 44, 22],
    const [1, 44, 16],

    // 3
    const [1, 70, 55],
    const [1, 70, 44],
    const [2, 35, 17],
    const [2, 35, 13],

    // 4
    const [1, 100, 80],
    const [2, 50, 32],
    const [2, 50, 24],
    const [4, 25, 9],

    // 5
    const [1, 134, 108],
    const [2, 67, 43],
    const [2, 33, 15, 2, 34, 16],
    const [2, 33, 11, 2, 34, 12],

    // 6
    const [2, 86, 68],
    const [4, 43, 27],
    const [4, 43, 19],
    const [4, 43, 15],

    // 7
    const [2, 98, 78],
    const [4, 49, 31],
    const [2, 32, 14, 4, 33, 15],
    const [4, 39, 13, 1, 40, 14],

    // 8
    const [2, 121, 97],
    const [2, 60, 38, 2, 61, 39],
    const [4, 40, 18, 2, 41, 19],
    const [4, 40, 14, 2, 41, 15],

    // 9
    const [2, 146, 116],
    const [3, 58, 36, 2, 59, 37],
    const [4, 36, 16, 4, 37, 17],
    const [4, 36, 12, 4, 37, 13],

    // 10
    const [2, 86, 68, 2, 87, 69],
    const [4, 69, 43, 1, 70, 44],
    const [6, 43, 19, 2, 44, 20],
    const [6, 43, 15, 2, 44, 16]
  ];
}
