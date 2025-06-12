pipeline {
    agent any // Or specify a Docker agent if you have one set
    tools {
            jdk 'JDK23'          // Name defined in Global Tool Configuration
            maven 'Maven3'       // Name defined in Global Tool Configuration
            git 'DefaultGit'     // Optional, rarely needed unless special Git version
        }

    environment {
        // Define environment variables, e.g., Docker registry URL, image name
        DOCKER_REGISTRY = "your-docker-registry.com" // e.g., Docker Hub or AWS ECR URL
        IMAGE_NAME = "chat-service"
        APP_PORT = "8080"
        EC2_HOST = "ec2-user@3.95.185.11" // EC2 user and IP/DNS
        EC2_KEY = credentials("ec2-ssh-key") // Jenkins credential ID for SSH key
    }

    stages {
//             stage('Checkout Source Code') {
//                 steps {
//                     // Checkout code from your GitHub repository
//                     git branch: 'service', url: 'https://github.com/your-org/your-repo.git'
//                     sh 'ls -a'
//                 }
//             }

        stage('Build Spring Boot Application Using Docker') {
               stage('Build JAR') {
                           steps {
                               sh 'mvn clean package -DskipTests'
                           }
                       }
               stage('Build Docker Image') {
                            steps {
                               script {
                                           docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                                       }
                                   }
                            }
//             agent {
//                 docker {
//                     image 'openjdk:23-jdk'
//                     reuseNode true
//                 }
//             }
//             environment {
//                  HOME = '/tmp' // Or another writable directory inside the container
//             }
//             steps {
//                 // Build the Spring Boot application using Maven
//                 sh '''
//                     cd chatservice && chmod +x mvnw && ./mvnw clean install
//                 '''
//             }
        }

    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
