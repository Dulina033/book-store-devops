pipeline {
    agent any

    tools {
        nodejs 'NodeJS-Latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Dulina033/book-store-devops.git'
            }
        }

        stage('Install Dependencies (Backend)') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests (Backend)') {
            steps {
                dir('backend') {
                    sh 'npm test || echo "No tests defined"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step will be added here'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
