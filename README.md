A QR code generation library for Dart and Flutter.

[![CI](https://github.com/kevmoo/qr.dart/workflows/ci/badge.svg)](https://github.com/kevmoo/qr.dart/actions?query=workflow%3A%22ci%22)

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
final qrCode = new QrCode(4, QrErrorCorrectLevel.L);
qrCode.addData("Hello, world in QR form!");
final qrImage = QrImage(qrCode);
```

Now you can use your `qrImage` instance to render a graphical representation of the QR code. A basic implementation would be as such:

```dart
for (int x = 0; x < qrImage.moduleCount; x++) {
  for (int y = 0; y < qrImage.moduleCount; y++) {
    if (qrImage.isDark(y, x)) {
      // render a dark square on the canvas
    }
  }
}
```

See the `example` directory for further details.

# Pre-made UI libraries

The following libraries use qr.dart to generate QR codes for you out of the box:

[QR - Flutter](https://github.com/lukef/qr.flutter) - A Flutter Widget to render QR codes

[QR - AngularDart](https://github.com/gazialankus/qr.angulardart) - An AngularDart component to render QR codes

# Demo

A working demo can be found here: [https://kevmoo.github.io/qr.dart/](https://kevmoo.github.io/qr.dart/)
