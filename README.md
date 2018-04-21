﻿# Docker容器

### Docker run 命令行
```
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]
```

#### shadowsocks-libev
```
docker pull microld/shadowsocks
docker run --name=shadowsocks --env SSOCKS_PASSWORD={SS_PASSWORD} -d -p 58888:8338 microld/shadowsocks
```
or
```
docker pull microld/shadowsocks
docker run --name=shadowsocks -d -p 58888:8338 microld/shadowsocks ss-server -s 0.0.0.0 -p 8338 -k {SS_PASSWORD} -m aes-256-cfb
```

