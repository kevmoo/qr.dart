class QrMode {
  static final int MODE_NUMBER = 1 << 0;
  static final int MODE_ALPHA_NUM = 1 << 1;
  static final int MODE_8BIT_BYTE = 1 << 2;
  static final int MODE_KANJI = 1 << 3;
}

class QrErrorCorrectLevel {

  static final int L = 1;
  static final int M = 0;
  static final int Q = 3;
  static final int H = 2;

  // thesee *are* in order of lowest to highest quality...I think
  // all I know for sure: you can create longer messages w/ item N than N+1
  // I assume this correcsponds to more error correction for N+1
  static final List<int> levels = const[L,M,Q,H];

  static String getName(int level) {
    switch(level) {
      case L:
        return 'Low';
      case M:
        return 'Medium';
      case Q:
        return 'Quality';
      case H:
        return 'High';
      default:
        throw 'not supported';
    }
  }
}

class QrMaskPattern {
  static final int PATTERN000 = 0;
  static final int PATTERN001 = 1;
  static final int PATTERN010 = 2;
  static final int PATTERN011 = 3;
  static final int PATTERN100 = 4;
  static final int PATTERN101 = 5;
  static final int PATTERN110 = 6;
  static final int PATTERN111 = 7;
}
