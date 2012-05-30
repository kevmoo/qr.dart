class TestProperties implements IPropertyObject {
  final PropertyValues propertyValues;

  TestProperties() : propertyValues = new PropertyValues();
  
  static void run(){
    group('properties -- ', (){
      test('without default', (){
        var testProperty = new Property("Test Property");

        var object = new TestProperties();
        expect(testProperty.get(object)).equals(null);
        expect(testProperty.getCore(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);

        testProperty.set(object, "the foo!");
        expect(testProperty.get(object)).equals("the foo!");
        expect(testProperty.isSet(object)).equals(true);

        testProperty.clear(object);
        expect(testProperty.get(object)).equals(null);
        expect(testProperty.getCore(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);

      });

      test('with listeners', (){
        var testProperty = new Property<String>("Test Property");

        var object = new TestProperties();
        expect(testProperty.get(object)).equals(null);
        expect(testProperty.getCore(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);

        var h1 = new EventWatcher<Property>();
        
        // set handler 1 on prop
        var g1 = testProperty.addHandler(object, h1.handler);
        expect(h1.eventCount).equals(0);

        // set prop
        testProperty.set(object, "the foo!");
        // - should fire
        expect(h1.eventCount).equals(1);

        // clear prop
        testProperty.clear(object);
        // - should fire
        expect(h1.eventCount).equals(2);

        // define handler 2 + set handler
        var h2 = new EventWatcher<Property>();

        // set handler 1 on prop
        var g2 = testProperty.addHandler(object, h2.handler);
        expect(h2.eventCount).equals(0);

        // set prop
        testProperty.set(object, "the foo!");
        // - should fire both handlers
        expect(h1.eventCount).equals(3);
        expect(h2.eventCount).equals(1);

        // remove handler 1
        testProperty.removeHandler(object, g1);
        // clear prop
        testProperty.clear(object);
        // should fire h2, but not h1
        expect(h1.eventCount).equals(3);
        expect(h2.eventCount).equals(2);

        // remove handler 2
        testProperty.removeHandler(object, g2);
        // set prop
        testProperty.set(object, "the bar!");
        // should not fire either handler
        expect(h1.eventCount).equals(3);
        expect(h2.eventCount).equals(2);        
      });

      test('with default', (){
        var testProperty = new Property<int>("Test Property", 42);

        var object = new TestProperties();
        expect(testProperty.get(object)).equals(42);
        expect(testProperty.getCore(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);

        testProperty.set(object, 57);
        expect(testProperty.get(object)).equals(57);
        expect(testProperty.getCore(object)).equals(57);
        expect(testProperty.isSet(object)).equals(true);

        testProperty.clear(object);
        expect(testProperty.get(object)).equals(42);
        expect(testProperty.getCore(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);
      });
    });
  }
}
