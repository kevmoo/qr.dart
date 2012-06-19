#library('dartlib_test_core');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core.dart');
#import('../../lib/test.dart');

#source('test_list_base.dart');
#source('test_select_many.dart');
#source('test_cloneable.dart');
#source('test_events.dart');
#source('test_grouping.dart');
#source('test_collection_util.dart');
#source('test_util.dart');
#source('math/test_coordinate.dart');
#source('math/test_vector.dart');
#source('math/test_affine_transform.dart');
#source('test_property_event_integration.dart');
#source('test_properties.dart');

void runCoreTests() {
  group('core', (){
    TestListBase.run();
    TestSelectMany.run();
    TestGrouping.run();

    TestCoordinate.run();
    TestVector.run();
    TestAffineTransform.run();
    TestCollectionUtil.run();

    TestUtil.run();
    TestCloneable.run();
    TestEvents.run();
    TestProperties.run();
    TestPropertyEventIntegration.run();
  });
}
