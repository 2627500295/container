
FROM debian:wheezy
MAINTAINER Microld <2627500295@qq.com>

# 编译过程变量
ARG BASEPATH=/work/redis

# 环境变量
ENV TERM=xterm \
    HOME=/root \
    PATH="${BASEPATH}/bin:${PATH}"

RUN { \
    # 更新软件列表数据
    apt-get update; \

    # 常用软件
    apt-get install -y --no-install-recommends \
        git-core ca-certificates make build-essential \
    ; \

    # 安装
    git clone https://github.com/antirez/redis.git /tmp/redis; \
    cd /tmp/redis; \
    make && make PREFIX=${BASEPATH} install; \
    cp redis.conf /etc; \
    echo "PATH=${BASEPATH}/bin:\${PATH}" > /etc/profile.d/redis.sh; \
    
    # 清理垃圾
    apt-get purge -y --auto-remove git-core ca-certificates make build-essential; \
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*; \
}

# 开放端口
EXPOSE 6379

# 执行程序
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["redis-server", "/etc/redis.conf"]
