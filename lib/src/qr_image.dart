import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'mask_pattern.dart' as qr_mask_pattern;
import 'qr_code.dart';
import 'util.dart' as qr_util;

/// Renders the encoded data from a [QrCode] in a portable format.
class QrImage {
  static const _pixelUnassigned = 0;
  static const _pixelLight = 1;
  static const _pixelDark = 2;

  final int moduleCount;
  final int typeNumber;
  final int errorCorrectLevel;
  final int maskPattern;

  final Uint8List _data;

  /// Generates a QrImage with the best mask pattern encoding [qrCode].
  factory QrImage(QrCode qrCode) {
    var minLostPoint = 0.0;
    int? bestMaskPattern;
    Uint8List? bestData;

    // Create a template with invariant patterns
    final template = QrImage._template(qrCode);
    final moduleCount = template.moduleCount;
    final dataSize = moduleCount * moduleCount;

    // Try all 8 mask patterns
    for (var i = 0; i < 8; i++) {
      // Copy template
      final data = Uint8List(dataSize)..setRange(0, dataSize, template._data);

      final testImage = QrImage._fromData(qrCode, i, data)
        // Run mapData (variant part)
        .._mapData(qrCode.dataCache, i);

      final lostPoint = _lostPoint(testImage);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        bestMaskPattern = i;
        bestData = data;
      }
    }

    // Re-create the final image with the best mask
    // Reuse bestData and just update the format info to be non-test (real bits)
    final finalImage = QrImage._fromData(qrCode, bestMaskPattern!, bestData!)
      .._setupTypeInfo(bestMaskPattern, false);
    if (finalImage.typeNumber >= 7) {
      finalImage._setupTypeNumber(false);
    }

