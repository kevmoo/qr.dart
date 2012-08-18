#library('dartlib_test_core');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/dartlib.dart');
#import('../../lib/test.dart');

#source('test_cloneable.dart');
#source('test_tuple.dart');

#source('events/test_events.dart');

#source('collection/test_enumerable.dart');
#source('collection/test_number_enumerable.dart');
#source('collection/test_list_base.dart');
#source('collection/test_collection_util.dart');
#source('collection/test_array_2d.dart');

#source('test_util.dart');
#source('math/test_coordinate.dart');
#source('math/test_vector.dart');
#source('math/test_affine_transform.dart');
#source('math/test_rect.dart');
#source('graph/test_tarjan.dart');

#source('color/test_rgb_color.dart');
#source('color/test_hsl_color.dart');

#source('attached/test_property_event_integration.dart');
#source('attached/test_properties.dart');

#source('attached/test_attached_events.dart');

void runDartlibTests() {
  group('dartlib', (){
    TestTuple.run();
    TestEnumerable.run();
    TestNumberEnumerable.run();
    TestListBase.run();
    TestCollectionUtil.run();
    TestArray2d.run();

    TestCoordinate.run();
    TestRect.run();
    TestVector.run();
    TestAffineTransform.run();

    TestUtil.run();
    TestCloneable.run();
    TestEvents.run();

    TestTarjanCycleDetect.run();

    TestRgbColor.run();
    TestHslColor.run();

    group('attached', (){
      TestProperties.run();
      TestPropertyEventIntegration.run();
    });
  });
}
