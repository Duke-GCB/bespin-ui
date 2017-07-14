#!/bin/bash

if [ "$1" == "" ]; then
  >&2 echo "Usage: $0 branch-name"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "$1" ]; then
  >&2 echo "Error: Not on '$1'"
  exit 1
fi
