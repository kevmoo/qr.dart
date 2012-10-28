# Changelog - Dart Bag of Tricks

## 0.4.0 -- 25 October 2012

### Bot

* __BREAKING__ Changes to align with new Sequence types

## 0.3.0 -- 24 October 2012

* __BREAKING__ Changes to align with Dart integration build v13851 

## 0.2.1 -- 22 October 2012

* Moved `hop` files into `tool` dir. These are for devs working with `bot.dart` not end users.

## 0.2.0 -- 21 October 2012

* Aligned with M1 build of Dart v13679

### Retained - *Breaking Changes*
* `PElement.draw` renamed to `_stageDraw`
* `PElement.updated` event removed
* Renamed `ElementParentImpl` to `ParentElement`
* Moved logic for handling children from `PElement` to `ParentElement`

### Bot
* `DetailedIllegalArgumentException` ctor is now `const`
* Removed private `_SimpleSet`. Not used.

### Hop - *New*
* An attempt to create a process management system similiar to [Rake](http://rake.rubyforge.org/) in the Ruby world or [Cake](http://coffeescript.org/#cake) in the CoffeeScript world.
* Moved `test`, `dart2js`, and `docs` to this new system.
* Naming: A play off frog. Which is a play off dart. As in "dart frog" and "frog hop". Yeah a stretch, but it's short.

## 0.1.0 - 16 October 2012

* Aligned with M1 build of Dart v13679
