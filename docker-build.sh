#!/bin/bash

docker run -ti --rm -v $(pwd):/myapp danlynn/ember-cli:2.11.0 ember build --environment production --output-path dist-docker/
docker build -t quay.io/dukegcb/bespin-ui .
