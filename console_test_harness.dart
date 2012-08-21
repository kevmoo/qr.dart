#!/usr/bin/env dart --enable_type_checks --enable_asserts

#import('package:unittest/vm_config.dart');

#import('test/dartlib/_dartlib_runner.dart');
#import('test/qr/_qr_runner.dart');
#import('test/async/_async_runner.dart');

main() {
  useVmConfiguration();

  runDartlibTests();
  runAsyncTests();
  runQrTests();
}
