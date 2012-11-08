library test_bot;

import 'dart:math' as math;
import 'package:bot/bot.dart';
import 'package:bot/test.dart';
import 'package:unittest/unittest.dart';

part 'test_cloneable.dart';
part 'test_tuple.dart';

part 'events/test_events.dart';

part 'collection/test_enumerable.dart';
part 'collection/test_number_enumerable.dart';
part 'collection/test_list_base.dart';
part 'collection/test_collection_util.dart';
part 'collection/test_array_2d.dart';

part 'test_util.dart';
part 'math/test_coordinate.dart';
part 'math/test_vector.dart';
part 'math/test_affine_transform.dart';
part 'math/test_rect.dart';
part 'graph/test_tarjan.dart';

part 'color/test_rgb_color.dart';
part 'color/test_hsl_color.dart';

part 'attached/test_property_event_integration.dart';
part 'attached/test_properties.dart';

part 'attached/test_attached_events.dart';

void runBotTests() {
  group('bot', (){
    TestTuple.run();
    TestEnumerable.run();
    TestNumberEnumerable.run();
    TestListBase.run();
    TestCollectionUtil.run();
    TestArray2d.run();

    TestCoordinate.run();
    TestBox.run();
    TestVector.run();
    TestAffineTransform.run();

    TestUtil.run();
    TestCloneable.run();
    TestEvents.run();

    TestTarjanCycleDetect.run();

    TestRgbColor.run();
    TestHslColor.run();

    group('attached', (){
      TestAttachedEvents.run();
      TestProperties.run();
      TestPropertyEventIntegration.run();
    });
  });
}