    return finalImage;
  }

  /// Generates a specific image for the [qrCode] and [maskPattern].
  QrImage.withMaskPattern(QrCode qrCode, this.maskPattern)
    : assert(maskPattern >= 0 && maskPattern <= 7),
      moduleCount = qrCode.moduleCount,
      typeNumber = qrCode.typeNumber,
      errorCorrectLevel = qrCode.errorCorrectLevel,
      _data = Uint8List(qrCode.moduleCount * qrCode.moduleCount) {
    _makeImpl(maskPattern, qrCode.dataCache, false);
  }

  /// Internal constructor for template creation
  QrImage._template(QrCode qrCode)
    : moduleCount = qrCode.moduleCount,
      typeNumber = qrCode.typeNumber,
      errorCorrectLevel = qrCode.errorCorrectLevel,
      maskPattern = 0, // Irrelevant
      _data = Uint8List(qrCode.moduleCount * qrCode.moduleCount) {
    // Setup invariant parts with test=true (reserving space)
    _resetModules();
    _setupPositionProbePattern(0, 0);
    _setupPositionProbePattern(moduleCount - 7, 0);
    _setupPositionProbePattern(0, moduleCount - 7);
    _setupPositionAdjustPattern();
    _setupTimingPattern();
    // Type info and Type number are invariant if test=true (all light)
    _setupTypeInfo(0, true);
    if (typeNumber >= 7) {
      _setupTypeNumber(true);
    }
  }

  /// Internal constructor for testing phase
  QrImage._fromData(QrCode qrCode, this.maskPattern, this._data)
    : moduleCount = qrCode.moduleCount,
      typeNumber = qrCode.typeNumber,
      errorCorrectLevel = qrCode.errorCorrectLevel;

  @visibleForTesting
  List<List<bool?>> get qrModules {
    final list = <List<bool?>>[];
    for (var r = 0; r < moduleCount; r++) {
      final row = List<bool?>.filled(moduleCount, null);
      for (var c = 0; c < moduleCount; c++) {
        final v = _data[r * moduleCount + c];
        row[c] = v == _pixelUnassigned ? null : (v == _pixelDark);
      }
      list.add(row);
    }
    return list;
  }

  void _resetModules() {
    _data.fillRange(0, _data.length, _pixelUnassigned);
  }

  bool isDark(int row, int col) {
    if (row < 0 || moduleCount <= row || col < 0 || moduleCount <= col) {
      throw ArgumentError('$row , $col');
    }
    return _data[row * moduleCount + col] == _pixelDark;
  }

  void _set(int row, int col, bool value) {
    _data[row * moduleCount + col] = value ? _pixelDark : _pixelLight;
  }

  void _makeImpl(int maskPattern, List<int> dataCache, bool test) {
    // If not testing, we do full setup.
    // If testing (template), this method is NOT called directly, but manually in _template.
    // However, withMaskPattern calls this.
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
          _set(row + r, col + c, true);
        } else {
          _set(row + r, col + c, false);
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

        if (_data[row * moduleCount + col] != _pixelUnassigned) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
              _set(row + r, col + c, true);
            } else {
              _set(row + r, col + c, false);
            }
          }
        }
      }
    }
  }

  void _setupTimingPattern() {
    for (var r = 8; r < moduleCount - 8; r++) {
      if (_data[r * moduleCount + 6] != _pixelUnassigned) {
        continue;
      }
      _set(r, 6, r.isEven);
    }

    for (var c = 8; c < moduleCount - 8; c++) {
      if (_data[6 * moduleCount + c] != _pixelUnassigned) {
        continue;
      }
      _set(6, c, c.isEven);
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
        _set(i, 8, mod);
      } else if (i < 8) {
        _set(i + 1, 8, mod);
      } else {
        _set(moduleCount - 15 + i, 8, mod);
      }
    }

    // horizontal
    for (i = 0; i < 15; i++) {
      mod = !test && ((bits >> i) & 1) == 1;

      if (i < 8) {
        _set(8, moduleCount - i - 1, mod);
      } else if (i < 9) {
        _set(8, 15 - i - 1 + 1, mod);
      } else {
        _set(8, 15 - i - 1, mod);
      }
    }

    // fixed module
    _set(moduleCount - 8, 8, !test);
  }

  void _setupTypeNumber(bool test) {
    final bits = qr_util.bchTypeNumber(typeNumber);

    for (var i = 0; i < 18; i++) {
      final mod = !test && ((bits >> i) & 1) == 1;
      _set(i ~/ 3, i % 3 + moduleCount - 8 - 3, mod);
    }

    for (var i = 0; i < 18; i++) {
      final mod = !test && ((bits >> i) & 1) == 1;
      _set(i % 3 + moduleCount - 8 - 3, i ~/ 3, mod);
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
          if (_data[row * moduleCount + (col - c)] == _pixelUnassigned) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >> bitIndex) & 1) == 1;
            }

            final mask = _mask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            _set(row, col - c, dark);
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
  final data = qrImage._data;
  var lostPoint = 0.0;
  int row, col;

  // Level 1: adjacent modules with same color, >5 consecutive
  // Reverting to original implementation which checks 3x3 neighbors
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      final isDark = data[row * moduleCount + col] == QrImage._pixelDark;

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

          final otherIsDark =
              data[(row + r) * moduleCount + (col + c)] == QrImage._pixelDark;

          if (isDark == otherIsDark) {
            sameCount++;
          }
        }
      }

      if (sameCount > 5) {
        lostPoint += 3 + sameCount - 5;
      }
    }
  }

  // Level 2: 2x2 blocks of same color
  for (row = 0; row < moduleCount - 1; row++) {
    for (col = 0; col < moduleCount - 1; col++) {
      final p00 = data[row * moduleCount + col];
      final p01 = data[row * moduleCount + col + 1];
      final p10 = data[(row + 1) * moduleCount + col];
      final p11 = data[(row + 1) * moduleCount + col + 1];

      if (p00 == p01 && p00 == p10 && p00 == p11) {
        lostPoint += 3;
      }
    }
  }

  // Level 3: 1:1:3:1:1 pattern
  // Dark, Light, Dark, Dark, Dark, Light, Dark
  // Pattern: D L D D D L D
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount - 6; col++) {
      final idx = row * moduleCount + col;
      if (data[idx] == QrImage._pixelDark &&
          data[idx + 1] == QrImage._pixelLight &&
          data[idx + 2] == QrImage._pixelDark &&
          data[idx + 3] == QrImage._pixelDark &&
          data[idx + 4] == QrImage._pixelDark &&
          data[idx + 5] == QrImage._pixelLight &&
          data[idx + 6] == QrImage._pixelDark) {
        lostPoint += 40;
      }
    }
  }

  // Check cols
  for (col = 0; col < moduleCount; col++) {
    for (row = 0; row < moduleCount - 6; row++) {
      if (data[row * moduleCount + col] == QrImage._pixelDark &&
          data[(row + 1) * moduleCount + col] == QrImage._pixelLight &&
          data[(row + 2) * moduleCount + col] == QrImage._pixelDark &&
          data[(row + 3) * moduleCount + col] == QrImage._pixelDark &&
          data[(row + 4) * moduleCount + col] == QrImage._pixelDark &&
          data[(row + 5) * moduleCount + col] == QrImage._pixelLight &&
          data[(row + 6) * moduleCount + col] == QrImage._pixelDark) {
        lostPoint += 40;
      }
    }
  }

  // Level 4: Dark ratio
  var darkCount = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i] == QrImage._pixelDark) darkCount++;
  }

  final ratio = (100 * darkCount / moduleCount / moduleCount - 50).abs() / 5;
  lostPoint += ratio * 10;

  return lostPoint;
}
