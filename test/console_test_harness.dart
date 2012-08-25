#!/usr/bin/env dart --enable_type_checks --enable_asserts

#import('package:unittest/vm_config.dart');

#import('dartlib/_dartlib_runner.dart');
#import('qr/_qr_runner.dart');
#import('async/_async_runner.dart');

main() {
  useVmConfiguration();

  runDartlibTests();
  runAsyncTests();
  runQrTests();
}
