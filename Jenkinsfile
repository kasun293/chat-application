pipeline {
    agent any // Or specify a Docker agent if you have one set up

    environment {
        // Define environment variables, e.g., Docker registry URL, image name
        DOCKER_REGISTRY = "your-docker-registry.com" // e.g., Docker Hub or AWS ECR URL
        IMAGE_NAME = "chat-service"
        APP_PORT = "8080"
        EC2_HOST = "ec2-user@your-app-ec2-ip-or-dns" // EC2 user and IP/DNS
        EC2_KEY = "jenkins-ssh-key" // Jenkins credential ID for SSH key
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                // Checkout code from your GitHub repository
                git branch: 'service', credentialsId: 'github-creds', url: 'https://github.com/your-org/your-repo.git'
            }
        }

        stage('Build Spring Boot Application') {
            steps {
                // Assuming Maven or Gradle is used
                // For Maven:
                sh 'mvn clean install -DskipTests'
                // For Gradle:
                // sh './gradlew clean build -x test'
            }
        }

        stage('Run Unit Tests') {
            steps {
                // Execute unit tests
                // For Maven:
                sh 'mvn test'
                // For Gradle:
                // sh './gradlew test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the Dockerfile in the current directory
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image to Registry') {
            steps {
                script {
                    // Push the built image to the configured Docker Registry
                    // You might need to configure Docker credentials in Jenkins
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-hub-creds') { // Or 'aws-ecr-creds'
                        docker.image("${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                        // Tag as 'latest' for easy pulling (optional, but common)
                        docker.image("${DOCKER_REGISTRY}/${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: "${EC2_KEY}", keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        # Connect to the remote EC2 instance via SSH
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${EC2_HOST} << EOF
                            echo "Logged into EC2 instance..."
                            # Pull the latest Docker image
                            docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest

                            # Stop and remove any old running container of this application
                            if docker ps -a --format '{{.Names}}' | grep -q "${IMAGE_NAME}"; then
                                docker stop ${IMAGE_NAME} && docker rm ${IMAGE_NAME}
                            fi

                            # Run the new Docker container, mapping ports
                            docker run -d --name ${IMAGE_NAME} -p ${APP_PORT}:${APP_PORT} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest

                            echo "Deployment complete."
                        EOF
                    """
                }
            }
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
