#library('dartlib_test_core');

#import('../../vendor/unittest/unittest.dart');
#import('../../lib/core/_core.dart');
#import('../../lib/test/_test.dart');

#source('test_cloneable.dart');
#source('test_events.dart');
#source('math/test_coordinate.dart');
#source('math/test_vector.dart');

void runCoreTests() {
  group('core -- ', (){
    TestCloneable.run();
    TestEvents.run();
    TestCoordinate.run();
    TestVector.run();
  });
}
