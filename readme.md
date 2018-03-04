**QR - Dart** is a QR code generation library written in Dart.

[![Build Status](https://travis-ci.org/kevmoo/qr.dart.svg?branch=master)](https://travis-ci.org/kevmoo/qr.dart)

# Features

- Supports QR code versions 1 - 40
- Error correction / redundancy

# Installing

You can install the package by adding the following lines to your `pubspec.yaml`:

```yaml
dependencies:
  qr: "^0.1.0+1"
```

After adding the dependency to your `pubspec.yaml` you can run: `pub get` or `flutter packages get` if you're using Flutter.

# Getting started

To start, import the dependency in your code:

```dart
import 'package:qr/qr.dart';
```

Next, define your QR code data you should do so as such:

```dart
final _qrCode = new QrCode(4, QrErrorCorrectLevel.L);
_qrCode.addData("Hello, world in QR form!");
_qrCode.make();
```

Now you can use your `_qrCode` instance to render a graphical representation of the QR code. A basic implementation would be as such:

```dart
for (int x = 0; x < _qrCode.moduleCount; x++) {
  for (int y = 0; y < _qrCode.moduleCount; y++) {
    if (_qrCode.isDark(y, x)) {
      // render a dark square on the canvas
    }
  }
}
```

See the `example` directory for further details.

# Pre-made UI libraries

The following libraries use qr.dart to generate QR codes for you out of the box:

[QR - Flutter](https://github.com/lukef/qr.flutter) - A Flutter Widget to render QR codes

# Demo

A working demo can be found here: [https://kevmoo.github.io/qr.dart/](https://kevmoo.github.io/qr.dart/)


# Authors
 * [Kevin Moore](https://github.com/kevmoo) ([@kevmoo](http://twitter.com/kevmoo))
