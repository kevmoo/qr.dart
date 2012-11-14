# Changelog - HOP task system

## 0.3.0 - *pre-release* (SDK r14873)

* __BREAKING__ Moved task implementations to new `hop_tasks` library
* Updated `bot` version to 0.6.0 - *pre-release*
* __NEW__ Added task for creating git branches from a directry.

### hop

* __BREAKING__ `Tasks.taskNames` is only accessible after freeze
* `Tasks.taskNames` is now a sorted `SequenceCollection` 
	-- [Issue #4](https://github.com/kevmoo/hop.dart/issues/4)
* __BREAKING__ Removed `ReturnCode` -- not using it anyway
* __BREAKING__ `Runner.run` returns a `Future<int>` with output values 
	corresponding to exit codes. (Non-zero is error, etc.)
* __BREAKING__ `runHopCore` now calls `io.exit` with exit code
	-- [Issue #2](https://github.com/kevmoo/hop.dart/issues/2)

### hop_tasks
* __BREAKING__ Renamed `getTestRunner` to `createUnitTestTask`
* __BREAKING__ Renamed `getDart2jsTask` to `createDart2JsTask`
* __BREAKING__ Renamed `runProcess` to `startProcess`
* __NEW__ Added `createStartProcessTask`

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
