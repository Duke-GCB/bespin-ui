#!/bin/bash

set -e

export JOB_WATCHER_URL="ws://10.16.72.71"
ember build --environment production
cd dist && tar -zcvf ../bespin-ui.tar.gz * && cd ..
