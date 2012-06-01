#library('dartlib');

#import('dart:html');

#source('internal/_simple_set.dart');

#source('global_id.dart');
#source('events/event.dart');
#source('events/event_handle.dart');
#source('disposable.dart');

#source('properties/property_object.dart');
#source('properties/property_values.dart');
#source('properties/property.dart');

#source('math/size.dart');
#source('math/coordinate.dart');
#source('math/vec2.dart');
#source('math/prect.dart');

#source('graphics/affine_transform.dart');
#source('graphics/gfx.dart');

#source('retained/retained_debug.dart');
#source('retained/mouse.dart');
#source('retained/canvas_util.dart');
#source('retained/retained_util.dart');
#source('retained/pelement.dart');
#source('retained/element_parent.dart');
#source('retained/panel.dart');
#source('retained/pcanvas.dart');
#source('retained/stage.dart');
#source('retained/shape.dart');
#source('retained/shape_type.dart');

typedef bool Predicate<T>(T obj);
typedef T Func<T>();
typedef TR Func1<T1, TR>(T1 param);
