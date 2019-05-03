FROM node:alpine as builder
LABEL maintainer="jeremias.hillerberg@esss.se"

ENV http_proxy "http://172.18.12.30:8123"
ENV https_proxy $http_proxy
ENV no_proxy "localhost, 127.0.0.1"

RUN npm config set proxy  $http_proxy
RUN npm config set https-proxy  $http_proxy
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false
RUN npm install -g @angular/cli

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install typescript@">=3.1.1 <3.3"
RUN npm install -g node-sass
RUN npm install
COPY . /usr/src/app
RUN ng build --configuration=esss

FROM nginx:alpine
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
