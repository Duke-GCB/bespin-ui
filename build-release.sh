#!/bin/bash

set -e

export JOB_WATCHER_URL="wss://bespin-ws-dev.gcb.duke.edu"
ember build --environment production
cd dist && tar -zcvf ../bespin-ui.tar.gz * && cd ..
