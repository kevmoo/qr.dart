library qr.util;

import 'mask_pattern.dart' as QrMaskPattern;
import 'math.dart' as QrMath;
import 'mode.dart' as QrMode;
import 'polynomial.dart';
import 'qr_code.dart';

const List<List<int>> _PATTERN_POSITION_TABLE = const [
  const [],
  const [6, 18],
  const [6, 22],
  const [6, 26],
  const [6, 30],
  const [6, 34],
  const [6, 22, 38],
  const [6, 24, 42],
  const [6, 26, 46],
  const [6, 28, 50],
  const [6, 30, 54],
  const [6, 32, 58],
  const [6, 34, 62],
  const [6, 26, 46, 66],
  const [6, 26, 48, 70],
  const [6, 26, 50, 74],
  const [6, 30, 54, 78],
  const [6, 30, 56, 82],
  const [6, 30, 58, 86],
  const [6, 34, 62, 90],
  const [6, 28, 50, 72, 94],
  const [6, 26, 50, 74, 98],
  const [6, 30, 54, 78, 102],
  const [6, 28, 54, 80, 106],
  const [6, 32, 58, 84, 110],
  const [6, 30, 58, 86, 114],
  const [6, 34, 62, 90, 118],
  const [6, 26, 50, 74, 98, 122],
  const [6, 30, 54, 78, 102, 126],
  const [6, 26, 52, 78, 104, 130],
  const [6, 30, 56, 82, 108, 134],
  const [6, 34, 60, 86, 112, 138],
  const [6, 30, 58, 86, 114, 142],
  const [6, 34, 62, 90, 118, 146],
  const [6, 30, 54, 78, 102, 126, 150],
  const [6, 24, 50, 76, 102, 128, 154],
  const [6, 28, 54, 80, 106, 132, 158],
  const [6, 32, 58, 84, 110, 136, 162],
  const [6, 26, 54, 82, 110, 138, 166],
  const [6, 30, 58, 86, 114, 142, 170]
];

const int G15 =
    (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
const int G18 = (1 << 12) |
    (1 << 11) |
    (1 << 10) |
    (1 << 9) |
    (1 << 8) |
    (1 << 5) |
    (1 << 2) |
    (1 << 0);
const int G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

int getBCHTypeInfo(int data) {
  var d = data << 10;
  while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
    d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)));
  }
  return ((data << 10) | d) ^ G15_MASK;
}

int getBCHTypeNumber(int data) {
  var d = data << 12;
  while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
    d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)));
  }
  return (data << 12) | d;
}

int getBCHDigit(int data) {
  var digit = 0;

  while (data != 0) {
    digit++;
    data >>= 1;
  }

  return digit;
}

List<int> getPatternPosition(int typeNumber) =>
    _PATTERN_POSITION_TABLE[typeNumber - 1];

bool getMask(int maskPattern, int i, int j) {
  switch (maskPattern) {
    case QrMaskPattern.PATTERN000:
      return (i + j) % 2 == 0;
    case QrMaskPattern.PATTERN001:
      return i % 2 == 0;
    case QrMaskPattern.PATTERN010:
      return j % 3 == 0;
    case QrMaskPattern.PATTERN011:
      return (i + j) % 3 == 0;
    case QrMaskPattern.PATTERN100:
      return ((i ~/ 2) + (j ~/ 3)) % 2 == 0;
    case QrMaskPattern.PATTERN101:
      return (i * j) % 2 + (i * j) % 3 == 0;
    case QrMaskPattern.PATTERN110:
      return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
    case QrMaskPattern.PATTERN111:
      return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
    default:
      throw 'bad maskPattern:$maskPattern';
  }
}

QrPolynomial getErrorCorrectPolynomial(int errorCorrectLength) {
  var a = new QrPolynomial([1], 0);

  for (var i = 0; i < errorCorrectLength; i++) {
    a = a.multiply(new QrPolynomial([1, QrMath.gexp(i)], 0));
  }

  return a;
}

int getLengthInBits(int mode, int type) {
  if (1 <= type && type < 10) {
    // 1 - 9
    switch (mode) {
      case QrMode.MODE_NUMBER:
        return 10;
      case QrMode.MODE_ALPHA_NUM:
        return 9;
      case QrMode.MODE_8BIT_BYTE:
        return 8;
      case QrMode.MODE_KANJI:
        return 8;
      default:
        throw 'mode:$mode';
    }
  } else if (type < 27) {
    // 10 - 26
    switch (mode) {
      case QrMode.MODE_NUMBER:
        return 12;
      case QrMode.MODE_ALPHA_NUM:
        return 11;
      case QrMode.MODE_8BIT_BYTE:
        return 16;
      case QrMode.MODE_KANJI:
        return 10;
      default:
        throw 'mode:$mode';
    }
  } else if (type < 41) {
    // 27 - 40
    switch (mode) {
      case QrMode.MODE_NUMBER:
        return 14;
      case QrMode.MODE_ALPHA_NUM:
        return 13;
      case QrMode.MODE_8BIT_BYTE:
        return 16;
      case QrMode.MODE_KANJI:
        return 12;
      default:
        throw 'mode:$mode';
    }
  } else {
    throw 'type:$type';
  }
}

num getLostPoint(QrCode qrCode) {
  var moduleCount = qrCode.moduleCount;

  var lostPoint = 0.0;
  int row, col;

  // LEVEL1
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      var dark = qrCode.isDark(row, col);

      for (var r = -1; r <= 1; r++) {
        if (row + r < 0 || moduleCount <= row + r) {
          continue;
        }

        for (var c = -1; c <= 1; c++) {
          if (col + c < 0 || moduleCount <= col + c) {
            continue;
          }

          if (r == 0 && c == 0) {
            continue;
          }

          if (dark == qrCode.isDark(row + r, col + c)) {
            sameCount++;
          }
        }
      }

      if (sameCount > 5) {
        lostPoint += (3 + sameCount - 5);
      }
    }
  }

  // LEVEL2
  for (row = 0; row < moduleCount - 1; row++) {
    for (col = 0; col < moduleCount - 1; col++) {
      var count = 0;
      if (qrCode.isDark(row, col)) count++;
      if (qrCode.isDark(row + 1, col)) count++;
      if (qrCode.isDark(row, col + 1)) count++;
      if (qrCode.isDark(row + 1, col + 1)) count++;
      if (count == 0 || count == 4) {
        lostPoint += 3;
      }
    }
  }

  // LEVEL3
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount - 6; col++) {
      if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
        lostPoint += 40;
      }
    }
  }

  for (col = 0; col < moduleCount; col++) {
    for (row = 0; row < moduleCount - 6; row++) {
      if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
        lostPoint += 40;
      }
    }
  }

  // LEVEL4
  var darkCount = 0;

  for (col = 0; col < moduleCount; col++) {
    for (row = 0; row < moduleCount; row++) {
      if (qrCode.isDark(row, col)) {
        darkCount++;
      }
    }
  }

  var ratio = (100 * darkCount / moduleCount / moduleCount - 50).abs() / 5;
  lostPoint += ratio * 10;

  return lostPoint;
}
