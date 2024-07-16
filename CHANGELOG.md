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
