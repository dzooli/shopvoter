#!/bin/bash

docker run \
 -v "$PWD/data":/var/lib/mysql \
 -v "$PWD/config":/etc/mysql/conf.d \
 -v "$PWD/initdb":/docker-entrypoint-initdb.d \
 -p 127.0.0.1:3306:3306 \
 -e MYSQL_ROOT_PASSWORD=test \
 -e MYSQL_DATABASE=sakila \
 -e MYSQL_USER=sakila \
 -e MYSQL_PASSWORD=sakila \
 -e MYSQL_INITDB_SKIP_TZINFO=yes \
 mysql
