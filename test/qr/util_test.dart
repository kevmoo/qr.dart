library test.util;

import 'dart:async';
import 'package:unittest/unittest.dart';

import 'package:qr/src/send_port_value.dart';

void main() {

  test('kitchen sink', () {

    var ts = new ThrottledStream<Iterable<int>, int>(_sum);

    expect(ts.source, isNull);
    expect(ts.outputValue, isNull);

    ts.source = [-2, 3];
    expect(ts.source, [-2, 3]);

    return ts.outputStream
        .first.then((int sum) {
          expect(sum, 1);
          expect(ts.outputValue, 1);

          ts.source = [2];
          expect(ts.source, [2]);
          expect(ts.outputValue, 1);

          ts.source = [3];
          expect(ts.source, [3]);
          expect(ts.outputValue, 1);

          return ts.outputStream.first;
        })
        .then((int sum) {
          expect(sum, 2);
          expect(ts.outputValue, 2);

          return ts.outputStream.first;
        })
        .then((int sum) {
          expect(sum, 3);
          expect(ts.outputValue, 3);

          ts.source = null;
          expect(ts.source, null);
          return ts.outputStream.first;
        })
        .then((value) {
          fail('Should not get a value...should error out');
        })
        .catchError((error) {
          expect(error, const isInstanceOf<ArgumentError>());
        });
  });

}

Future<int> _sum(Iterable<int> values) {
  if(values == null) throw new ArgumentError('null!');

  return new Future(() => values.reduce((a, b) {
    if(a == null) throw new ArgumentError();
    if(b == null) throw new ArgumentError();
    return a + b;
  }));
}
