# Simple httpd-based Docker image for the bespin-ui
# Before building docker image, build bespin-ui with `ember build --production`
# This does not the ember app, it merely copies the dist-docker directory

FROM httpd:latest
MAINTAINER dan.leehr@duke.edu

ENV TZ=US/Eastern
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD dist-docker /usr/local/apache2/htdocs

# As a single-page app, ember needs to catch all URLs
RUN echo "FallbackResource index.html" >> /usr/local/apache2/conf/httpd.conf
