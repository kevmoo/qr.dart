#library('dartlib_test_experimental');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core/_core.dart');
#import('../../lib/experimental/_experimental.dart');
#import('../../lib/test/_test.dart');

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
