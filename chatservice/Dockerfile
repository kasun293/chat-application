# Use an official OpenJDK 17 JDK image as the base
FROM openjdk:23

# Add metadata to the image
LABEL authors="kasun"

# Copy all JAR files from the target directory into the container as app.jar
COPY target/*.jar chatservice-0.0.1-SNAPSHOT.jar

# Specify the command to run on container startup
ENTRYPOINT ["java", "-jar", "/chatservice-0.0.1-SNAPSHOT.jar"]