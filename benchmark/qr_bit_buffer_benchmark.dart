import 'package:bench_press/bench_press.dart';
import 'package:qr/src/bit_buffer.dart';

final class QrBitBufferPutBenchmark extends Benchmark {
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
    Blackhole.consume(buffer);
  }
}

void main(List<String> args) => mainBenchmark(QrBitBufferPutBenchmark(), args);
