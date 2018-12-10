#!/bin/bash

cd "$(dirname $0)/.."

echo -e "Kid Log Test"
docker-compose up -d --force-recreate redis rabbit mongo api || exit $?
docker-compose exec api npm install
docker-compose exec api npm test
docker-compose down