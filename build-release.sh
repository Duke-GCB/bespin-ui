#!/bin/bash

set -e

export JOB_WATCHER_URL="wss://bespin-ws-prod.gcb.duke.edu"
ember build --environment production
cd dist && tar -zcvf ../bespin-ui-prod.tar.gz * && cd ..
rm -rf dist

export JOB_WATCHER_URL="wss://bespin-ws-dev.gcb.duke.edu"
ember build --environment production
cd dist && tar -zcvf ../bespin-ui-dev.tar.gz * && cd ..
