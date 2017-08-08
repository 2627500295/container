FROM alpine:latest
MAINTAINER MICROLD <2627500295@qq.com>

# 环境变量
ENV TERM=xterm HOME=/root

# 复制文件
COPY ./site /data

# 挂载data
VOLUME ["/data", "/tmp"]

# 添加文件
# ADD entrypoint /entrypoint

# 进入点
# ENTRYPOINT ["/entrypoint"]

# 镜像运行默认参数
CMD ["/bin/sh"]
