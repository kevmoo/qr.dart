#!/usr/bin/env dart --enable_type_checks --enable_asserts

/**
 * _Nothing here. This library exists just to import the other libraries
 * to make documentation generation easy._
 * You should not import this file.
 * Instead, import the individual libraries as needed.
 *
 * Related dart bug [3555](http://code.google.com/p/dart/issues/detail?id=3555)
 */
#library('dartlib_everything');

#import('dartlib.dart');
#import('test.dart');
#import('retained.dart');
#import('qr.dart');
#import('async.dart');

/**
 * Does nothing. Just here to make `dartdoc` happy.
 *
 * Related dart bug [4145](http://code.google.com/p/dart/issues/detail?id=4145)
 */
void main() {
  print('Main does nothing. Just here to make `dartdoc` happy.');
}
