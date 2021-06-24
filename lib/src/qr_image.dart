import 'package:meta/meta.dart';

import 'mask_pattern.dart' as qr_mask_pattern;
import 'qr_code.dart';
import 'util.dart' as qr_util;

/// Renders the encoded data from a [QrCode] in a portable format.
class QrImage {
  final int moduleCount;
  final int typeNumber;
  final int errorCorrectLevel;
  final int maskPattern;

  final _modules = <List<bool?>>[];

  /// Generates a QrImage with the best mask pattern encoding [qrCode].
  factory QrImage(QrCode qrCode) {
    var minLostPoint = 0.0;
    QrImage? bestImage;

    for (var i = 0; i < 8; i++) {
      final testImage = QrImage._test(qrCode, i);
      final lostPoint = _lostPoint(testImage);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        bestImage = testImage;
      }
    }

    return QrImage.withMaskPattern(qrCode, bestImage!.maskPattern);
  }

  /// Generates a specific image for the [qrCode] and [maskPattern].
  QrImage.withMaskPattern(QrCode qrCode, this.maskPattern)
      : assert(maskPattern >= 0 && maskPattern <= 7),
        moduleCount = qrCode.moduleCount,
        typeNumber = qrCode.typeNumber,
        errorCorrectLevel = qrCode.errorCorrectLevel {
    _makeImpl(maskPattern, qrCode.dataCache, false);
  }

  QrImage._test(QrCode qrCode, this.maskPattern)
      : moduleCount = qrCode.moduleCount,
        typeNumber = qrCode.typeNumber,
        errorCorrectLevel = qrCode.errorCorrectLevel {
    _makeImpl(maskPattern, qrCode.dataCache, true);
  }

  @visibleForTesting
  List<List<bool?>> get qrModules => _modules;

  void _resetModules() {
    _modules.clear();
    for (var row = 0; row < moduleCount; row++) {
      _modules.add(List<bool?>.filled(moduleCount, null));
    }
  }

  bool isDark(int row, int col) {
    if (row < 0 || moduleCount <= row || col < 0 || moduleCount <= col) {
      throw ArgumentError('$row , $col');
    }
    return _modules[row][col]!;
  }

  void _makeImpl(int maskPattern, List<int> dataCache, bool test) {
    _resetModules();
    _setupPositionProbePattern(0, 0);
    _setupPositionProbePattern(moduleCount - 7, 0);
    _setupPositionProbePattern(0, moduleCount - 7);
    _setupPositionAdjustPattern();
    _setupTimingPattern();
    _setupTypeInfo(maskPattern, test);

    if (typeNumber >= 7) {
      _setupTypeNumber(test);
    }

    _mapData(dataCache, maskPattern);
  }

  void _setupPositionProbePattern(int row, int col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || moduleCount <= col + c) continue;

        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) ||
            (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          _modules[row + r][col + c] = true;
        } else {
          _modules[row + r][col + c] = false;
        }
      }
    }
  }

  void _setupPositionAdjustPattern() {
    final pos = qr_util.patternPosition(typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        final row = pos[i];
        final col = pos[j];

        if (_modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
              _modules[row + r][col + c] = true;
            } else {
              _modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  }

  void _setupTimingPattern() {
    for (var r = 8; r < moduleCount - 8; r++) {
      if (_modules[r][6] != null) {
        continue;
      }
      _modules[r][6] = r.isEven;
    }

    for (var c = 8; c < moduleCount - 8; c++) {
      if (_modules[6][c] != null) {
        continue;
      }
      _modules[6][c] = c.isEven;
    }
  }

  void _setupTypeInfo(int maskPattern, bool test) {
    final data = (errorCorrectLevel << 3) | maskPattern;
    final bits = qr_util.bchTypeInfo(data);

    int i;
    bool mod;

    // vertical
    for (i = 0; i < 15; i++) {
      mod = !test && ((bits >> i) & 1) == 1;

      if (i < 6) {
        _modules[i][8] = mod;
      } else if (i < 8) {
        _modules[i + 1][8] = mod;
      } else {
        _modules[moduleCount - 15 + i][8] = mod;
      }
    }

    // horizontal
    for (i = 0; i < 15; i++) {
      mod = !test && ((bits >> i) & 1) == 1;

      if (i < 8) {
        _modules[8][moduleCount - i - 1] = mod;
      } else if (i < 9) {
        _modules[8][15 - i - 1 + 1] = mod;
      } else {
        _modules[8][15 - i - 1] = mod;
      }
    }

    // fixed module
    _modules[moduleCount - 8][8] = !test;
  }

  void _setupTypeNumber(bool test) {
    final bits = qr_util.bchTypeNumber(typeNumber);

    for (var i = 0; i < 18; i++) {
      final mod = !test && ((bits >> i) & 1) == 1;
      _modules[i ~/ 3][i % 3 + moduleCount - 8 - 3] = mod;
    }

    for (var i = 0; i < 18; i++) {
      final mod = !test && ((bits >> i) & 1) == 1;
      _modules[i % 3 + moduleCount - 8 - 3][i ~/ 3] = mod;
    }
  }

  void _mapData(List<int> data, int maskPattern) {
    var inc = -1;
    var row = moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      for (;;) {
        for (var c = 0; c < 2; c++) {
          if (_modules[row][col - c] == null) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >> bitIndex) & 1) == 1;
            }

            final mask = _mask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            _modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
}

bool _mask(int maskPattern, int i, int j) {
  switch (maskPattern) {
    case qr_mask_pattern.pattern000:
      return (i + j).isEven;
    case qr_mask_pattern.pattern001:
      return i.isEven;
    case qr_mask_pattern.pattern010:
      return j % 3 == 0;
    case qr_mask_pattern.pattern011:
      return (i + j) % 3 == 0;
    case qr_mask_pattern.pattern100:
      return ((i ~/ 2) + (j ~/ 3)).isEven;
    case qr_mask_pattern.pattern101:
      return (i * j) % 2 + (i * j) % 3 == 0;
    case qr_mask_pattern.pattern110:
      return ((i * j) % 2 + (i * j) % 3).isEven;
    case qr_mask_pattern.pattern111:
      return ((i * j) % 3 + (i + j) % 2).isEven;
    default:
      throw ArgumentError('bad maskPattern:$maskPattern');
  }
}

double _lostPoint(QrImage qrImage) {
  final moduleCount = qrImage.moduleCount;

  var lostPoint = 0.0;
  int row, col;

  // LEVEL1
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      final dark = qrImage.isDark(row, col);

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

          if (dark == qrImage.isDark(row + r, col + c)) {
            sameCount++;
          }
        }
      }

      if (sameCount > 5) {
        lostPoint += 3 + sameCount - 5;
      }
    }
  }

  // LEVEL2
  for (row = 0; row < moduleCount - 1; row++) {
    for (col = 0; col < moduleCount - 1; col++) {
      var count = 0;
      if (qrImage.isDark(row, col)) count++;
      if (qrImage.isDark(row + 1, col)) count++;
      if (qrImage.isDark(row, col + 1)) count++;
      if (qrImage.isDark(row + 1, col + 1)) count++;
      if (count == 0 || count == 4) {
        lostPoint += 3;
      }
    }
  }

  // LEVEL3
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount - 6; col++) {
      if (qrImage.isDark(row, col) &&
          !qrImage.isDark(row, col + 1) &&
          qrImage.isDark(row, col + 2) &&
          qrImage.isDark(row, col + 3) &&
          qrImage.isDark(row, col + 4) &&
          !qrImage.isDark(row, col + 5) &&
          qrImage.isDark(row, col + 6)) {
        lostPoint += 40;
      }
    }
  }

  for (col = 0; col < moduleCount; col++) {
    for (row = 0; row < moduleCount - 6; row++) {
      if (qrImage.isDark(row, col) &&
          !qrImage.isDark(row + 1, col) &&
          qrImage.isDark(row + 2, col) &&
          qrImage.isDark(row + 3, col) &&
          qrImage.isDark(row + 4, col) &&
          !qrImage.isDark(row + 5, col) &&
          qrImage.isDark(row + 6, col)) {
        lostPoint += 40;
      }
    }
  }

  // LEVEL4
  var darkCount = 0;

  for (col = 0; col < moduleCount; col++) {
    for (row = 0; row < moduleCount; row++) {
      if (qrImage.isDark(row, col)) {
        darkCount++;
      }
    }
  }

  final ratio = (100 * darkCount / moduleCount / moduleCount - 50).abs() / 5;
  return lostPoint + ratio * 10;
}
