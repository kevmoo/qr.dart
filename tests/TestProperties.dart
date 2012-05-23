class TestProperties implements IPropertyObject {
  final HashMap<Property, Object> propertyValues;
  
  TestProperties() : propertyValues = new HashMap<Property, Object>();
  
  static void run(){
    group('properties', (){
      test('without default', (){
        var testProperty = new Property("Test Property");
  
        var object = new TestProperties();
        expect(testProperty.get(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);
  
        testProperty.set(object, "the foo!");
        expect(testProperty.get(object)).equals("the foo!");
        expect(testProperty.isSet(object)).equals(true);
  
        testProperty.clear(object);
        expect(testProperty.get(object)).equals(Property.Undefined);
        expect(testProperty.isSet(object)).equals(false);
  
      });
      
      test('with default', (){
        var testProperty = new Property("Test Property", 42);
  
        var object = new TestProperties();
        expect(testProperty.get(object)).equals(42);
        expect(testProperty.isSet(object)).equals(false);
  
        testProperty.set(object, "the foo!");
        expect(testProperty.get(object)).equals("the foo!");
        expect(testProperty.isSet(object)).equals(true);
  
        testProperty.clear(object);
        expect(testProperty.get(object)).equals(42);  
        expect(testProperty.isSet(object)).equals(false);
      });
      
      
    });
  }
  
}
