#library('dartlib_test_core');

#import('../../lib/unittest/unittest.dart');
#import('../../src/core/_core.dart');
#import('../../src/test/_test.dart');

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
