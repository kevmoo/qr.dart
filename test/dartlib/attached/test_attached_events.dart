class TestAttachedEvents extends AttachableObjectImpl {
  static final AttachedEvent<EventArgs> _testEvent1 =
      const AttachedEvent<EventArgs>('testEvent1');

  static final AttachedEvent<EventArgs> _testEvent2 =
      const AttachedEvent<EventArgs>('testEvent2');

  static void run() {
    test('AttachableEvent', _doIt);
  }

  static void _doIt() {
    final watcher1 = new EventWatcher<EventArgs>();
    final watcher2 = new EventWatcher<EventArgs>();

    final obj = new TestAttachedEvents();
    final h1 = _testEvent1.addHandler(obj, watcher1.handler);
    final h2 = _testEvent2.addHandler(obj, watcher2.handler);

    _testEvent1.fireEvent(obj, EventArgs.empty);
    expect(watcher1.eventCount, equals(1));
    expect(watcher2.eventCount, equals(0));

    _testEvent2.fireEvent(obj, EventArgs.empty);
    expect(watcher1.eventCount, equals(1));
    expect(watcher2.eventCount, equals(1));

    var removed = _testEvent1.removeHandler(obj, h1);
    expect(removed, isTrue);
    final h3 = _testEvent1.addHandler(obj, watcher2.handler);

    _testEvent1.fireEvent(obj, EventArgs.empty);
    expect(watcher1.eventCount, equals(1));
    expect(watcher2.eventCount, equals(2));

    // already removed, should be false
    removed = _testEvent1.removeHandler(obj, h1);
    expect(removed, isFalse);

    // never added, should be false
    removed = _testEvent1.removeHandler(obj, h2);
    expect(removed, isFalse);

    // true first time
    removed = _testEvent2.removeHandler(obj, h2);
    expect(removed, isTrue);
    // then false
    removed = _testEvent2.removeHandler(obj, h2);
    expect(removed, isFalse);

    // true first time
    removed = _testEvent1.removeHandler(obj, h3);
    expect(removed, isTrue);
    // then false
    removed = _testEvent1.removeHandler(obj, h3);
    expect(removed, isFalse);
  }
}
