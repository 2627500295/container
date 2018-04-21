
FROM debian:wheezy
MAINTAINER Microld <2627500295@qq.com>

ARG VERSION=10.1.11
ARG BASEDIR=/work/mariadb

ENV TERM=xterm \
    HOME=/root \
    PATH="${PATH}:${BASEDIR}/bin:${BASEDIR}/scripts"

RUN { \
    # 更新源资源数据
    apt-get update; \

    # 安装常用包
    apt-get update; \
    apt-get install -y --force-yes --no-install-recommends \
        curl tar libaio-dev libjemalloc1 libjemalloc-dev; \

    # 创建用户 & 组
    useradd -M -s /sbin/nologin mysql; \
    
    # 安装处理
    mkdir -p ${BASEDIR}; \
    cd ${BASEDIR}; \
    curl -L# http://mirrors.aliyun.com/mariadb/mariadb-${VERSION}/bintar-linux-x86_64/mariadb-${VERSION}-linux-x86_64.tar.gz | tar xz -C ${BASEDIR} --strip-components=1; \
    
    # MySQL内存优化
    sed -i '/executing mysqld_safe/a export LD_PRELOAD=/usr/local/lib/libjemalloc.so' ${BASEDIR}/bin/mysqld_safe; \
        
    # 清理垃圾
    rm -rf ${BASEDIR}/COPY* ${BASEDIR}/CREDITS ${BASEDIR}/README* ${BASEDIR}/EXCEPTIONS-*; \
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*; \
}

# MySQL配置文件
ADD my.cnf /etc/my.cnf

# 开放端口
EXPOSE 3306

# 复制文件
COPY data /data
VOLUME ["/data"]

# 执行程序
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["mysqld"]

