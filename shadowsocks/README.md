# shadowsocks

### Option
```
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]
```

### Run
```
docker pull microld/shadowsocks
docker run --name=shadowsocks --env SSOCKS_PASSWORD={SS_PASSWORD} -d -p 58888:8338 microld/shadowsocks
```
or
```
docker run --name=shadowsocks -d -p 58888:8338 microld/shadowsocks ss-server -s 0.0.0.0 -p 8338 -k {SS_PASSWORD} -m aes-256-cfb
```
