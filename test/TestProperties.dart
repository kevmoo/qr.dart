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
