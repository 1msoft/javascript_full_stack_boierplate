From node:5.10.1
# 本文件用于Release版本发布

# 应用程序目录
# 根目录
RUN mkdir /var/webapps
# 配置文件:用于外部配置文件输入
RUN mkdir /var/webapps/config
# 共享文件夹, 用于共享文件交换
RUN mkdir /var/webapps/mnt
# 日志文件
RUN mkdir /var/webapps/logs
# 应用部署目录, build后的文件放在该目录
RUN mkdir /var/webapps/dist
# 设置当前工作目录
WORKDIR /var/webapps
# install node modules
COPY package.json /var/webapps
RUN npm install
# build application, output folder is ./build
COPY . /var/webapps
RUN npm run build
# clear source file
RUN rm -rf /var/webapps/src
# ENV 
# DATABASE_HOST, DATABASE_PORT, MONGO_HOST, MONGO_PORT, REDIS_HOST, REDIS_PORT
# ENTRYPOINT
COPY ./scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD [ "npm", "start" ]

