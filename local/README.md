# docker container

## docker
### 添加数据
```bash
docker build -t data .
```

### 运行容器
```
docker run -dit --name=DATA --hostname=DATA data
```

## docker-compose
```
docker-compose run --build -d
```