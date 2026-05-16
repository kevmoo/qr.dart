import 'package:benchmark_harness/benchmark_harness.dart';
import 'package:qr/qr.dart';

class QrCodeBenchmark extends BenchmarkBase {
  QrCodeBenchmark() : super('QrCode');

  @override
  void run() {
    QrCode(
      payload: QrPayload.fromString(
        'https://www.google.com/search?q=dart+lang',
      ),
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
    QrCode(payload: QrPayload.fromString(_largeData));
  }
}

class QrImageBenchmark extends BenchmarkBase {
  late final QrCode _qrCode;

  QrImageBenchmark() : super('QrImage');

  @override
  void setup() {
    _qrCode = QrCode(
      payload: QrPayload.fromString(
        'https://www.google.com/search?q=dart+lang',
      ),
    );
  }

  @override
  void run() {
    QrImage(_qrCode);
  }
}

void main() {
  ValidationBenchmark().report();
  QrCodeBenchmark().report();
  LargeQrCodeBenchmark().report();
  QrImageBenchmark().report();
  LargeQrImageBenchmark().report();
}

class ValidationBenchmark extends BenchmarkBase {
  ValidationBenchmark() : super('Validation');

  @override
  void run() {
    QrValidationResult.fromPayload(
      payload: QrPayload.fromString(
        'https://www.google.com/search?q=dart+lang',
      ),
      typeNumber: 4,
      errorCorrectLevel: QrErrorCorrectLevel.medium,
    );
  }
}

class LargeQrImageBenchmark extends BenchmarkBase {
  late final QrCode _qrCode;

  LargeQrImageBenchmark() : super('LargeQrImage');

  @override
  void setup() {
    final largeData = List.generate(1000, (i) => 'a').join();
    _qrCode = QrCode(payload: QrPayload.fromString(largeData));
  }

  @override
  void run() {
    QrImage(_qrCode);
  }
}
