
FROM debian:wheezy
MAINTAINER  MICROLD <2627500295@qq.com>

# 软体处理
RUN { \
    # 安装所需软件
    apt-get update; \
    apt-get install -y --no-install-recommends spawn-fcgi fcgiwrap git; \

    # 清理垃圾
    apt-get clean; \
    apt-get autoremove -y; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*; \
}

# 端口监听
EXPOSE 9000

ENTRYPOINT ["/entrypoint"]
CMD ["tail", "-f"]