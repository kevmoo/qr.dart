import 'dart:typed_data';

void main() {
  final moduleCount = 100;
  final templateData = Uint8List(moduleCount * moduleCount);
  for (var i = 0; i < templateData.length; i++) {
    templateData[i] = i % 2 == 0 ? 0 : 1;
  }
  final _data = Uint8List(moduleCount * moduleCount);
  final _pixelUnassigned = 0;
  final _pixelDark = 2;
  final _pixelLight = 1;

  void applyMaskOld(int mpIndex) {
    var inc = -1;
    var row = moduleCount - 1;

    for (var col = moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      for (;;) {
        for (var c = 0; c < 2; c++) {
          final cCol = col - c;
          final idx = row * moduleCount + cCol;
          if (templateData[idx] == _pixelUnassigned) {
            final mask = switch (mpIndex) {
              0 => (row + cCol).isEven,
              1 => row.isEven,
              2 => cCol % 3 == 0,
              3 => (row + cCol) % 3 == 0,
              4 => ((row ~/ 2) + (cCol ~/ 3)).isEven,
              5 => ((row * cCol) % 2 + (row * cCol) % 3) == 0,
              6 => (((row * cCol) % 2) + ((row * cCol) % 3)).isEven,
              7 => (((row * cCol) % 3) + ((row + cCol) % 2)).isEven,
              _ => false,
            };
            if (mask) {
              _data[idx] ^= _pixelDark ^ _pixelLight;
            }
          }
        }

        row += inc;

        if (row < 0 || moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

  void applyMaskNew(int mpIndex) {
    for (var row = 0; row < moduleCount; row++) {
      final rowIdx = row * moduleCount;
      for (var col = 0; col < moduleCount; col++) {
        final idx = rowIdx + col;
        if (templateData[idx] == _pixelUnassigned) {
          final mask = switch (mpIndex) {
            0 => (row + col).isEven,
            1 => row.isEven,
            2 => col % 3 == 0,
            3 => (row + col) % 3 == 0,
            4 => ((row ~/ 2) + (col ~/ 3)).isEven,
            5 => ((row * col) % 2 + (row * col) % 3) == 0,
            6 => (((row * col) % 2) + ((row * col) % 3)).isEven,
            7 => (((row * col) % 3) + ((row + col) % 2)).isEven,
            _ => false,
          };
          if (mask) {
            _data[idx] ^= 3;
          }
        }
      }
    }
  }

  // Warmup
  for (var i = 0; i < 10000; i++) {
    applyMaskOld(3);
    applyMaskNew(3);
  }

  final sw1 = Stopwatch()..start();
  for (var i = 0; i < 100000; i++) {
    applyMaskOld(3);
  }
  sw1.stop();

  final sw2 = Stopwatch()..start();
  for (var i = 0; i < 100000; i++) {
    applyMaskNew(3);
  }
  sw2.stop();

  print('Old: ${sw1.elapsedMilliseconds} ms');
  print('New: ${sw2.elapsedMilliseconds} ms');
}
