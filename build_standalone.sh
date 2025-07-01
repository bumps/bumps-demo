#!/bin/sh

HERE=$(pwd)
BUMPS_DIR=$HERE/bumps
TARGET=$HERE/public/wheels
export BUILD_EXTENSION=True

cd $BUMPS_DIR && pyodide build

cd $HERE
mkdir -p $TARGET
cp $BUMPS_DIR/dist/*.whl $TARGET

npm run build -- --sourcemap
