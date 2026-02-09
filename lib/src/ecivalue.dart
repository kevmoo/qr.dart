/// ECI value for QR Codes.
///
/// This extension type provides constants for common ECI values.
///
/// See: https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/common/CharacterSetECI.java
extension type const QrEciValue(int value) implements int {
  /// ISO-8859-1 (Latin-1). Default encoding.
  static const iso8859_1 = QrEciValue(3);

  /// ISO-8859-2 (Latin-2).
  static const iso8859_2 = QrEciValue(4);

  /// ISO-8859-3 (Latin-3).
  static const iso8859_3 = QrEciValue(5);

  /// ISO-8859-4 (Latin-4).
  static const iso8859_4 = QrEciValue(6);

  /// ISO-8859-5 (Latin/Cyrillic).
  static const iso8859_5 = QrEciValue(7);

  /// ISO-8859-6 (Latin/Arabic).
  static const iso8859_6 = QrEciValue(8);

  /// ISO-8859-7 (Latin/Greek).
  static const iso8859_7 = QrEciValue(9);

  /// ISO-8859-8 (Latin/Hebrew).
  static const iso8859_8 = QrEciValue(10);

  /// ISO-8859-9 (Latin-5).
  static const iso8859_9 = QrEciValue(11);

  /// ISO-8859-10 (Latin-6).
  static const iso8859_10 = QrEciValue(12);

  /// ISO-8859-11 (Latin/Thai).
  static const iso8859_11 = QrEciValue(13);

  /// ISO-8859-13 (Latin-7).
  static const iso8859_13 = QrEciValue(15);

  /// ISO-8859-14 (Latin-8).
  static const iso8859_14 = QrEciValue(16);

  /// ISO-8859-15 (Latin-9).
  static const iso8859_15 = QrEciValue(17);

  /// ISO-8859-16 (Latin-10).
  static const iso8859_16 = QrEciValue(18);

  /// Shift JIS.
  static const shiftJis = QrEciValue(20);

  /// Windows-1250 (Latin-2).
  static const windows1250 = QrEciValue(21);

  /// Windows-1251 (Cyrillic).
  static const windows1251 = QrEciValue(22);

  /// Windows-1252 (Latin-1).
  static const windows1252 = QrEciValue(23);

  /// Windows-1256 (Arabic).
  static const windows1256 = QrEciValue(24);

  /// UTF-16 (Big Endian).
  static const utf16BE = QrEciValue(25);

  /// UTF-8.
  static const utf8 = QrEciValue(26);

  /// US-ASCII.
  static const ascii = QrEciValue(27);

  /// Big5.
  static const big5 = QrEciValue(28);

  /// GB 2312.
  static const gb2312 = QrEciValue(29);

  /// EUC-KR.
  static const eucKr = QrEciValue(30);

  /// GBK.
  static const gbk = QrEciValue(31);
}
