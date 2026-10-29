import 'package:checks/checks.dart';
import 'package:qr/qr.dart';
import 'package:qr/src/rs_block.dart';
import 'package:qr/src/util.dart';
import 'package:test/scaffolding.dart';

int _expectedCodewordCapacity(int typeNumber) {
  final moduleCount = typeNumber * 4 + 17;
  final k = patternPosition(typeNumber).length;
  final alignmentModules = k == 0 ? 0 : (k * k - 3) * 25 - 2 * (k - 2) * 5;
  final versionModules = typeNumber >= 7 ? 36 : 0;
  final unassignedBits =
      moduleCount * moduleCount -
      192 -
      2 * (moduleCount - 16) -
      31 -
      versionModules -
      alignmentModules;
  return unassignedBits ~/ 8;
}

void _verifyBlockInvariants(
  int typeNumber,
  QrErrorCorrectLevel level,
  int expectedCodewords,
) {
  final blocks = QrRsBlock.getRSBlocks(typeNumber, level);
  check(blocks).isNotEmpty();

  final totalCodewords = blocks.fold(0, (sum, b) => sum + b.totalCount);
  check(
    because: 'v$typeNumber ${level.name} total codewords',
    totalCodewords,
  ).equals(expectedCodewords);

  final totalDataBits = blocks.fold(0, (sum, b) => sum + b.dataCount * 8);
  check(QrRsBlock.getTotalDataBits(typeNumber, level)).equals(totalDataBits);

  final ecPerBlock = blocks.first.totalCount - blocks.first.dataCount;
  check(ecPerBlock).isGreaterThan(0);

  final baseTotal = expectedCodewords ~/ blocks.length;
  var largerBlocks = 0;
  for (final block in blocks) {
    check(block.totalCount - block.dataCount).equals(ecPerBlock);
    if (block.totalCount == baseTotal + 1) {
      largerBlocks++;
    } else {
      check(block.totalCount).equals(baseTotal);
    }
  }
  check(largerBlocks).equals(expectedCodewords % blocks.length);
}

void main() {
  test('RS blocks match ISO codeword capacity and block-split invariants', () {
    for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
      final expectedCodewords = _expectedCodewordCapacity(typeNumber);
      for (final level in QrErrorCorrectLevel.values) {
        _verifyBlockInvariants(typeNumber, level, expectedCodewords);
      }
    }
  });

  test(
    'data bit capacity is strictly monotonic across levels and versions',
    () {
      const orderedLevels = [
        QrErrorCorrectLevel.low,
        QrErrorCorrectLevel.medium,
        QrErrorCorrectLevel.quartile,
        QrErrorCorrectLevel.high,
      ];

      for (var typeNumber = 1; typeNumber <= 40; typeNumber++) {
        for (var i = 0; i < orderedLevels.length - 1; i++) {
          final higherCapacity = QrRsBlock.getTotalDataBits(
            typeNumber,
            orderedLevels[i],
          );
          final lowerCapacity = QrRsBlock.getTotalDataBits(
            typeNumber,
            orderedLevels[i + 1],
          );
          check(
            because:
                'v$typeNumber ${orderedLevels[i].name} > '
                '${orderedLevels[i + 1].name}',
            higherCapacity,
          ).isGreaterThan(lowerCapacity);
        }
      }

      for (final level in orderedLevels) {
        for (var typeNumber = 1; typeNumber < 40; typeNumber++) {
          final current = QrRsBlock.getTotalDataBits(typeNumber, level);
          final next = QrRsBlock.getTotalDataBits(typeNumber + 1, level);
          check(
            because: '${level.name} v${typeNumber + 1} > v$typeNumber',
            next,
          ).isGreaterThan(current);
        }
      }
    },
  );
}
