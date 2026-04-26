# Use an official OpenJDK 17 JDK image as the base
#FROM openjdk:23
#FROM openjdk:27-ea-oraclelinux10
#FROM eclipse-temurin:21
FROM eclipse-temurin:21-jre-jammy
# 94mb
#FROM eclipse-temurin:25.0.2_10-jre-noble
# ~100mb

WORKDIR /chatservice

# Copy all JAR files from the target directory into the container
COPY target/*.jar chatservice-0.0.1-SNAPSHOT.jar

EXPOSE 8080

# Specify the command to run on container startup
ENTRYPOINT ["java", "-jar", "chatservice-0.0.1-SNAPSHOT.jar"]