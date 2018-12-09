# kid-log

Kid Log service

## Instalation

```console
npm install
```

## Run service

```console
npm start
```

Develop enviroment:

```console
$ docker-compose up
Starting kidlog_redis_1 ... done
Starting kidlog_rabbit_1 ... done
Starting kidlog_mongo_1 ... done
Creating kidlog_log_1    ... done
Attaching to kidlog_rabbit_1, kidlog_redis_1, kidlog_mongo_1, kidlog_log_1

[...]

log_1     | [nodemon] 1.18.4
log_1     | [nodemon] to restart at any time, enter `rs`
log_1     | [nodemon] watching: *.*
log_1     | [nodemon] starting `node start.js`
log_1     | 2018-12-09T19:54:39.164Z app:start Express is running on port 3000
```

## Test

```console
npm test
```