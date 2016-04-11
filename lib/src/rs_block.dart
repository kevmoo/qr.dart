import 'error_correct_level.dart';

class QrRsBlock {
  final int totalCount;
  final int dataCount;

  QrRsBlock(this.totalCount, this.dataCount);

  static List<QrRsBlock> getRSBlocks(int typeNumber, int errorCorrectLevel) {
    final rsBlock = _getRsBlockTable(typeNumber, errorCorrectLevel);

    final int length = rsBlock.length ~/ 3;

    final list = new List<QrRsBlock>();

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
}

List<int> _getRsBlockTable(int typeNumber, int errorCorrectLevel) {
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

const List<List<int>> _rsBlockTable = const [
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
  const [6, 43, 15, 2, 44, 16],

  // 11
  const [4, 101, 81],
  const [1, 80, 50, 4, 81, 51],
  const [4, 50, 22, 4, 51, 23],
  const [3, 36, 12, 8, 37, 13],

  // 12
  const [2, 116, 92, 2, 117, 93],
  const [6, 58, 36, 2, 59, 37],
  const [4, 46, 20, 6, 47, 21],
  const [7, 42, 14, 4, 43, 15],

  // 13
  const [4, 133, 107],
  const [8, 59, 37, 1, 60, 38],
  const [8, 44, 20, 4, 45, 21],
  const [12, 33, 11, 4, 34, 12],

  // 14
  const [3, 145, 115, 1, 146, 116],
  const [4, 64, 40, 5, 65, 41],
  const [11, 36, 16, 5, 37, 17],
  const [11, 36, 12, 5, 37, 13],

  // 15
  const [5, 109, 87, 1, 110, 88],
  const [5, 65, 41, 5, 66, 42],
  const [5, 54, 24, 7, 55, 25],
  const [11, 36, 12],

  // 16
  const [5, 122, 98, 1, 123, 99],
  const [7, 73, 45, 3, 74, 46],
  const [15, 43, 19, 2, 44, 20],
  const [3, 45, 15, 13, 46, 16],

  // 17
  const [1, 135, 107, 5, 136, 108],
  const [10, 74, 46, 1, 75, 47],
  const [1, 50, 22, 15, 51, 23],
  const [2, 42, 14, 17, 43, 15],

  // 18
  const [5, 150, 120, 1, 151, 121],
  const [9, 69, 43, 4, 70, 44],
  const [17, 50, 22, 1, 51, 23],
  const [2, 42, 14, 19, 43, 15],

  // 19
  const [3, 141, 113, 4, 142, 114],
  const [3, 70, 44, 11, 71, 45],
  const [17, 47, 21, 4, 48, 22],
  const [9, 39, 13, 16, 40, 14],

  // 20
  const [3, 135, 107, 5, 136, 108],
  const [3, 67, 41, 13, 68, 42],
  const [15, 54, 24, 5, 55, 25],
  const [15, 43, 15, 10, 44, 16],

  // 21
  const [4, 144, 116, 4, 145, 117],
  const [17, 68, 42],
  const [17, 50, 22, 6, 51, 23],
  const [19, 46, 16, 6, 47, 17],

  // 22
  const [2, 139, 111, 7, 140, 112],
  const [17, 74, 46],
  const [7, 54, 24, 16, 55, 25],
  const [34, 37, 13],

  // 23
  const [4, 151, 121, 5, 152, 122],
  const [4, 75, 47, 14, 76, 48],
  const [11, 54, 24, 14, 55, 25],
  const [16, 45, 15, 14, 46, 16],

  // 24
  const [6, 147, 117, 4, 148, 118],
  const [6, 73, 45, 14, 74, 46],
  const [11, 54, 24, 16, 55, 25],
  const [30, 46, 16, 2, 47, 17],

  // 25
  const [8, 132, 106, 4, 133, 107],
  const [8, 75, 47, 13, 76, 48],
  const [7, 54, 24, 22, 55, 25],
  const [22, 45, 15, 13, 46, 16],

  // 26
  const [10, 142, 114, 2, 143, 115],
  const [19, 74, 46, 4, 75, 47],
  const [28, 50, 22, 6, 51, 23],
  const [33, 46, 16, 4, 47, 17],

  // 27
  const [8, 152, 122, 4, 153, 123],
  const [22, 73, 45, 3, 74, 46],
  const [8, 53, 23, 26, 54, 24],
  const [12, 45, 15, 28, 46, 16],

  // 28
  const [3, 147, 117, 10, 148, 118],
  const [3, 73, 45, 23, 74, 46],
  const [4, 54, 24, 31, 55, 25],
  const [11, 45, 15, 31, 46, 16],

  // 29
  const [7, 146, 116, 7, 147, 117],
  const [21, 73, 45, 7, 74, 46],
  const [1, 53, 23, 37, 54, 24],
  const [19, 45, 15, 26, 46, 16],

  // 30
  const [5, 145, 115, 10, 146, 116],
  const [19, 75, 47, 10, 76, 48],
  const [15, 54, 24, 25, 55, 25],
  const [23, 45, 15, 25, 46, 16],

  // 31
  const [13, 145, 115, 3, 146, 116],
  const [2, 74, 46, 29, 75, 47],
  const [42, 54, 24, 1, 55, 25],
  const [23, 45, 15, 28, 46, 16],

  // 32
  const [17, 145, 115],
  const [10, 74, 46, 23, 75, 47],
  const [10, 54, 24, 35, 55, 25],
  const [19, 45, 15, 35, 46, 16],

  // 33
  const [17, 145, 115, 1, 146, 116],
  const [14, 74, 46, 21, 75, 47],
  const [29, 54, 24, 19, 55, 25],
  const [11, 45, 15, 46, 46, 16],

  // 34
  const [13, 145, 115, 6, 146, 116],
  const [14, 74, 46, 23, 75, 47],
  const [44, 54, 24, 7, 55, 25],
  const [59, 46, 16, 1, 47, 17],

  // 35
  const [12, 151, 121, 7, 152, 122],
  const [12, 75, 47, 26, 76, 48],
  const [39, 54, 24, 14, 55, 25],
  const [22, 45, 15, 41, 46, 16],

  // 36
  const [6, 151, 121, 14, 152, 122],
  const [6, 75, 47, 34, 76, 48],
  const [46, 54, 24, 10, 55, 25],
  const [2, 45, 15, 64, 46, 16],

  // 37
  const [17, 152, 122, 4, 153, 123],
  const [29, 74, 46, 14, 75, 47],
  const [49, 54, 24, 10, 55, 25],
  const [24, 45, 15, 46, 46, 16],

  // 38
  const [4, 152, 122, 18, 153, 123],
  const [13, 74, 46, 32, 75, 47],
  const [48, 54, 24, 14, 55, 25],
  const [42, 45, 15, 32, 46, 16],

  // 39
  const [20, 147, 117, 4, 148, 118],
  const [40, 75, 47, 7, 76, 48],
  const [43, 54, 24, 22, 55, 25],
  const [10, 45, 15, 67, 46, 16],

  // 40
  const [19, 148, 118, 6, 149, 119],
  const [18, 75, 47, 31, 76, 48],
  const [34, 54, 24, 34, 55, 25],
  const [20, 45, 15, 61, 46, 16]
];
