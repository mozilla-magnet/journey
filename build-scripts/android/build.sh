#!/usr/bin/env bash

cd android

# check our app source code
./gradlew app:check

if [[ $BUILD_RELEASE == 1 ]]; then
    ./gradlew assembleRelease --info --console plain | tee
else
    # exclude lint task as already done above
    ./gradlew build -x lint --info --console plain | tee
fi

cd -
