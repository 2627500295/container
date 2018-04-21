
FROM debian:wheezy
MAINTAINER MICROLD <2627500295@qq.com>

# 编译过程变量
ARG BASEPATH=/work/shadowsocks

# 全局环境变量
ENV TERM=xterm HOME=/root PATH=${BASEPATH}/bin:${PATH} SSOCKS_PASSWORD=__LD_MICROLD

RUN { \
    # 更新源信息
    apt-get update; \
    
    # 安装支持组件
    apt-get install -y --no-install-recommends git-core build-essential autoconf libtool libssl-dev; \
    
    # 编译安装
    git clone https://github.com/shadowsocks/shadowsocks-libev.git /tmp/shadowsocks-libev; \
    cd /tmp/shadowsocks-libev; \
    ./configure --prefix=${BASEPATH}; \
    make; \
    make install; \
    
    # 清理垃圾
    rm -rf /tmp/shadowsocks-libev/shadowsocks-libev; \
    apt-get --purge --auto-remove -y git-core build-essential autoconf libtool libssl-dev; \
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*; \
}

# 端口监听
EXPOSE 8338

# 运行程序
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["ss-server", "-s 0.0.0.0", "-p 8338", "-k ${SSOCKS_PASSWORD}", "-m aes-256-cfb"]

