import 'dart:typed_data';

/// Encodes a list of booleans into a BMP file.
///
/// This encoder outputs a monochrome (1-bit) BMP.
///
/// [width] and [height] are the dimensions of the image.
/// [data] is a list of booleans representing the pixels, where `true` is black
/// and `false` is white. The data is expected to be in row-major order.
///
/// Note: QR codes are typically black on white. In 1-bit BMP, often 0 is black
/// and 1 is white, or via palette.
/// Let's use palette: Index 0 = Black (0x000000), Index 1 = White (0xFFFFFF).
/// So `true` (black) -> 0, `false` (white) -> 1.
Uint8List encodeBmp(int width, int height, List<bool> data) {
  if (data.length != width * height) {
    throw ArgumentError('Data length does not match width * height');
  }

  // Row selection padding: strictly 4 byte alignment
  // 1 bit per pixel.
  // Bytes per row = ceil(width / 8)
  final bytesPerRow = (width + 7) ~/ 8;
  final padding = (4 - (bytesPerRow % 4)) % 4;
  final rowSize = bytesPerRow + padding;
  final pixelArraySize = rowSize * height;

  final fileSize =
      14 + 40 + 8 + pixelArraySize; // Header + Info + Palette + Pixels

  final buffer = ByteData(fileSize);
  var offset = 0;

  // --- BITMAPFILEHEADER (14 bytes) ---
  // 'BM'
  buffer
    ..setUint8(offset++, 0x42)
    ..setUint8(offset++, 0x4D)
    // Size
    ..setUint32(offset, fileSize, Endian.little);
  offset += 4;
  // Reserved
  buffer.setUint32(offset, 0, Endian.little);
  offset += 4;
  // Offset to pixel data
  const pixelDataOffset = 14 + 40 + 8;
  buffer.setUint32(offset, pixelDataOffset, Endian.little);
  offset += 4;

  // --- BITMAPINFOHEADER (40 bytes) ---
  // Header Size
  buffer.setUint32(offset, 40, Endian.little);
  offset += 4;
  // Width
  buffer.setInt32(offset, width, Endian.little);
  offset += 4;
  // Height (positive = bottom-up, negative = top-down)
  // Let's use top-down (negative height) for easier row writing order usually,
  // but standard BMP is bottom-up. QR data usually comes row-by-row
  // top-to-bottom.
  // If we use positive height (bottom-up), we have to write rows in reverse
  // order.
  // If we use negative height, many viewers support it, but not all?
  // Actually, top-down BMPs (negative height) are valid for BI_RGB.
  // Let's try top-down first for simplicity of iteration.
  buffer.setInt32(offset, -height, Endian.little);
  offset += 4;
  // Planes
  buffer.setUint16(offset, 1, Endian.little);
  offset += 2;
  // BitCount (1-bit)
  buffer.setUint16(offset, 1, Endian.little);
  offset += 2;
  // Compression (BI_RGB = 0)
  buffer.setUint32(offset, 0, Endian.little);
  offset += 4;
  // SizeImage
  buffer.setUint32(offset, pixelArraySize, Endian.little);
  offset += 4;
  // XPixelsPerMeter (approx 72 DPI)
  buffer.setInt32(offset, 2835, Endian.little);
  offset += 4;
  // YPixelsPerMeter
  buffer.setInt32(offset, 2835, Endian.little);
  offset += 4;
  // ColorsUsed (2)
  buffer.setUint32(offset, 2, Endian.little);
  offset += 4;
  // ColorsImportant (2)
  buffer.setUint32(offset, 2, Endian.little);
  offset += 4;

  // --- Color Table (2 entries * 4 bytes) ---
  // Entry 0: Black (0x00000000) - B G R A
  buffer.setUint32(offset, 0x00000000, Endian.little);
  offset += 4;
  // Entry 1: White (0x00FFFFFF) - B G R A used 00FFFFFF
  buffer.setUint32(offset, 0x00FFFFFF, Endian.little);
  offset += 4;

  // --- Pixel Data ---
  // Top-down rows (since height is negative)
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x += 8) {
      var byte = 0;
      for (var bit = 0; bit < 8; bit++) {
        if (x + bit < width) {
          final isBlack = data[y * width + (x + bit)];
          // Index 0 is Black, Index 1 is White.
          // We want Black (true) -> 0.
          // We want White (false) -> 1.
          final bitVal = isBlack ? 0 : 1;
          byte |= bitVal << (7 - bit);
        } else {
          // Padding bits in the last byte of the row?
          // Usually 0 or 1, doesn't verify matter.
        }
      }
      buffer.setUint8(offset++, byte);
    }
    // Row Padding
    for (var p = 0; p < padding; p++) {
      buffer.setUint8(offset++, 0);
    }
  }

  return buffer.buffer.asUint8List();
}
