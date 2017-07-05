#!/bin/bash
# Patterned after https://github.com/bioperl/bioperl-live/blob/master/travis_scripts/trigger-dockerhub.sh

set -e
dockerapi="https://registry.hub.docker.com/u/dukegcb/bespin-web/trigger"


if [[ -z "$DOCKERHUB_TOKEN" ]] ; then
    echo "No API token for Docker Hub, add to repository settings."
    exit 1
fi

echo "Triggering rebuild of Docker image dukegcb/bespin-web:latest"
    curl -H "Content-Type: application/json" \
         --data '{"docker_tag": "latest"}' \
         -X POST $dockerapi/$DOCKERHUB_TOKEN/
