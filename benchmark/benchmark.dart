import 'package:benchmark_harness/benchmark_harness.dart';
import 'package:qr/qr.dart';

class QrCodeBenchmark extends BenchmarkBase {
  QrCodeBenchmark() : super('QrCode');

  @override
  void run() {
    QrCode.fromData(
      data: 'https://www.google.com/search?q=dart+lang',
      errorCorrectLevel: QrErrorCorrectLevel.M,
    );
  }
}

class LargeQrCodeBenchmark extends BenchmarkBase {
  final String _largeData;

  LargeQrCodeBenchmark()
    : _largeData = List.generate(1000, (i) => 'a').join(),
      super('LargeQrCode');

  @override
  void run() {
    QrCode.fromData(data: _largeData, errorCorrectLevel: QrErrorCorrectLevel.M);
  }
}

class QrImageBenchmark extends BenchmarkBase {
  late final QrCode _qrCode;

  QrImageBenchmark() : super('QrImage');

  @override
  void setup() {
    _qrCode = QrCode.fromData(
      data: 'https://www.google.com/search?q=dart+lang',
      errorCorrectLevel: QrErrorCorrectLevel.M,
    );
  }

  @override
  void run() {
    QrImage(_qrCode);
  }
}

void main() {
  QrCodeBenchmark().report();
  LargeQrCodeBenchmark().report();
  QrImageBenchmark().report();
}
