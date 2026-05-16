import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'byte.dart';
import 'eci.dart';
import 'ecivalue.dart';

/// A standalone accumulator for data and encoding modes to be formatted into a
/// QR code.
///
/// Manages segments of data (Numeric, Alphanumeric, Byte, ECI) independently of
/// QR code version or error correction level.
class QrPayload {
  final _dataList = <QrDatum>[];

  /// Creates an empty payload.
  QrPayload();

  /// Creates a payload and populates it with [data], optimizing for the most
  /// efficient encoding modes.
  factory QrPayload.fromString(String data) => QrPayload()..addString(data);

  /// Creates a payload from binary [data].
  factory QrPayload.fromTypedData(TypedData data) =>
      QrPayload().._addToList(QrByte.fromByteData(data));

  /// Adds [data] to the payload, automatically splitting it into optimal
  /// segments.
  void addString(String data) {
    for (final datum in QrDatum.toDatums(data)) {
      _addToList(datum);
    }
  }

  /// Adds binary [data] to the payload.
  void addTypedData(TypedData data) => _addToList(QrByte.fromByteData(data));

  /// Adds QR Numeric Mode data from a string of digits.
  ///
  /// It is an error if [numberString] contains anything other than digits 0
  /// through 9.
  void addNumeric(String numberString) =>
      _addToList(QrNumeric.fromString(numberString));

  /// Adds QR Alphanumeric Mode data.
  void addAlphaNumeric(String alphaNumeric) =>
      _addToList(QrAlphaNumeric.fromString(alphaNumeric));

  /// Adds an Extended Channel Interpretation (ECI) mode header.
  ///
  /// Use this to specify a different character encoding for subsequent data.
  /// Common values are available as constants on [QrEciValue].
  void addECI(QrEciValue eciValue) => _addToList(QrEci(eciValue));

  void _addToList(QrDatum data) {
    _dataList.add(data);
  }
}

@internal
extension QrPayloadInternal on QrPayload {
  List<QrDatum> get dataList => _dataList;

  int calculateRequiredBits(int typeNumber) {
    var bits = 0;
    for (final datum in _dataList) {
      bits += 4 + datum.mode.getLengthBits(typeNumber) + datum.bitLength;
    }
    return bits;
  }
}
