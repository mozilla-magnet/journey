[![Stories Done](https://badge.waffle.io/mozilla-magnet/journey.svg?label=done&title=Done)](http://waffle.io/mozilla-magnet/magnet)
[![Build Status](https://travis-ci.org/mozilla-magnet/journey.svg?branch=master)](https://travis-ci.org/mozilla-magnet/journey)

# Project Magnet

> Code name Journey

## Setup

1. Install react-native on your machine: `yarn global add react-native-cli`
2. Clone this project: `git clone git@github.com:mozilla-magnet/journey.git && cd journey`
3. Install dependencies: `yarn`
4. Start the development server: `yarn start`

## Running

### Android

With a [virtual or real device running](https://facebook.github.io/react-native/releases/0.40/docs/getting-started.html):
```bash
$ react-native run-android
```

#### Using Android Studio (OSX)

On OSX Android Studio must be launched from the command line in order to inherit `$PATH` so that a specific Gradle script inside Realm can run `npm --version`.

Attempting to build using Android Studio that has been launched via the normal OSX icon will fail to build. We've included a shortcut script to help.

```bash
$ npm run open-android-studio
```

### iOS

```bash
$ react-native run-ios
```

#### Solving the headers problem
We have found some problems in the workspace after introducing cocoapods. If your project fails to compile because the react native components are not able to compile, probably you will need to add manually the `Header search path`.

In order to do so follow this instructions:
- Go to the Libraries folder and for each dependant project
- Click on the target <project_name> > Build Settings > find Header search path
- For each project you need to enter a specific value (click once on the value):
  - For ReactNativeHeading: ```$(SRCROOT)/../../ios/Pods/Headers/Public/React/**```
  - For RNShare: ```$(SRCROOT)/../../../ios/Pods/Headers/Public/React/**```
  - For RealmReact: ```$(SRCROOT)/../../../../ios/Pods/Headers/Public/React/** $(SRCROOT)/../../../../node_modules/realm/src/** $(SRCROOT)/../../../../node_modules/realm/vendor/core-2.2.0/include/** $(SRCROOT)/../../../../node_modules/realm/vendor/**```


## How to contribute?

Install the pre-commit hook by running this command:
```bash
$ ln -s ./hooks/pre-commit.sh .git/hooks/pre-commit
```

This will ensure that no major issues on the JavaScript syntax will be committed.

## Coding styles

The coding styles are defined in the [ESLint configuration file](https://github.com/mozilla-magnet/journey/blob/master/.eslintrc.js).
Make sure to run the following command to fix your code style before committing:
```bash
$ yarn run fix
```

## Not what you're looking for?

If you're looking for a physical web beacon browsing app, go to [magnet-client](https://github.com/mozilla-magnet/magnet-client).
