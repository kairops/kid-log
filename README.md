# Kid-Logger Service

Kid Logger service

## Dev enviroment

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
$ bin/test.sh
Kid Log Test
Creating kidlog_redis_1  ... done
Creating kidlog_mongo_1  ... done
Creating kidlog_rabbit_1 ... done
Creating kidlog_log_1    ... done
npm WARN kid-log@0.1.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

audited 7405 packages in 7.68s
found 0 vulnerabilities


> kid-log@0.1.0 test /opt/app
> nyc --reporter=lcov mocha --exit --timeout 10000



  Status
2018-12-26T19:17:10.184Z app:mongodb Mongoose connection open on mongodb://mongo:27017/app
2018-12-26T19:17:10.203Z app:routers:status { status: true,
  data: { redis: true, mongodb: true, rabbit: false } }
    ✓ Go to status services

  Log
2018-12-26T19:17:10.222Z app:rabbit connected
2018-12-26T19:17:10.229Z app:rabbit Worker is started log-queue
2018-12-26T19:17:10.245Z app:rabbit Rabbit not connected...
2018-12-26T19:17:10.252Z app:rabbit Message published log-queue
2018-12-26T19:17:10.253Z app:routers:job Get job state: d7acac20-0942-11e9-a24c-ed3f86a5ebba PUBLISH null
    ✓ Create Log register


  2 passing (97ms)

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    73.71 |     37.5 |    61.76 |       75 |                   |
 app            |      100 |      100 |      100 |      100 |                   |
  app.js        |      100 |      100 |      100 |      100 |                   |
 app/managers   |       50 |        0 |    33.33 |    54.55 |                   |
  logManager.js |       50 |        0 |    33.33 |    54.55 |       7,8,9,10,11 |
 app/models     |      100 |      100 |      100 |      100 |                   |
  logModel.js   |      100 |      100 |      100 |      100 |                   |
 app/routers    |     87.5 |       40 |       80 |    89.74 |                   |
  job.js        |    84.62 |       50 |      100 |    84.62 |              9,14 |
  log.js        |       80 |        0 |       50 |    85.71 |             11,12 |
  status.js     |      100 |       50 |      100 |      100 |             12,13 |
 app/services   |    66.67 |    45.83 |    61.54 |    67.24 |                   |
  mongodb.js    |    77.78 |      100 |       60 |    77.78 |       16,17,20,21 |
  rabbit.js     |    61.36 |    45.83 |    61.11 |     61.9 |... 10,115,116,117 |
  redis.js      |    85.71 |      100 |    66.67 |    85.71 |             11,12 |
----------------|----------|----------|----------|----------|-------------------|

Stopping kidlog_log_1    ... done
Stopping kidlog_mongo_1  ... done
Stopping kidlog_rabbit_1 ... done
Stopping kidlog_redis_1  ... done
Removing kidlog_log_1    ... done
Removing kidlog_mongo_1  ... done
Removing kidlog_rabbit_1 ... done
Removing kidlog_redis_1  ... done
Removing network kidlog_default

```

## Create changelog file

To create [changelog](changelog.md) file, run:

```console
$ bin/changelog.sh
```