A QR code generation library for Dart and Flutter.

[![Pub Package](https://img.shields.io/pub/v/qr.svg)](https://pub.dev/packages/qr)
[![package publisher](https://img.shields.io/pub/publisher/qr.svg)](https://pub.dev/packages/qr/publisher)
[![CI](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml/badge.svg)](https://github.com/kevmoo/qr.dart/actions/workflows/ci.yml)

# Features

- Supports QR code versions 1 - 40
- Error correction / redundancy
- ECI (Extended Channel Interpretation) support


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

To enable Extended Channel Interpretation (ECI) mode, you can use the `addECI` method:

```dart
final qrCode = QrCode(4, QrErrorCorrectLevel.L)
  ..addECI(QrEciValue.utf8)
  ..addData('Hello, world in QR form!');
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

## Minimalistic concrete example

```dart
import 'package:flutter/material.dart';
import 'package:qr/qr.dart';

class QrCodeGenWidget extends StatefulWidget {
  final String data;
  final double size;

  const QrCodeGenWidget({
    super.key,
    required this.data,
    required this.size,
  });

  @override
  State<QrCodeGenWidget> createState() => _QrCodeGenWidgetState();
}

class _QrCodeGenWidgetState extends State<QrCodeGenWidget> {
  late var _qrImage = QrImage(
    QrCode.fromData(
      data: widget.data,
      errorCorrectLevel: QrErrorCorrectLevel.L,
    ),
  );

  @override
  void didUpdateWidget(QrCodeGenWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.data != oldWidget.data) {
      _qrImage = QrImage(
        QrCode.fromData(
          data: widget.data,
          errorCorrectLevel: QrErrorCorrectLevel.L,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size.square(widget.size),
      isComplex: false,
      willChange: false,
      painter: _QrPainter(qrImage: _qrImage),
    );
  }
}

class _QrPainter extends CustomPainter {
  final QrImage qrImage;

  _QrPainter({required this.qrImage});

  @override
  bool shouldRepaint(covariant _QrPainter oldDelegate) {
    return oldDelegate.qrImage != qrImage;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.black
      ..isAntiAlias = false;

    canvas.scale(size.height / qrImage.moduleCount);

    for (var x = 0; x < qrImage.moduleCount; x++) {
      for (var y = 0; y < qrImage.moduleCount; y++) {
        if (qrImage.isDark(y, x)) {
          canvas.drawRect(
            Rect.fromLTWH(x.toDouble(), y.toDouble(), 1, 1),
            paint,
          );
        }
      }
    }
  }
}

```

# Pre-made UI libraries

The following libraries use qr.dart to generate QR codes for you out of the box:

[qr_flutter](https://pub.dev/packages/qr_flutter) - A Flutter Widget to render
QR codes

[barcode](https://pub.dev/packages/barcode) - A package that supports many types
of scannable codes, include QR.

# Exporting

The following packages can be used to export QR codes directory to an image:

* [qr_image_exporter](https://pub.dev/packages/qr_image_exporter) - A library to 
  export QR codes as PNG image data.

# Demo

A working demo can be found here:
[kevmoo.github.io/qr.dart](https://kevmoo.github.io/qr.dart/)
