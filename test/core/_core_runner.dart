#library('dartlib_test_core');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core.dart');
#import('../../lib/test.dart');

#source('test_cloneable.dart');
#source('test_events.dart');
#source('test_collection_util.dart');
#source('test_util.dart');
#source('math/test_coordinate.dart');
#source('math/test_vector.dart');

void runCoreTests() {
  group('core -- ', (){
    TestCloneable.run();
    TestEvents.run();
    TestCoordinate.run();
    TestVector.run();
    TestCollectionUtil.run();
    TestUtil.run();
  });
}
