FROM alpine:latest
MAINTAINER MICROLD <2627500295@qq.com>


# 编译过程变量
ARG OSVERSION=v3.5
ARG BASEPATH=/app/shadowsocks


ENV TERM=xterm \
    HOME=/root \
    PATH=${BASEPATH}/bin:${PATH}


RUN { \
    # 更新源信息
    echo "http://mirrors.ustc.edu.cn/alpine/${OSVERSION}/main"       >  /etc/apk/repositories; \
    echo "http://mirrors.ustc.edu.cn/alpine/${OSVERSION}/community"  >> /etc/apk/repositories; \


    # 安装支持组件
    apk update; \
    apk add --no-cache --virtual TOOLS curl wget tar unzip bzip2 git xz; \
    apk add --no-cache --virtual BUILD build-base linux-headers make ca-certificates autoconf automake gawk asciidoc xmlto apg libtool; \
    apk add --no-cache --virtual Dependent pcre-dev mbedtls-dev libsodium-dev udns-dev libev-dev; \
    # LITE
    # udns mbedtls mbedtls-static mbedtls-utils

    # 编译安装
    git clone https://github.com/shadowsocks/shadowsocks-libev.git /tmp/shadowsocks-libev; \
    cd /tmp/shadowsocks-libev; \
    git submodule update --init; \
    ./autogen.sh; \
    ./configure --prefix=${BASEPATH}; \
    make; \
    make install; \


    # 写入PATH
    (   echo "BASEDIR=\${BASEPATH}/bin"; \
        echo "PATH=\${BASEDIR}:\${PATH}"; ) >> /etc/profile; \
    

    # 清理垃圾
    rm -rf /tmp/* /var/cache/*; \
    apk del TOOLS BUILD; \

}


# 运行程序
ADD ./entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["ss-server", "-s 0.0.0.0", "-p 10088", "-k SHADOW_PROXY_PASSWORD", "-m aes-256-cfb"]





