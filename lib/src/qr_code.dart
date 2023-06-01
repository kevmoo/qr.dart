import 'dart:math' as math;
import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'bit_buffer.dart';
import 'byte.dart';
import 'error_correct_level.dart';
import 'input_too_long_exception.dart';
import 'math.dart' as qr_math;
import 'mode.dart' as qr_mode;
import 'polynomial.dart';
import 'rs_block.dart';

class QrCode {
  final int typeNumber;
  final int errorCorrectLevel;
  final int moduleCount;
  List<int>? _dataCache;
  final _dataList = <QrDatum>[];

  QrCode(this.typeNumber, this.errorCorrectLevel)
      : moduleCount = typeNumber * 4 + 17 {
    RangeError.checkValueInInterval(typeNumber, 1, 40, 'typeNumber');
    RangeError.checkValidIndex(
      errorCorrectLevel,
      QrErrorCorrectLevel.levels,
      'errorCorrectLevel',
    );
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
    List<QrDatum> dataList,
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

  void addData(String data) => _addToList(QrByte(data));

  void addByteData(ByteData data) => _addToList(QrByte.fromByteData(data));

  /// Add QR Numeric Mode data from a string of digits.
  ///
  /// It is an error if the [numberString] contains anything other than the
  /// digits 0 through 9.
  void addNumeric(String numberString) =>
      _addToList(QrNumeric.fromString(numberString));

  void addAlphaNumeric(String alphaNumeric) =>
      _addToList(QrAlphaNumeric.fromString(alphaNumeric));

  void _addToList(QrDatum data) {
    _dataList.add(data);
    _dataCache = null;
  }

  @internal
  List<int> get dataCache =>
      _dataCache ??= _createData(typeNumber, errorCorrectLevel, _dataList);
}

const int _pad0 = 0xEC;
const int _pad1 = 0x11;

List<int> _createData(
  int typeNumber,
  int errorCorrectLevel,
  List<QrDatum> dataList,
) {
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
  final bitDataCount = totalDataCount * 8;
  var count = 0;
  for (;;) {
    if (buffer.length >= bitDataCount) {
      break;
    }
    buffer.put((count++).isEven ? _pad0 : _pad1, 8);
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

int _lengthInBits(int mode, int type) {
  if (1 <= type && type < 10) {
    // 1 - 9
    return switch (mode) {
      qr_mode.modeNumber => 10,
      qr_mode.modeAlphaNum => 9,
      qr_mode.mode8bitByte => 8,
      qr_mode.modeKanji => 8,
      _ => throw ArgumentError('mode:$mode')
    };
  } else if (type < 27) {
    // 10 - 26
    return switch (mode) {
      qr_mode.modeNumber => 12,
      qr_mode.modeAlphaNum => 11,
      qr_mode.mode8bitByte => 16,
      qr_mode.modeKanji => 10,
      _ => throw ArgumentError('mode:$mode')
    };
  } else if (type < 41) {
    // 27 - 40
    return switch (mode) {
      qr_mode.modeNumber => 14,
      qr_mode.modeAlphaNum => 13,
      qr_mode.mode8bitByte => 16,
      qr_mode.modeKanji => 12,
      _ => throw ArgumentError('mode:$mode')
    };
  } else {
    throw ArgumentError('type:$type');
  }
}

QrPolynomial _errorCorrectPolynomial(int errorCorrectLength) {
  var a = QrPolynomial([1], 0);

  for (var i = 0; i < errorCorrectLength; i++) {
    a = a.multiply(QrPolynomial([1, qr_math.gexp(i)], 0));
  }

  return a;
}
