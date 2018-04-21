
FROM debian:wheezy
MAINTAINER Microld <2627500295@qq.com>

# 编译过程变量
ARG BASEPATH=/work/tengine

# 环境变量
ENV TERM=xterm \
    HOME=/root \
    PATH="${BASEPATH}/sbin:${PATH}"


RUN { \

    # 更新软件列表数据
    apt-get update; \

    # 常用软件
    apt-get install -y --no-install-recommends \
        git-core ca-certificates make build-essential \
        openssl libssl-dev libpcre3 libpcre3-dev binutils libjemalloc1 libjemalloc-dev \
    ; \

    # Tengine
    git clone https://github.com/alibaba/tengine.git /tmp/tengine; \
    cd /tmp/tengine; \
    ./configure \
        --prefix=${BASEPATH} \
        --user=www-data \
        --group=www-data \
        --with-http_stub_status_module \
        --with-http_ssl_module  \
        --with-ipv6 \
        --with-http_gzip_static_module \
        --with-http_realip_module \
        --with-http_flv_module \
        --with-jemalloc \
        --with-http_v2_module \
        --with-http_concat_module \
        --with-http_sysguard_module \
    ; \
    make && make install; \
    rm -f ${BASEPATH}/conf/nginx.conf; \

    # 清理垃圾
    apt-get purge -y --auto-remove git-core make build-essential; \
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /tmp/* /var/tmp/* /var/cache/apt/archives/* /var/lib/apt/lists/*; \
}

# 开放端口
EXPOSE 80 443

# 添加配置
ADD nginx.conf ${BASEPATH}/conf/nginx.conf

# 复制文件
COPY data /data
VOLUME ["/data"]

ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["nginx"]

