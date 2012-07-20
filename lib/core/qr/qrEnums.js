goog.provide('qr.ErrorCorrectLevel');
goog.provide('qr.MaskPattern');
goog.provide('qr.Mode');

/**
 * @enum {number}
 */
qr.Mode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};

/**
 * @enum {number}
 */
qr.ErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};

/**
 * @enum {number}
 */
qr.MaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
