#!/usr/bin/env dart --enable_type_checks --enable_asserts

#import('../vendor/unittest/vm_config.dart');

#import('core/_core_runner.dart');
#import('property/_property_runner.dart');

main() {
  useVmConfiguration();

  runCoreTests();
  runPropertyTests();
}
