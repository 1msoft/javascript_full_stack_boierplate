From node:5.10.1

# application folder
RUN mkdir /var/webapps
# 配置文件
RUN mkdir /var/webapps/config
# 输入文件
RUN mkdir /var/webapps/files
# 输出文件
RUN mkdir /var/webapps/data
# 应用部署目录
RUN mkdir /var/webapps/build

WORKDIR /var/webapps
# install node modules
COPY package.json /var/webapps
RUN npm install
# build application, output folder is ./build
COPY . /var/webapps
RUN npm run build
# clear source file
RUN rm -rf /var/webapps/src
# start service
CMD [ "npm", "start" ]

