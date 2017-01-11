#!/usr/bin/env bash

export ARTIFACT=android/app/build/outputs/apk/app-release.apk

echo "Building release? $BUILD_RELEASE"

if [[ $BUILD_RELEASE == 1 ]]; then
    # Get the release keystore from the keystore service
    s3 download eu-west-2/project-magnet-journey-ci-dependencies/journey-release.keystore ./

    mkdir -p ~/.gradle
    echo "RELEASE_STORE_FILE=`pwd`/journey-release.keystore" > ~/.gradle/gradle.properties
    echo "RELEASE_KEY_ALIAS=journey_release" >> ~/.gradle/gradle.properties
    echo "RELEASE_KEY_PASSWORD=${RELEASE_KEY_PASSWORD}" >> ~/.gradle/gradle.properties
    echo "RELEASE_STORE_PASSWORD=${RELEASE_STORE_PASSWORD}" >> ~/.gradle/gradle.properties
fi
