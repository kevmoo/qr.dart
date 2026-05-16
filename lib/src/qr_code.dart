import 'dart:math' as math;
import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'bit_buffer.dart';
import 'byte.dart';
import 'error_correct_level.dart';
import 'input_too_long_exception.dart';
import 'math.dart' as qr_math;
import 'payload.dart';
import 'polynomial.dart';
import 'rs_block.dart';

final class QrCode {
  final int typeNumber;
  final QrErrorCorrectLevel errorCorrectLevel;
  final int moduleCount;
  final QrPayload payload;
  List<int>? _dataCache;

  /// Creates a [QrCode] from a [payload] and [errorCorrectLevel].
  ///
  /// Automatically calculates the minimum QR code version needed to fit the
  /// data. If [minTypeNumber] is specified (1-40), the sizing loop starts at
  /// that version, guaranteeing that the generated QR code will be at least
  /// that size.
  factory QrCode({
    required QrPayload payload,
    QrErrorCorrectLevel errorCorrectLevel = QrErrorCorrectLevel.medium,
    int minTypeNumber = 1,
  }) {
    final typeNumber = _calculateTypeNumberFromPayload(
      errorCorrectLevel,
      payload,
      minTypeNumber,
    );
    return QrCode._(typeNumber, errorCorrectLevel, payload);
  }

  QrCode._(this.typeNumber, this.errorCorrectLevel, this.payload)
    : moduleCount = typeNumber * 4 + 17;

  static int _calculateTypeNumberFromPayload(
    QrErrorCorrectLevel errorCorrectLevel,
    QrPayload payload,
    int minTypeNumber,
  ) {
    RangeError.checkValueInInterval(minTypeNumber, 1, 40, 'minTypeNumber');
    // Required bits only changes at types 10 and 27.
    final requiredBitsFor1 = payload.calculateRequiredBits(1);
    final requiredBitsFor10 = payload.calculateRequiredBits(10);
    final requiredBitsFor27 = payload.calculateRequiredBits(27);

    for (var typeNumber = minTypeNumber; typeNumber <= 40; typeNumber++) {
      final totalDataBits = QrRsBlock.getTotalDataBits(
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

    final maxBits = QrRsBlock.getTotalDataBits(40, errorCorrectLevel);
    throw InputTooLongException(requiredBitsFor27, maxBits);
  }
}

@internal
List<int> getDataCache(QrCode code) => code._dataCache ??= _createData(
  code.typeNumber,
  code.errorCorrectLevel,
  code.payload.dataList,
);

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
  final paddingBits = 8 - (buffer.length % 8);
  if (paddingBits < 8) {
    buffer.put(0, paddingBits);
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
