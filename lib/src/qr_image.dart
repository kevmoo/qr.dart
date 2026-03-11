import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'error_correct_level.dart';
import 'qr_code.dart';
import 'util.dart' as qr_util;

/// Renders the encoded data from a [QrCode] in a portable format.
class QrImage {
  static const _pixelUnassigned = 0;
  static const _pixelLight = 1;
  static const _pixelDark = 2;

  final int moduleCount;
  final int typeNumber;
  final QrErrorCorrectLevel errorCorrectLevel;
  final int maskPattern;

  final Uint8List _data;

  /// Generates a QrImage with the best mask pattern encoding [qrCode].
  factory QrImage(QrCode qrCode) {
    // Create a template with invariant patterns
    final template = QrImage._template(qrCode);
    final moduleCount = template.moduleCount;
    final dataSize = moduleCount * moduleCount;

    // Step 1: Clone template to working buffer and place data (no mask)
    final dataMap = Uint8List(dataSize)..setRange(0, dataSize, template._data);

    // Create a temporary QrImage to use its _mapData method
    // We pass 0 as maskPattern, but we will modify _mapData to NOT mask.
    QrImage._fromData(qrCode, 0, dataMap)._mapData(qrCode.dataCache);

    final workingBuffer = Uint8List(dataSize);
    var minLostPoint = double.maxFinite;
    var bestMaskPattern = 0;
    Uint8List? bestData; // We need to store the best result.

    // Step 2: Try all 8 masks
    for (var i = 0; i < 8; i++) {
      // Copy pre-placed data to working buffer
      workingBuffer.setRange(0, dataSize, dataMap);

      final testImage = QrImage._fromData(qrCode, i, workingBuffer)
        // Apply mask (XOR)
        .._applyMask(i, template._data); // pass int mask

      final lostPoint = _lostPoint(testImage);

      if (lostPoint < minLostPoint) {
        minLostPoint = lostPoint;
        bestMaskPattern = i;
        // Copy working buffer to bestData
        bestData ??= Uint8List(dataSize);
        bestData.setRange(0, dataSize, workingBuffer);
      }
    }

    final finalImage = QrImage._fromData(qrCode, bestMaskPattern, bestData!)
      // Final setup with correct format info (not test, so actual pixels)
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
    if (row < 0 || moduleCount <= row) {
      throw RangeError.range(row, 0, moduleCount - 1, 'row');
    }
    if (col < 0 || moduleCount <= col) {
      throw RangeError.range(col, 0, moduleCount - 1, 'col');
    }
    return _data[row * moduleCount + col] == _pixelDark;
  }

  void _set(int row, int col, bool value) {
    _data[row * moduleCount + col] = value ? _pixelDark : _pixelLight;
  }

  void _makeImpl(int maskPattern, List<int> dataCache, bool test) {
    // If not testing, we do full setup.
    // If testing (template), this method is NOT called directly, but manually
    // in _template.
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
    final data = (errorCorrectLevel.index << 3) | maskPattern;
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

  void _mapData(List<int> data, [int? maskPattern]) {
    var inc = -1;
    var row = moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    final mpIndex = maskPattern;

    for (var col = moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      for (;;) {
        for (var c = 0; c < 2; c++) {
          if (_data[row * moduleCount + (col - c)] == _pixelUnassigned) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >> bitIndex) & 1) == 1;
            }

            final cCol = col - c;
            final mask = switch (mpIndex) {
              0 => (row + cCol).isEven,
              1 => row.isEven,
              2 => cCol % 3 == 0,
              3 => (row + cCol) % 3 == 0,
              4 => ((row ~/ 2) + (cCol ~/ 3)).isEven,
              5 => ((row * cCol) % 2 + (row * cCol) % 3) == 0,
              6 => (((row * cCol) % 2) + ((row * cCol) % 3)).isEven,
              7 => (((row * cCol) % 3) + ((row + cCol) % 2)).isEven,
              _ => false,
            };

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

  void _applyMask(int mpIndex, Uint8List templateData) {
    final maskFunction = switch (mpIndex) {
      0 => (int r, int c) => (r + c).isEven,
      1 => (int r, int c) => r.isEven,
      2 => (int r, int c) => c % 3 == 0,
      3 => (int r, int c) => (r + c) % 3 == 0,
      4 => (int r, int c) => ((r ~/ 2) + (c ~/ 3)).isEven,
      5 => (int r, int c) => ((r * c) % 2 + (r * c) % 3) == 0,
      6 => (int r, int c) => (((r * c) % 2) + ((r * c) % 3)).isEven,
      7 => (int r, int c) => (((r * c) % 3) + ((r + c) % 2)).isEven,
      _ => null,
    };

    if (maskFunction == null) {
      return;
    }

    var idx = 0;
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++, idx++) {
        if (templateData[idx] == _pixelUnassigned && maskFunction(row, col)) {
          _data[idx] ^= _pixelDark ^ _pixelLight;
        }
      }
    }
  }
}

