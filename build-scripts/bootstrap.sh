#!/usr/bin/env bash

if [ -z "$TAG" ]; then
# copy the TRAVIS_TAG to the more generic 'TAG' var if TAG is empty
export TAG=$TRAVIS_TAG
fi

yarn global add react-native-cli
yarn global add s3-cli-upload

# Install project
npm install

export PATH=$PATH:./node_modules/.bin

if [[ "$BUILD_TYPE" == "android" ]];then
    echo "Bootstrapping for android"
    source ./build-scripts/android/bootstrap.sh
elif [[ "$BUILD_TYPE" == "ios" ]]; then
    echo "Bootstrapping for ios"
else
    echo "Unknown build type"
fi
