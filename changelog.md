# Changelog - HOP task system

## 0.3.0 - (pre)

* __BREAKING__ Moved task implementations to new `hop_tasks` library

### hop_tasks
* __BREAKING__ Renamed `getTestRunner` to `createUnitTestTask`
* __BREAKING__ Renamed `getDart2jsTask` to `createDart2JsTask`

## 0.2.1 - 6 Nov 2012 (SDK r14554)

* Learned --[no-]-color option. Great for black-and-white output, line drone.io.
    * Closed [Issue #3](https://github.com/kevmoo/hop.dart/issues/3)

## 0.2.0 - 6 Nov 2012 (SDK r14554)

* __BREAKING__ Changes to align with Dart r14554.
* No changes to existing APIs.
* Lots of internal refactoring.
* Many classes are now public to allow testing.
* Good start on test coverage with related fixes

## 0.1.0 -- 1 November 2012 - (SDK r13851)

* test_runner: better output when tests fail

## 0.0.1 -- 28 October 2012 - (SDK r13851)

* Moving `hop` into its own repository.
