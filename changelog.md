# Changelog

## 0.2.0 -- 21 October 2012

* Aligned with M1 build of Dart v13679

### Retained - *Breaking Changes*
* `PElement.draw` renamed to `_stageDraw`
* `PElement.updated` event removed
* Renamed `ElementParentImpl` to `ParentElement`
* Moved logic for handling children from `PElement` to `ParentElement`

###Bot
* `DetailedIllegalArgumentException` ctor is now `const`
* Removed private `_SimpleSet`. Not used.

## 0.1.0 - 16 October 2012

* Aligned with M1 build of Dart v13679
