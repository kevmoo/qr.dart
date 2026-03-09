import 'package:benchmark_harness/benchmark_harness.dart';
import 'package:qr/src/bit_buffer.dart';

class QrBitBufferPutBenchmark extends BenchmarkBase {
  QrBitBufferPutBenchmark() : super('QrBitBuffer.put');

  @override
  void run() {
    final buffer = QrBitBuffer();
    for (var i = 0; i < 1000; i++) {
      buffer
        ..put(255, 8)
        ..put(1, 1)
        ..put(3, 2)
        ..put(127, 7);
    }
  }
}

class QrBitBufferPutBitBenchmark extends BenchmarkBase {
  QrBitBufferPutBitBenchmark() : super('QrBitBuffer.putBit');

  @override
  void run() {
    final buffer = QrBitBuffer();
    for (var i = 0; i < 10000; i++) {
      buffer
        ..putBit(true)
        ..putBit(false);
    }
  }
}

void main() {
  QrBitBufferPutBenchmark().report();
  QrBitBufferPutBitBenchmark().report();
}
