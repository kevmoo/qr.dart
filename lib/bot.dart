#library('bot');

#import("dart:coreimpl");
#import('dart:math', prefix:'math');

#source('bot/typedefs.dart');

#source('bot/internal/_simple_set.dart');

#source('bot/cloneable.dart');
#source('bot/disposable.dart');
#source('bot/disposable_impl.dart');
#source('bot/global_id.dart');

#source('bot/tuple.dart');
#source('bot/tuple3.dart');

#source('bot/exceptions/null_argument_exception.dart');
#source('bot/exceptions/invalid_operation_exception.dart');
#source('bot/exceptions/detailed_illegal_argument_exception.dart');

#source('bot/requires.dart');
#source('bot/util.dart');

#source('bot/collection/enumerable.dart');
#source('bot/collection/number_enumerable.dart');
#source('bot/collection/collection_util.dart');
#source('bot/collection/index_iterator.dart');
#source('bot/collection/list_base.dart');
#source('bot/collection/read_only_collection.dart');
#source('bot/collection/grouping.dart');
#source('bot/collection/array_2d.dart');

#source('bot/events/event.dart');
#source('bot/events/event_handle.dart');
#source('bot/events/event_args.dart');
#source('bot/events/cancelable_event_args.dart');

#source('bot/math/math_functions.dart');
#source('bot/math/size.dart');
#source('bot/math/coordinate.dart');
#source('bot/math/vector.dart');
#source('bot/math/rect.dart');
#source('bot/math/affine_transform.dart');
#source('bot/math/bungee_num.dart');

#source('bot/color/rgb_color.dart');
#source('bot/color/hsl_color.dart');
#source('bot/color/husl_converter.dart');

#source('bot/graph/tarjan_cycle_detect.dart');

#source('bot/attached/attachable.dart');
#source('bot/attached/attachable_object.dart');
#source('bot/attached/property.dart');
#source('bot/attached/attached_event.dart');
