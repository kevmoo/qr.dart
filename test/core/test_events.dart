class TestEvents {
  final EventHandle<String> _testEventHandle;

  TestEvents(): _testEventHandle = new EventHandle<String>();

  EventRoot<String> get testEvent(){
    return _testEventHandle;
  }

  void fireTestEvent(String value){
    _testEventHandle.fireEvent(this, value);
  }

  static void run(){
    test('Event, EventHandle', () {

      var target = new TestEvents();

      var watcher = new EventWatcher<String>();

      expect(watcher.lastArgs, isNull);

      // before an event is registered, the value should still be null
      target.fireTestEvent('bar');
      expect(watcher.lastArgs, isNull);

      var eventId = target.testEvent.add(watcher.handler);

      // after registration, event should change value
      target.fireTestEvent('bar');
      expect(watcher.lastArgs, equals('bar'));

      // dispatching another event shouldn't change value
      target.fireTestEvent('foo');
      expect(watcher.lastArgs, equals('foo'));

      var didRemove = target.testEvent.remove(eventId);
      expect(didRemove, isTrue);

      // removing a second time should fail
      didRemove = target.testEvent.remove(eventId);
      expect(didRemove, isFalse);

      // after removing, event should not change value
      target.fireTestEvent('bar');
      expect(watcher.lastArgs, equals('foo'));
    });

  }
}
