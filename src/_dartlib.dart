#library('dartlib');

#import('dart:html');

#source('internal/_SimpleSet.dart');

#source('GlobalId.dart');
#source('events/IEvent.dart');
#source('events/EventHandle.dart');
#source('IDisposable.dart');
#source('Disposable.dart');

#source('properties/IPropertyObject.dart');
#source('properties/PropertyObject.dart');
#source('properties/PropertyValues.dart');
#source('properties/Property.dart');

#source('math/Size.dart');
#source('math/Coordinate.dart');
#source('math/Vec2.dart');
#source('math/PRect.dart');

#source('graphics/AffineTransform.dart');
#source('graphics/gfx.dart');

#source('retained/RetainedDebug.dart');
#source('retained/Mouse.dart');
#source('retained/CanvasUtil.dart');
#source('retained/RetainedUtil.dart');
#source('retained/PElement.dart');
#source('retained/IElementParent.dart');
#source('retained/Panel.dart');
#source('retained/PCanvas.dart');
#source('retained/Stage.dart');
#source('retained/Shape.dart');
#source('retained/ShapeType.dart');

typedef bool Predicate<T>(T obj);
typedef T Func<T>();
typedef TR Func1<T1, TR>(T1 param);
