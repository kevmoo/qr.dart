import 'dart:typed_data';
import 'package:image/image.dart' as img;

import '../qr.dart';

/// An extension on [QrImage] to provide image export capabilities.
extension QrImageExporter on QrImage {
  /// Exports the QR code modules from [QrImage] as PNG byte data.
  ///
  /// [moduleSize] specifies the pixel size of each QR code module (dot)
  ///  in the output image.
  /// A larger value results in higher resolution.
  /// [margin] defines the number of pixels to add as a border
  ///  around the QR code.
  /// [darkColor] is the ARGB color of the dark modules
  ///  (e.g., 0xFF000000 for black).
  /// [lightColor] is the ARGB color of the light modules
  ///  (e.g., 0xFFFFFFFF for white).
  Uint8List? toPngBytes({
    int moduleSize = 4,
    int margin = 20,
    int darkColor = 0xFF000000,
    int lightColor = 0xFFFFFFFF,
  }) {
    // Calculate the total width and height of the image, including margins.
    final imageWidth = (moduleCount * moduleSize) + (margin * 2);
    final imageHeight = (moduleCount * moduleSize) + (margin * 2);

    // Create a new image with the calculated dimensions.
    final image = img.Image(width: imageWidth, height: imageHeight);

    // Decompose ARGB lightColor into individual R, G, B, A channels.
    final lightR = (lightColor >> 16) & 0xFF;
    final lightG = (lightColor >> 8) & 0xFF;
    final lightB = lightColor & 0xFF;
    final lightA = (lightColor >> 24) & 0xFF;

    // Decompose ARGB darkColor into individual R, G, B, A channels.
    final darkR = (darkColor >> 16) & 0xFF;
    final darkG = (darkColor >> 8) & 0xFF;
    final darkB = darkColor & 0xFF;
    final darkA = (darkColor >> 24) & 0xFF;

    // Initialize the entire image with the lightColor (background).
    // This is done by iterating through each pixel to ensure compatibility
    // with different versions of the 'image' package's clear/fill methods.
    for (var y = 0; y < imageHeight; y++) {
      for (var x = 0; x < imageWidth; x++) {
        image.setPixelRgba(x, y, lightR, lightG, lightB, lightA);
      }
    }

    // Draw the QR code modules (dark parts) onto the image.
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        // Check if the current module is dark.
        if (isDark(row, col)) {
          // Calculate the starting pixel coordinates for the current module.
          final startX = margin + col * moduleSize;
          final startY = margin + row * moduleSize;
          // Draw the module as a square block of pixels.
          for (var x = 0; x < moduleSize; x++) {
            for (var y = 0; y < moduleSize; y++) {
              image.setPixelRgba(
                startX + x,
                startY + y,
                darkR,
                darkG,
                darkB,
                darkA,
              );
            }
          }
        }
      }
    }

    // Encode the generated image into PNG byte data.
    try {
      return img.encodePng(image);
    } catch (e) {
      // Print error if PNG encoding fails.
      print('Error encoding PNG: $e');
      return null;
    }
  }
}
