
FROM debian:wheezy
MAINTAINER MICROLD <2627500295@qq.com>

ARG BASEPATH=/work/btsync

ENV TERM=xterm \
    HOME=/root \
    PATH="${PATH}:${BASEPATH}"

RUN { \
    # 更新软件列表数据
    apt-get update; \

    # 常用软件
    apt-get install -y --force-yes --no-install-recommends \
        unzip tar bzip2 curl openssl ca-certificates \
    ; \

    # btsync
    mkdir -p /work/btsync; \
    curl -L# https://download-cdn.getsync.com/stable/linux-x64/BitTorrent-Sync_x64.tar.gz |  tar xz -C ${BASEPATH}; \

    # 清理垃圾
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /tmp/* /var/tmp/* /var/cache/apt/archives/* /var/lib/apt/lists/*; \
}

# 开放端口
EXPOSE 8888

# 服务持续化
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["btsync", "--nodaemon", "--webui.listen", "0.0.0.0:8888"]
