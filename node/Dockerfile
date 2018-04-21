
FROM debian:wheezy
MAINTAINER Microld <2627500295@qq.com>

ARG VERSION=4.3.1
ARG BASEPATH=/work/node

ENV TERM=xterm \
    HOME=/root \
    PATH="${PATH}:${BASEPATH}/bin"

RUN { \
    # 更新源资源数据
    apt-get update; \

    # 安装常用包
    apt-get install -y --force-yes --no-install-recommends \
        curl tar python build-essential ca-certificates libkrb5-dev; \

    # 安装
    mkdir -p ${BASEPATH}; \
    curl -L -# http://nodejs.org/dist/v${VERSION}/node-v${VERSION}-linux-x64.tar.gz |  tar xz -C ${BASEPATH} --strip-components=1; \

    # 清理垃圾
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*; \
}

# 开放端口
EXPOSE 3000

# 复制文件
COPY data /data
VOLUME ["/data"]

# 执行程序
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["node", "app"]


