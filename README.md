# kid-log

Kid Log service

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
{ status: true }
    ✓ Go to status services (40ms)


  1 passing (50ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |      100 |      100 |      100 |      100 |                   |
 app.js   |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
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