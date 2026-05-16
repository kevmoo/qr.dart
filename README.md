[![Dart QR Code Generator](example/assets/og-image.webp)](https://github.com/kevmoo/qr.dart)

A QR code generation package for Dart.

[![Pub Package](https://img.shields.io/pub/v/qr.svg)](https://pub.dev/packages/qr)
[![package publisher](https://img.shields.io/pub/publisher/qr.svg)](https://pub.dev/packages/qr/publisher)
[![CI](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml/badge.svg)](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml)

# Features

- Supports QR code versions 1 - 40
- Error correction / redundancy
- ECI (Extended Channel Interpretation) support

# Demo

A rich, HTML demo can be found here: [qr.kevmoo.com](https://qr.kevmoo.com/).

# Getting started

To start, import the dependency in your code:

```dart
import 'package:qr/qr.dart';
```

To build your QR code data you should do so as such:

```dart
final qrCode = QrCode(
  payload: QrPayload.fromString('Hello, world in QR form!'),
  errorCorrectLevel: QrErrorCorrectLevel.low,
);
final qrImage = QrImage(qrCode);
```

To enable Extended Channel Interpretation (ECI) mode or build multi-part data, you can use `QrPayload`:

```dart
final payload = QrPayload()
  ..addECI(QrEciValue.utf8)
  ..addString('Hello, world in QR form!');

final qrCode = QrCode(
  payload: payload,
  errorCorrectLevel: QrErrorCorrectLevel.low,
);
```

Now you can use your `qrImage` instance to render a graphical representation of
the QR code. A basic implementation would be as such:

```dart
for (var x = 0; x < qrImage.moduleCount; x++) {
  for (var y = 0; y < qrImage.moduleCount; y++) {
    if (qrImage.isDark(y, x)) {
      // render a dark square on the canvas
    }
  }
}
```

See the `example` directory for further details.

# Packages that use `package:qr`

- [pretty_qr_code](https://pub.dev/packages/pretty_qr_code) - A Flutter Widget to render
QR codes
- [qr_image_exporter](https://pub.dev/packages/qr_image_exporter) - A library to
export QR codes as PNG image data.
