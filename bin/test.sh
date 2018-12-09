#!/bin/bash

cd "$(dirname $0)/.."

echo -e "Kid Log Test"
docker-compose up -d --force-recreate redis rabbit mongo log || exit $?
docker-compose exec log npm install
docker-compose exec log npm test
docker-compose down