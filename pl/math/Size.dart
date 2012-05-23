// shamelessly starting with
// http://code.google.com/p/dart/source/browse/branches/bleeding_edge/dart/samples/ui_lib/base/Size.dart?r=4154

class Size {
  final num width, height;

  const Size(num this.width, num this.height);

  bool operator ==(Size other) {
    return other !== null && width == other.width && height == other.height;
  }

  /**
   * Returns the area of the size (width * height).
   */
  num area() {
    return width * height;
  }

  /**
   * Returns the ratio of the size's width to its height.
   */
  num aspectRatio() {
    return width / height;
  }

  /**
   * Returns a new copy of the Size.
   */
  Size clone() {
    return new Size(width, height);
  }

  /**
   * Returns true if this Size is the same size or smaller than the
   * [target] size in both dimensions.
   */
  bool fitsInside(Size target) {
    return width <= target.width && height <= target.height;
  }

  /**
   * Returns true if the size has zero area, false if both dimensions
   *     are non-zero numbers.
   */
  bool isEmpty() {
    return area() == 0;
  }

  /**
   * Returns the perimeter of the size (width + height) * 2.
   */
  num perimeter() {
    return (width + height) * 2;
  }

  /**
   * Returns a nice string representing size.
   * Returns in the form (50 x 73).
   */
  String toString() {
    return "(${width} x ${height})";
  }
}
