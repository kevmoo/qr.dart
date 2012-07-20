goog.provide('qr.Math');

qr.Math = {

  glog: function(n) {

    if (n < 1) {
      throw new Error('glog(' + n + ')');
    }

    return qr.Math.LOG_TABLE[n];
  },

  gexp: function(n) {

    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return qr.Math.EXP_TABLE[n];
  },

  EXP_TABLE: {
    length: 256
  },

  LOG_TABLE: {
    length: 256
  }

};

(function() {
  var i;
  for (i = 0; i < 8; i++) {
    qr.Math.EXP_TABLE[i] = 1 << i;
  }
  for (i = 8; i < 256; i++) {
    qr.Math.EXP_TABLE[i] = qr.Math.EXP_TABLE[i - 4] ^ qr.Math.EXP_TABLE[i - 5] ^ qr.Math.EXP_TABLE[i - 6] ^ qr.Math.EXP_TABLE[i - 8];
  }
  for (i = 0; i < 255; i++) {
    qr.Math.LOG_TABLE[qr.Math.EXP_TABLE[i]] = i;
  }
})();
