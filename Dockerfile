# Simple httpd-based Docker image for the bespin-ui
# Before building docker image, build bespin-ui with `ember build --production`
# This does not the ember app, it merely copies the dist directory

FROM httpd:latest
MAINTAINER dan.leehr@duke.edu

ENV TZ=US/Eastern
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD dist /usr/local/apache2/htdocs
ADD apache/rewrite.conf /usr/local/apache2/conf/extra/rewrite.conf
