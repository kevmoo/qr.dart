import 'package:qr/qr.dart';
import 'package:qr/src/byte.dart';
import 'package:test/test.dart';

void main() {
  test('all digits 1 through 0', () {
    final qr = QrNumeric.fromString('1234567890');
    expect(qr.mode, 1);
    expect(qr.length, 10);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 34);
    expect(
      buffer.getRange(0, 10).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      123,
    );
    expect(
      buffer.getRange(10, 20).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      456,
    );
    expect(
      buffer.getRange(20, 30).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      789,
    );
    expect(
      buffer.getRange(30, 34).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      0,
    );
  });

  test('single numeric', () {
    final qr = QrNumeric.fromString('5');
    expect(qr.mode, 1);
    expect(qr.length, 1);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 4);
    expect(
      buffer.getRange(0, 4).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      5,
    );
  });

  test('double numeric', () {
    final qr = QrNumeric.fromString('37');
    expect(qr.mode, 1);
    expect(qr.length, 2);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 7, reason: 'n*3+1 = 7');
    expect(
      buffer.getRange(0, 7).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      37,
    );
  });

  test('triple (even) numeric', () {
    final qr = QrNumeric.fromString('371');
    expect(qr.mode, 1);
    expect(qr.length, 3);
    final buffer = QrBitBuffer();
    qr.write(buffer);
    expect(buffer.length, 10, reason: 'n*3+1 = 10');
    expect(
      buffer.getRange(0, 10).map<int>((e) => e ? 1 : 0).fold<int>(
            0,
            (previousValue, element) => (previousValue << 1) | element,
          ),
      371,
    );
  });

  test('throws on invalid input', () {
    expect(() => QrNumeric.fromString('hello'), throwsArgumentError);
  });
}
