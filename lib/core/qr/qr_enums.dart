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
