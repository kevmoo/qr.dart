class TestProperties extends PropertyObject {

  static void run(){
    group('properties -- ', (){
      test('without default', (){
        var testProperty = new Property("Test Property");

        var object = new TestProperties();
        expect(testProperty.get(object), isNull);
        expect(testProperty.getCore(object), equals(Property.Undefined));
        expect(testProperty.isSet(object), isFalse);

        testProperty.set(object, "the foo!");
        expect(testProperty.get(object), equals("the foo!"));
        expect(testProperty.isSet(object), isTrue);

        testProperty.clear(object);
        expect(testProperty.get(object), isNull);
        expect(testProperty.getCore(object), equals(Property.Undefined));
        expect(testProperty.isSet(object), isFalse);
      });

      test('with factories', (){
        var prop = new Property<int>("withoutDefault");
        testFactories(prop, 43, 18);
        testFactories(prop, 43, null);
        testFactories(prop, null, 18);
        testFactories(prop, null, null);

        prop = new Property<int>("withDefault", 24);
        testFactories(prop, 43, 18);
        testFactories(prop, 43, 24);
        testFactories(prop, 43, null);
        testFactories(prop, null, 18);
        testFactories(prop, null, 24);
        testFactories(prop, null, null);
        testFactories(prop, 24, 18);
        testFactories(prop, 24, 24);
        testFactories(prop, 24, null);
      });

      test('with listeners', (){
        var testProperty = new Property<String>("Test Property");

        var object = new TestProperties();
        expect(testProperty.get(object), isNull);
        expect(testProperty.getCore(object), equals(Property.Undefined));
        expect(testProperty.isSet(object), isFalse);

        var h1 = new EventWatcher<Property>();

        // set handler 1 on prop
        var g1 = testProperty.addHandler(object, h1.handler);
        expect(h1.eventCount, equals(0));

        // set prop
        testProperty.set(object, "the foo!");
        // - should fire
        expect(h1.eventCount, equals(1));

        // clear prop
        testProperty.clear(object);
        // - should fire
        expect(h1.eventCount, equals(2));

        // define handler 2 + set handler
        var h2 = new EventWatcher<Property>();

        // set handler 1 on prop
        var g2 = testProperty.addHandler(object, h2.handler);
        expect(h2.eventCount, equals(0));

        // set prop
        testProperty.set(object, "the foo!");
        // - should fire both handlers
        expect(h1.eventCount, equals(3));
        expect(h2.eventCount, equals(1));

        // remove handler 1
        testProperty.removeHandler(object, g1);
        // clear prop
        testProperty.clear(object);
        // should fire h2, but not h1
        expect(h1.eventCount, equals(3));
        expect(h2.eventCount, equals(2));

        // remove handler 2
        testProperty.removeHandler(object, g2);
        // set prop
        testProperty.set(object, "the bar!");
        // should not fire either handler
        expect(h1.eventCount, equals(3));
        expect(h2.eventCount, equals(2));
      });

      test('with default', (){
        var testProperty = new Property<int>("Test Property", 42);

        var object = new TestProperties();
        expect(testProperty.get(object), equals(42));
        expect(testProperty.getCore(object), equals(Property.Undefined));
        expect(testProperty.isSet(object), isFalse);

        testProperty.set(object, 57);
        expect(testProperty.get(object), equals(57));
        expect(testProperty.getCore(object), equals(57));
        expect(testProperty.isSet(object), isTrue);

        testProperty.clear(object);
        expect(testProperty.get(object), equals(42));
        expect(testProperty.getCore(object), equals(Property.Undefined));
        expect(testProperty.isSet(object), isFalse);
      });
    });
  }

  static void testFactories(Property<int> prop, int setValue, int propFactoryValue){
    var wodWatcher = new EventWatcher<Property>();
    var propWatcher = new EventWatcher<Property>();

    var object = new TestProperties();

    prop.addHandler(object, wodWatcher.handler);
    object.propertyValues.propertyChanged.add(propWatcher.handler);

    //
    // Checks
    //
    expect(prop.get(object), equals(prop.defaultValue));
    expect(prop.getCore(object), equals(Property.Undefined));
    expect(propWatcher.eventCount, equals(0));
    expect(wodWatcher.eventCount, equals(0));

    // set normally
    prop.set(object, setValue);

    //
    // Checks
    //
    expect(prop.get(object), equals(setValue));
    expect(prop.getCore(object), equals(setValue));
    expect(propWatcher.eventCount, equals(1));
    expect(wodWatcher.eventCount, equals(1));

    // get w/ factory should not change the value
    var propFactory = (IPropertyObject obj){
      return propFactoryValue;
    };

    //
    // Checks
    //
    expect(prop.get(object, propFactory), equals(setValue));
    expect(prop.getCore(object), equals(setValue));
    expect(propWatcher.eventCount, equals(1));
    expect(wodWatcher.eventCount, equals(1));

    // clear then factory should do fun things, though
    prop.clear(object);

    //
    // Checks
    //
    expect(propWatcher.eventCount, equals(2));
    expect(wodWatcher.eventCount, equals(2));
    expect(prop.get(object), equals(prop.defaultValue));
    expect(prop.getCore(object), equals(Property.Undefined));

    // call get w/ the propFactory
    expect(prop.get(object, propFactory), equals(propFactoryValue));
    expect(prop.getCore(object), equals(propFactoryValue));

    // NOTE: get w/ a factory (if the factory sets the value)
    //       DOES cause property change events
    expect(propWatcher.eventCount, equals(3));
    expect(wodWatcher.eventCount, equals(3));
  }
}
