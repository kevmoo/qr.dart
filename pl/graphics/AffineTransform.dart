class AffineTransform {
  num _m00, _m10, _m01, _m11, _m02, _m12;

  AffineTransform([this._m00 = 1, this._m10 = 0, this._m01 = 0, this._m11 = 1, this._m02 = 0, this._m12 = 0]);

  num get scaleX(){
    return _m00;
  }

  num get scaleY(){
    return _m11;
  }

  num get translateX(){
    return _m02;
  }

  num get translateY(){
    return _m12;
  }

  num get shearX(){
    return _m01;
  }

  num get shearY(){
    return _m10;
  }

  AffineTransform concatenate(tx) {
    var m0 = this._m00;
    var m1 = this._m01;
    this._m00 = tx._m00 * m0 + tx._m10 * m1;
    this._m01 = tx._m01 * m0 + tx._m11 * m1;
    this._m02 += tx._m02 * m0 + tx._m12 * m1;

    m0 = this._m10;
    m1 = this._m11;
    this._m10 = tx._m00 * m0 + tx._m10 * m1;
    this._m11 = tx._m01 * m0 + tx._m11 * m1;
    this._m12 += tx._m02 * m0 + tx._m12 * m1;
    return this;
  }
}
