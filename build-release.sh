#!/bin/bash

set -e

export JOB_WATCHER_URL="ws://bespin-ws.genome.duke.edu"
ember build --environment production
cd dist && tar -zcvf ../bespin-ui.tar.gz * && cd ..
