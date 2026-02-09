import 'package:qr/qr.dart';
import 'package:test/test.dart';

void main() {
  test('Generate QR with Emoji', () {
    const emojiString = '👩🏽❤️💋👨🏾';
    final qr = QrCode.fromData(
      data: emojiString,
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );
    expect(qr.typeNumber, 2);
    expect(qr.typeNumber, greaterThan(0));
    // Verify we have multiple segments (ECI + Byte)
    // iterate over modules or check internal structure if possible
    // (but it's private)
  });

  test('Generate QR with Complex Emoji (ZWJ support)', () {
    // Woman + Medium Skin Tone + ZWJ + Heart + VS16 + ZWJ + Kiss Mark + ZWJ
    // + Man + Dark Brown Skin Tone
    const complexEmoji =
        '\u{1F469}\u{1F3FD}\u{200D}\u{2764}\u{FE0F}\u{200D}'
        '\u{1F48B}\u{200D}\u{1F468}\u{1F3FE}';

    final qr = QrCode.fromData(
      data: complexEmoji,
      errorCorrectLevel: QrErrorCorrectLevel.low,
    );
    expect(qr.typeNumber, greaterThan(0));
    // Verify it didn't throw and created a valid QR structure
    // The exact type number depends on the overhead of ECI + Byte mode

    // 4 segments:
    // 1. ECI (26 for UTF-8)
    // 2. Byte Data (the emoji bytes)

    // We can't easily peek into _dataList, but we can verify the module count
    // implies it's not empty
    expect(qr.moduleCount, greaterThan(21));
  });
}
