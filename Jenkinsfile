pipeline {
    agent any

    environment {
        IMAGE_NAME = 'chat-service'
        AWS_HOST = 'ubuntu@18.206.156.237'
        DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME')
        DOCKERHUB_PASSWORD = credentials('DOCKERHUB_PASSWORD')
        IMAGE_TAG = "latest"
        DOCKERHUB_REPO = "devksn/chat-service"
        SSH_KEY = credentials('AWS_DOCKER_SSH_KEY')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'service', url: 'https://github.com/kasun293/chat-application.git'
            }
        }

        stage('Build with Maven') {
            steps {
                sh 'cd chatservice && mvn clean package -DskipTests -e'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh '''
                                cd chatservice
                                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                                echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                                docker push $DOCKERHUB_REPO:$IMAGE_TAG
                       '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh '''
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no $AWS_HOST
                            echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                            docker pull $DOCKERHUB_REPO:$IMAGE_TAG
                            docker stop chat-service || true
                            docker rm chat-service || true
                            docker run -d --name chat-service -p 8080:8080 $DOCKERHUB_REPO:$IMAGE_TAG

                    '''
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
