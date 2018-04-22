FROM alpine:latest
MAINTAINER MICROLD <2627500295@qq.com>

# 编译过程变量
ARG OSVERSION=v3.5
ARG BASEPATH=/app/ngrok

ARG DOMAIN=008.al
ARG GOROOT=/usr/lib/go
ARG GOPATH=$HOME/go

ENV TERM=xterm \
    HOME=/root \
    PATH=${BASEPATH}:$GOROOT/bin:${PATH}

ADD certificate /tmp/certificate

RUN { \

    # 更新源信息
    echo "http://mirrors.ustc.edu.cn/alpine/${OSVERSION}/main"       >  /etc/apk/repositories; \
    echo "http://mirrors.ustc.edu.cn/alpine/${OSVERSION}/community"  >> /etc/apk/repositories; \


    # 安装支持组件
    apk add --update --no-cache --virtual BUILD go build-base mercurial git bzr subversion make openssl; \
    # apk add --update --no-cache --virtual RUNTIME ; \
    
    # 生成证书
    mkdir /cert; \
    openssl genrsa -out rootCA.key 2048; \
    openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=${DOMAIN}" -days 5000 -out rootCA.pem; \
    openssl genrsa -out device.key 2048; \
    openssl req -new -key device.key -subj "/CN=${DOMAIN}" -out device.csr; \
    openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000; \
    # 备份证书文件
    # 后面可以通过docker cp <容器>:<文件路径> <主机存放路径>提取出来。
    # 然后供编译客户端使用
    # docker cp教程 http://www.runoob.com/docker/docker-cp-command.html
    mv rootCA.key /cert; \
    mv rootCA.pem /cert; \
    mv rootCA.srl /cert; \
    mv device.key /cert; \
    mv device.csr /cert; \
    mv device.crt /cert; \

    # 编译安装
    git clone https://github.com/inconshreveable/ngrok.git /tmp/ngrok; \
    cd /tmp/ngrok; \
    # 复制ngrok所需证书
    cp /cert/rootCA.pem assets/client/tls/ngrokroot.crt; \
    cp /cert/device.crt assets/server/tls/snakeoil.crt; \
    cp /cert/device.key assets/server/tls/snakeoil.key; \

    # 编译服务器
    make release-server; \
    mkdir -p /app/ngrok; \
    cp bin/ngrokd /app/ngrok; \

    # 编译客户端
    # 为了不占用容器体积，所以，后面编译
    # mkdir -p /client; \
    # GOOS=windows GOARCH=amd64 make release-client; \
    # GOOS=windows GOARCH=386 make release-client; \
    # GOOS=darwin GOARCH=amd64 make release-client; \
    #
    # mv bin/windows_386/ngrok.exe /client/ngrok.exe; \
    # mv bin/windows_amd64/ngrok.exe /client/ngrok64.exe; \
    # mv bin/darwin_amd64/ngrok /client/ngrok_darwin

    # 写入PATH
    (   echo "export BASEDIR=${BASEPATH}"; \
        echo "export PATH=\${BASEDIR}:\${PATH}"; ) >> /etc/profile; \
    
    # 清理垃圾
    rm -rf /tmp/* $HOME/go; \
    apk del BUILD; \
}

# 开放端口
EXPOSE 80
EXPOSE 443
EXPOSE 4443

# 运行程序
ADD entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["ngrokd", "-httpAddr=:80", "-httpsAddr=:443", "-domain=008.al"]


