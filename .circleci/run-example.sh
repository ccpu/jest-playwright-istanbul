#!/usr/bin/env bash

set -ex

root=$(pwd)
cd $1
yarn install
cp -f /tmp/lib/* ./node_modules/jest-playwright-istanbul/lib/
yarn dev &
sleep 5
yarn test
COVERAGE_JSON_PATH='./coverage_result/coverage-summary.json' $root/.circleci/check-example-result.js
