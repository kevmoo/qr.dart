import 'dart:math' as math;
import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'bit_buffer.dart';
import 'byte.dart';
import 'error_correct_level.dart';
import 'input_too_long_exception.dart';
import 'mask_pattern.dart' as qr_mask_pattern;
import 'math.dart' as qr_math;
import 'mode.dart' as qr_mode;
import 'polynomial.dart';
import 'rs_block.dart';
import 'util.dart' as qr_util;

@visibleForTesting
List<List<bool?>> qrModules(QrCode qrCode) => qrCode._modules;

class QrCode {
  final int typeNumber;
  final int errorCorrectLevel;
  final int moduleCount;
  final List<List<bool?>> _modules;
  List<int>? _dataCache;
  final List<QrByte> _dataList = <QrByte>[];

  QrCode(this.typeNumber, this.errorCorrectLevel)
      : moduleCount = typeNumber * 4 + 17,
        _modules = <List<bool?>>[] {
    RangeError.checkValueInInterval(typeNumber, 1, 40, 'typeNumber');
    RangeError.checkValidIndex(
        errorCorrectLevel, QrErrorCorrectLevel.levels, 'errorCorrectLevel');

    for (var row = 0; row < moduleCount; row++) {
      _modules.add(List<bool?>.filled(moduleCount, null));
    }
  }

  factory QrCode.fromData({
    required String data,
    required int errorCorrectLevel,
  }) {
    final typeNumber = _calculateTypeNumberFromData(
      errorCorrectLevel,
      [QrByte(data)],
    );
    return QrCode(typeNumber, errorCorrectLevel)..addData(data);
  }

  factory QrCode.fromUint8List({
    required Uint8List data,
    required int errorCorrectLevel,
  }) {
    final typeNumber = _calculateTypeNumberFromData(
      errorCorrectLevel,
      [QrByte.fromUint8List(data)],
    );
    return QrCode(typeNumber, errorCorrectLevel)
      .._addToList(QrByte.fromUint8List(data));
  }

