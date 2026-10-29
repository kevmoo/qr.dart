@TestOn('vm')
@Tags(['require-zbar'])
library;

import 'dart:io';
import 'dart:typed_data';

import 'package:checks/checks.dart';
import 'package:path/path.dart' as p;
import 'package:qr/qr.dart';
import 'package:test/scaffolding.dart';
import 'package:test_process/test_process.dart';

import '../tool/src/bmp_encoder.dart';

void main() {
  late Directory tempDir;

  setUpAll(() {
    tempDir = Directory.systemTemp.createTempSync('qr_tool_test');
  });

  tearDownAll(() {
    tempDir.deleteSync(recursive: true);
  });

  final configurations = [
    (version: null, correction: null),
    (version: 40, correction: 'H'),
  ];

  final inputs = [
    '123456',
    'HELLO WORLD',
    'Hello 👋 World 🌍',
    '👩🏽❤️💋👨🏾',
    '👩🏽‍❤️‍💋‍👨🏾',
  ];

  for (final config in configurations) {
    for (final input in inputs) {
      test('Generate QR with config $config and input "$input"', () async {
        final bmpPath = p.join(
          tempDir.path,
          'test_${config.hashCode}_${input.hashCode}.bmp',
        );
        final args = [
          'tool/write_qr.dart',
          '-o',
          bmpPath,
          if (config.version != null) ...['-v', config.version.toString()],
          if (config.correction != null) ...['-c', config.correction!],
          '--scale',
          '10',
          input,
        ];

        final process = await TestProcess.start('dart', args);
        await process.shouldExit(0);

        check(
          because: 'BMP file should be created',
          File(bmpPath).existsSync(),
        ).isTrue();

        // Validate with zbarimg
        // zbarimg output format: QR-Code:content
        final zbar = await TestProcess.start('zbarimg', [
          '--quiet',
          '--nodbus',
          bmpPath,
        ]);
        await zbar.shouldExit(0);
        final output = (await zbar.stdout.rest.toList()).join('\n').trim();

        if (output != 'QR-Code:$input') {
          print('zbarimg failed to match input.');
          print('Input: $input');
          print('Output: "$output"');
        }
        check(output).equals('QR-Code:$input');
      }, timeout: const Timeout(Duration(seconds: 20)));
    }
  }

  test('Generate QR with Version 1 (numeric input)', () async {
    const input = '123456';
    final bmpPath = p.join(tempDir.path, 'test_v1_numeric.bmp');
    final args = [
      'tool/write_qr.dart',
      '-o',
      bmpPath,
      '-v',
      '1',
      '-c',
      'L',
      '--scale',
      '10',
      input,
    ];

    final process = await TestProcess.start('dart', args);
    await process.shouldExit(0);
    check(
      because: 'BMP file should be created',
      File(bmpPath).existsSync(),
    ).isTrue();

    final zbar = await TestProcess.start('zbarimg', [
      '--quiet',
      '--nodbus',
      bmpPath,
    ]);
    await zbar.shouldExit(0);
    final output = (await zbar.stdout.rest.toList()).join('\n').trim();

    if (output != 'QR-Code:$input') {
      print('zbarimg failed to match input.');
      print('Input: $input');
      print('Output: "$output"');
    }
    check(output).equals('QR-Code:$input');
  });

  test('Error case: Missing output argument', () async {
    final process = await TestProcess.start('dart', [
      'tool/write_qr.dart',
      'content',
    ]);
    await process.shouldExit(1);
    final output = await process.stdout.next;
    check(output)
        .contains('Error: Invalid argument(s): Option output is mandatory.');
  });

  test('Error case: Invalid version', () async {
    final bmpPath = p.join(tempDir.path, 'invalid_version.bmp');
    final process = await TestProcess.start('dart', [
      'tool/write_qr.dart',
      '-o',
      bmpPath,
      '-v',
      '41',
      'content',
    ]);
    await process.shouldExit(1);
  });

  test('Error case: Invalid correction', () async {
    final bmpPath = p.join(tempDir.path, 'invalid_correction.bmp');
    final process = await TestProcess.start('dart', [
      'tool/write_qr.dart',
      '-o',
      bmpPath,
      '-c',
      'X',
      'content',
    ]);
    await process.shouldExit(1); // ArgParser error
  });

  test('Error case: Input too long for version (explicit version)', () async {
    const input =
        'This string is definitely too long for Version 1 with '
        'High error correction level.';
    final bmpPath = p.join(tempDir.path, 'too_long.bmp');
    final process = await TestProcess.start('dart', [
      'tool/write_qr.dart',
      '-o',
      bmpPath,
      '-v',
      '1',
      '-c',
      'H', // High error correction reduces capacity
      input,
    ]);
    await process.shouldExit(1);
  });

  test(
    'decodes all 160 version and error correction combinations via zbarimg',
    () => _verifyAllVersionBmps(tempDir),
    timeout: const Timeout(Duration(seconds: 60)),
  );
}

Future<void> _verifyAllVersionBmps(Directory tempDir) async {
  final sweepDir = Directory(p.join(tempDir.path, 'sweep'))..createSync();
  final (:paths, :expected) = _writeAllVersionBmps(sweepDir);

  final result = await Process.run('zbarimg', [
    '--quiet',
    '--nodbus',
    ...paths,
  ]);
  check(because: '${result.stderr}', result.exitCode).equals(0);

  final decoded = (result.stdout as String).trim().split('\n');
  check(decoded).deepEquals(expected);
}

({List<String> paths, List<String> expected}) _writeAllVersionBmps(
  Directory dir,
) {
  final paths = <String>[];
  final expected = <String>[];
  for (var version = 1; version <= 40; version++) {
    for (final level in QrErrorCorrectLevel.values) {
      final message = 'v$version-${level.name}';
      final qr = QrCode(
        payload: QrPayload.fromString(message),
        errorCorrectLevel: level,
        minTypeNumber: version,
      );
      final bmpPath = p.join(dir.path, '$message.bmp');
      File(bmpPath).writeAsBytesSync(_renderQrBmp(QrImage(qr), scale: 4));
      paths.add(bmpPath);
      expected.add('QR-Code:$message');
    }
  }
  return (paths: paths, expected: expected);
}

Uint8List _renderQrBmp(QrImage qrImage, {int scale = 4, int padding = 4}) {
  final size = qrImage.moduleCount;
  final fullSize = size + padding * 2;
  final dimension = fullSize * scale;
  final pixels = List<bool>.filled(dimension * dimension, false);

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (qrImage.isDark(y, x)) {
        _fillScaledModule(
          pixels,
          dimension: dimension,
          moduleX: x + padding,
          moduleY: y + padding,
          scale: scale,
        );
      }
    }
  }

  return encodeBmp(dimension, dimension, pixels);
}

void _fillScaledModule(
  List<bool> pixels, {
  required int dimension,
  required int moduleX,
  required int moduleY,
  required int scale,
}) {
  for (var sy = 0; sy < scale; sy++) {
    final rowOffset = (moduleY * scale + sy) * dimension + moduleX * scale;
    pixels.fillRange(rowOffset, rowOffset + scale, true);
  }
}
