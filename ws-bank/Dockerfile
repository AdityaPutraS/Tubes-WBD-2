FROM tomcat:9-jdk8
LABEL maintainer="adityaputra159@gmail.com"

ADD WebServiceBank/target/WebServiceBank.war /usr/local/tomcat/webapps/
ADD depJaxWS/*.jar /usr/local/tomcat/lib/
ADD depJaxWS/plugins /usr/local/tomcat/lib/

EXPOSE 8080

CMD ["catalina.sh", "run"]