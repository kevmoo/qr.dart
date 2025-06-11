A QR code generation library for Dart and Flutter.

[![Pub Package](https://img.shields.io/pub/v/qr.svg)](https://pub.dev/packages/qr)
[![package publisher](https://img.shields.io/pub/publisher/qr.svg)](https://pub.dev/packages/qr/publisher)
[![CI](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml/badge.svg)](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml)

# Features

- Supports QR code versions 1 - 40
- Error correction / redundancy
- PNG image export capability for `QrImage` instances.


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

## Exporting QrImage to PNG

You can now export your `qrImage` instance directly to a PNG byte array. This is useful for saving QR codes to files, displaying them in environments without direct Flutter widgets (e.g., pure Dart backends), or integrating with other image processing libraries.

First, ensure you have the `image` package added to your `pubspec.yaml`:

```YAML
dependencies:
  qr: ^3.0.3-wip # or your current version
  image: ^4.0.0 # or newer
```

Then, import the `qr_image_exporter.dart` extension and use the `toPngBytes` method:

```Dart
import 'dart:io'; // For file saving
import 'dart:typed_data'; // For Uint8List

import 'package:qr/qr.dart';

// ... assuming qrCode and qrImage are already created as shown above

// Define module size and margin for the output image
const moduleSize = 5;
const margin = 25;

// Generate PNG bytes
final Uint8List? pngBytes = qrImage.toPngBytes(
  moduleSize: moduleSize,
  margin: margin,
  darkColor: 0xFF000000, // Black
  lightColor: 0xFFFFFFFF, // White
);

if (pngBytes != null) {
  // Example: Save to a file (requires dart:io)
  // Adjust the path as needed for your environment (e.g., use path_provider in Flutter)
  final file = File('my_qr_code.png');
  await file.writeAsBytes(pngBytes);
  print('QR code saved to ${file.path}');

  // In a Flutter app, you could display it with Image.memory(pngBytes)
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
