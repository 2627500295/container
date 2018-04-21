# mariadb

### Option
```
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]

Options:
--name=[CONTAINER_NAME]
--hostname=[CONTAINER_HOSTNAME]
--publish [HOST_PORT]:[CONTAINER_PORT]
--volume [HOST_DIR]:[CONTAINER_DIR]
--volume-form [CONTAINER_NAME][:(rw|ro)]
--link [CONTAINER_NAME]:[Alias]
--detach
--workdir=[CONTAINER_WORKDIR]
--env=[CONTAINER_ENV_NAME]=[CONTAINER_ENV_VAL]
```

### Run
```
docker pull microld/redis
docker run --name=redis -h REDIS -e REDIS_PASSWORD=redis  -p 6379:6379 -d microld/redis:3.0.7
```