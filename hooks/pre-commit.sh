#!/bin/bash

cd "$(git rev-parse --show-toplevel)"
ESLINT="node_modules/.bin/eslint"
pwd

if [[ ! -x "$ESLINT" ]]; then
  printf "\t\033[41mPlease run `yarn`.\033[0m\n"
  exit 1
fi

STAGED_FILES=($(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\?$"))

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

$ESLINT "${STAGED_FILES[@]}" --fix

ESLINT_EXIT="$?"

# Re-add files since they may have been fixed
git add "${STAGED_FILES[@]}"

if [[ "${ESLINT_EXIT}" != 0 ]]; then
  printf "\n\033[41mCommit failed:\033[0m fix linting errors and try again.\n"
  exit 1
fi

exit $?
