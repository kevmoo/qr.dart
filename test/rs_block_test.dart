import 'package:qr/src/error_correct_level.dart';
import 'package:qr/src/rs_block.dart';
import 'package:qr/src/util.dart';
import 'package:test/test.dart';

int _expectedCodewordCapacity(int typeNumber) {
  final moduleCount = typeNumber * 4 + 17;
  final k = patternPosition(typeNumber).length;
  final alignmentModules = k == 0 ? 0 : (k * k - 3) * 25 - 2 * (k - 2) * 5;
  final versionModules = typeNumber >= 7 ? 36 : 0;
  final unassignedBits = moduleCount * moduleCount -
      192 -
      2 * (moduleCount - 16) -
      31 -
      versionModules -
      alignmentModules;
  return unassignedBits ~/ 8;
}

int _totalDataBits(int typeNumber, int level) => QrRsBlock.getRSBlocks(
      typeNumber,
      level,
    ).fold(0, (sum, b) => sum + b.dataCount * 8);

void _verifyBlockInvariants(
  int typeNumber,
  int level,
  int expectedCodewords,
) {
  final blocks = QrRsBlock.getRSBlocks(typeNumber, level);
  expect(blocks, isNotEmpty);

  final totalCodewords = blocks.fold(0, (sum, b) => sum + b.totalCount);
  expect(
    totalCodewords,
    expectedCodewords,
    reason: 'v$typeNumber ${QrErrorCorrectLevel.getName(level)} total '
        'codewords',
  );

  final ecPerBlock = blocks.first.totalCount - blocks.first.dataCount;
  expect(ecPerBlock, greaterThan(0));

  final baseTotal = expectedCodewords ~/ blocks.length;
  var largerBlocks = 0;
  for (final block in blocks) {
    expect(block.totalCount - block.dataCount, ecPerBlock);
    if (block.totalCount == baseTotal + 1) {
      largerBlocks++;
    } else {
      expect(block.totalCount, baseTotal);
    }
  }
  expect(largerBlocks, expectedCodewords % blocks.length);
}

void main() {
  test('RS blocks match ISO codeword capacity and block-split invariants', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      final expectedCodewords = _expectedCodewordCapacity(typeNumber);
      for (final level in QrErrorCorrectLevel.levels) {
        _verifyBlockInvariants(typeNumber, level, expectedCodewords);
      }
    }
  });

  test('data bit capacity is strictly monotonic across levels and versions',
      () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      for (var i = 0; i < QrErrorCorrectLevel.levels.length - 1; i++) {
        final higherCapacity = _totalDataBits(
          typeNumber,
          QrErrorCorrectLevel.levels[i],
        );
        final lowerCapacity = _totalDataBits(
          typeNumber,
          QrErrorCorrectLevel.levels[i + 1],
        );
        expect(
          higherCapacity,
          greaterThan(lowerCapacity),
          reason: 'v$typeNumber level $i > level ${i + 1}',
        );
      }
    }

    for (final level in QrErrorCorrectLevel.levels) {
      for (var typeNumber = 1; typeNumber < 40; typeNumber++) {
        final current = _totalDataBits(typeNumber, level);
        final next = _totalDataBits(typeNumber + 1, level);
        expect(
          next,
          greaterThan(current),
          reason: '${QrErrorCorrectLevel.getName(level)} v${typeNumber + 1} > '
              'v$typeNumber',
        );
      }
    }
  });
}
