
FROM debian:wheezy
MAINTAINER Microld <2627500295@qq.com>

# 环境变量
ENV TERM=xterm \
    HOME=/root

RUN { \

    # 更新软件列表数据
    apt-get update; \

    # 常用软件
    apt-get install -y --force-yes --no-install-recommends \
        openssh-server \
        unzip tar bzip2 xz-utils \
        wget curl vim git-core openssl tree htop apache2-utils \
        make build-essential autoconf python gcc g++ \
        libtool libssl-dev binutils libjemalloc1 libjemalloc-dev ca-certificates libkrb5-dev \
        libpcre3 libpcre3-dev \
    ; \
}

# 开放端口
EXPOSE 22

# 复制文件
COPY data /data
VOLUME ["/data"]

ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["tail", "-f"]

