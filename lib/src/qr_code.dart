import 'dart:math' as math;

import 'package:meta/meta.dart';

import 'bit_buffer.dart';
import 'byte.dart';
import 'error_correct_level.dart';
import 'input_too_long_exception.dart';
import 'math.dart' as qr_math;
import 'polynomial.dart';
import 'rs_block.dart';
import 'util.dart' as qr_util;

@visibleForTesting
List<List<bool>> qrModules(QrCode qrCode) => qrCode._modules;

class QrCode {
  final int typeNumber;
  final int errorCorrectLevel;
  final int moduleCount;
  final List<List<bool>> _modules;
  List<int> _dataCache;
  final List<QrByte> _dataList = <QrByte>[];

  QrCode(this.typeNumber, this.errorCorrectLevel)
      : moduleCount = typeNumber * 4 + 17,
        _modules = <List<bool>>[] {
    RangeError.checkValueInInterval(typeNumber, 1, 40, 'typeNumber');
    RangeError.checkValidIndex(
        errorCorrectLevel, QrErrorCorrectLevel.levels, 'errorCorrectLevel');

    for (var row = 0; row < moduleCount; row++) {
      _modules.add(List<bool>(moduleCount));
    }
  }

  factory QrCode.fromData(
      {@required String data, @required int errorCorrectLevel}) {
    var typeNumber =
        _calculateTypeNumberFromData(errorCorrectLevel, [QrByte(data)]);
    return QrCode(typeNumber, errorCorrectLevel)..addData(data);
  }

  static int _calculateTypeNumberFromData(
      int errorCorrectLevel, List<QrByte> dataList) {
    int typeNumber;
    for (typeNumber = 1; typeNumber < 40; typeNumber++) {
      var rsBlocks = QrRsBlock.getRSBlocks(typeNumber, errorCorrectLevel);

      var buffer = QrBitBuffer();
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer
          ..put(data.mode, 4)
          ..put(data.length, qr_util.getLengthInBits(data.mode, typeNumber));
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
    return _modules[row][col];
  }

  void addData(String data) {
    var newData = QrByte(data);
    _dataList.add(newData);
    _dataCache = null;
  }

  void make() {
    _makeImpl(false, _getBestMaskPattern());
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

      var lostPoint = qr_util.getLostPoint(this);

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
      _modules[r][6] = r % 2 == 0;
    }

    for (var c = 8; c < moduleCount - 8; c++) {
      if (_modules[6][c] != null) {
        continue;
      }
      _modules[6][c] = c % 2 == 0;
    }
  }

  void _setupPositionAdjustPattern() {
    var pos = qr_util.getPatternPosition(typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];

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
    var bits = qr_util.getBCHTypeNumber(typeNumber);

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
    var data = (errorCorrectLevel << 3) | maskPattern;
    var bits = qr_util.getBCHTypeInfo(data);

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

            var mask = qr_util.getMask(maskPattern, row, col - c);

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

    _mapData(_dataCache, maskPattern);
  }
}

const int _pad0 = 0xEC;
const int _pad1 = 0x11;

List<int> _createData(
    int typeNumber, int errorCorrectLevel, List<QrByte> dataList) {
  var rsBlocks = QrRsBlock.getRSBlocks(typeNumber, errorCorrectLevel);

  final buffer = QrBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer
      ..put(data.mode, 4)
      ..put(data.length, qr_util.getLengthInBits(data.mode, typeNumber));
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

  var dcdata = List<List<int>>(rsBlocks.length);
  var ecdata = List<List<int>>(rsBlocks.length);

  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;

    maxDcCount = math.max(maxDcCount, dcCount);
    maxEcCount = math.max(maxEcCount, ecCount);

    dcdata[r] = qr_math.getByteList(dcCount);

    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.getByte(i + offset);
    }
    offset += dcCount;

    var rsPoly = qr_util.getErrorCorrectPolynomial(ecCount);
    var rawPoly = QrPolynomial(dcdata[r], rsPoly.length - 1);

    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = qr_math.getByteList(rsPoly.length - 1);

    for (var i = 0; i < ecdata[r].length; i++) {
      var modIndex = i + modPoly.length - ecdata[r].length;
      ecdata[r][i] = (modIndex >= 0) ? modPoly[modIndex] : 0;
    }
  }

  var data = <int>[];

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data.add(dcdata[r][i]);
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data.add(ecdata[r][i]);
      }
    }
  }

  return data;
}
