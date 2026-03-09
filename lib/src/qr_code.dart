import 'dart:math' as math;
import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'bit_buffer.dart';
import 'byte.dart';
import 'eci.dart';
import 'error_correct_level.dart';
import 'input_too_long_exception.dart';
import 'math.dart' as qr_math;

import 'polynomial.dart';
import 'rs_block.dart';
import 'validation_result.dart';

class QrCode {
  final int typeNumber;
  final QrErrorCorrectLevel errorCorrectLevel;
  final int moduleCount;
  List<int>? _dataCache;
  final _dataList = <QrDatum>[];

  QrCode(this.typeNumber, this.errorCorrectLevel)
    : moduleCount = typeNumber * 4 + 17 {
    // The typeNumber is now calculated internally by the factories,
    // so this check is only needed if QrCode is instantiated directly.
    // However, the factories ensure a valid typeNumber is passed.
    // Keeping it for direct instantiation safety.
    RangeError.checkValueInInterval(typeNumber, 1, 40, 'typeNumber');
  }

  factory QrCode.fromData({
    required String data,
    required QrErrorCorrectLevel errorCorrectLevel,
  }) {
    final datumList = QrDatum.toDatums(data);

    final typeNumber = _calculateTypeNumberFromData(
      errorCorrectLevel,
      datumList,
    );

    final qrCode = QrCode(typeNumber, errorCorrectLevel);
    for (final datum in datumList) {
      qrCode._addToList(datum);
    }
    return qrCode;
  }

  factory QrCode.fromUint8List({
    required Uint8List data,
    required QrErrorCorrectLevel errorCorrectLevel,
  }) {
    final datum = QrByte.fromUint8List(data);
    final typeNumber = _calculateTypeNumberFromData(errorCorrectLevel, [datum]);
    return QrCode(typeNumber, errorCorrectLevel).._addToList(datum);
  }

  static QrValidationResult fromDataAndValidation({
    required String data,
    required int typeNumber,
    required QrErrorCorrectLevel errorCorrectLevel,
  }) {
    final datumList = QrDatum.toDatums(data);

    int calculateRequiredBits(int type) {
      var bits = 0;
      for (final datum in datumList) {
        bits += 4 + datum.mode.getLengthBits(type) + datum.bitLength;
      }
      return bits;
    }

    // Required bits only changes at types 10 and 27.
    final requiredBitsFor1 = calculateRequiredBits(1);
    final requiredBitsFor10 = calculateRequiredBits(10);
    final requiredBitsFor27 = calculateRequiredBits(27);

    int getRequiredBits(int type) {
      if (type < 10) return requiredBitsFor1;
      if (type < 27) return requiredBitsFor10;
      return requiredBitsFor27;
    }

    // 1. Validate Types
    final validTypes = <int>[];
    for (var type = 1; type <= 40; type++) {
      final required = getRequiredBits(type);
      final capacity = _calculateTotalDataBits(type, errorCorrectLevel);
      if (required <= capacity) {
        // Found minType, all subsequent types are also valid.
        for (var t = type; t <= 40; t++) {
          validTypes.add(t);
        }
        break;
      }
    }

    // 2. Validate Error Levels
    final validErrorLevels = <QrErrorCorrectLevel>[];
    for (final level in QrErrorCorrectLevel.values) {
      final requiredForType = getRequiredBits(typeNumber);
      final capacity = _calculateTotalDataBits(typeNumber, level);
      if (requiredForType <= capacity) {
        validErrorLevels.add(level);
      }
    }

    // 3. Generate Code if valid
    QrCode? code;
    if (validTypes.contains(typeNumber) &&
        validErrorLevels.contains(errorCorrectLevel)) {
      code = QrCode(typeNumber, errorCorrectLevel);
      for (final datum in datumList) {
        code._addToList(datum);
      }
    }

    return QrValidationResult(
      qrCode: code,
      validTypeNumbers: validTypes,
      validErrorCorrectLevels: validErrorLevels,
    );
  }

