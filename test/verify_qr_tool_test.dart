@Tags(['require-zbar'])
library;

import 'dart:io';

import 'package:path/path.dart' as p;
import 'package:test/test.dart';
import 'package:test_process/test_process.dart';

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
      test(
        'Generate QR with config $config and input "$input"',
        () async {
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

          expect(
            File(bmpPath).existsSync(),
            isTrue,
            reason: 'BMP file should be created',
          );

          // Validate with zbarimg
          // zbarimg output format: QR-Code:content
          final zbar = await TestProcess.start('zbarimg', ['--quiet', bmpPath]);
          await zbar.shouldExit(0);
          final output = (await zbar.stdout.rest.toList()).join('\n').trim();

          if (output != 'QR-Code:$input') {
            print('zbarimg failed to match input.');
            print('Input: $input');
            print('Output: "$output"');
          }
          expect(output, 'QR-Code:$input');
        },
        timeout: const Timeout(Duration(seconds: 20)),
      );
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
    expect(
      File(bmpPath).existsSync(),
      isTrue,
      reason: 'BMP file should be created',
    );

    final zbar = await TestProcess.start('zbarimg', ['--quiet', bmpPath]);
    await zbar.shouldExit(0);
    final output = (await zbar.stdout.rest.toList()).join('\n').trim();

    if (output != 'QR-Code:$input') {
      print('zbarimg failed to match input.');
      print('Input: $input');
      print('Output: "$output"');
    }
    expect(output, 'QR-Code:$input');
  });

  test('Error case: Missing output argument', () async {
    final process = await TestProcess.start('dart', [
      'tool/write_qr.dart',
      'content',
    ]);
    await process.shouldExit(1);
    final output = await process.stdout.next;
    expect(
      output,
      contains('Error: Invalid argument(s): Option output is mandatory.'),
    );
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
}
