#!/usr/bin/env bash

cd android

# check our app source code
./gradlew app:check
./gradlew assembleRelease --info --console plain | tee

cd -
