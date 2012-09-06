#!/bin/bash
PACK_DIR=`pwd`/packages/
dart2js='lib/compiler/implementation/dart2js.dart'
core_cmd="dart
--heap_growth_rate=32
$DART_SDK/$dart2js
--colors
--package-root=$PACK_DIR
--minify
-v"

function build {
  echo "Building $1"
  local cmd="$core_cmd --out=$1.js $1"
  echo $cmd
  eval $cmd
}

good=()
bad=()

function build_and_log {
  build $1
  if [ $? -ne 0 ]
  then 
    bad[${#bad[*]}]=$1
  else
    good[${#good[*]}]=$1
  fi  
}

for file in `find . -type f -name *_demo.dart`
do
  echo $file
  build_and_log $file
done

build_and_log 'test/browser_test_harness.dart'

echo "Success:"
echo ${good[@]}

echo "Failure:"
echo ${bad[@]}
