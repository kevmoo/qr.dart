A QR code generation library for Dart and Flutter.

[![Pub Package](https://img.shields.io/pub/v/qr.svg)](https://pub.dev/packages/qr)
[![package publisher](https://img.shields.io/pub/publisher/qr.svg)](https://pub.dev/packages/qr/publisher)
[![CI](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml/badge.svg)](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml)

# Features

- Supports QR code versions 1 - 40
- Error correction / redundancy

# Getting started

To start, import the dependency in your code:

```dart
import 'package:qr/qr.dart';
```

To build your QR code data you should do so as such:

```dart
final qrCode = QrCode(4, QrErrorCorrectLevel.L)
  ..addData('Hello, world in QR form!');
final qrImage = QrImage(qrCode);
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

# Pre-made UI libraries

The following libraries use qr.dart to generate QR codes for you out of the box:

[qr_flutter](https://pub.dev/packages/qr_flutter) - A Flutter Widget to render
QR codes

[barcode](https://pub.dev/packages/barcode) - A package that supports many types
of scannable codes, include QR.

# Demo

A working demo can be found here:
[kevmoo.github.io/qr.dart](https://kevmoo.github.io/qr.dart/)
