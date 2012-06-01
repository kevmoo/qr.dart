class TestEventTarget {
  final EventHandle<String> _testEventHandle;
  
  TestEventTarget(): _testEventHandle = new EventHandle<String>();

  IEvent<String> get testEvent(){
    return _testEventHandle.event;
  }
  
  void fireTestEvent(String value){
    _testEventHandle.fireEvent(this, value);
  }

  static void run(){
    test('test basic event subscribe, fire, unsubscribe', () {

      var target = new TestEventTarget();

      String lastValue = null;
      expect(lastValue).equals(null);

      // before an event is registered, the value should still be null
      target.fireTestEvent('bar');
      expect(lastValue).equals(null);

      var handler = (String args) => lastValue = args;

      var eventId = target.testEvent.add(handler);

      // after registration, event should change value
      target.fireTestEvent('bar');
      expect(lastValue).equals('bar');

      // dispatching another event shouldn't change value
      target.fireTestEvent('foo');
      expect(lastValue).equals('foo');

      var didRemove = target.testEvent.remove(eventId);
      expect(didRemove).equals(true);

      // removing a second time should fail
      didRemove = target.testEvent.remove(eventId);
      expect(didRemove).equals(false);

      // after removing, event should not change value
      target.fireTestEvent('bar');
      expect(lastValue).equals('foo');
    });

  }
}
