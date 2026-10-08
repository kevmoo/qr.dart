import 'package:bench_press/bench_press.dart';
import 'package:qr/qr.dart';

final class QrCodeBenchmark extends Benchmark {
  QrCodeBenchmark() : super('QrCode');

  @override
  void run() => Blackhole.consume(
    QrCode(
      payload: QrPayload.fromString(
        'https://www.google.com/search?q=dart+lang',
      ),
    ),
  );
}

final class LargeQrCodeBenchmark extends Benchmark {
  final String _largeData;

  LargeQrCodeBenchmark()
    : _largeData = List.generate(1000, (i) => 'a').join(),
      super('LargeQrCode');

  @override
  void run() =>
      Blackhole.consume(QrCode(payload: QrPayload.fromString(_largeData)));
}

final class QrImageBenchmark extends Benchmark {
  late QrCode _qrCode;

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
  void run() => Blackhole.consume(QrImage(_qrCode));
}

Future<void> main(List<String> args) => mainBenchmarkSuite([
  ValidationBenchmark(),
  QrCodeBenchmark(),
  LargeQrCodeBenchmark(),
  QrImageBenchmark(),
  LargeQrImageBenchmark(),
], args);

final class ValidationBenchmark extends Benchmark {
  ValidationBenchmark() : super('Validation');

  @override
  void run() => Blackhole.consume(
    QrValidationResult.fromPayload(
      payload: QrPayload.fromString(
        'https://www.google.com/search?q=dart+lang',
      ),
      typeNumber: 4,
      errorCorrectLevel: QrErrorCorrectLevel.medium,
    ),
  );
}

final class LargeQrImageBenchmark extends Benchmark {
  late QrCode _qrCode;

  LargeQrImageBenchmark() : super('LargeQrImage');

  @override
  void setup() {
    final largeData = List.generate(1000, (i) => 'a').join();
    _qrCode = QrCode(payload: QrPayload.fromString(largeData));
  }

  @override
  void run() => Blackhole.consume(QrImage(_qrCode));
}
