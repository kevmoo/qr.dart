class TestPropertyEventIntegration implements IPropertyObject {
  static final Property<String> _nameProperty = const Property<String>("name");
  static final Property<int> _ageProperty = const Property<int>("age", 0);
  
  final PropertyValues propertyValues;
  final EventHandle<EventArgs> _nameChangedEventHandle;
  final EventHandle<EventArgs> _ageChangedEventHandle;
  final EventHandle<String> _propertyChangedEventHandle;

  TestPropertyEventIntegration() : 
    propertyValues = new PropertyValues(),
    _nameChangedEventHandle = new EventHandle<EventArgs>(),
    _ageChangedEventHandle = new EventHandle<EventArgs>(),
    _propertyChangedEventHandle = new EventHandle<String>()
    {
    
    _nameProperty.addHandler(this, (sender, args){
      _nameChangedEventHandle.fireEvent(this, const EventArgs());
    });
    
    _ageProperty.addHandler(this, (sender, args){
      _ageChangedEventHandle.fireEvent(this, const EventArgs());
    });
    
    propertyValues.propertyChanged.add((sender, args){
      _propertyChangedEventHandle.fireEvent(this, args.name);
    });
  }

  //
  // Name property
  //
  String get name(){
    return _nameProperty.get(this);
  }
  
  void set name(String value){
    _nameProperty.set(this, value);
  }
  
  IEvent<EventArgs> get nameChanged(){
    return _nameChangedEventHandle.event;
  }
  
  //
  // Age property
  //
  int get age(){
    return _ageProperty.get(this);
  }
  
  void set age(int value){
    _ageProperty.set(this, value);
  }
  
  IEvent<EventArgs> get ageChanged(){
    return _ageChangedEventHandle.event;
  }

  //
  // Property changed event
  //
  IEvent<String> get propertyChanged(){
    return _propertyChangedEventHandle.event;
  }
  
  void reset(){
    _nameProperty.clear(this);
    _ageProperty.clear(this);
  }
  
  static void run(){
    test('TestPropertyEventIntegration', doTest);
  }
  
  static void doTest(){
    int nc = 0;
    int ac = 0;
    int pc = 0;
    String lastChanged = null;
    
    EventHandler<EventArgs> nh = (sender, args) {
      nc++;
    };
    
    EventHandler<EventArgs> ah = (sender, args) {
      ac++;
    };

    EventHandler<String> ph = (sender, args) {
      pc++;
      lastChanged = args;
    };

    var obj = new TestPropertyEventIntegration();
    obj.nameChanged.add(nh);
    obj.ageChanged.add(ah);
    obj.propertyChanged.add(ph);
    
    //
    // Initial checks
    //
    expect(obj.name).equals(null);
    expect(obj.age).equals(0);
    expect(nc).equals(0);
    expect(ac).equals(0);
    expect(pc).equals(0);
    expect(lastChanged).equals(null);

    obj.name = "Bob";
    
    //
    // Checks
    //
    expect(obj.name).equals('Bob');
    expect(obj.age).equals(0);
    expect(nc).equals(1);
    expect(ac).equals(0);
    expect(pc).equals(1);
    expect(lastChanged).equals('name');

    // NOTE: no checks for setting the same value twice
    obj.name = "Bob";
    
    //
    // Checks
    //
    expect(obj.name).equals('Bob');
    expect(obj.age).equals(0);
    expect(nc).equals(2);
    expect(ac).equals(0);
    expect(pc).equals(2);
    expect(lastChanged).equals('name');

    obj.age = 19;
    
    //
    // Checks
    //
    expect(obj.name).equals('Bob');
    expect(obj.age).equals(19);
    expect(nc).equals(2);
    expect(ac).equals(1);
    expect(pc).equals(3);
    expect(lastChanged).equals('age');

    // reset properties
    obj.reset();

    //
    // Initial checks
    //
    expect(obj.name).equals(null);
    expect(obj.age).equals(0);
    expect(nc).equals(3);
    expect(ac).equals(2);
    
    // get 2 prop change events: for name and age 
    expect(pc).equals(5);

    // implementation detail
    // age is cleared 2nd in 'reset'
    expect(lastChanged).equals('age');
  }
}
