#library('dartlib_test_experimental');

#import('../../lib/unittest/unittest.dart');
#import('../../src/core/_core.dart');
#import('../../src/experimental/_experimental.dart');
#import('../../src/test/_test.dart');

#source('test_property_event_integration.dart');
#source('test_properties.dart');
#source('test_affine_transform.dart');

void runExperimentalTests() {
  group('experimental -- ', (){
    TestProperties.run();
    TestAffineTransform.run();
    TestPropertyEventIntegration.run();
  });
}
