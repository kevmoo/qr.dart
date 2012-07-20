goog.provide('qr.RSBlock');

/**
 @constructor
 */
qr.RSBlock = function(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
};

qr.RSBlock.RS_BLOCK_TABLE = [

// L
// M
// Q
// H
// 1
[1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

// 2
[1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

// 3
[1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

// 4
[1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

// 5
[1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

// 6
[2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

// 7
[2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

// 8
[2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

// 9
[2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

// 10
[2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16]

];

qr.RSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {

  var rsBlock = qr.RSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

  if (rsBlock == undefined) {
    throw new Error('bad rs block @ typeNumber:' + typeNumber + '/errorCorrectLevel:' + errorCorrectLevel);
  }

  var length = rsBlock.length / 3;

  var list = {
    length: 0
  };

  for (var i = 0; i < length; i++) {

    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount = rsBlock[i * 3 + 2];

    for (var j = 0; j < count; j++) {
      list[list.length++] = new qr.RSBlock(totalCount, dataCount);
    }
  }

  return list;
};

qr.RSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

  switch (errorCorrectLevel) {
  case qr.ErrorCorrectLevel.L:
    return qr.RSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
  case qr.ErrorCorrectLevel.M:
    return qr.RSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
  case qr.ErrorCorrectLevel.Q:
    return qr.RSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
  case qr.ErrorCorrectLevel.H:
    return qr.RSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
  default:
    return undefined;
  }
};
