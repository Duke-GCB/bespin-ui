# Simple httpd-based Docker image for the bespin-ui
# Before building docker image, build bespin-ui with `ember build --production`
# This does not the ember app, it merely copies the dist-docker directory

FROM httpd:latest
MAINTAINER dan.leehr@duke.edu

ENV TZ=US/Eastern
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD dist-docker /usr/local/apache2/htdocs

# Replace httpd.conf with our own
ADD apache2/httpd.conf /usr/local/apache2/conf/httpd.conf

# Test the httpd config
RUN apachectl -t
