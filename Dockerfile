FROM 47.97.82.62:8888/base/nginx:1.16.1

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
ADD dist/ ./
ADD ng-dev.conf /etc/nginx/
ADD ng-fat.conf /etc/nginx/
ADD ng-pro.conf /etc/nginx/
ADD ng-pro2.conf /etc/nginx/
RUN echo "Asia/Shanghai" > /etc/timezone
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENV TZ='Asia/Shanghai'