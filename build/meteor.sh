#!/bin/bash

docker run --rm -it \
    -v "$(pwd)":/app \
    -v meteor-packages:/root/.meteor/packages \
    anh4n/meteor:1.8.1 $@
