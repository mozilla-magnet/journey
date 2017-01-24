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

### iOS

```bash
$ react-native run-ios
```

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
