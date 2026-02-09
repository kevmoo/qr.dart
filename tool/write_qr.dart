import 'dart:io';

import 'package:args/args.dart';
import 'package:qr/qr.dart';

import 'src/bmp_encoder.dart';

void main(List<String> args) {
  final parser = ArgParser()
    ..addOption(
      'output',
      abbr: 'o',
      help: 'Output BMP file path',
      mandatory: true,
    )
    ..addOption(
      'correction',
      abbr: 'c',
      help: 'Error correction level (L, M, Q, H)',
      allowed: ['L', 'M', 'Q', 'H'],
      defaultsTo: 'L',
    )
    ..addOption(
      'version',
      abbr: 'v',
      help: 'QR Version (1-40)',
      defaultsTo: '1',
    )
    ..addOption(
      'scale',
      abbr: 's',
      help: 'Scale factor for pixels (e.g. 10)',
      defaultsTo: '10',
    );

  try {
    final results = parser.parse(args);
    final rest = results.rest;

    if (rest.isEmpty) {
      print('Usage: dart tool/write_qr.dart -o <output.bmp> <text>');
      print(parser.usage);
      exitCode = 1;
      return;
    }

    final text = rest.join(' ');
    final output = results['output'] as String;
    final correctionLabel = results['correction'] as String;
    final versionInput = int.tryParse(results['version'] as String) ?? 1;
    final scale = int.tryParse(results['scale'] as String) ?? 1;

    final correction = _parseCorrection(correctionLabel);

    // Use QrCode.fromData to auto-size if text is too long for version 1,
    // BUT user might want specific version.
    // Let's try to respect version if possible, or auto-size?
    // The `qr` package's `QrCode.fromData` *returns* a QrCode.
    // If we specify version in `QrCode` constructor, we must ensure data fits.
    // Does `QrCode.fromData` take a minimum version? No.
    // Let's just use `QrCode.fromData` and verify it respects the *flags* if we
    // could passed them.
    // Actually `QrCode.fromData` calculates the smallest version that fits.
    // If user explicitly asked for a version, we might want
    // `new QrCode(version, correction)..addData(text)`.

    QrCode qr;
    if (results.wasParsed('version')) {
      qr = QrCode(versionInput, correction)..addData(text);
    } else {
      qr = QrCode.fromData(data: text, errorCorrectLevel: correction);
    }

    final qrImage = QrImage(qr);

    // Convert QrImage to List<bool>
    // QrImage is a module matrix.
    // module(x, y) returns true for black, false for white.
    // Size is qrImage.moduleCount.

    final size = qrImage.moduleCount;
    // Let's add a quiet zone (padding) of 4 modules, as per spec.
    // Or maybe just output raw? Default to raw or standard padding?
    // Standard is 4 modules.
    const padding = 4;
    final fullSize = size + padding * 2;

    final pixels = List<bool>.filled(
      fullSize * fullSize * scale * scale,
      false,
    ); // Initialize white (false)

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (qrImage.isDark(y, x)) {
          // Map to pixel array with padding and scaling
          for (var sy = 0; sy < scale; sy++) {
            for (var sx = 0; sx < scale; sx++) {
              final px = (x + padding) * scale + sx;
              final py = (y + padding) * scale + sy;
              pixels[py * fullSize * scale + px] = true; // Black
            }
          }
        }
      }
    }

    final bmpBytes = encodeBmp(fullSize * scale, fullSize * scale, pixels);
    File(output).writeAsBytesSync(bmpBytes);

    print('Wrote QR code to $output (${fullSize * scale}x${fullSize * scale})');
  } catch (e) {
    print('Error: $e');
    exitCode = 1;
  }
}

int _parseCorrection(String label) => switch (label) {
  'L' => QrErrorCorrectLevel.L,
  'M' => QrErrorCorrectLevel.M,
  'Q' => QrErrorCorrectLevel.Q,
  'H' => QrErrorCorrectLevel.H,
  _ => QrErrorCorrectLevel.L,
};
