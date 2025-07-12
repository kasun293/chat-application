pipeline {
    agent any

    environment {
//         IMAGE_NAME = 'yourdockerhubusername/springboot-app'
//         AWS_HOST = 'ec2-user@your-ec2-public-dns'
        DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME')
        DOCKERHUB_PASSWORD = credentials('DOCKERHUB_PASSWORD')
        IMAGE_TAG = "latest"
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
                                docker build -t devksn/chat-service:$IMAGE_TAG .
                                echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                                docker push devksn/chat-service:$IMAGE_TAG
                       '''
                }
            }
        }

        // stage('Deploy to EC2') {
        //     steps {
        //         script {
        //             def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
        //             sh """
        //                 ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${AWS_HOST} '
        //                     docker pull ${imageTag}
        //                     docker stop springboot-app || true
        //                     docker rm springboot-app || true
        //                     docker run -d --name springboot-app -p 8080:8080 ${imageTag}
        //                 '
        //             """
        //         }
        //     }
        // }
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
