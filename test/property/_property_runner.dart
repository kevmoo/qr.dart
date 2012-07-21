#library('dartlib_test_property');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core.dart');
#import('../../lib/property.dart');
#import('../../lib/test.dart');

#source('test_property_event_integration.dart');
#source('test_properties.dart');

void runPropertyTests() {
  group('properties', (){
    TestProperties.run();
    TestPropertyEventIntegration.run();
  });
}
