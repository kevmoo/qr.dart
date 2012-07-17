class TestPropertyEventIntegration extends PropertyObject {
  static final Property<String> _nameProperty = const Property<String>("name");
  static final Property<int> _ageProperty = const Property<int>("age", 0);

  final EventHandle<EventArgs> _nameChangedEventHandle;
  final EventHandle<EventArgs> _ageChangedEventHandle;
  final EventHandle<String> _propertyChangedEventHandle;

  TestPropertyEventIntegration() :
    _nameChangedEventHandle = new EventHandle<EventArgs>(),
    _ageChangedEventHandle = new EventHandle<EventArgs>(),
    _propertyChangedEventHandle = new EventHandle<String>()
    {

    _nameProperty.addHandler(this, (args){
      _nameChangedEventHandle.fireEvent(const EventArgs());
    });

    _ageProperty.addHandler(this, (args){
      _ageChangedEventHandle.fireEvent(const EventArgs());
    });

    propertyValues.propertyChanged.add((args){
      _propertyChangedEventHandle.fireEvent(args.name);
    });
  }

  //
  // Name property
  //
  String get name() => _nameProperty.get(this);

  void set name(String value){
    _nameProperty.set(this, value);
  }

  EventRoot<EventArgs> get nameChanged(){
    return _nameChangedEventHandle;
  }

  //
  // Age property
  //
  int get age() => _ageProperty.get(this);

  void set age(int value){
    _ageProperty.set(this, value);
  }

  EventRoot<EventArgs> get ageChanged(){
    return _ageChangedEventHandle;
  }

  //
  // Property changed event
  //
  EventRoot<String> get propertyChanged() => _propertyChangedEventHandle;

  void reset(){
    _nameProperty.clear(this);
    _ageProperty.clear(this);
  }

  static void run(){
    test('PropertyObject, EventHandle', doTest);
  }

  static void doTest(){
    var nh = new EventWatcher<EventArgs>();

    var ah = new EventWatcher<EventArgs>();

    var ph = new EventWatcher<String>();

    var obj = new TestPropertyEventIntegration();
    obj.nameChanged.add(nh.handler);
    obj.ageChanged.add(ah.handler);
    obj.propertyChanged.add(ph.handler);

    //
    // Initial checks
    //
    expect(obj.name, isNull);
    expect(obj.age, equals(0));
    expect(nh.eventCount, equals(0));
    expect(ah.eventCount, equals(0));
    expect(ph.eventCount, equals(0));
    expect(ph.lastArgs, isNull);

    obj.name = "Bob";

    //
    // Checks
    //
    expect(obj.name, equals('Bob'));
    expect(obj.age, equals(0));
    expect(nh.eventCount, equals(1));
    expect(ah.eventCount, equals(0));
    expect(ph.eventCount, equals(1));
    expect(ph.lastArgs, equals('name'));

    // NOTE: no checks for setting the same value twice
    obj.name = "Bob";

    //
    // Checks
    //
    expect(obj.name, equals('Bob'));
    expect(obj.age, equals(0));
    expect(nh.eventCount, equals(2));
    expect(ah.eventCount, equals(0));
    expect(ph.eventCount, equals(2));
    expect(ph.lastArgs, equals('name'));

    obj.age = 19;

    //
    // Checks
    //
    expect(obj.name, equals('Bob'));
    expect(obj.age, equals(19));
    expect(nh.eventCount, equals(2));
    expect(ah.eventCount, equals(1));
    expect(ph.eventCount, equals(3));
    expect(ph.lastArgs, equals('age'));

    // reset properties
    obj.reset();

    //
    // Initial checks
    //
    expect(obj.name, isNull);
    expect(obj.age, equals(0));
    expect(nh.eventCount, equals(3));
    expect(ah.eventCount, equals(2));

    // get 2 prop change events: for name and age
    expect(ph.eventCount, equals(5));

    // implementation detail
    // age is cleared 2nd in 'reset'
    expect(ph.lastArgs, equals('age'));
  }
}
