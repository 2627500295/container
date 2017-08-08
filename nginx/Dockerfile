FROM alpine:latest
MAINTAINER MICROLD <2627500295@qq.com>

ARG BASEPATH=/app/nginx
ENV TERM=xterm HOME=/root PATH="${BASEPATH}/sbin:${PATH}"

RUN { \
    # 添加用户
    adduser -g www -s /bin/nologin -h / -D www; \

    # 添加组件
    apk add --no-cache  --update-cache --virtual Build build-base openssl; \
    apk add --no-cache  --update-cache --virtual Dependencies perl zlib-dev jemalloc-dev; \

    # 开始安装
    cd /tmp; \
    wget https://www.openssl.org/source/openssl-1.0.2l.tar.gz; \
    tar xzvf openssl-*; \

    wget https://ftp.pcre.org/pub/pcre/pcre-8.41.tar.gz; \
    tar xzvf pcre-*; \

    wget http://nginx.org/download/nginx-1.12.1.tar.gz;\
    # wget https://github.com/nginx/nginx/archive/release-1.12.1.tar.gz; \
    tar xzvf nginx-*; \
    cd nginx-*; \
    ./configure --prefix=/app/nginx --user=www --group=www --with-http_stub_status_module --with-http_v2_module --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module --with-http_flv_module --with-http_mp4_module --with-openssl=../openssl-1.0.2l --with-pcre=../pcre-8.41 --with-ld-opt='-ljemalloc' --with-pcre-jit; \
    make; \
    make install; \

    # 清理垃圾
    apk del Build; \
    rm -rf /tmp/* /var/cache/*; \
    
}

# 开放端口
EXPOSE 80 443

# 添加文件
ADD ./nginx.conf ${BASEPATH}/conf/nginx.conf
ADD ./entrypoint /entrypoint


ENTRYPOINT ["/entrypoint"]
CMD ["nginx", "-g", "daemon off;"]

