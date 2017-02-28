#!/bin/bash

set -e

ember build --environment production --output-path dist-docker/
docker build -t quay.io/dukegcb/bespin-ui .
docker push quay.io/dukegcb/bespin-ui