double _lostPoint(QrImage qrImage) {
  final moduleCount = qrImage.moduleCount;
  final data = qrImage._data;
  var lostPoint = 0.0;

  var darkCount = 0;

  for (var row = 0; row < moduleCount; row++) {
    final rowIdx = row * moduleCount;
    for (var col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      final currentIdx = rowIdx + col;
      final p00 = data[currentIdx];

      if (p00 == QrImage._pixelDark) darkCount++;

      // Level 1
      // Check all 8 neighbors
      // Top row
      if (row > 0) {
        final upIdx = currentIdx - moduleCount;
        if (col > 0 && data[upIdx - 1] == p00) sameCount++;
        if (data[upIdx] == p00) sameCount++;
        if (col < moduleCount - 1 && data[upIdx + 1] == p00) sameCount++;
      }

      // Middle row (left/right)
      if (col > 0 && data[currentIdx - 1] == p00) sameCount++;
      if (col < moduleCount - 1 && data[currentIdx + 1] == p00) sameCount++;

      // Bottom row
      if (row < moduleCount - 1) {
        final downIdx = currentIdx + moduleCount;
        if (col > 0 && data[downIdx - 1] == p00) sameCount++;
        if (data[downIdx] == p00) sameCount++;
        if (col < moduleCount - 1 && data[downIdx + 1] == p00) sameCount++;
      }

      if (sameCount > 5) {
        lostPoint += 3 + sameCount - 5;
      }

      // Level 2: 2x2 blocks of same color
      if (row < moduleCount - 1 && col < moduleCount - 1) {
        if (p00 == data[currentIdx + 1] &&
            p00 == data[currentIdx + moduleCount] &&
            p00 == data[currentIdx + moduleCount + 1]) {
          lostPoint += 3;
        }
      }

      // Level 3: 1:1:3:1:1 pattern
      // Dark, Light, Dark, Dark, Dark, Light, Dark
      if (p00 == QrImage._pixelDark) {
        if (col < moduleCount - 6 &&
            data[currentIdx + 1] == QrImage._pixelLight &&
            data[currentIdx + 2] == QrImage._pixelDark &&
            data[currentIdx + 3] == QrImage._pixelDark &&
            data[currentIdx + 4] == QrImage._pixelDark &&
            data[currentIdx + 5] == QrImage._pixelLight &&
            data[currentIdx + 6] == QrImage._pixelDark) {
          lostPoint += 40;
        }
        if (row < moduleCount - 6 &&
            data[currentIdx + moduleCount] == QrImage._pixelLight &&
            data[currentIdx + 2 * moduleCount] == QrImage._pixelDark &&
            data[currentIdx + 3 * moduleCount] == QrImage._pixelDark &&
            data[currentIdx + 4 * moduleCount] == QrImage._pixelDark &&
            data[currentIdx + 5 * moduleCount] == QrImage._pixelLight &&
            data[currentIdx + 6 * moduleCount] == QrImage._pixelDark) {
          lostPoint += 40;
        }
      }
    }
  }

  // Level 4: Dark ratio
  final ratio = (100 * darkCount / moduleCount / moduleCount - 50).abs() / 5;
  return lostPoint + ratio * 10;
}
