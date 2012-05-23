class TestProperties implements IPropertyObject {
  HashMap<Property, Object> _properties;
  
  HashMap<Property, Object> get propertyValues(){
    return _properties;
  }
  
  TestProperties(){
    _properties = new HashMap<Property, Object>();
  }
  
  static void run(){
    group('properties', (){
      test('without default', (){
        var testProperty = new Property("Test Property");
  
        var object = new TestProperties();
        expect(testProperty.get(object)).equals(Property.Undefined);
  
        testProperty.set(object, "the foo!");
        expect(testProperty.get(object)).equals("the foo!");
  
        testProperty.clear(object);
        expect(testProperty.get(object)).equals(Property.Undefined);
  
      });
      
      test('with default', (){
        var testProperty = new Property("Test Property", 42);
  
        var object = new TestProperties();
        expect(testProperty.get(object)).equals(42);
  
        testProperty.set(object, "the foo!");
        expect(testProperty.get(object)).equals("the foo!");
  
        testProperty.clear(object);
        expect(testProperty.get(object)).equals(42);  
      });
      
      
    });
  }
  
}