  static int _calculateTotalDataBits(
    int typeNumber,
    QrErrorCorrectLevel errorCorrectLevel,
  ) => QrRsBlock.getTotalDataBits(typeNumber, errorCorrectLevel);

  static int _calculateTypeNumberFromData(
    QrErrorCorrectLevel errorCorrectLevel,
    List<QrDatum> data,
  ) {
    int getRequiredBits(int typeNumber) {
      var bits = 0;
      for (final datum in data) {
        bits += 4 + datum.mode.getLengthBits(typeNumber) + datum.bitLength;
      }
      return bits;
    }

    // Required bits only changes at types 10 and 27.
    final requiredBitsFor1 = getRequiredBits(1);
    final requiredBitsFor10 = getRequiredBits(10);
    final requiredBitsFor27 = getRequiredBits(27);

    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      final totalDataBits = _calculateTotalDataBits(
        typeNumber,
        errorCorrectLevel,
      );

      final int requiredBits;
      if (typeNumber < 10) {
        requiredBits = requiredBitsFor1;
      } else if (typeNumber < 27) {
        requiredBits = requiredBitsFor10;
      } else {
        requiredBits = requiredBitsFor27;
      }

      if (requiredBits <= totalDataBits) return typeNumber;
    }

    final maxBits = _calculateTotalDataBits(40, errorCorrectLevel);
    throw InputTooLongException(requiredBitsFor27, maxBits);
  }

  void addData(String data) {
    for (final datum in QrDatum.toDatums(data)) {
      _addToList(datum);
    }
  }

  void addByteData(ByteData data) => _addToList(QrByte.fromByteData(data));

  /// Add QR Numeric Mode data from a string of digits.
  ///
  /// It is an error if the [numberString] contains anything other than the
  /// digits 0 through 9.
  void addNumeric(String numberString) =>
      _addToList(QrNumeric.fromString(numberString));

  void addAlphaNumeric(String alphaNumeric) =>
      _addToList(QrAlphaNumeric.fromString(alphaNumeric));

  void addECI(int eciValue) => _addToList(QrEci(eciValue));

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
  QrErrorCorrectLevel errorCorrectLevel,
  List<QrDatum> dataList,
) {
  final rsBlocks = QrRsBlock.getRSBlocks(typeNumber, errorCorrectLevel);

  // Calculate maximum data bits
  var totalDataBits = 0;
  for (var rsBlock in rsBlocks) {
    totalDataBits += rsBlock.dataCount * 8;
  }

  final buffer = QrBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    final data = dataList[i];
    buffer
      ..put(data.mode.value, 4)
      ..put(data.length, data.mode.getLengthBits(typeNumber));
    data.write(buffer);
  }

  if (buffer.length > totalDataBits) {
    throw InputTooLongException(buffer.length, totalDataBits);
  }

  // Terminator code
  if (buffer.length + 4 <= totalDataBits) {
    buffer.put(0, 4);
  }

  // padding
  while (buffer.length % 8 != 0) {
    buffer.putBit(false);
  }

  // padding
  final bitDataCount = totalDataBits;
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

    final dcItem = dcData[r] = buffer.getBytes(offset, dcCount);
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

  var totalCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalCount += rsBlocks[i].totalCount;
  }

  final data = Uint8List(totalCount);
  var dataPtr = 0;

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      final dcItem = dcData[r]!;
      if (i < dcItem.length) {
        data[dataPtr++] = dcItem[i];
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      final ecItem = ecData[r]!;
      if (i < ecItem.length) {
        data[dataPtr++] = ecItem[i];
      }
    }
  }

  return data;
}

QrPolynomial _errorCorrectPolynomial(int errorCorrectLength) {
  var a = QrPolynomial([1], 0);

  for (var i = 0; i < errorCorrectLength; i++) {
    a = a.multiply(QrPolynomial([1, qr_math.gexp(i)], 0));
  }

  return a;
}
