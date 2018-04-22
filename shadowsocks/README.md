# shadowsocks
docker container    
Base OS     : alpine v3.5    
Environment : shadowsocks-libev    

# Build
```
Usage:
docker build [Options] <PATH>

Options:
-t, --tag list    Name and optionally a tag in the 'name:tag' format

Example:
docker build -t shadowsocks .
```

# Run
```
Usage:
docker run [Options] IMAGE[:TAG] [COMMAND] [ARG...]
 
Options:
--name string            Assign a name to the container
-d, --detach             Run container in background and print container ID
-e, --env list           Set environment variables (default [])
-h, --hostname string    Container host name
-i, --interactive        Keep STDIN open even if not attached
-p, --publish list       Publish a container's port(s) to the host (default []) <HOT_PORT>:<CONTAINER_PORT>
-t, --tty                Allocate a pseudo-TTY
-v, --volume list        Bind mount a volume (default [])
 
Example:
docker run --name=shadowsocks -d -p 58888:8338 microld/shadowsocks ss-server -s 0.0.0.0 -p 8338 -k {SS_PASSWORD} -m aes-256-cfb
```

