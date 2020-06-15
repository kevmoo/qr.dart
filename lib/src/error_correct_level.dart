class QrErrorCorrectLevel {
  static const int L = 1;
  static const int M = 0;
  static const int Q = 3;
  static const int H = 2;

  // thesee *are* in order of lowest to highest quality...I think
  // all I know for sure: you can create longer messages w/ item N than N+1
  // I assume this correcsponds to more error correction for N+1
  static const List<int> levels = [L, M, Q, H];

  static String getName(int level) {
    switch (level) {
      case L:
        return 'Low';
      case M:
        return 'Medium';
      case Q:
        return 'Quartile';
      case H:
        return 'High';
      default:
        throw ArgumentError('level $level not supported');
    }
  }
}
