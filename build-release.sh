#!/bin/bash

set -e

ember build --environment production
cd dist && tar -zcvf ../bespin-ui.tar.gz * && cd ..
