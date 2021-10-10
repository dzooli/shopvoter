#!/bin/bash

# Starts only the DB container

docker run \
 -v "$PWD/data":/var/lib/mysql \
 -v "$PWD/config":/etc/mysql/conf.d \
 -v "$PWD/initdb":/docker-entrypoint-initdb.d \
 -p 127.0.0.1:3306:3306 \
 -e MYSQL_ROOT_PASSWORD=test \
 -e MYSQL_DATABASE=tagger \
 -e MYSQL_USER=tagger \
 -e MYSQL_PASSWORD=tagger \
 -e MYSQL_INITDB_SKIP_TZINFO=yes \
 mysql
