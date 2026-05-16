## 4.0.0-wip

- **Breaking Change**: Removed `QrBitBuffer` from public exports to tighten the API surface.
- **Breaking Change**: `QrErrorCorrectLevel` is now an enum (`low`, `medium`, `quartile`, `high`) instead of a class with integer constants (`L`, `M`, `Q`, `H`).
- **Breaking Change**: `QrCode` and `QrImage` constructors and properties now use the `QrErrorCorrectLevel` enum instead of integers.
- **Breaking Change**: Removed `dataCache` getter from `QrCode`.
- **Breaking Change**: `QrCode` is now immutable. Removed `addData`, `addByteData`, `addNumeric`, `addAlphaNumeric`, and `addECI` from `QrCode`.
- **Breaking Change**: Consolidated `QrCode` constructors into a single public factory constructor taking `QrPayload`, `errorCorrectLevel`, and an optional `minTypeNumber`. Removed `QrCode.fromData`, `QrCode.fromUint8List`, and `QrCode.fromPayload`.
- **Breaking Change**: Replaced `Uint8List` and `ByteData` in public API signatures with `TypedData`.
- **Breaking Change**: Marked all public classes (`QrCode`, `QrImage`, `QrPayload`, `QrValidationResult`, `InputTooLongException`) as `final class` to enforce structural immutability and prevent external subtyping.
- Added `QrPayload` class as a standalone accumulator for multi-part data and encoding modes (Numeric, Alphanumeric, Byte, ECI). Includes constructors `fromString`, `fromTypedData`, and methods `addString`, `addTypedData`, `addNumeric`, `addAlphaNumeric`, `addECI`.
- Added Extended Channel Interpretation (ECI) support via `QrPayload.addECI` and the `QrEciValue` extension type.
- Added `QrValidationResult.fromPayload` factory constructor to validate QR code payloads and predict valid configurations.
- Added `QrValidationResult` class returned by validation constructor.
- `QrPayload.fromString` and `QrPayload.addString` now intelligently pick the right mode.
- Throws `InputTooLongException` for data that exceeds QR code version 40 capacity, preventing the generation of invalid QR codes.
- Performance improvements for QR code generation.
  - `QrImage` generation is ~50% faster.
  - `LargeQrCode` generation is ~40% faster.
- Require `sdk: ^3.11.0`.

## 3.0.2

- Require package `web: ^1.0.0`.
- Require Dart 3.4 or greater.

## 3.0.1

- Fix example in `README.md`.
- Require Dart 2.16 or greater.

## 3.0.0

- `QrImage` added to handle image bits.
- `QrCode.make()` removed
- `QrCode.isDark()` moved to `QrImage`
- Added alpha numeric mode support via `addAlphaNumeric`

## 2.1.0

- Added numeric mode support via `addNumeric`

## 2.0.0

- Expose Mask Pattern as a parameter of QrCode.make()
- Migrated to null safety.
- Require Dart SDK `>=2.12.0 <3.0.0`.

## 1.3.0

- Added `QrCode.addByteData`.
- Added `QrCode.fromUint8List`.

## 1.2.1

- Require Dart SDK `>=2.6.0 <3.0.0`.

## 1.2.0

- Expose `InputTooLongException` exception so that applications and libraries
  can check for data length errors.

## 1.1.1

- Require Dart SDK `>=2.1.0 <3.0.0`.
- Fix a bug that fromData doesn't add supplied data.

## 1.1.0

- Add `fromData` QrCode factory that allows QrCode initiation without providing
  `typeNumber`.

## 1.0.1

- Support Dart 2 stable.

## 1.0.0

- Require at least Dart SDK `2.0.0-dev.17`.
- Fixed a subtle bug with number handling.

## 0.1.0+2

- Update README to include basic documentation
- Update pubspec.yaml description

## 0.1.0+1

- Fix author email.

## 0.1.0

- Initial release.