  static int _calculateTypeNumberFromData(
    int errorCorrectLevel,
    List<QrByte> dataList,
  ) {
    int typeNumber;
    for (typeNumber = 1; typeNumber < 40; typeNumber++) {
      final rsBlocks = QrRsBlock.getRSBlocks(typeNumber, errorCorrectLevel);

      final buffer = QrBitBuffer();
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      for (var i = 0; i < dataList.length; i++) {
        final data = dataList[i];
        buffer
          ..put(data.mode, 4)
          ..put(data.length, _lengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      if (buffer.length <= totalDataCount * 8) break;
    }
    return typeNumber;
  }

  bool isDark(int row, int col) {
    if (row < 0 || moduleCount <= row || col < 0 || moduleCount <= col) {
      throw ArgumentError('$row , $col');
    }
    return _modules[row][col]!;
  }

  void addData(String data) => _addToList(QrByte(data));

  void addByteData(ByteData data) => _addToList(QrByte.fromByteData(data));

  void _addToList(QrByte data) {
    _dataList.add(data);
    _dataCache = null;
  }

  void make([int? maskPattern]) {
    assert(maskPattern == null || (maskPattern >= 0 && maskPattern <= 7));
    _makeImpl(false, maskPattern ?? _getBestMaskPattern());
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

  int _getBestMaskPattern() {
    var minLostPoint = 0.0;
    var pattern = 0;

    for (var i = 0; i < 8; i++) {
      _makeImpl(true, i);

      final lostPoint = _lostPoint(this);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
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

  void _setupTypeInfo(bool test, int maskPattern) {
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

  void _makeImpl(bool test, int maskPattern) {
    _setupPositionProbePattern(0, 0);
    _setupPositionProbePattern(moduleCount - 7, 0);
    _setupPositionProbePattern(0, moduleCount - 7);
    _setupPositionAdjustPattern();
    _setupTimingPattern();
    _setupTypeInfo(test, maskPattern);

    if (typeNumber >= 7) {
      _setupTypeNumber(test);
    }

    _dataCache ??= _createData(typeNumber, errorCorrectLevel, _dataList);

    _mapData(_dataCache!, maskPattern);
  }
}

const int _pad0 = 0xEC;
const int _pad1 = 0x11;

List<int> _createData(
    int typeNumber, int errorCorrectLevel, List<QrByte> dataList) {
  final rsBlocks = QrRsBlock.getRSBlocks(typeNumber, errorCorrectLevel);

  final buffer = QrBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    final data = dataList[i];
    buffer
      ..put(data.mode, 4)
      ..put(data.length, _lengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }

  // HUH?
  // ç≈ëÂÉfÅ[É^êîÇåvéZ
  var totalDataCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }

  final totalByteCount = totalDataCount * 8;
  if (buffer.length > totalByteCount) {
    throw InputTooLongException(buffer.length, totalByteCount);
  }

  // HUH?
  // èIí[ÉRÅ[Éh
  if (buffer.length + 4 <= totalByteCount) {
    buffer.put(0, 4);
  }

  // padding
  while (buffer.length % 8 != 0) {
    buffer.putBit(false);
  }

  // padding
  for (;;) {
    if (buffer.length >= totalDataCount * 8) {
      break;
    }
    buffer.put(_pad0, 8);

    // Bug!
    // ignore: invariant_booleans
    if (buffer.length >= totalDataCount * 8) {
      break;
    }
    buffer.put(_pad1, 8);
  }

  return _createBytes(buffer, rsBlocks);
}

List<int> _createBytes(QrBitBuffer buffer, List<QrRsBlock> rsBlocks) {
  var offset = 0;

  var maxDcCount = 0;
  var maxEcCount = 0;

  final dcData = List<List<int>?>.filled(rsBlocks.length, null);
  final ecData = List<List<int>?>.filled(rsBlocks.length, null);

  for (var r = 0; r < rsBlocks.length; r++) {
    final dcCount = rsBlocks[r].dataCount;
    final ecCount = rsBlocks[r].totalCount - dcCount;

    maxDcCount = math.max(maxDcCount, dcCount);
    maxEcCount = math.max(maxEcCount, ecCount);

    final dcItem = dcData[r] = Uint8List(dcCount);

    for (var i = 0; i < dcItem.length; i++) {
      dcItem[i] = 0xff & buffer.getByte(i + offset);
    }
    offset += dcCount;

    final rsPoly = _errorCorrectPolynomial(ecCount);
    final rawPoly = QrPolynomial(dcItem, rsPoly.length - 1);

    final modPoly = rawPoly.mod(rsPoly);
    final ecItem = ecData[r] = Uint8List(rsPoly.length - 1);

    for (var i = 0; i < ecItem.length; i++) {
      final modIndex = i + modPoly.length - ecItem.length;
      ecItem[i] = (modIndex >= 0) ? modPoly[modIndex] : 0;
    }
  }

  final data = <int>[];

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcData[r]!.length) {
        data.add(dcData[r]![i]);
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecData[r]!.length) {
        data.add(ecData[r]![i]);
      }
    }
  }

  return data;
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

int _lengthInBits(int mode, int type) {
  if (1 <= type && type < 10) {
    // 1 - 9
    switch (mode) {
      case qr_mode.modeNumber:
        return 10;
      case qr_mode.modeAlphaNum:
        return 9;
      case qr_mode.mode8bitByte:
        return 8;
      case qr_mode.modeKanji:
        return 8;
      default:
        throw ArgumentError('mode:$mode');
    }
  } else if (type < 27) {
    // 10 - 26
    switch (mode) {
      case qr_mode.modeNumber:
        return 12;
      case qr_mode.modeAlphaNum:
        return 11;
      case qr_mode.mode8bitByte:
        return 16;
      case qr_mode.modeKanji:
        return 10;
      default:
        throw ArgumentError('mode:$mode');
    }
  } else if (type < 41) {
    // 27 - 40
    switch (mode) {
      case qr_mode.modeNumber:
        return 14;
      case qr_mode.modeAlphaNum:
        return 13;
      case qr_mode.mode8bitByte:
        return 16;
      case qr_mode.modeKanji:
        return 12;
      default:
        throw ArgumentError('mode:$mode');
    }
  } else {
    throw ArgumentError('type:$type');
  }
}

double _lostPoint(QrCode qrCode) {
  final moduleCount = qrCode.moduleCount;

  var lostPoint = 0.0;
  int row, col;

  // LEVEL1
  for (row = 0; row < moduleCount; row++) {
    for (col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      final dark = qrCode.isDark(row, col);

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
        lostPoint += 3 + sameCount - 5;
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

  final ratio = (100 * darkCount / moduleCount / moduleCount - 50).abs() / 5;
  return lostPoint + ratio * 10;
}

QrPolynomial _errorCorrectPolynomial(int errorCorrectLength) {
  var a = QrPolynomial([1], 0);

  for (var i = 0; i < errorCorrectLength; i++) {
    a = a.multiply(QrPolynomial([1, qr_math.gexp(i)], 0));
  }

  return a;
}
