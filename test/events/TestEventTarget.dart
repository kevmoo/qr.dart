class TestEventTarget {
  static void run(){
    test('test basic event subscribe, fire, unsubscribe', () {

      var target = new PEventTarget();

      var eventCount = 0;


      // count should start at zero
      expect(eventCount).equals(0);


      // before an event is registered, the count should still be zero
      target.dispatchEvent('bar');
      expect(eventCount).equals(0);

      var handler = (Event event) => eventCount++;

      target.addEventListener('bar', handler);

      // after registration, event should increment counter
      target.dispatchEvent('bar');
      expect(eventCount).equals(1);

      // dispatching another event shouldn't increment counter
      target.dispatchEvent('foo');
      expect(eventCount).equals(1);

      target.removeEventListener('bar', handler);

      // after removing, event should not increment counter
      target.dispatchEvent('bar');
      expect(eventCount).equals(1);

    });

  }
}
