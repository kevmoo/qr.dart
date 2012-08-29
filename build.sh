#!/bin/bash
PACK_DIR=`pwd`/packages/
echo $DART_SDK
dart2js='lib/dart2js/lib/compiler/implementation/dart2js.dart'
core_cmd="dart
--heap_growth_rate=32
--package-root=$PACK_DIR
$DART_SDK/$dart2js
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

echo $good

for file in `find . -type f -name *_demo.dart`
do
  build $file
  if [ $? -ne 0 ]
  then 
    bad[${#bad[*]}]=$file
  else
    good[${#good[*]}]=$file
  fi
done

echo "Success:"
echo ${good[@]}

echo "Failure:"
echo ${bad[@]}
