# tengine

### Option
```
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]
```

### Run
```
docker pull microld/tengine
docker run --name=tengine --hostname=HTTP -d -p 80:80 -p 443:443 microld/tengine
```
